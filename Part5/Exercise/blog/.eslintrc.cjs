module.exports ={
    root: true,
    env: {
        browser: true,
        es2020: true,
        'jest/globals': true,
        'cypress/globals': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
    settings: {react: {version: '18.2'}},
    plugins: ['jest', 'cypress'],
    rules: {
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-trailing-spaces': 'error',
        'no-console': 0,
        'react/prop-types': 0,
        'no-unused-vars': 0
    }
}