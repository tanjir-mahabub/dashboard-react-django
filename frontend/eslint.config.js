import { eslint } from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import vitest from 'eslint-plugin-vitest';

export default [
    eslint.configs.recommended,
    typescriptEslint.configs.recommended,
    vitest.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];
