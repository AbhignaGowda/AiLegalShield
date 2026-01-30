"""Clause classification utilities."""

CLAUSE_TYPES = [
    "Payment Terms", "Termination", "Liability", "Indemnity",
    "Confidentiality", "Jurisdiction", "IP Rights", "Non-Compete"
]


def classify_clause(text: str) -> str:
    for clause_type in CLAUSE_TYPES:
        if clause_type.lower() in text.lower():
            return clause_type
    return "General"
