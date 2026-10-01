# Quorexis Test

Automatisation de la création des cas de tests Xray et des tickets Jira.

## Fonctionnalités

- **Création de tickets Jira** : Tasks, Bugs avec format structuré
- **Création de cas de tests Xray** : Avec étapes, préconditions, labels
- **Import en masse** : Depuis fichiers JSON/YAML
- **Templates prédéfinis** : Login, CRUD, API tests
- **Génération IA** : Génération automatique de cas de tests via Claude

## Installation

```bash
cd quorexis-test
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou: venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

## Configuration

1. Copier le fichier de configuration :
```bash
cp .env.example .env
```

2. Remplir les variables dans `.env` :
```env
# Jira
JIRA_URL=https://your-company.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_API_TOKEN=your-api-token
JIRA_PROJECT_KEY=QT

# Xray Cloud
XRAY_CLIENT_ID=your-client-id
XRAY_CLIENT_SECRET=your-client-secret

# (Optionnel) Pour la génération IA
ANTHROPIC_API_KEY=your-api-key
```

### Obtenir les tokens

**Jira API Token :**
1. Aller sur https://id.atlassian.com/manage-profile/security/api-tokens
2. Créer un nouveau token

**Xray Cloud API :**
1. Aller dans Xray Settings → API Keys
2. Générer Client ID et Secret

## Utilisation

### Créer un ticket

```bash
# Task simple
python -m src.cli create-ticket "Implémenter feature X" --desc "Description détaillée"

# Bug structuré
python -m src.cli create-bug "Bug login" \
  --desc "Le login ne fonctionne pas" \
  --steps "1. Aller sur /login\n2. Entrer credentials" \
  --expected "Redirection vers dashboard" \
  --actual "Erreur 500" \
  --severity High
```

### Créer des cas de tests

```bash
# Test simple
python -m src.cli create-test "Vérifier login valide" --labels "login,smoke"

# Avec fichier de steps
python -m src.cli create-test "Test complet" --steps steps.yaml
```

### Import en masse

```bash
# Depuis fichier
python -m src.cli import-tests tests.json

# Avec template prédéfini
python -m src.cli import-tests --template login
python -m src.cli import-tests --template crud
python -m src.cli import-tests --template api
```

### Génération IA

```bash
# Générer des tests pour une feature
python -m src.cli generate "Fonctionnalité de panier e-commerce" --count 5

# Sauvegarder et pusher
python -m src.cli generate "Feature X" --output tests.json --push
```

### Recherche

```bash
python -m src.cli search "login"
python -m src.cli search "project = QT AND status = Open" --limit 50
```

## Formats de fichiers

### steps.yaml
```yaml
steps:
  - action: "Naviguer vers la page de login"
    data: ""
    expected_result: "La page s'affiche"
  - action: "Entrer email"
    data: "user@test.com"
    expected_result: "Email accepté"
```

### tests.json
```json
{
  "test_cases": [
    {
      "summary": "Test login",
      "description": "Vérification du login",
      "precondition": "Utilisateur existant",
      "priority": "High",
      "labels": ["login", "smoke"],
      "steps": [
        {
          "action": "Naviguer vers login",
          "data": "",
          "expected_result": "Page affichée"
        }
      ]
    }
  ]
}
```

## Structure du projet

```
quorexis-test/
├── config/
│   └── settings.py      # Configuration
├── src/
│   ├── cli.py           # Interface CLI
│   ├── jira/
│   │   └── client.py    # Client Jira API
│   ├── xray/
│   │   └── client.py    # Client Xray API
│   ├── utils/
│   │   └── ai_generator.py  # Génération IA
│   └── templates/
│       └── test_templates.py  # Templates prédéfinis
├── tests/               # Tests unitaires
├── .env.example
├── requirements.txt
└── README.md
```

## Développement

```bash
# Lancer les tests
pytest

# Linter
ruff check src/
```

## Licence

Projet interne Quorexis.
