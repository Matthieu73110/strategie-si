from flask import Flask, jsonify, request
import pika

app = Flask(__name__)

@app.route('/')
def home():
    return "Bienvenue sur l'API Produits"

@app.route('/products')
def products():
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()

    channel.queue_declare(queue='logs')

    channel.basic_publish(exchange='', routing_key='logs', body='Liste des produits consultée')

    connection.close()

    return jsonify([
        {"id": 1, "name": "Chaussures", "price": 59.99},
        {"id": 2, "name": "T-shirt", "price": 19.99},
        {"id": 2, "name": "Pantalon", "price": 39.99}
    ])
@app.route('/send', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data.get('message', '')

    if not message:
        return jsonify({"error": "Le champ 'message' est requis"}), 400
    
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()
    channel.queue_declare(queue='logs')

    channel.basic_publish(exchange='', routing_key='logs', body=message)
    connection.close()

    return jsonify({"status": "Message envoyé", "message": message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)