"""AI-powered test case generator using Claude."""

from typing import List, Optional
from anthropic import Anthropic
from ..xray.client import TestCase, TestStep


class AITestGenerator:
    """Generate test cases using Claude AI."""

    SYSTEM_PROMPT = """Tu es un expert QA spécialisé dans la création de cas de tests.
Tu génères des cas de tests structurés, précis et exhaustifs.
Pour chaque fonctionnalité, tu dois couvrir:
- Les cas nominaux (happy path)
- Les cas aux limites (edge cases)
- Les cas d'erreur
- Les cas de sécurité si applicable

Format de sortie: JSON avec la structure suivante:
{
    "test_cases": [
        {
            "summary": "Titre du test",
            "description": "Description détaillée",
            "precondition": "Pré-conditions",
            "steps": [
                {"action": "Action", "data": "Données", "expected_result": "Résultat attendu"}
            ],
            "priority": "High|Medium|Low",
            "labels": ["label1", "label2"]
        }
    ]
}"""

    def __init__(self, api_key: str):
        """Initialize AI generator.

        Args:
            api_key: Anthropic API key
        """
        self.client = Anthropic(api_key=api_key)

    def generate_test_cases(
        self,
        feature_description: str,
        context: str = "",
        num_cases: int = 5,
        include_negative: bool = True
    ) -> List[TestCase]:
        """Generate test cases for a feature.

        Args:
            feature_description: Description of the feature to test
            context: Additional context (tech stack, constraints, etc.)
            num_cases: Target number of test cases
            include_negative: Include negative/error test cases

        Returns:
            List of generated test cases
        """
        prompt = f"""Génère {num_cases} cas de tests pour la fonctionnalité suivante:

## Fonctionnalité
{feature_description}

## Contexte
{context if context else "Pas de contexte additionnel"}

## Instructions
- Génère exactement {num_cases} cas de tests
- {"Inclus des cas négatifs et d'erreur" if include_negative else "Focus sur les cas positifs uniquement"}
- Sois précis dans les étapes
- Utilise des données de test réalistes

Retourne le JSON uniquement, sans commentaires."""

        response = self.client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system=self.SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
        )

        import json
        content = response.content[0].text

        start = content.find("{")
        end = content.rfind("}") + 1
        json_str = content[start:end]

        data = json.loads(json_str)

        test_cases = []
        for tc_data in data.get("test_cases", []):
            steps = [
                TestStep(
                    action=s.get("action", ""),
                    data=s.get("data", ""),
                    expected_result=s.get("expected_result", "")
                )
                for s in tc_data.get("steps", [])
            ]

            test_case = TestCase(
                summary=tc_data.get("summary", ""),
                description=tc_data.get("description", ""),
                precondition=tc_data.get("precondition", ""),
                steps=steps,
                priority=tc_data.get("priority", "Medium"),
                labels=tc_data.get("labels", [])
            )
            test_cases.append(test_case)

        return test_cases

    def generate_from_user_story(
        self,
        user_story: str,
        acceptance_criteria: List[str] = None
    ) -> List[TestCase]:
        """Generate test cases from a user story.

        Args:
            user_story: User story text (As a... I want... So that...)
            acceptance_criteria: List of acceptance criteria

        Returns:
            List of generated test cases
        """
        criteria_text = ""
        if acceptance_criteria:
            criteria_text = "\n## Critères d'acceptation\n"
            criteria_text += "\n".join(f"- {c}" for c in acceptance_criteria)

        feature_description = f"""User Story:
{user_story}
{criteria_text}"""

        return self.generate_test_cases(
            feature_description,
            num_cases=len(acceptance_criteria) + 2 if acceptance_criteria else 5
        )

    def generate_from_bug(
        self,
        bug_description: str,
        steps_to_reproduce: str
    ) -> List[TestCase]:
        """Generate regression test cases from a bug report.

        Args:
            bug_description: Bug description
            steps_to_reproduce: Steps to reproduce the bug

        Returns:
            List of regression test cases
        """
        feature_description = f"""Bug à couvrir par des tests de régression:

## Description du bug
{bug_description}

## Étapes de reproduction
{steps_to_reproduce}

Génère des tests qui:
1. Vérifient que le bug est corrigé
2. Couvrent des scénarios similaires
3. Testent les cas limites liés"""

        return self.generate_test_cases(
            feature_description,
            num_cases=3,
            include_negative=True
        )
