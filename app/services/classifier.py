CLAUSE_TYPES=[
    "Payment Terms","Termination","Liability","Indemnity","Confidentiality","Jurisdiction","IP Rights","Non-Compete"]

def classify_clause(text):
    for t in CLAUSE_TYPES:
        if t.lower() in text.lower():
            return      
    return "General"
    
