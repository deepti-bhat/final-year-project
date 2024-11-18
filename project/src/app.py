from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app, origins="http://127.0.0.1:5500")   # Enable CORS for frontend-backend communication

connection_string = "mongodb+srv://cipher:5Df5ZYYlJ15FX0Wz@cluster0.hlaib.mongodb.net/"

# Connect to MongoDB
client = MongoClient(connection_string)
db = client['metrics']  # Replace with your database name

# List of available algorithms (corresponding to collection names)
algorithms = {
    'maml': 'maml',
    'fedprox': 'fedprox',
    'fedmeta_client': 'fedmeta_client',
    'fedmeta_server': 'fedmeta_server',
    'dpsgd_client': 'dpsgd_client',
    'dpsgd_server': 'dpsgd_server',
    'reptile_client': 'reptile_client',
    'reptile_server': 'reptile_server'
}

@app.route('/data/<algorithm>', methods=['GET'])
def get_data(algorithm):

    
    if algorithm not in algorithms:
        return jsonify({"error": "Invalid algorithm"}), 400  # 400 Bad Request

    try:
        # Access the collection based on the algorithm
        collection = db[algorithms[algorithm]]

        # Fetch metrics and image data
        document = collection.find_one({}, {"_id": 0})  # Exclude _id from the response

        if not document:
            return jsonify({"error": "No data found"}), 404  # No data found in the collection

        # Extract metrics (accuracy, loss, etc.)
        metrics = {
            "accuracy": document.get("accuracy", "N/A"),
            "loss": document.get("loss", "N/A"),
            "precision": document.get("precision", "N/A"),
            "recall": document.get("recall", "N/A"),
            "f1_score": document.get("f1_score", "N/A")
        }

        # Convert images to base64-encoded strings
        images = {}
        image_keys = ['confusion_matrix', 'train_loss', 'train_acc', 'test_acc', 'test_loss']
        for key in image_keys:
            if key in document.get('images', {}):
                images[key] = f"data:image/png;base64,{document['images'][key].decode('utf-8')}"

        return jsonify({"metrics": metrics, "images": images})

    except Exception as e:
        print(f"Error processing request for {algorithm}: {e}")
        return jsonify({"error": "Could not fetch data"}), 500  # Internal Server Error



if __name__ == '__main__':
    app.run(debug=True)
