# To-Do List App API Plan

## Project overview

The To-Do List application will use a small REST API to handle the main CRUD operations for tasks. The API keeps the frontend separate from the data layer so the React application can create, read, update and delete tasks through normal HTTP requests.

A task can contain:

- `id` - unique task identifier
- `title` - task title
- `description` - optional task details
- `completed` - whether the task is finished
- `createdAt` - date/time when the task was created
- `updatedAt` - date/time of the latest change

## API base URL

```text
/api/tasks
```

## 1. Add Task

### Endpoint

```http
POST /api/tasks
```

### Purpose

Creates a new task.

### Request body

```json
{
  "title": "Complete React assignment",
  "description": "Finish the hooks and API exercises",
  "completed": false
}
```

### Expected response

**HTTP 201 Created**

```json
{
  "id": "tsk_1001",
  "title": "Complete React assignment",
  "description": "Finish the hooks and API exercises",
  "completed": false,
  "createdAt": "2026-09-12T10:30:00Z",
  "updatedAt": "2026-09-12T10:30:00Z"
}
```

### Reasoning

A `POST` request is appropriate because a new resource is being created. The server should generate the identifier instead of trusting an ID supplied by the client. A simple approach is to use a UUID or a server-side sequence. This avoids duplicate task IDs.

### Basic validation

- `title` should be present.
- `title` should not be empty.
- `completed` can default to `false`.
- `description` can be optional.

---

## 2. Get All Tasks

### Endpoint

```http
GET /api/tasks
```

### Purpose

Returns the current task list.

### Example response

**HTTP 200 OK**

```json
[
  {
    "id": "tsk_1001",
    "title": "Complete React assignment",
    "description": "Finish the hooks and API exercises",
    "completed": false,
    "createdAt": "2026-09-12T10:30:00Z",
    "updatedAt": "2026-09-12T10:30:00Z"
  },
  {
    "id": "tsk_1002",
    "title": "Read API notes",
    "description": "",
    "completed": true,
    "createdAt": "2026-09-12T09:15:00Z",
    "updatedAt": "2026-09-12T11:00:00Z"
  }
]
```

### Reasoning

The home screen normally needs the complete list of tasks when it loads, so a collection-level `GET` endpoint is needed.

---

## 3. Get One Task

### Endpoint

```http
GET /api/tasks/:id
```

### Example

```http
GET /api/tasks/tsk_1001
```

### Expected response

**HTTP 200 OK**

```json
{
  "id": "tsk_1001",
  "title": "Complete React assignment",
  "description": "Finish the hooks and API exercises",
  "completed": false,
  "createdAt": "2026-09-12T10:30:00Z",
  "updatedAt": "2026-09-12T10:30:00Z"
}
```

### Missing task response

**HTTP 404 Not Found**

```json
{
  "message": "Task not found"
}
```

### Reasoning

An individual resource endpoint is useful when the frontend needs details for one task, such as an edit screen or task details view.

---

## 4. Update Task

### Endpoint

```http
PUT /api/tasks/:id
```

### Example

```http
PUT /api/tasks/tsk_1001
```

### Request body

```json
{
  "title": "Complete React assignment",
  "description": "Finish the remaining API exercise",
  "completed": true
}
```

### Expected response

**HTTP 200 OK**

```json
{
  "id": "tsk_1001",
  "title": "Complete React assignment",
  "description": "Finish the remaining API exercise",
  "completed": true,
  "createdAt": "2026-09-12T10:30:00Z",
  "updatedAt": "2026-09-12T12:05:00Z"
}
```

### Reasoning

A task can be edited after creation. `PUT` represents updating the existing resource. The server should update `updatedAt` whenever a change is accepted.

A small implementation could also use:

```http
PATCH /api/tasks/:id
```

for partial edits, especially when only the `completed` field is being changed. For this assignment, `PUT` keeps the planned API simple.

---

## 5. Delete Task

### Endpoint

```http
DELETE /api/tasks/:id
```

### Example

```http
DELETE /api/tasks/tsk_1001
```

### Expected response

**HTTP 204 No Content**

No response body is required.

### Missing task response

**HTTP 404 Not Found**

```json
{
  "message": "Task not found"
}
```

### Reasoning

`DELETE` is the standard REST method for removing a resource from a collection.

---

## CRUD summary

| Operation | Method | Endpoint | Success status |
|---|---|---|---|
| Add task | POST | `/api/tasks` | 201 Created |
| Get all tasks | GET | `/api/tasks` | 200 OK |
| Get one task | GET | `/api/tasks/:id` | 200 OK |
| Update task | PUT | `/api/tasks/:id` | 200 OK |
| Delete task | DELETE | `/api/tasks/:id` | 204 No Content |

## Common error responses

### 400 Bad Request

Used when required input is missing or invalid.

```json
{
  "message": "Title is required"
}
```

### 404 Not Found

Used when the requested task ID does not exist.

```json
{
  "message": "Task not found"
}
```

### 500 Internal Server Error

Used when an unexpected server-side problem occurs.

```json
{
  "message": "Something went wrong on the server"
}
```

## How the API maps to the To-Do app

### Create flow

The user enters a task in the React form. The frontend sends a `POST /api/tasks` request. The server validates the information, creates a unique ID and returns the saved task. The React list can then add the returned task to the screen.

### Read flow

When the page opens, React sends `GET /api/tasks`. The response supplies the task list that is displayed in the UI.

### Update flow

When a user edits a task or marks it completed, React sends `PUT /api/tasks/:id`. The returned task can replace the old task in the local UI state.

### Delete flow

When a user removes a task, React sends `DELETE /api/tasks/:id`. After receiving a successful response, the frontend removes that task from its displayed list.

## Unique identifier plan

The server should create IDs. A UUID is a good choice because it is very unlikely to collide:

```text
550e8400-e29b-41d4-a716-446655440000
```

For a small classroom project, a numeric server-side counter also works:

```text
1, 2, 3, 4, ...
```

The important point is that IDs are generated by the backend and remain stable for the lifetime of the task.

## REST design decisions

The endpoints are organized around the `tasks` resource rather than actions such as `/addTask` or `/deleteTask`. The HTTP method describes the operation:

- `POST` creates
- `GET` reads
- `PUT` updates
- `DELETE` removes

This makes the API easier to understand and keeps the route names consistent.

## Expected frontend API calls

```text
On page load
GET /api/tasks

Add button
POST /api/tasks

Edit/save
PUT /api/tasks/:id

Complete/uncomplete
PUT /api/tasks/:id

Delete button
DELETE /api/tasks/:id
```

## Implementation challenges

1. Keeping task IDs unique when several tasks are created.
2. Validating empty titles and incorrect request bodies.
3. Returning consistent HTTP status codes and JSON error messages.
4. Keeping the React UI state synchronized with the server response.
5. Handling network failures without breaking the task list.
6. Deciding between `PUT` and `PATCH` for partial edits.
7. Later, when persistence is added, handling database errors and concurrent updates.

## Possible future additions

The same API could later support:

```http
GET /api/tasks?completed=true
```

for filtering, and pagination such as:

```http
GET /api/tasks?page=1&limit=20
```

Authentication, user-specific task lists, due dates and priority could also be added in a later version.
