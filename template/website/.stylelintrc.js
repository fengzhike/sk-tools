module.exports = {
    // https://www.npmjs.com/package/stylelint-config-standard 一些标准的基础配置
    extends: 'stylelint-config-standard',
    // 这里可以写你的规则，会覆盖上面继承的。
    rules: {
        'font-family-no-missing-generic-family-keyword':null,
        'no-descending-specificity':null
    }
  };