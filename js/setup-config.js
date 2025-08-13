// 从环境变量获取配置
const fs = require('fs');
const path = require('path');

const config = {
  GH_TOKEN: process.env.GH_TOKEN,
};

// 读取模板文件
const templatePath = path.join(__dirname, '../js/config.js.template');
let template = fs.readFileSync(templatePath, 'utf8');

// 替换占位符
template = template.replace('/* GH_TOKEN */', `"${config.GH_TOKEN}"`)

// 写入实际配置文件
const outputPath = path.join(__dirname, '../js/config.js');
fs.writeFileSync(outputPath, template);

console.log('Configuration file generated successfully');