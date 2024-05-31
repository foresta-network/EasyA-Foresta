
#  Foresta Backend

##  Jupyter Notebook Execute

This project utilizes the Nest.js framework to create a backend service that accepts `.ipynb` (Jupyter Notebook) files through a REST API endpoint (POST /execute/upload). These files are then sent to an AWS Lambda function, which executes the notebook and returns the result as HTML. This setup simulates a decentralized compute environment, leveraging AWS as the current and temporary solution.

##  How to Set Up and Run Backend

1.  **Install Dependencies:**

```bash
$ yarn install
```

or

```bash
$ npm install
```

2.  **Environment Variables:**

Create a `.env` file in the root directory and add the following variables (view .env.template for boilerplate):

```
AWS_REGION=<your-aws-region>
AWS_ACCESS_KEY_ID=<your-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
LAMBDA_FUNCTION_NAME=<your-lambda-function-name>
```

3.  **Running the Application:**

- Development mode:

```bash
$ yarn run start:dev
```

##  How to Set Up AWS Lambda and Credentials

1.  **AWS Credentials:**

Ensure that your AWS credentials (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) are set up in your environment or AWS credentials file.

2.  **Lambda Function Setup:**

- Navigate to the AWS Lambda console.
- Create a new Lambda function and upload the generated `.zip` file.
- Set the handler to `lambda_function.lambda_handler`.
- Adjust the timeout and memory settings as needed.

Refer to the [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) for detailed instructions.

##  How to Generate .zip File of Lambda

You can generate the deployment package for the Lambda function using either a shell script or Docker:

-  **Using Shell Script:**

Run the `prepare-lambda.sh` script:

```bash
$ ./lambda_function/prepare-lambda.sh
```

-  **Using Docker:**

Build and run the Docker container defined in the `Dockerfile`:

```bash
$ docker build -t lambda-packager .

$ docker run --rm -v $(pwd):/out lambda-packager
```

This will create a `lambda_function.zip` file in the specified output directory, ready to be uploaded to AWS Lambda.