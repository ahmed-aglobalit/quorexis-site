"""CLI for Quorexis Test automation."""

import typer
from typing import Optional, List
from pathlib import Path
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
import json
import yaml

from .jira import JiraClient
from .jira.client import TicketData
from .xray import XrayClient
from .xray.client import TestCase, TestStep
from .utils.ai_generator import AITestGenerator
from .templates.test_templates import login_test_cases, crud_test_cases, api_test_cases

app = typer.Typer(
    name="quorexis-test",
    help="Automated test case and ticket management for Xray & Jira"
)
console = Console()


def get_clients():
    """Initialize clients from environment."""
    from config.settings import get_settings
    settings = get_settings()

    jira = JiraClient(
        url=settings.jira.url,
        email=settings.jira.email,
        api_token=settings.jira.api_token,
        project_key=settings.jira.project_key
    )

    xray = XrayClient(
        client_id=settings.xray.client_id,
        client_secret=settings.xray.client_secret,
        base_url=settings.xray.base_url
    )

    return jira, xray, settings


@app.command()
def create_ticket(
    summary: str = typer.Argument(..., help="Ticket summary/title"),
    description: str = typer.Option("", "--desc", "-d", help="Ticket description"),
    issue_type: str = typer.Option("Task", "--type", "-t", help="Issue type"),
    priority: str = typer.Option("Medium", "--priority", "-p", help="Priority"),
    labels: str = typer.Option("", "--labels", "-l", help="Comma-separated labels")
):
    """Create a new Jira ticket."""
    jira, _, _ = get_clients()

    label_list = [l.strip() for l in labels.split(",") if l.strip()]

    data = TicketData(
        summary=summary,
        description=description,
        issue_type=issue_type,
        priority=priority,
        labels=label_list
    )

    with console.status("Creating ticket..."):
        key = jira.create_ticket(data)

    console.print(f"[green]✓[/green] Ticket created: [bold]{key}[/bold]")


@app.command()
def create_bug(
    summary: str = typer.Argument(..., help="Bug title"),
    description: str = typer.Option(..., "--desc", "-d", help="Bug description"),
    steps: str = typer.Option(..., "--steps", "-s", help="Steps to reproduce"),
    expected: str = typer.Option(..., "--expected", "-e", help="Expected result"),
    actual: str = typer.Option(..., "--actual", "-a", help="Actual result"),
    severity: str = typer.Option("Medium", "--severity", help="Bug severity")
):
    """Create a bug ticket with structured format."""
    jira, _, _ = get_clients()

    with console.status("Creating bug ticket..."):
        key = jira.create_bug(
            summary=summary,
            description=description,
            steps_to_reproduce=steps,
            expected=expected,
            actual=actual,
            severity=severity
        )

    console.print(f"[green]✓[/green] Bug created: [bold]{key}[/bold]")


@app.command()
def create_test(
    summary: str = typer.Argument(..., help="Test case title"),
    description: str = typer.Option("", "--desc", "-d", help="Test description"),
    steps_file: Path = typer.Option(None, "--steps", "-s", help="JSON/YAML file with test steps"),
    labels: str = typer.Option("", "--labels", "-l", help="Comma-separated labels")
):
    """Create a test case in Xray."""
    _, xray, settings = get_clients()

    steps = []
    if steps_file and steps_file.exists():
        content = steps_file.read_text()
        if steps_file.suffix == ".yaml" or steps_file.suffix == ".yml":
            data = yaml.safe_load(content)
        else:
            data = json.loads(content)

        for s in data.get("steps", []):
            steps.append(TestStep(
                action=s.get("action", ""),
                data=s.get("data", ""),
                expected_result=s.get("expected_result", "")
            ))

    label_list = [l.strip() for l in labels.split(",") if l.strip()]

    test_case = TestCase(
        summary=summary,
        description=description,
        steps=steps,
        labels=label_list
    )

    with console.status("Creating test case..."):
        key = xray.create_test_case(test_case, settings.jira.project_key)

    console.print(f"[green]✓[/green] Test case created: [bold]{key}[/bold]")


