import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error

# Load the data
data = pd.read_csv('data.csv')  # Ensure this path is correct

# Drop unnecessary columns
data = data.drop(columns=['Timestamp', 'Unnamed: 10', 'time '])

# Remove rows with test values
data = data[~data.apply(lambda row: row.astype(str).str.contains('test|Test', case=False)).any(axis=1)]
data = data.dropna()

# Convert all columns to float
data = data.astype(float)

# Prepare features and target
features = ['food_eaten', 'level_before', 'level_two', 'carbs_two', 'exercise_points', 'alcohol_points', 'exercise_points_after']
x = data[features]
y = data['insulin_injected']

# Train the RandomForestRegressor
rf = RandomForestRegressor(random_state=40)
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=40)

param_dist = {
    'max_depth': [5, 10, 20, 30, None],
    'max_features': ['auto', 'log2'],
    'min_samples_leaf': [1, 2, 4],
    'min_samples_split': [2, 5, 10],
    'n_estimators': [600, 800, 1000],
    'max_samples': [0.5, 0.75, 1.0],
}

rf_grid = GridSearchCV(estimator=rf, param_grid=param_dist, cv=2, verbose=2, n_jobs=-1)
rf_grid.fit(x_train, y_train)
y_pred = rf_grid.predict(x_test)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)

print(f'Best Hyperparameters: {rf_grid.best_params_}')
print(f'Error: {rmse}')

# Save the trained model
joblib.dump(rf_grid.best_estimator_, 'rf_model.pkl')
