# Task-API

This is a simple API, that:

- Create a Tasks
- Get all tasks
- Get a specific task
- Update a task
- Delete a task
  Working with the API is simple. The API runs on localhost, port 3500.

## Create a Tasks

To create a new task, the endpoint is <code>/task</code> on postman. The tasks are in an array, making it easy to create a task with the title and description using <code>POST</code>.eg;

```
http://127.0.0.1:3500/task
```

## Get all tasks

Getting all the tasks is just as simple. The end point is <code>/tasks</code>. This displays all the tasks available using <code>GET</code>
eg;

```
http://127.0.0.1:3500/tasks
```

## Get a specific task

To get a specific task, you will also use the <code>GET</code> operation. for this, the endpoint will be <code>/task/(id)</code>. This will you the task you want to see using its id. eg;

```
http://127.0.0.1:3500/task/ff432995-88b7-406d-8680-a44058c0c972
```

## Update a task

Updating a task is just as simple as all the other operations we did. For better understanding of these operations, i did both PUT(To update the whole thing) and PATCH(To partially update a resource).  
Since we are only working on a single task, we will also use the id here. So just like before, we will also use <code>/task/(id)</code>.
Patch using <code>PATCH</code> and Put using <code>PUT</code>example:

```
http://127.0.0.1:3500/task/167f491c-76d5-457b-9d54-532461aa43ab
```

## Delete a task

To delete a task, we will use <code>DELETE</code>. For this we will also use the id which is <code>/task/(id)</code>. eg:

```
http://127.0.0.1:3500/task/ff432995-88b7-406d-8680-a44058c0c972
```
