from flask import Flask

app = Flask(__name__)

@app.route('/')
def home(): 
    return "Service Stock est actif !"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)