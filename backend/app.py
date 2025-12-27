from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)
CORS(app)

# ---------------- PATHS ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

# ---------------- LOAD DATA ----------------
ipc_df = pd.read_csv(os.path.join(DATA_DIR, "ipc_crime.csv")).fillna(0)
women_df = pd.read_csv(os.path.join(DATA_DIR, "women_crime.csv")).fillna(0)

ipc_df.columns = ipc_df.columns.str.strip()
women_df.columns = women_df.columns.str.strip()

with open(os.path.join(DATA_DIR, "supreme_court.json"), encoding="utf-8") as f:
    judgments = json.load(f)

with open(os.path.join(DATA_DIR, "ipc_sections.json"), encoding="utf-8") as f:
    ipc_sections = json.load(f)

with open(os.path.join(DATA_DIR, "legal_awareness.json"), encoding="utf-8") as f:
    legal_awareness = json.load(f)

with open(os.path.join(DATA_DIR, "legal_faqs.json"), encoding="utf-8") as f:
    legal_faqs = json.load(f)

with open(os.path.join(DATA_DIR, "helplines.json"), encoding="utf-8") as f:
    helplines = json.load(f)

# ---------------- ROOT (SAFE) ----------------
@app.route("/")
def root():
    return jsonify({
        "message": "AI Lawyer Backend is running",
        "status": "OK"
    })

# ---------------- HEALTH CHECK ----------------
@app.route("/api/health")
def health():
    return jsonify({
        "status": "Backend running",
        "ipc_rows": len(ipc_df),
        "women_rows": len(women_df),
        "judgments": len(judgments),
        "ipc_sections": len(ipc_sections),
        "helplines": len(helplines)
    })

# ---------------- DASHBOARD SUMMARY ----------------
@app.route("/api/crime/summary")
def crime_summary():
    data = (
        ipc_df.groupby("YEAR")["TOTAL IPC CRIMES"]
        .sum()
        .reset_index()
        .to_dict(orient="records")
    )
    return jsonify(data)

# ---------------- IPC DASHBOARD ----------------
@app.route("/api/ipc/dashboard")
def ipc_dashboard():
    year = request.args.get("year")
    state = request.args.get("state")

    df = ipc_df.copy()
    if year:
        df = df[df["YEAR"] == int(year)]
    if state:
        df = df[df["STATE/UT"] == state]

    state_summary = (
        df.groupby("STATE/UT")["TOTAL IPC CRIMES"]
        .sum()
        .reset_index()
        .sort_values(by="TOTAL IPC CRIMES", ascending=False)
        .to_dict(orient="records")
    )

    exclude = ["STATE/UT", "DISTRICT", "YEAR", "TOTAL IPC CRIMES"]
    crime_cols = [c for c in df.columns if c not in exclude]

    crime_totals = {
        col: int(pd.to_numeric(df[col], errors="coerce").fillna(0).sum())
        for col in crime_cols
    }

    return jsonify({
        "available_years": sorted(ipc_df["YEAR"].unique().tolist()),
        "available_states": sorted(ipc_df["STATE/UT"].unique().tolist()),
        "state_wise": state_summary,
        "crime_totals": crime_totals
    })

# ---------------- IPC DISTRICTS ----------------
@app.route("/api/ipc/districts")
def ipc_districts():
    year = request.args.get("year")
    state = request.args.get("state")

    if not year or not state:
        return jsonify([])

    df = ipc_df[
        (ipc_df["YEAR"] == int(year)) &
        (ipc_df["STATE/UT"] == state)
    ]

    districts = (
        df.groupby("DISTRICT")["TOTAL IPC CRIMES"]
        .sum()
        .reset_index()
        .sort_values(by="TOTAL IPC CRIMES", ascending=False)
        .head(10)
        .to_dict(orient="records")
    )

    return jsonify(districts)

# ---------------- IPC RECORDS ----------------
@app.route("/api/ipc/records")
def ipc_records():
    return jsonify({
        "available_years": sorted(ipc_df["YEAR"].unique().tolist()),
        "available_states": sorted(ipc_df["STATE/UT"].unique().tolist())
    })

