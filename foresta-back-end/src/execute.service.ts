import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';

@Injectable()
export class ExecuteService {
  private readFile = util.promisify(fs.readFile);

  async processNotebook(filePath: string) {
    try {
      const fileContent = await this.readFile(filePath, 'utf8');
      const notebook = JSON.parse(fileContent);

      // Process the notebook content
      const result = this.analyzeNotebook(notebook);

      // Cleanup uploaded file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}: `, err);
        }
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error processing notebook file');
    }
  }

  private analyzeNotebook(notebook: any) {
    // Implement your logic to process the notebook content here
    // For example, extract code cells, metadata, etc.
    const codeCells = notebook.cells.filter(
      (cell) => cell.cell_type === 'code',
    );
    const codeContent = codeCells
      .map((cell) => cell.source.join(''))
      .join('\n');

    return {
      numberOfCells: notebook.cells.length,
      numberOfCodeCells: codeCells.length,
      codeContent,
    };
  }
}
