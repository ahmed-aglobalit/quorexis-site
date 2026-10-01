"""Configuration settings for Quorexis Test automation."""

from pydantic_settings import BaseSettings
from pydantic import Field
from typing import Optional


class JiraSettings(BaseSettings):
    """Jira API configuration."""

    url: str = Field(..., alias="JIRA_URL")
    email: str = Field(..., alias="JIRA_EMAIL")
    api_token: str = Field(..., alias="JIRA_API_TOKEN")
    project_key: str = Field(default="QT", alias="JIRA_PROJECT_KEY")

    class Config:
        env_file = ".env"
        extra = "ignore"


class XraySettings(BaseSettings):
    """Xray API configuration (Cloud version)."""

    client_id: str = Field(..., alias="XRAY_CLIENT_ID")
    client_secret: str = Field(..., alias="XRAY_CLIENT_SECRET")
    base_url: str = Field(
        default="https://xray.cloud.getxray.app/api/v2",
        alias="XRAY_BASE_URL"
    )

    class Config:
        env_file = ".env"
        extra = "ignore"


class Settings(BaseSettings):
    """Main application settings."""

    jira: JiraSettings = Field(default_factory=JiraSettings)
    xray: XraySettings = Field(default_factory=XraySettings)
    anthropic_api_key: Optional[str] = Field(default=None, alias="ANTHROPIC_API_KEY")

    class Config:
        env_file = ".env"
        extra = "ignore"


def get_settings() -> Settings:
    """Get application settings."""
    return Settings()
