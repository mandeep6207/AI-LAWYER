import re
import json

with open(
    "C:\\Users\\Mandeep\\OneDrive\\Documents\\Again final project Lawyer\\backend\\data\\ipc_full_text.txt",
    "r",
    encoding="utf-8"
) as f:
    text = f.read()

# 🔥 UPDATED REGEX (NO 'Section' WORD)
pattern = re.compile(
    r"\n(\d{1,3}[A-Z]?)\.\s+(.*?)\n(.*?)(?=\n\d{1,3}[A-Z]?\.\s+|\Z)",
    re.S
)

sections = []

for match in pattern.finditer(text):
    section_no = match.group(1).strip()
    title = match.group(2).strip()
    body = match.group(3).strip()

    if len(body) > 30:  # ignore garbage matches
        sections.append({
            "section": section_no,
            "title": title,
            "law_text": body
        })

with open("ipc_sections.json", "w", encoding="utf-8") as f:
    json.dump(sections, f, indent=2, ensure_ascii=False)

print(f"✅ Extracted {len(sections)} IPC sections")
