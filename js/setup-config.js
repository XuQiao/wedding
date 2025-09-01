// 从环境变量获取配置
const fs = require('fs');
const path = require('path');

const config = {
  GH_TOKEN: process.env.GH_TOKEN,
  APP_ID: process.env.APP_ID,
  APP_SECRET: process.env.APP_SECRET
};

// 读取模板文件
const templatePath = path.join(__dirname, '../js/config.js.template');
let template = fs.readFileSync(templatePath, 'utf8');

// 替换占位符
template = template.replace('/* GH_TOKEN */', `"${config.GH_TOKEN}"`)
template = template.replace('/* APP_ID */', `"${config.APP_ID}"`)
template = template.replace('/* APP_SECRET */', `"${config.APP_SECRET}"`)

// 写入实际配置文件
const outputPath = path.join(__dirname, '../js/config.js');
fs.writeFileSync(outputPath, template);

console.log('Configuration file generated successfully');