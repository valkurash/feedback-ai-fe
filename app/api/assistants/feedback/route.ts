import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Save feedback
export async function POST(request, res) {
  const req = await request.json();
  // Define the path to save the file (e.g., in the 'public' directory)
  const filePath = path.join(process.cwd(), 'public', 'temp.json');

  try {
    // Read the existing file or create an empty array if the file doesn't exist
    const fileData = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
    : [];

  // Ensure file data is an array
  const jsonArray = Array.isArray(fileData) ? fileData : [fileData];

  // Append the new entry to the array
  jsonArray.push(req);

  // Write the updated array back to the file
  fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2), 'utf8');

    return Response.json({ message: 'File written successfully' });
  } catch (error) {
    console.error('Error writing file:', error);
    return Response.json({ error: 'Failed to write file' });
  }
}

// list of feedbacks
export async function GET(request, res) {
const filePath = path.join(process.cwd(), 'public', 'temp.json');
try {
  const fileData = fs.existsSync(filePath)
  ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
  : [];
  return Response.json(fileData);
} catch (error) {
  console.error('Error reading file:', error);
  return Response.json({ error: 'Failed to read file' });
}
}
