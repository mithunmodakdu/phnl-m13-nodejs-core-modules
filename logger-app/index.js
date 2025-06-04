const path = require("path");
const fs = require("fs");

const inputArguments = process.argv.slice(2);

const text = inputArguments.join(" ");

const timeStamp = new Date().toISOString();

const message = `${text} ${timeStamp} \n`;

if(!message){
  console.log("❌ Please give message to log");
  console.log("Example: node index.js Hello world");
  process.exit(1);
}

const filePath = path.join(__dirname,"log.txt");

fs.appendFile(filePath, message, {encoding: "utf-8"}, ()=>{
  console.log("Your message has been added to your log successfully")
})
