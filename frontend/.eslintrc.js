module.exports = {
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    plugins: ['@typescript-eslint', 'vitest'], // Include plugins
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:vitest/recommended', // Vitest rules
    ],
    rules: {
        // Add custom rules here, if needed
        '@typescript-eslint/no-unused-vars': 'warn',
    },
    env: {
        browser: true, // Allows browser globals
        node: true, // Allows Node.js globals
        'vitest-globals/env': true, // Recognize Vitest globals
    },
};
