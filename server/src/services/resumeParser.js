import fs from 'fs/promises';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import path from 'path';
import { FileError, ValidationError } from '../utils/errors.js';

/**
 * Parse resume file content
 * @param {string} filePath - Path to the uploaded resume file
 * @returns {Promise<string>} - Extracted text content from the resume
 */
export const parseResume = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.pdf') {
    return parsePDF(filePath);
  } else if (ext === '.txt') {
    return parseText(filePath);
  } else {
    throw new ValidationError(`Unsupported file format: ${ext}`);
  }
};

/**
 * Parse PDF file
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<string>} - Extracted text
 */
const parsePDF = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new FileError('Could not extract text from PDF. The file may be empty or image-based.');
    }
    
    return data.text.trim();
  } catch (error) {
    if (error instanceof FileError) {
      throw error;
    }
    throw new FileError(`Failed to parse PDF: ${error.message}`);
  }
};

/**
 * Parse text file
 * @param {string} filePath - Path to text file
 * @returns {Promise<string>} - File content
 */
const parseText = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    if (!content || content.trim().length === 0) {
      throw new FileError('The text file is empty.');
    }
    
    return content.trim();
  } catch (error) {
    if (error instanceof FileError) {
      throw error;
    }
    throw new FileError(`Failed to read text file: ${error.message}`);
  }
};
