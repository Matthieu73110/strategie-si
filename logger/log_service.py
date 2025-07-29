import pika
import time

def callback(ch, method, properties, body):
    print("[LOG] Nouveau message reçu :", body.decode())

connection = None
while connection is None:
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    except pika.exceptions.AMQPConnectionError:
        print("[LOG] RabbitMQ non disponible;, nouvelle tentative dans 5 secondes...")
        time.sleep(5)

channel = connection.channel()
channel.queue_declare(queue='logs')
channel.basic_consule(queue='logs', on_message_callback=callback, auto_ack=True)

print("[LOG] En attente de messages...")
channel.start_consuming()