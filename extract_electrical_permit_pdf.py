import PyPDF2
import os
import sys

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                text += f"--- PAGE {page_num + 1} ---\n\n"
                text += page.extract_text() + "\n----------------------------------------\n\n"
    except Exception as e:
        print(f"Erreur lors de l'extraction du PDF: {e}")
        sys.exit(1)
    return text

def analyze_electrical_permit_content(content):
    print("================================================================================")
    print("ANALYSE DU CONTENU - PERMIS ÉLECTRIQUE")
    print("================================================================================")

    lines = content.split('\n')

    # Identifier les sections spécifiques aux permis électriques
    electrical_keywords = [
        "permis", "électrique", "habilitation", "tension", "voltage", "ampérage",
        "installation", "équipement", "sécurité", "protection", "isolation",
        "mise à la terre", "court-circuit", "déconnexion", "verrouillage",
        "consignation", "déconsignation", "mesures", "vérification"
    ]
    
    print("\nSECTIONS IDENTIFIÉES (PERMIS ÉLECTRIQUE):")
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if any(keyword in line_lower for keyword in electrical_keywords):
            print(f"Ligne {i}: {line.strip()}")

    # Identifier les champs obligatoires spécifiques
    required_keywords = [
        "requis", "obligatoire", "doit être", "à fournir", "nécessaire",
        "nom", "prénom", "date", "signature", "habilitation", "niveau"
    ]
    
    print("\nCHAMPS OBLIGATOIRES IDENTIFIÉS:")
    for i, line in enumerate(lines):
        line = line.strip()
        if any(keyword in line.lower() for keyword in required_keywords):
            print(f"Ligne {i}: {line}")

    # Identifier les niveaux d'habilitation
    habilitation_keywords = [
        "b0", "b1", "b2", "bc", "br", "be", "bp", "h0", "h1", "h2", "hc", "hr", "he", "hp"
    ]
    
    print("\nNIVEAUX D'HABILITATION IDENTIFIÉS:")
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if any(keyword in line_lower for keyword in habilitation_keywords):
            print(f"Ligne {i}: {line}")

    # Identifier les tensions et domaines de tension
    voltage_keywords = [
        "tension", "voltage", "v", "kv", "volt", "basse tension", "haute tension",
        "bt", "ht", "tbt", "très basse tension", "moyenne tension", "mt"
    ]
    
    print("\nDOMAINES DE TENSION IDENTIFIÉS:")
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if any(keyword in line_lower for keyword in voltage_keywords):
            print(f"Ligne {i}: {line}")

if __name__ == "__main__":
    # Trouver le fichier PDF du permis électrique
    pdf_path = "doc/Permis electrique_.pdf"
    
    if not os.path.exists(pdf_path):
        print(f"Fichier PDF non trouvé: {pdf_path}")
        sys.exit(1)
    
    print("Extraction du contenu du PDF Permis Électrique...")
    pdf_content = extract_text_from_pdf(pdf_path)
    
    with open("electrical_permit_content_extracted.txt", "w", encoding="utf-8") as f:
        f.write(pdf_content)
    print(f"Contenu sauvegardé dans: electrical_permit_content_extracted.txt")

    analyze_electrical_permit_content(pdf_content)


