import { generateCode } from "../config/gemini.js";
import { cleanCodeOutput } from "../utils/cleanCode.js";

export async function runFrontendAgent(taskDescription) {
  const prompt = `
You are an expert React developer. Your task is to create a complete, production-ready React component (or project files) based on the following description:

${taskDescription}

Rules:
1. Use functional components with React hooks
2. Include all necessary imports
3. Use modern React best practices
4. Add basic styling (CSS-in-JS or CSS classes)
5. Ensure reusability, responsiveness, and accessibility
6. Handle errors and loading states where relevant
7. Export components as default

📌 Output format:
- If the solution fits in a **single file**, return ONLY the code (no explanations, no markdown).
- If multiple files are needed, return a **JSON object** where keys are filenames and values are the code as strings. Example:
{
  "App.js": "code here",
  "index.js": "code here"
}
`;

  try {
    const output = await generateCode(prompt);
    console.log("Frontend Agent output received");
    return cleanCodeOutput(output);
  } catch (error) {
    console.error("Error in runFrontendAgent:", error);
    throw error;
  }
}
