import re


def clean_text(text):
    

    def replacer(match):
        return match.group(0).replace(" ", "").replace("\t", "")

    text = re.sub(r"(\b\w\s+){3,}\w\b", replacer, text)

    text = re.sub(r"\s+", " ", text).strip()

    return text
