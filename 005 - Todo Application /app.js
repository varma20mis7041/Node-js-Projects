const express = require("express");
const app = express();
app.use(express.json());

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const databasePath = path.join(__dirname, "todoApplication.db");

let db = null;

const setupDatabaseAndStartServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3004, () => {
      console.log("server started");
    });
  } catch (error) {
    console.log("database error ${error}");
  }
};

// API 1: Get todos with optional query filters for status, priority, or search
app.get("/todos/", async (request, response) => {
  const { status = "", priority = "", search_q = "" } = request.query;

  let getTodoQuery = "";
  const getStatus = () => {
    getTodoQuery = `
         select * from todo where status = '${status}'
        `;
  };
  const getPriority = () => {
    getTodoQuery = `
      select * from todo where priority = '${priority}'
      `;
  };
  const getStatusAndPriority = () => {
    getTodoQuery = `
      select * from todo where 
      priority = '${priority}' 
      and 
      status = '${status}'
      `;
  };

  getSearchRows = () => {
    getTodoQuery = `
      select * from todo 
      where todo like '%${search_q}%'
      `;
  };

  if (priority != "" && status != "") {
    getStatusAndPriority();
  } else if (status != "") {
    getStatus();
  } else if (priority != "") {
    getPriority();
  } else if (search_q != "") {
    getSearchRows();
  }
  const getTodoResults = await db.all(getTodoQuery);
  response.send(getTodoResults);
});

// API 2: Get a single todo by ID
app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const getSingleTodo = `
  select * from todo where id = ${todoId}
  `;
  const todoResult = await db.get(getSingleTodo);
  response.send(todoResult);
});

// API 3: Add a new todo
app.post("/todos/", async (request, response) => {
  const todoDetails = request.body;
  const { id, todo, priority, status } = todoDetails;
  const postTodoQuery = `
  insert into todo (id,todo,priority,status)
  values(${id},'${todo}','${priority}','${status}')`;
  await db.run(postTodoQuery);
  response.send("Todo Successfully Added");
});

// API 4: Update a todo's status, priority, or text by ID
app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const todoProperty = request.body;
  if (todoProperty.status) {
    const updateTodoQuery = `
      update todo set status = '${todoProperty.status}'
      where id = ${todoId}
      `;
    await db.run(updateTodoQuery);
    response.send("Status Updated");
  }
  if (todoProperty.priority) {
    const updateTodoQuery = `
      update todo set priority = '${todoProperty.priority}'
       where id = ${todoId}
      `;
    await db.run(updateTodoQuery);
    response.send("Priority Updated");
  }
  if (todoProperty.todo) {
    const updateTodoQuery = `
      update todo set todo = '${todoProperty.todo}'
       where id = ${todoId}
      `;
    await db.run(updateTodoQuery);
    response.send("Todo Updated");
  }
});

// API 5: Delete a todo by ID
app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const deleteQuery = `
  delete from todo where id = ${todoId}
  `;
  await db.run(deleteQuery);
  response.send("Todo Deleted");
});

setupDatabaseAndStartServer();
module.exports = app;
