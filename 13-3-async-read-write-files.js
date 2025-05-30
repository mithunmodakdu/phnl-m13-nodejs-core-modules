const fs = require("fs");

const data = 'Hello, world!';
const textData = "We are trying to learn read and write file asynchronously."


fs.writeFile("./mytext.txt", textData, 'utf8', (err) => {
  if(err) {
    console.error('Error in writing file:', err);
    return;
  }
  console.log("File has been written successfully.")
})

fs.readFile("./mytext.txt", "utf8", (err, data) =>{
  if(err){
    console.error('Error in reading file:', err);
    return;
  }
  console.log('Text content in file:', data);
});