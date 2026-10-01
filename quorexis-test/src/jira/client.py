"""Jira API client for ticket management."""

from jira import JIRA
from typing import Optional, Dict, Any, List
from dataclasses import dataclass


@dataclass
class TicketData:
    """Data structure for creating a Jira ticket."""

    summary: str
    description: str
    issue_type: str = "Task"
    priority: str = "Medium"
    labels: List[str] = None
    components: List[str] = None
    custom_fields: Dict[str, Any] = None

    def __post_init__(self):
        if self.labels is None:
            self.labels = []
        if self.custom_fields is None:
            self.custom_fields = {}


class JiraClient:
    """Client for Jira API operations."""

    def __init__(self, url: str, email: str, api_token: str, project_key: str):
        """Initialize Jira client.

        Args:
            url: Jira instance URL (e.g., https://company.atlassian.net)
            email: User email for authentication
            api_token: Jira API token
            project_key: Default project key for operations
        """
        self.url = url
        self.project_key = project_key
        self.jira = JIRA(
            server=url,
            basic_auth=(email, api_token)
        )

    def create_ticket(self, data: TicketData) -> str:
        """Create a new Jira ticket.

        Args:
            data: Ticket data

        Returns:
            Created issue key (e.g., QT-123)
        """
        fields = {
            "project": {"key": self.project_key},
            "summary": data.summary,
            "description": data.description,
            "issuetype": {"name": data.issue_type},
            "priority": {"name": data.priority},
        }

        if data.labels:
            fields["labels"] = data.labels

        if data.components:
            fields["components"] = [{"name": c} for c in data.components]

        if data.custom_fields:
            fields.update(data.custom_fields)

        issue = self.jira.create_issue(fields=fields)
        return issue.key

    def create_bug(
        self,
        summary: str,
        description: str,
        steps_to_reproduce: str,
        expected: str,
        actual: str,
        severity: str = "Medium",
        labels: List[str] = None
    ) -> str:
        """Create a bug ticket with structured description.

        Args:
            summary: Bug title
            description: Bug description
            steps_to_reproduce: Steps to reproduce the bug
            expected: Expected behavior
            actual: Actual behavior
            severity: Bug severity
            labels: Optional labels

        Returns:
            Created issue key
        """
        full_description = f"""
{description}

h3. Steps to Reproduce
{steps_to_reproduce}

h3. Expected Result
{expected}

h3. Actual Result
{actual}
        """.strip()

        data = TicketData(
            summary=summary,
            description=full_description,
            issue_type="Bug",
            priority=severity,
            labels=labels or ["automated"]
        )

        return self.create_ticket(data)

    def bulk_create_tickets(self, tickets: List[TicketData]) -> List[str]:
        """Create multiple tickets at once.

        Args:
            tickets: List of ticket data

        Returns:
            List of created issue keys
        """
        created_keys = []
        for ticket in tickets:
            key = self.create_ticket(ticket)
            created_keys.append(key)
        return created_keys

    def link_issues(self, from_key: str, to_key: str, link_type: str = "relates to"):
        """Link two issues together.

        Args:
            from_key: Source issue key
            to_key: Target issue key
            link_type: Type of link (e.g., "relates to", "blocks", "is blocked by")
        """
        self.jira.create_issue_link(
            type=link_type,
            inwardIssue=from_key,
            outwardIssue=to_key
        )

    def get_issue(self, key: str) -> Dict[str, Any]:
        """Get issue details.

        Args:
            key: Issue key

        Returns:
            Issue data dictionary
        """
        issue = self.jira.issue(key)
        return {
            "key": issue.key,
            "summary": issue.fields.summary,
            "description": issue.fields.description,
            "status": issue.fields.status.name,
            "priority": issue.fields.priority.name if issue.fields.priority else None,
            "assignee": issue.fields.assignee.displayName if issue.fields.assignee else None,
            "labels": issue.fields.labels,
        }

    def search_issues(self, jql: str, max_results: int = 50) -> List[Dict[str, Any]]:
        """Search issues using JQL.

        Args:
            jql: JQL query string
            max_results: Maximum number of results

        Returns:
            List of issue data dictionaries
        """
        issues = self.jira.search_issues(jql, maxResults=max_results)
        return [self.get_issue(issue.key) for issue in issues]
