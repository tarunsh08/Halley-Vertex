export function cleanCodeOutput(text) {
    if (!text) return "";
  
    let cleaned = text.trim();
  
    try {
      const jsonMatch = cleaned.match(/```json([\s\S]*?)```/);
      if (jsonMatch) {
        cleaned = jsonMatch[1].trim();
      }
  
      const parsed = JSON.parse(cleaned);
  
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {}
  
    const match = cleaned.match(/```[\s\S]*?```/);
    if (match) {
      cleaned = match[0]
        .replace(/```[a-z]*\n?/, "")
        .replace(/```$/, "") 
        .trim();
    }
  
    return cleaned;
  }
  