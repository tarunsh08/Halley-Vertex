import { generateCode } from "../config/gemini.js";
import { cleanCodeOutput } from "../utils/cleanCode.js";

export async function runBackendAgent(taskDescription) {
  const prompt = `
You are a MERN backend AI agent. 
Write clean Express.js + MongoDB (Mongoose) code for the following task:
${taskDescription}

📌 Output format:
- If the solution fits in a **single file**, return ONLY the code (no explanations, no markdown).
- If multiple files are needed, return a **JSON object** where keys are filenames and values are the code as strings. Example:
{
  "routes/user.js": "code here",
  "models/User.js": "code here"
}
`;

  try {
    const output = await generateCode(prompt);
    console.log("Backend Agent output received");
    return cleanCodeOutput(output);
  } catch (error) {
    console.error("Error in runBackendAgent:", error);
    throw error;
  }
}
