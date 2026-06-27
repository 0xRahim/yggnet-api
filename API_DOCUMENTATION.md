# API Documentation

This documentation provides details for the Web Management API.

## Base URL
The base URL for all endpoints is: `http://localhost:3000`

## Authentication
Most endpoints require authentication using a JSON Web Token (JWT).
- To authenticate, include the token in the `Authorization` header as a Bearer token:
  `Authorization: Bearer <your_token>`

## Error Responses
The API uses standard HTTP status codes to indicate success or failure.
- `400 Bad Request`: The request was invalid or missing parameters.
- `401 Unauthorized`: Authentication failed or token is missing.
- `404 Not Found`: The requested resource could not be found.

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

---

## Health Check

### Get Health Status
Returns the health status of the API.

- **URL:** `/health`
- **Method:** `GET`
- **Auth Required:** No
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "API works fine" }`

---

## Authentication Endpoints

### User Signup
Registers a new user and returns an authentication token.

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Auth Required:** No
- **Data Params:**
  - `email` (string, required)
  - `password` (string, required)
- **Success Response:**
  - **Code:** 201
  - **Content:** `{ "token": "<jwt_token>" }`
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "message": "User already exists" }`

### User Login
Authenticates a user and returns an authentication token.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** No
- **Data Params:**
  - `email` (string, required)
  - `password` (string, required)
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "token": "<jwt_token>" }`
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "message": "Invalid credentials" }`

### Get Current User
Returns the profile information of the authenticated user.

- **URL:** `/auth/user`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "id": 1, "email": "user@example.com" }`
- **Error Response:**
  - **Code:** 401
  - **Content:** `{ "message": "Access token required" }`

---

## Pinned Websites Endpoints

### Get All Pinned Websites
Returns a list of all pinned websites for the authenticated user.

- **URL:** `/pinned`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `[ { "id": 1, "user_id": 1, "title": "Google", "url": "https://google.com" }, ... ]`

### Create Pinned Website
Pins a new website.

- **URL:** `/pinned`
- **Method:** `POST`
- **Auth Required:** Yes
- **Data Params:**
  - `title` (string, required)
  - `url` (string, required)
- **Success Response:**
  - **Code:** 201
  - **Content:** `{ "id": 1, "user_id": 1, "title": "Google", "url": "https://google.com" }`

### Update Pinned Website
Updates an existing pinned website.

- **URL:** `/pinned/:id`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Data Params:**
  - `title` (string, optional)
  - `url` (string, optional)
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "id": 1, "user_id": 1, "title": "New Title", "url": "https://newurl.com" }`

### Delete Pinned Website
Removes a pinned website.

- **URL:** `/pinned/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Pinned website deleted" }`

---

## Search Endpoints

### Perform Search
Performs a search. If not in incognito mode, the search is saved to the user's history.

- **URL:** `/search`
- **Method:** `GET`
- **Auth Required:** Yes
- **Query Params:**
  - `q` (string, required): The search query.
  - `incognito` (boolean, optional): If "true", the search will not be saved.
- **Success Response:**
  - **Code:** 200
  - **Content:** `[ { "title": "typescript - Search Results", "url": "...", "snippet": "..." }, ... ]`

### Get Search History
Returns the authenticated user's search history.

- **URL:** `/search/history`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `[ { "id": 1, "user_id": 1, "query": "typescript", "created_at": "..." }, ... ]`

### Delete History Item
Deletes a specific item from the search history.

- **URL:** `/search/history/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "success": true }`

### Clear Search History
Clears all search history for the authenticated user.

- **URL:** `/search/history`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "success": true }`

---

## Bookmarks Endpoints

### Get All Bookmarks / Search Bookmarks
Returns all bookmarks or filters them by a search query.

- **URL:** `/bookmarks`
- **Method:** `GET`
- **Auth Required:** Yes
- **Query Params:**
  - `q` (string, optional): Search query to filter bookmarks by title, tags, or description.
- **Success Response:**
  - **Code:** 200
  - **Content:** `[ { "id": 1, "user_id": 1, "folder_id": 1, "title": "GitHub", "url": "...", "description": "...", "tags": "...", "folder_name": "Work" }, ... ]`

### Create Bookmark
Creates a new bookmark.

- **URL:** `/bookmarks`
- **Method:** `POST`
- **Auth Required:** Yes
- **Data Params:**
  - `title` (string, required)
  - `url` (string, required)
  - `folder_id` (number, optional)
  - `folder_name` (string, optional): If provided, will associate with or create this folder.
  - `description` (string, optional)
  - `tags` (string, optional)
- **Success Response:**
  - **Code:** 201
  - **Content:** `{ "id": 1, ... }`

### Update Bookmark
Updates an existing bookmark.

- **URL:** `/bookmarks/:id`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Data Params:**
  - `title` (string, optional)
  - `url` (string, optional)
  - `folder_name` (string, optional)
  - `description` (string, optional)
  - `tags` (string, optional)
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "id": 1, ... }`

### Delete Bookmark
Deletes a bookmark.

- **URL:** `/bookmarks/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Bookmark deleted" }`

---

## Bookmark Folder Endpoints

### Get All Folders
Returns all bookmark folders for the authenticated user.

- **URL:** `/bookmarks/folders`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `[ { "id": 1, "user_id": 1, "name": "Work" }, ... ]`

### Create Folder
Creates a new bookmark folder.

- **URL:** `/bookmarks/folders`
- **Method:** `POST`
- **Auth Required:** Yes
- **Data Params:**
  - `name` (string, required)
- **Success Response:**
  - **Code:** 201
  - **Content:** `{ "id": 1, "user_id": 1, "name": "Work" }`

### Delete Folder
Deletes a bookmark folder. Note: Bookmarks in this folder will have their `folder_id` set to NULL.

- **URL:** `/bookmarks/folders/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "Folder deleted" }`
