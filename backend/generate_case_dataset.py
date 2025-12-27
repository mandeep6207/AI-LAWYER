import csv
import random

# ---------------- CONFIG ----------------

TOTAL_ROWS = 100
OUTPUT_FILE = "case_outcome_dataset.csv"

case_types = {
    "Criminal": ["IPC 302", "IPC 376", "IPC 420", "IPC 498A", "IPC 354", "IPC 379"],
    "Property": ["IPC 447", "IPC 406", "IPC 420"],
    "Family": ["IPC 125", "IPC 498A"],
    "Civil": ["CPC 9", "CPC 34"]
}

evidence_strengths = ["Strong", "Moderate", "Weak"]
past_records = ["None", "Minor", "Serious"]
severities = ["Low", "Medium", "High"]
victim_impacts = ["Low", "Moderate", "Severe"]

case_fact_templates = {
    "Strong": [
        "Case supported by documentary proof, eyewitness testimony, and forensic evidence.",
        "CCTV footage, medical records, and witness statements clearly support allegations.",
        "Bank records and official documents strongly establish the offense."
    ],
    "Moderate": [
        "Partial documentation available along with verbal witness statements.",
        "Medical records exist but lack corroborative digital evidence.",
        "Circumstantial evidence supported by limited witnesses."
    ],
    "Weak": [
        "No documentary proof, allegations based primarily on verbal claims.",
        "Witness statements are contradictory and lack supporting evidence.",
        "Case depends mainly on assumptions without physical proof."
    ]
}

# ---------------- HELPER FUNCTIONS ----------------

def decide_outcome(evidence, severity):
    if evidence == "Strong":
        return "Conviction", random.randint(70, 90)
    if evidence == "Moderate":
        return random.choice(["Conviction", "Settlement", "Mediation"]), random.randint(45, 65)
    return "Acquittal", random.randint(15, 35)

# ---------------- GENERATE DATA ----------------

rows = []

for _ in range(TOTAL_ROWS):
    case_type = random.choice(list(case_types.keys()))
    ipc_section = random.choice(case_types[case_type])
    evidence = random.choice(evidence_strengths)
    past = random.choice(past_records)
    severity = random.choice(severities)
    impact = random.choice(victim_impacts)

    case_facts = random.choice(case_fact_templates[evidence])
    outcome, base_probability = decide_outcome(evidence, severity)

    rows.append([
        case_type,
        ipc_section,
        case_facts,
        evidence,
        past,
        severity,
        impact,
        outcome,
        base_probability
    ])

# ---------------- WRITE CSV ----------------

with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow([
        "case_type",
        "ipc_section",
        "case_facts_summary",
        "evidence_strength",
        "past_criminal_record",
        "severity",
        "victim_impact",
        "outcome",
        "base_probability"
    ])
    writer.writerows(rows)

print(f"✅ Generated {TOTAL_ROWS} case records in {OUTPUT_FILE}")
