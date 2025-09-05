import { END, StateGraph } from "@langchain/langgraph";
import { runGemini } from "./gemini.js";

export function createAgentGraph(role) {
  const graph = new StateGraph({
    channels: { input: null, output: null },
  });

  graph.addNode(role, async (state) => {
    const prompt = `You are a ${role} agent in a MERN project.
Task: ${state.input}
Return only the code and a short explanation.`;

    const response = await runGemini(prompt);
    return { output: response };
  });

  graph.setEntryPoint(role);
  graph.addEdge(role, END);

  return graph.compile();
}
