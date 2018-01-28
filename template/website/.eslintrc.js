module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "browser": true,
    },
    "globals": {

    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            0,
            "tab"
        ],
        "linebreak-style": [
            0,
            "unix"
        ],
        "quotes": [
            0,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "block-scoped-var": 2,
        "brace-style": [2, "1tbs", { "allowSingleLine": true }],
        // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
        // always-multiline：多行模式必须带逗号，单行模式不能带逗号
        "comma-dangle": [2, "always-multiline"],
        // 控制逗号前后的空格
        "comma-spacing": [1, { "before": false, "after": true }],
        // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
        "constructor-super": 0,
        "no-extra-semi": 1, //多余的分号
        "no-extra-parens": 1, //多余的括号
        "no-empty": 1, //空代码块
        "complexity": [1, 12], //圈复杂度大于10 警告
        "comma-style": [2, "last"], //逗号风格，换行时在行首还是行尾
        "no-debugger": 2, //debugger 调试代码未删除
        "no-constant-condition": 2, //常量作为条件
        "no-dupe-args": 2, //参数重复
        "no-dupe-keys": 2, //对象属性重复
        "no-duplicate-case": 2, //case重复
        "no-empty-character-class": 2, //正则无法匹配任何值
        "no-invalid-regexp": 2, //无效的正则
        "no-func-assign": 2, //函数被赋值
        "no-var": 2, //禁用var，用let和const代替
        "indent": [2, 4], //缩进风格
        "valid-typeof": 2, //无效的类型判断
        "no-unreachable": 2, //不可能执行到的代码
        "no-unexpected-multiline": 2, //行尾缺少分号可能导致一些意外情况
        "no-sparse-arrays": 2, //数组中多出逗号
        "no-shadow-restricted-names": 2, //关键词与命名冲突
        "no-undef": 2, //变量未定义
        "no-unused-vars": 0, //变量定义后未使用
        "no-cond-assign": 2, //条件语句中禁止赋值操作
        "no-native-reassign": 2, //禁止覆盖原生对象
        "no-void": 2, //禁用void
        "no-with": 2, //禁用with
        "no-const-assign": 2, //禁止修改const声明的变量
        "curly": 2, //if、else、while、for代码块用{}包围
        "no-console": 0,
        "no-useless-escape": 0,

    }
}