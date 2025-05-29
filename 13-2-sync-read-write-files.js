const fs = require("fs");

const text = "Hello everybody, how are you";
fs.writeFileSync("./mytext.txt", text);

const textInFile = fs.readFileSync("./mytext.txt", {encoding: "utf-8"}); 
console.log(textInFile)