# ---------------- IPC ASSISTANT ----------------
@app.route("/api/ipc/assistant/search")
def ipc_assistant_search():
    query = request.args.get("q", "").lower()
    if not query:
        return jsonify([])

    results = []
    for sec in ipc_sections:
        if (
            query in sec["section"].lower()
            or query in sec["title"].lower()
            or query in sec["law_text"].lower()
        ):
            results.append(sec)
        if len(results) >= 5:
            break

    return jsonify(results)

@app.route("/api/ipc/assistant/explain", methods=["POST"])
def ipc_assistant_explain():
    data = request.json
    section_no = data.get("section", "").strip()

    section = next((s for s in ipc_sections if s["section"] == section_no), None)
    if not section:
        return jsonify({"error": "Section not found"}), 404

    return jsonify({
        "section": section["section"],
        "title": section["title"],
        "law_text": section["law_text"],
        "simple_explanation": (
            f"IPC Section {section['section']} deals with {section['title']}. "
            f"In simple terms, {section['law_text']}"
        )
    })

# ---------------- WOMEN CRIME DASHBOARD ----------------
@app.route("/api/women/dashboard")
def women_dashboard():
    year = request.args.get("year")
    state = request.args.get("state")

    df = women_df.copy()
    if year:
        df = df[df["Year"] == int(year)]
    if state:
        df = df[df["State"] == state]

    crime_columns = [
        "No. of Rape cases",
        "Kidnap And Assault",
        "Dowry Deaths",
        "Assault against women",
        "Assault against modesty of women",
        "Domestic violence",
        "Women Trafficking"
    ]

    df[crime_columns] = df[crime_columns].apply(pd.to_numeric, errors="coerce").fillna(0)
    df["TOTAL WOMEN CRIMES"] = df[crime_columns].sum(axis=1)

    state_summary = (
        df.groupby("State")["TOTAL WOMEN CRIMES"]
        .sum()
        .reset_index()
        .sort_values(by="TOTAL WOMEN CRIMES", ascending=False)
        .to_dict(orient="records")
    )

    return jsonify({
        "available_years": sorted(women_df["Year"].unique().tolist()),
        "available_states": sorted(women_df["State"].unique().tolist()),
        "state_wise": state_summary[:10]
    })

# ---------------- LEGAL AWARENESS ----------------
@app.route("/api/legal-awareness")
def get_legal_awareness():
    return jsonify(legal_awareness)

@app.route("/api/legal-faqs")
def get_legal_faqs():
    return jsonify(legal_faqs)

@app.route("/api/helplines")
def get_helplines():
    return jsonify(helplines)

# ---------------- SUPREME COURT (DUMMY FIX) ----------------
@app.route("/api/sc/query", methods=["POST"])
def sc_query():
    return jsonify({
        "answer": "This Supreme Court explorer uses simulated educational data.",
        "note": "No real judgments are used. This is for learning purposes."
    })

# ---------------- CASE OUTCOME ----------------
@app.route("/api/case/predict", methods=["POST"])
def predict_case():
    data = request.json
    evidence = data.get("evidence_strength", "Moderate")
    past_record = data.get("past_record", "None")

    score = 50
    score += 25 if evidence == "Strong" else 15 if evidence == "Moderate" else 5
    score += 10 if past_record == "Serious" else 5 if past_record == "Minor" else 0
    score = min(score, 95)

    return jsonify({
        "possible_outcome": {
            "probability": f"{score}%",
            "result": "Conviction" if score >= 60 else "Acquittal",
            "basis": "Based on case facts and evidence strength"
        },
        "key_factors": [
            "Strength of available evidence",
            "Nature of the offense",
            "Legal precedents in similar cases",
            "Criminal history consideration"
        ],
        "ai_reasoning": (
            "Based on the provided information, the evidence appears to be "
            f"{evidence.lower()} with documentary and testimonial support. "
            "Historical datasets of similar cases indicate conviction rates "
            "between 60–75% under comparable circumstances.\n\n"
            "The nature of the offense and consistency of evidence play a "
            "critical role in judicial outcomes. Prior criminal history "
            "further influences judicial discretion."
        ),
        "disclaimer": (
            "This is a simplified educational model. "
            "Actual legal outcomes depend on judicial discretion."
        )
    })

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)
