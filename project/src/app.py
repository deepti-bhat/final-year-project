from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app, origins="http://127.0.0.1:5500")  # Enable CORS for frontend-backend communication

connection_string = "mongodb+srv://cipher:5Df5ZYYlJ15FX0Wz@cluster0.hlaib.mongodb.net/"

# Connect to MongoDB
client = MongoClient(connection_string)
db = client['metrics']  # Replace with your database name

# List of available algorithms (corresponding to collection names)
algorithms = {
    'sac': 'sac',
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

        # Fetch the document
        document = collection.find_one({}, {"_id": 1, "description": 1, "link": 1, "images": 1})

        if not document:
            return jsonify({"error": "No data found"}), 404  # No data found in the collection

        # Process the data
        response_data = {
            "id": str(document.get("_id", "")),  # Convert ObjectId to string
            "description": document.get("description", ""),
            "link": document.get("link", ""),
            "images": {}
        }

        # Convert images to base64-encoded strings
        image_keys = ['metrics', 'confusion_matrix', 'train_loss', 'train_acc', 'test_acc', 'test_loss']
        if "images" in document:
            for key in image_keys:
                if key in document["images"]:
                    response_data["images"][key] = f"data:image/png;base64,{document['images'][key].decode('utf-8')}"

        return jsonify(response_data)

    except Exception as e:
        print(f"Error processing request for {algorithm}: {e}")
        return jsonify({"error": "Could not fetch data"}), 500  # Internal Server Error

if __name__ == '__main__':
    app.run(debug=True)
