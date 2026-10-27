import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parents[2] / "data"

def lettura_json(nome):
    with open(DATA_DIR / nome, "r", encoding="utf-8") as file:
        return json.load(file)