"""Xray API client for test case management."""

import requests
from typing import Optional, Dict, Any, List
from dataclasses import dataclass, field


@dataclass
class TestStep:
    """A single test step."""

    action: str
    data: str = ""
    expected_result: str = ""


@dataclass
class TestCase:
    """Data structure for creating a test case in Xray."""

    summary: str
    description: str = ""
    steps: List[TestStep] = field(default_factory=list)
    precondition: str = ""
    labels: List[str] = field(default_factory=list)
    priority: str = "Medium"
    folder: str = ""
    custom_fields: Dict[str, Any] = field(default_factory=dict)


class XrayClient:
    """Client for Xray Cloud API operations."""

    def __init__(self, client_id: str, client_secret: str, base_url: str = None):
        """Initialize Xray client.

        Args:
            client_id: Xray Cloud client ID
            client_secret: Xray Cloud client secret
            base_url: Optional custom base URL
        """
        self.client_id = client_id
        self.client_secret = client_secret
        self.base_url = base_url or "https://xray.cloud.getxray.app/api/v2"
        self._token: Optional[str] = None

    def _authenticate(self) -> str:
        """Authenticate and get access token.

        Returns:
            Access token
        """
        if self._token:
            return self._token

        response = requests.post(
            f"{self.base_url}/authenticate",
            json={
                "client_id": self.client_id,
                "client_secret": self.client_secret
            },
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        self._token = response.text.strip('"')
        return self._token

    def _headers(self) -> Dict[str, str]:
        """Get authenticated headers."""
        return {
            "Authorization": f"Bearer {self._authenticate()}",
            "Content-Type": "application/json"
        }

    def create_test_case(self, test_case: TestCase, project_key: str) -> str:
        """Create a new test case.

        Args:
            test_case: Test case data
            project_key: Jira project key

        Returns:
            Created test case key
        """
        steps_data = []
        for i, step in enumerate(test_case.steps, 1):
            steps_data.append({
                "action": step.action,
                "data": step.data,
                "result": step.expected_result
            })

        payload = {
            "fields": {
                "project": {"key": project_key},
                "summary": test_case.summary,
                "description": test_case.description,
                "issuetype": {"name": "Test"}
            }
        }

        if test_case.labels:
            payload["fields"]["labels"] = test_case.labels

        response = requests.post(
            f"{self.base_url}/import/test",
            json=payload,
            headers=self._headers()
        )
        response.raise_for_status()
        result = response.json()
        test_key = result.get("key")

        if steps_data and test_key:
            self._add_test_steps(test_key, steps_data)

        return test_key

    def _add_test_steps(self, test_key: str, steps: List[Dict]):
        """Add steps to an existing test case.

        Args:
            test_key: Test case key
            steps: List of step dictionaries
        """
        for step in steps:
            response = requests.post(
                f"{self.base_url}/test/{test_key}/step",
                json=step,
                headers=self._headers()
            )
            response.raise_for_status()

    def bulk_create_test_cases(
        self,
        test_cases: List[TestCase],
        project_key: str
    ) -> List[str]:
        """Create multiple test cases.

        Args:
            test_cases: List of test case data
            project_key: Jira project key

        Returns:
            List of created test case keys
        """
        created_keys = []
        for tc in test_cases:
            key = self.create_test_case(tc, project_key)
            created_keys.append(key)
        return created_keys

    def import_from_json(self, json_data: Dict, project_key: str) -> Dict[str, Any]:
        """Import test cases from Xray JSON format.

        Args:
            json_data: Xray JSON format data
            project_key: Jira project key

        Returns:
            Import result
        """
        response = requests.post(
            f"{self.base_url}/import/test",
            json=json_data,
            headers=self._headers()
        )
        response.raise_for_status()
        return response.json()

    def create_test_execution(
        self,
        summary: str,
        test_keys: List[str],
        project_key: str,
        description: str = ""
    ) -> str:
        """Create a test execution and add tests to it.

        Args:
            summary: Test execution summary
            test_keys: List of test case keys to include
            project_key: Jira project key
            description: Optional description

        Returns:
            Created test execution key
        """
        payload = {
            "fields": {
                "project": {"key": project_key},
                "summary": summary,
                "description": description,
                "issuetype": {"name": "Test Execution"}
            },
            "xpimaportestKeys": test_keys
        }

        response = requests.post(
            f"{self.base_url}/import/execution",
            json=payload,
            headers=self._headers()
        )
        response.raise_for_status()
        return response.json().get("key")

    def update_test_run_status(
        self,
        execution_key: str,
        test_key: str,
        status: str,
        comment: str = ""
    ):
        """Update the status of a test run.

        Args:
            execution_key: Test execution key
            test_key: Test case key
            status: Status (PASS, FAIL, TODO, EXECUTING)
            comment: Optional comment
        """
        payload = {
            "testExecutionKey": execution_key,
            "tests": [{
                "testKey": test_key,
                "status": status,
                "comment": comment
            }]
        }

        response = requests.post(
            f"{self.base_url}/import/execution",
            json=payload,
            headers=self._headers()
        )
        response.raise_for_status()

    def get_test_runs(self, execution_key: str) -> List[Dict[str, Any]]:
        """Get all test runs for a test execution.

        Args:
            execution_key: Test execution key

        Returns:
            List of test run data
        """
        response = requests.get(
            f"{self.base_url}/testexec/{execution_key}/test",
            headers=self._headers()
        )
        response.raise_for_status()
        return response.json()
