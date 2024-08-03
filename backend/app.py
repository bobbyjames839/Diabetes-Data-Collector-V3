from flask import Flask, request, jsonify
import numpy as np
import joblib
import logging

app = Flask(__name__)

# Load the trained model
model = joblib.load('model/rf_model.pkl')

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.before_request
def log_request_info():
    app.logger.debug('Request Headers: %s', request.headers)
    app.logger.debug('Request Body: %s', request.get_data())

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        app.logger.debug(f"Received data: {data}")
        
        # Prepare input data with specified values for level_two and carbs_two
        input_data = np.array([
            data['food_eaten'],
            data['level_before'],
            6,  # level_two
            0,  # carbs_two
            data['exercise_points'],
            data['alcohol_points'],
            data['exercise_points_after']
        ]).reshape(1, -1)

        app.logger.debug(f"Input data for prediction: {input_data}")

        prediction = model.predict(input_data)
        app.logger.debug(f"Prediction result: {prediction}")

        return jsonify({'insulinDose': prediction[0]})
    except KeyError as e:
        app.logger.error(f"Missing data for {e}")
        return jsonify({'error': f'Missing data for {e}'}), 400
    except Exception as e:
        app.logger.error(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
