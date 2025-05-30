const fs = require("fs");

const readStream = fs.createReadStream("./mytext1.txt", {encoding: "utf-8"});
const writeStream = fs.createWriteStream("./mytext2.txt", {encoding: "utf-8"});

readStream.on("data", (data) =>{
  console.log(data);
  writeStream.write(data, (err)=>{
    if(err){
      throw Error('Error in writing stream:', err)
    }
  })
});

readStream.on("error", (err)=>{
  if(err){
    throw Error('Error in reading stream:', err)
  }
});

writeStream.on("error", (err)=>{
  if(err){
    throw Error('Error in writing stream:', err);
  }
});

readStream.on("end", ()=>{
  console.log("Reading ended");
  writeStream.end();
});

writeStream.on("finish", ()=>{
  console.log("written successfully")
})