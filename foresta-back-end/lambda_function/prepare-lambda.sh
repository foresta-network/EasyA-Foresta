#!/bin/bash

# Create necessary directories
mkdir lambda_function
cd lambda_function

# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

cp ../requirements.txt .


# Install dependencies to the package directory
pip install -r requirements.txt -t ./package

# Copy the lambda function code to the current directory
cp ../lambda_function.py .

# Change to the package directory and zip everything
cd package
zip -r ../lambda_function.zip .

# Add the lambda function code to the zip
cd ..
zip -g lambda_function.zip lambda_function.py

npm run start:dev
