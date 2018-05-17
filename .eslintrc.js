// http://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // 配置4个空格一个缩进，不符合配置时报错
        "indent": ["error", 4],
        "no-tabs": "off",
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // allow 未使用的变量
        'no-unused-vars': 0,
        // 允许使用未声明的变量，除非在/*global */注释中提及
        'no-undef': 0,
        // Disallow Assignment in return Statement
        'no-return-assign': 0,
        // 允许混用tab和空格
        "no-mixed-spaces-and-tabs": [0, 'off'],
        // Disallow camelcase naming convention
        'camelcase': ['error', {properties: 'never'}],
        'no-sequences': 0,
        "one-var": 0,
        "eqeqeq": 0,
        "no-unneeded-ternary": 0,
        "no-unused-expressions": 0,
        "no-useless-return": 0,
        "camelcase": 0,
        "no-callback-literal": 0,
        "standard%2Fno-callback-literal": 0,
        "no-shadow-restricted-names": 0
    }
}
