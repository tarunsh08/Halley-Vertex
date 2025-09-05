export function classifyTask(taskDescription) {
    const frontendKeywords = [
        'react', 'component', 'ui', 'css', 'html', 'jsx', 'frontend', 
        'front end', 'user interface', 'button', 'form', 'input', 'modal',
        'signup', 'sign up', 'login', 'register', 'menu', 'navbar', 'header',
        'footer', 'card', 'grid', 'flex', 'responsive', 'mobile', 'desktop',
        'layout', 'theme', 'style', 'styling', 'design'
    ];
    
    const backendKeywords = [
        'api', 'express', 'auth', 'server', 'backend', 'back end', 'database',
        'mongodb', 'mongoose', 'model', 'controller', 'route', 'middleware',
        'authentication', 'authorization', 'jwt', 'session', 'cookie', 'token',
        'rest', 'graphql', 'endpoint', 'query', 'mutation', 'schema', 'validation'
    ];

    const lowerDesc = taskDescription.toLowerCase();
    
    // Check for frontend keywords
    const isFrontend = frontendKeywords.some(keyword => 
        lowerDesc.includes(keyword)
    );

    // Check for backend keywords
    const isBackend = backendKeywords.some(keyword => 
        lowerDesc.includes(keyword)
    );

    // If both frontend and backend keywords are present, prioritize based on context
    if (isFrontend && isBackend) {
        // If it's clearly a UI component, prioritize frontend
        if (/component|button|form|input|modal|signup|login|register|navbar|header|footer|card/.test(lowerDesc)) {
            return "frontend";
        }
        return "backend";
    }

    if (isFrontend) return "frontend";
    if (isBackend) return "backend";
    
    // Default to frontend for better user experience
    return "frontend";
}