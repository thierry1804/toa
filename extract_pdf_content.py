#!/usr/bin/env python3
"""
Script pour extraire et analyser le contenu du document PDF SGI-PPHSSES-TOA-601
"""

import PyPDF2
import sys
import os

def extract_pdf_content(pdf_path):
    """Extrait le contenu textuel du PDF"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            print(f"Nombre de pages: {len(pdf_reader.pages)}")
            print("=" * 80)
            
            full_text = ""
            for page_num, page in enumerate(pdf_reader.pages, 1):
                text = page.extract_text()
                full_text += text
                print(f"\n--- PAGE {page_num} ---")
                print(text)
                print("-" * 40)
            
            return full_text
            
    except Exception as e:
        print(f"Erreur lors de l'extraction: {e}")
        return None

def analyze_content(text):
    """Analyse le contenu extrait pour identifier les sections et champs"""
    if not text:
        return
    
    print("\n" + "=" * 80)
    print("ANALYSE DU CONTENU")
    print("=" * 80)
    
    # Recherche des sections principales
    sections = []
    lines = text.split('\n')
    
    for i, line in enumerate(lines):
        line = line.strip()
        if line and (line.isupper() or 'Section' in line or '1.' in line or '2.' in line):
            sections.append((i, line))
    
    print("\nSECTIONS IDENTIFIÉES:")
    for line_num, section in sections:
        print(f"Ligne {line_num}: {section}")
    
    # Recherche de champs obligatoires
    print("\nCHAMPS OBLIGATOIRES IDENTIFIÉS:")
    required_keywords = ['requis', 'obligatoire', '*', 'obligatoire', 'nécessaire']
    for i, line in enumerate(lines):
        line = line.strip()
        if any(keyword in line.lower() for keyword in required_keywords):
            print(f"Ligne {i}: {line}")

if __name__ == "__main__":
    # Trouver le fichier SGI dynamiquement
    import os
    files = os.listdir('doc')
    target_file = [f for f in files if 'SGI' in f][0]
    pdf_path = os.path.join('doc', target_file)
    
    if not os.path.exists(pdf_path):
        print(f"Fichier PDF non trouvé: {pdf_path}")
        sys.exit(1)
    
    print("Extraction du contenu du PDF...")
    content = extract_pdf_content(pdf_path)
    
    if content:
        analyze_content(content)
        
        # Sauvegarder le contenu dans un fichier texte
        with open("pdf_content_extracted.txt", "w", encoding="utf-8") as f:
            f.write(content)
        print(f"\nContenu sauvegardé dans: pdf_content_extracted.txt")
    else:
        print("Échec de l'extraction du contenu")
