import { openai } from "@/app/openai";
import fs from "fs";
import path from "path";

// Helper: Sort Feedback by Priority
const sortFeedbackByPriority = (feedbacks) => {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  return feedbacks.sort(
    (a, b) =>
      priorityOrder[a.Priority ?? "Medium"] -
      priorityOrder[b.Priority ?? "Medium"]
  );
};

const getCriticalityScore = async (feedback) => {
  const prompt = `
You are a feedback analyzer. Based on the following feedback, assign a criticality score from 1 to 10, where 1 is least critical and 10 is most critical.
Consider both the importance of the issue and the urgency for resolution.

Feedback: 
"${feedback}"

Criticality score (1-10):
`;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 20,
      temperature: 0.7,
    });

    const score = parseInt(response.choices[0].text.trim(), 10);
    return isNaN(score) ? 5 : score; // Return 5 if invalid score
  } catch (error) {
    console.error("Error fetching criticality score:", error.message);
    return 5; // Default criticality if an error occurs
  }
};

// Helper: Assign Criticality Scores to All Feedback
const assignCriticalityScores = async (feedbacks) => {
  const feedbackWithScores = [];
  for (const feedback of feedbacks) {
    const score = await getCriticalityScore(feedback);
    feedback.criticality = score;
    feedbackWithScores.push(feedback);
  }
  return feedbackWithScores;
};

// Helper: Final Sorting by Priority and Criticality
const sortByPriorityAndCriticality = (feedbacks) => {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  return feedbacks.sort((a, b) => {
    if (
      priorityOrder[a.Priority ?? "Medium"] !==
      priorityOrder[b.Priority ?? "Medium"]
    ) {
      return (
        priorityOrder[a.Priority ?? "Medium"] -
        priorityOrder[b.Priority ?? "Medium"]
      );
    }
    return b.criticality - a.criticality; // Sort by criticality descending
  }).map(f=>({...f, criticality: undefined}));
};

// Helper: Summarize Content Using OpenAI
const summarizeFeedback = async (feedbacks) => {
  const feedbackContents = feedbacks.join(";\n");

  const prompt = `
  You are an HR analyst. Given the following feedback entries, generate a summary that will help HR teams identify and address employee concerns. Focus on the following:
  1. General sentiment of employees.
  2. Critical issues or concerns raised.
  3. Any action that HR should take, including follow-up or training needs.
  4. Recommendations for improving workplace satisfaction or resolving conflicts.
  
  Provide a concise overview for HR:
  
  Feedback Entries:
  ${feedbackContents}

Summarize and present as html code to display it in browser and to be useful for HR department for further actions`;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    max_tokens: 300,
    temperature: 0.7,
  });

  return response.choices[0].text.trim();
};

// Save feedback
export async function POST(request, res) {
  const req = await request.json();
  // Define the path to save the file (e.g., in the 'public' directory)
  const filePath = path.join(process.cwd(), "public", "data.json");

  try {
    // Read the existing file or create an empty array if the file doesn't exist
    const fileData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : [];

    // Ensure file data is an array
    const jsonArray = Array.isArray(fileData) ? fileData : [fileData];

    // Append the new entry to the array
    jsonArray.push(req);

    // Write the updated array back to the file
    fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2), "utf8");

    return Response.json({ message: "File written successfully" });
  } catch (error) {
    console.error("Error writing file:", error);
    return Response.json({ error: "Failed to write file" });
  }
}

// list of feedbacks
export async function GET(request, res) {
  const filePath = path.join(process.cwd(), "public", "data.json");
  try {
    const fileData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : [];
    // Step 1: Sort Feedback by Priority (First Pass)
    let sortedFeedback = sortFeedbackByPriority(fileData);

    // Step 2: Assign Criticality Scores
    sortedFeedback = await assignCriticalityScores(sortedFeedback);

    // Step 3: Final Sorting by Priority and Criticality
    const finalSortedFeedback = sortByPriorityAndCriticality(sortedFeedback);

    // Step 4: Summarize Feedback Trends
    const summary = await summarizeFeedback(finalSortedFeedback);

    // Return Results
    return Response.json({
      sortedFeedback: finalSortedFeedback,
      summary: summary,
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return Response.json({ error: "Failed to read file" });
  }
}

// list of feedbacks
export async function DELETE() {
  // Define the path to save the file (e.g., in the 'public' directory)
  const filePath = path.join(process.cwd(), "public", "data.json");

  try {
    // Read the existing file or create an empty array if the file doesn't exist
    const fileData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : [];

    // Write the updated array back to the file
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf8");

    return Response.json({ message: "File cleared successfully" });
  } catch (error) {
    console.error("Error writing file:", error);
    return Response.json({ error: "Failed to clear file" });
  }
}
