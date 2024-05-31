# Use the Amazon Linux image that matches the AWS Lambda environment
FROM amazonlinux:2

# Install Python and other dependencies
RUN yum -y install python3 python3-devel gcc
RUN python3 -m venv /env
RUN /env/bin/pip install --upgrade pip

# Install required packages
COPY requirements.txt .
RUN /env/bin/pip install -r requirements.txt

# Copy lambda function code
COPY lambda_function.py .

# Create a deployment package
RUN mkdir -p /out/package
RUN cp -r /env/lib/python3.7/site-packages/* /out/package/
RUN cp lambda_function.py /out/package/

# Zip the package
WORKDIR /out/package
RUN zip -r /out/lambda_function.zip .

# For zip file output run:
  # docker build -t lambda-packager .
  # docker run --rm -v $(pwd):/out lambda-packager