@app.command()
def import_tests(
    file: Path = typer.Argument(..., help="JSON/YAML file with test cases"),
    template: str = typer.Option(None, "--template", "-t", help="Template: login, crud, api")
):
    """Import multiple test cases from file or template."""
    _, xray, settings = get_clients()

    test_cases = []

    if template:
        if template == "login":
            test_cases = login_test_cases()
        elif template == "crud":
            entity = typer.prompt("Entity name")
            fields = typer.prompt("Fields (comma-separated)", default="name,description")
            test_cases = crud_test_cases(entity, fields.split(","))
        elif template == "api":
            endpoint = typer.prompt("API endpoint")
            method = typer.prompt("HTTP method", default="GET")
            test_cases = api_test_cases(endpoint, method)
    elif file.exists():
        content = file.read_text()
        if file.suffix in [".yaml", ".yml"]:
            data = yaml.safe_load(content)
        else:
            data = json.loads(content)

        for tc in data.get("test_cases", []):
            steps = [
                TestStep(
                    action=s.get("action", ""),
                    data=s.get("data", ""),
                    expected_result=s.get("expected_result", "")
                )
                for s in tc.get("steps", [])
            ]
            test_cases.append(TestCase(
                summary=tc.get("summary", ""),
                description=tc.get("description", ""),
                steps=steps,
                labels=tc.get("labels", []),
                priority=tc.get("priority", "Medium")
            ))

    if not test_cases:
        console.print("[red]No test cases found[/red]")
        raise typer.Exit(1)

    console.print(f"Importing {len(test_cases)} test cases...")

    with console.status("Creating test cases..."):
        keys = xray.bulk_create_test_cases(test_cases, settings.jira.project_key)

    table = Table(title="Created Test Cases")
    table.add_column("Key", style="cyan")
    table.add_column("Summary")

    for key, tc in zip(keys, test_cases):
        table.add_row(key, tc.summary)

    console.print(table)


@app.command()
def generate(
    feature: str = typer.Argument(..., help="Feature description to generate tests for"),
    count: int = typer.Option(5, "--count", "-n", help="Number of test cases to generate"),
    output: Path = typer.Option(None, "--output", "-o", help="Output file (JSON/YAML)"),
    push: bool = typer.Option(False, "--push", help="Push to Xray after generation")
):
    """Generate test cases using AI."""
    _, xray, settings = get_clients()

    if not settings.anthropic_api_key:
        console.print("[red]ANTHROPIC_API_KEY not configured[/red]")
        raise typer.Exit(1)

    generator = AITestGenerator(settings.anthropic_api_key)

    with console.status("Generating test cases with AI..."):
        test_cases = generator.generate_test_cases(feature, num_cases=count)

    console.print(f"[green]✓[/green] Generated {len(test_cases)} test cases")

    for tc in test_cases:
        console.print(Panel(
            f"[bold]{tc.summary}[/bold]\n\n{tc.description}\n\nSteps: {len(tc.steps)}",
            title="Test Case"
        ))

    if output:
        data = {
            "test_cases": [
                {
                    "summary": tc.summary,
                    "description": tc.description,
                    "precondition": tc.precondition,
                    "steps": [
                        {
                            "action": s.action,
                            "data": s.data,
                            "expected_result": s.expected_result
                        }
                        for s in tc.steps
                    ],
                    "priority": tc.priority,
                    "labels": tc.labels
                }
                for tc in test_cases
            ]
        }

        if output.suffix in [".yaml", ".yml"]:
            output.write_text(yaml.dump(data, allow_unicode=True, default_flow_style=False))
        else:
            output.write_text(json.dumps(data, indent=2, ensure_ascii=False))

        console.print(f"[green]✓[/green] Saved to {output}")

    if push:
        with console.status("Pushing to Xray..."):
            keys = xray.bulk_create_test_cases(test_cases, settings.jira.project_key)

        console.print(f"[green]✓[/green] Created {len(keys)} test cases in Xray")
        for key in keys:
            console.print(f"  - {key}")


@app.command()
def search(
    query: str = typer.Argument(..., help="JQL query or simple text search"),
    limit: int = typer.Option(20, "--limit", "-l", help="Maximum results")
):
    """Search Jira issues."""
    jira, _, settings = get_clients()

    if not query.startswith("project"):
        query = f'project = {settings.jira.project_key} AND text ~ "{query}"'

    with console.status("Searching..."):
        issues = jira.search_issues(query, max_results=limit)

    if not issues:
        console.print("[yellow]No issues found[/yellow]")
        return

    table = Table(title=f"Search Results ({len(issues)} found)")
    table.add_column("Key", style="cyan")
    table.add_column("Summary")
    table.add_column("Status", style="green")
    table.add_column("Priority")

    for issue in issues:
        table.add_row(
            issue["key"],
            issue["summary"][:50] + "..." if len(issue["summary"]) > 50 else issue["summary"],
            issue["status"],
            issue["priority"] or "None"
        )

    console.print(table)


def main():
    """Entry point."""
    app()


if __name__ == "__main__":
    main()
