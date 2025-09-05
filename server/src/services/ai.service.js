//ignore

import { aiGraph } from '../config/langgraph.js'

export const suggestCode = async (code) => {
  const result = await aiGraph.invoke({ code })
  return result.suggestion
}
