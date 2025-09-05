export function cleanCodeOutput(text) {
    if (!text) {
        console.log('cleanCodeOutput: No text provided');
        return { 'code.js': '' };
    }
    
    console.log('cleanCodeOutput: Raw input:', text.substring(0, 200) + (text.length > 200 ? '...' : ''));
    
    let cleaned = text.trim();
    
    const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
        try {
            const jsonContent = jsonMatch[1].trim();
            console.log('cleanCodeOutput: Found JSON code block, content:', jsonContent.substring(0, 200) + (jsonContent.length > 200 ? '...' : ''));
            
            const unescapedContent = jsonContent.replace(/\\"/g, '"');
            const parsed = JSON.parse(unescapedContent);
            
            if (parsed && typeof parsed === 'object') {
                console.log('cleanCodeOutput: Successfully parsed JSON');
                return parsed;
            }
        } catch (e) {
            console.log('cleanCodeOutput: Failed to parse JSON from markdown, trying other formats...');
            console.error('cleanCodeOutput: JSON parse error:', e.message);
        }
    }
    
    try {
        console.log('cleanCodeOutput: Trying to parse as raw JSON');
        const parsed = JSON.parse(cleaned);
        if (parsed && typeof parsed === 'object') {
            console.log('cleanCodeOutput: Successfully parsed raw JSON');
            return parsed;
        }
    } catch (e) {
        console.log('cleanCodeOutput: Not valid raw JSON, trying code block...');
    }
    
    const codeBlockMatch = cleaned.match(/```(?:[a-z]*\n)?([\s\S]*?)\n?```/);
    if (codeBlockMatch) {
        console.log('cleanCodeOutput: Found code block, treating as raw code');
        return {
            'code.js': codeBlockMatch[1].trim()
        };
    }
    
    if (cleaned) {
        console.log('cleanCodeOutput: No code blocks found, treating entire input as code');
        return {
            'code.js': cleaned
        };
    }
    
    console.log('cleanCodeOutput: No valid content found, returning empty code');
    return { 'code.js': '' };
}