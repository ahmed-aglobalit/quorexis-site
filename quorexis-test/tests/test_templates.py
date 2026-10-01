"""Tests for test templates."""

import pytest
from src.templates.test_templates import login_test_cases, crud_test_cases, api_test_cases


def test_login_templates_returns_list():
    """Test that login templates return a list of test cases."""
    cases = login_test_cases()
    assert isinstance(cases, list)
    assert len(cases) > 0


def test_login_templates_have_steps():
    """Test that login test cases have steps."""
    cases = login_test_cases()
    for case in cases:
        assert case.summary
        assert len(case.steps) > 0


def test_crud_templates_with_entity():
    """Test CRUD templates with custom entity."""
    cases = crud_test_cases("Product", ["name", "price", "description"])
    assert len(cases) == 4  # Create, Read, Update, Delete
    assert "Product" in cases[0].summary


def test_api_templates():
    """Test API test templates."""
    cases = api_test_cases("/api/users", "POST")
    assert len(cases) > 0
    assert "POST" in cases[0].summary
    assert "/api/users" in cases[0].summary
