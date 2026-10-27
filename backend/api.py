from flask import Flask, jsonify
from main import main

app = Flask(__name__)

@app.get("/api/risultati")
def risultati():
    risultato = main()
    return jsonify(risultato)

if __name__ == "__main__":
    app.run(debug=True)