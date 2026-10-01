"""Pre-defined test case templates for common scenarios."""

from typing import List
from ..xray.client import TestCase, TestStep


def login_test_cases(app_name: str = "Application") -> List[TestCase]:
    """Generate standard login test cases.

    Args:
        app_name: Name of the application

    Returns:
        List of login-related test cases
    """
    return [
        TestCase(
            summary=f"[{app_name}] Login with valid credentials",
            description="Verify that a user can login with valid credentials",
            precondition="User account exists and is active",
            labels=["login", "smoke", "positive"],
            priority="High",
            steps=[
                TestStep(
                    action="Navigate to login page",
                    expected_result="Login page is displayed"
                ),
                TestStep(
                    action="Enter valid email",
                    data="user@example.com",
                    expected_result="Email is accepted"
                ),
                TestStep(
                    action="Enter valid password",
                    data="ValidP@ssw0rd",
                    expected_result="Password is masked"
                ),
                TestStep(
                    action="Click Login button",
                    expected_result="User is redirected to dashboard"
                ),
            ]
        ),
        TestCase(
            summary=f"[{app_name}] Login with invalid password",
            description="Verify error message when logging in with wrong password",
            precondition="User account exists",
            labels=["login", "negative"],
            priority="High",
            steps=[
                TestStep(
                    action="Navigate to login page",
                    expected_result="Login page is displayed"
                ),
                TestStep(
                    action="Enter valid email",
                    data="user@example.com",
                    expected_result="Email is accepted"
                ),
                TestStep(
                    action="Enter invalid password",
                    data="WrongPassword",
                    expected_result="Password is masked"
                ),
                TestStep(
                    action="Click Login button",
                    expected_result="Error message 'Invalid credentials' is displayed"
                ),
            ]
        ),
        TestCase(
            summary=f"[{app_name}] Login with non-existent email",
            description="Verify error message when logging in with non-existent account",
            labels=["login", "negative"],
            priority="Medium",
            steps=[
                TestStep(
                    action="Navigate to login page",
                    expected_result="Login page is displayed"
                ),
                TestStep(
                    action="Enter non-existent email",
                    data="notauser@example.com",
                    expected_result="Email is accepted"
                ),
                TestStep(
                    action="Enter any password",
                    data="AnyPassword123",
                    expected_result="Password is masked"
                ),
                TestStep(
                    action="Click Login button",
                    expected_result="Error message is displayed (should not reveal if email exists)"
                ),
            ]
        ),
        TestCase(
            summary=f"[{app_name}] Login - Empty fields validation",
            description="Verify validation when submitting empty login form",
            labels=["login", "validation", "negative"],
            priority="Medium",
            steps=[
                TestStep(
                    action="Navigate to login page",
                    expected_result="Login page is displayed"
                ),
                TestStep(
                    action="Leave email field empty",
                    expected_result="Email field is empty"
                ),
                TestStep(
                    action="Leave password field empty",
                    expected_result="Password field is empty"
                ),
                TestStep(
                    action="Click Login button",
                    expected_result="Validation errors shown for required fields"
                ),
            ]
        ),
    ]


def crud_test_cases(entity_name: str, fields: List[str] = None) -> List[TestCase]:
    """Generate CRUD test cases for an entity.

    Args:
        entity_name: Name of the entity (e.g., "User", "Product")
        fields: List of field names for the entity

    Returns:
        List of CRUD test cases
    """
    fields = fields or ["name", "description"]

    return [
        TestCase(
            summary=f"Create {entity_name} with valid data",
            description=f"Verify that a new {entity_name} can be created successfully",
            labels=["crud", "create", "positive"],
            priority="High",
            steps=[
                TestStep(
                    action=f"Navigate to {entity_name} creation page",
                    expected_result="Creation form is displayed"
                ),
                *[
                    TestStep(
                        action=f"Fill in {field}",
                        data=f"Test {field} value",
                        expected_result=f"{field} is accepted"
                    )
                    for field in fields
                ],
                TestStep(
                    action="Click Save/Create button",
                    expected_result=f"{entity_name} is created and success message is shown"
                ),
            ]
        ),
        TestCase(
            summary=f"Read {entity_name} details",
            description=f"Verify that {entity_name} details can be viewed",
            labels=["crud", "read", "positive"],
            priority="High",
            steps=[
                TestStep(
                    action=f"Navigate to {entity_name} list",
                    expected_result=f"List of {entity_name}s is displayed"
                ),
                TestStep(
                    action=f"Click on a {entity_name} to view details",
                    expected_result=f"{entity_name} details page is displayed with all fields"
                ),
            ]
        ),
        TestCase(
            summary=f"Update {entity_name}",
            description=f"Verify that {entity_name} can be updated",
            precondition=f"A {entity_name} exists in the system",
            labels=["crud", "update", "positive"],
            priority="High",
            steps=[
                TestStep(
                    action=f"Navigate to {entity_name} details",
                    expected_result=f"{entity_name} details are displayed"
                ),
                TestStep(
                    action="Click Edit button",
                    expected_result="Edit form is displayed with current values"
                ),
                TestStep(
                    action=f"Modify {fields[0]}",
                    data=f"Updated {fields[0]} value",
                    expected_result="Field is updated"
                ),
                TestStep(
                    action="Click Save button",
                    expected_result=f"{entity_name} is updated and success message is shown"
                ),
            ]
        ),
        TestCase(
            summary=f"Delete {entity_name}",
            description=f"Verify that {entity_name} can be deleted",
            precondition=f"A {entity_name} exists in the system",
            labels=["crud", "delete", "positive"],
            priority="High",
            steps=[
                TestStep(
                    action=f"Navigate to {entity_name} details",
                    expected_result=f"{entity_name} details are displayed"
                ),
                TestStep(
                    action="Click Delete button",
                    expected_result="Confirmation dialog is displayed"
                ),
                TestStep(
                    action="Confirm deletion",
                    expected_result=f"{entity_name} is deleted and no longer appears in the list"
                ),
            ]
        ),
    ]


def api_test_cases(endpoint: str, method: str = "GET") -> List[TestCase]:
    """Generate API test cases for an endpoint.

    Args:
        endpoint: API endpoint path
        method: HTTP method

    Returns:
        List of API test cases
    """
    return [
        TestCase(
            summary=f"API {method} {endpoint} - Success",
            description=f"Verify successful {method} request to {endpoint}",
            labels=["api", method.lower(), "positive"],
            priority="High",
            steps=[
                TestStep(
                    action=f"Send {method} request to {endpoint}",
                    data="Valid request body/params",
                    expected_result="Response status 200/201"
                ),
                TestStep(
                    action="Validate response body",
                    expected_result="Response contains expected data structure"
                ),
            ]
        ),
        TestCase(
            summary=f"API {method} {endpoint} - Unauthorized",
            description=f"Verify 401 response without authentication",
            labels=["api", method.lower(), "security"],
            priority="High",
            steps=[
                TestStep(
                    action=f"Send {method} request without auth token",
                    expected_result="Response status 401 Unauthorized"
                ),
            ]
        ),
        TestCase(
            summary=f"API {method} {endpoint} - Invalid input",
            description=f"Verify validation error with invalid input",
            labels=["api", method.lower(), "validation"],
            priority="Medium",
            steps=[
                TestStep(
                    action=f"Send {method} request with invalid data",
                    data="Malformed/invalid request body",
                    expected_result="Response status 400 Bad Request with validation errors"
                ),
            ]
        ),
    ]
