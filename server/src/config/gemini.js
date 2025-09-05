import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from 'dotenv';
dotenv.config();

export const model = new ChatGoogleGenerativeAI({ 
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-1.5-flash",
    temperature: 0.2,  
});

export async function generateCode(prompt) {
    try {
        console.log("Sending prompt to Gemini...");
        const result = await model.invoke([
            ["system", "You are an expert AI assistant that generates high-quality code. Always respond with clean, production-ready code."],
            ["user", prompt]
        ]);
        
        // Extract the response text
        const response = result.content;
        console.log("Gemini response received");
        return response;
    } catch (error) {
        console.error("Error in generateCode:", error);
        throw new Error(`Failed to generate code: ${error.message}`);
    }
}