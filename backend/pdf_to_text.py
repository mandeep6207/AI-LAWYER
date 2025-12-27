import pdfplumber

pdf_path = "C:\\Users\\Mandeep\\OneDrive\\Documents\\Again final project Lawyer\\backend\\data\\THE-INDIAN-PENAL-CODE-1860.pdf"
output_txt = "C:\\Users\\Mandeep\\OneDrive\\Documents\\Again final project Lawyer\\backend\\data\\ipc_full_text.txt"

all_text = ""

with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            all_text += text + "\n"

with open(output_txt, "w", encoding="utf-8") as f:
    f.write(all_text)

print("✅ IPC PDF converted to text successfully")
