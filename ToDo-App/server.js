const http = require("http");
const path = require("path");
const fs = require("fs");


const filePath = path.join(__dirname, "./db/todo.json")

const server = http.createServer((req, res)=>{

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  
  // get all todos
  if(pathname === "/todos" && req.method === "GET"){
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'})
    
    // res.statusCode = 201,
    // res.setHeader("content-type", "text/plain text")
    // res.setHeader("email", "mmmmm@gmaail.com")

    res.writeHead(200, {
      // "content-type": "text/plain text",
      "content-type": "application/json",
      // "content-type": "text/html",
      // "email": "m@gmaail.com"
    })
   
    // res.end(JSON.stringify(data))
    // res.end("<h1>Hello World</h1> <h2>Hello World</h2> <h3>Hello World</h3>")
    res.end(data);

  } 

  // get single todo
  else if(pathname === "/todo" && req.method === "GET"){
    const title = url.searchParams.get("title");
        
    const data = fs.readFileSync(filePath, {encoding: 'utf-8'});
    const parsedData = JSON.parse(data);
    const todo = parsedData.find((todo)=>todo.title === title);
        
    const stringifiedTodo = JSON.stringify(todo);

    res.writeHead(200, {
      "content-type": "application/json",   
    });
   
    res.end(stringifiedTodo);

  }

  // post a todo
  else if(pathname === "/todos/create-todo" && req.method === "POST"){
    
    let data = "";
   
    req.on("data", (chunk)=>{
      data = data + chunk;
    })

    req.on("end", () =>{
      
      const {title, body} = JSON.parse(data);
      console.log({title, body})
     
      const createdAt = new Date().toLocaleString();
      
      const allTodos = fs.readFileSync(filePath, {encoding: 'utf-8'});
      const parsedAllTodos = JSON.parse(allTodos);
      parsedAllTodos.push({title, body, createdAt});

      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {encoding:'utf-8'});

      res.end(JSON.stringify({title, body, createdAt}, null, 2))
      
    })

  }
  
  // update a todo
  else if(pathname === "/todos/update-todo" && req.method === "PATCH"){
    const title = url.searchParams.get("title");
    
    let data = "";
   
    req.on("data", (chunk)=>{
      data = data + chunk;
    })

    req.on("end", () =>{
      const {body} = JSON.parse(data);
      const allTodos = fs.readFileSync(filePath, {encoding: 'utf-8'});
      const parsedAllTodos = JSON.parse(allTodos);
      const todoIndex = parsedAllTodos.findIndex((todo) => todo.title === title);
      parsedAllTodos[todoIndex].body = body;

      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {encoding:'utf-8'});

      res.end(JSON.stringify({title, body, createdAt:parsedAllTodos[todoIndex].createdAt}, null, 2))
      
    })
  }

  // delete a todo
  else if(pathname === "/todos/delete-todo" && req.method === "DELETE"){
    const title = url.searchParams.get("title");

    const allTodos = fs.readFileSync(filePath, {encoding: 'utf-8'});
    const parsedAllTodos = JSON.parse(allTodos);
    const filteredAllTodos = parsedAllTodos.filter((todo) => todo.title !== title);
    
    fs.writeFileSync(filePath, JSON.stringify(filteredAllTodos, null, 2), {encoding:'utf-8'});

    res.end(`${title} has successfully been deleted.`)
   
  }
  
  else{
    res.end("Route not found")
  }
})

server.listen(5000, "127.0.0.1", ()=>{
  console.log("✅ Server is listening to the port 5000")
})