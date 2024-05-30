import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import * as AWS from 'aws-sdk';

@Injectable()
export class ExecuteService {
  private readFile = util.promisify(fs.readFile);
  private lambda: AWS.Lambda;

  constructor() {
    AWS.config.update({ region: process.env.AWS_REGION });
    this.lambda = new AWS.Lambda({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async processNotebook(filePath: string) {
    try {
      const notebookContent = await this.readFile(filePath, 'utf8');

      // Invoke the Lambda function to process the notebook
      const lambdaResponse = await this.lambda
        .invoke({
          FunctionName: process.env.LAMBDA_FUNCTION_NAME,
          Payload: JSON.stringify({ notebookContent }),
        })
        .promise();

      if (lambdaResponse.StatusCode !== 200) {
        throw new InternalServerErrorException(
          `Error processing notebook file: ${lambdaResponse.$response}`,
        );
      }

      return JSON.parse(lambdaResponse.Payload as string);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error processing notebook file: ${error}`,
      );
    } finally {
      // Cleanup uploaded file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}: `, err);
        }
      });
    }
  }
}
