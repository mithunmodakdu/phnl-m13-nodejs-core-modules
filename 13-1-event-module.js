const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {};

const schoolBell = new SchoolBell();


schoolBell.on("ring", ()=>{
  console.log("Hurrah!, class ses")
});

schoolBell.on("ring", ()=>{
  console.log("Ah!, arekta class")
});

schoolBell.on("broken", ()=>{
  console.log("class ki ar ses hobe na")
})


schoolBell.emit("ring");
schoolBell.emit("broken");