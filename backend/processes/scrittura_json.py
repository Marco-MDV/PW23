import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parents[2] / "data"

def scrittura_json(nome_file, dati):
    with open(DATA_DIR / nome_file, "w", encoding="utf-8") as file:
        json.dump(dati, file, indent=2, ensure_ascii=False)