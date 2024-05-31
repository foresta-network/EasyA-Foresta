import json
import nbformat
from nbconvert import PythonExporter, HTMLExporter
from nbconvert.preprocessors import ExecutePreprocessor
from io import StringIO

def lambda_handler(event, context):
    try:
        # Get the notebook content from the event
        notebook_content = event.get('notebookContent')
        if not notebook_content:
            return {
                'statusCode': 400,
                'body': json.dumps('Missing notebookContent in the request')
            }

        # Read the notebook content
        notebook = nbformat.reads(notebook_content, as_version=4)

        # Execute the notebook
        ep = ExecutePreprocessor(timeout=600, kernel_name='python3')
        ep.preprocess(notebook, {'metadata': {'path': '/'}})

        # Convert the executed notebook to HTML
        html_exporter = HTMLExporter()
        (body, resources) = html_exporter.from_notebook_node(notebook)

        # Return the executed notebook's HTML content
        return {
            'statusCode': 200,
            'body': body,
            'headers': {
                'Content-Type': 'text/html'
            }
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }
