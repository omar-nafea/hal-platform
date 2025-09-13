# HAL Platform API Documentation

## 📋 **API Overview**

**Base URL:** `http://localhost:8000/api/v1`  
**Version:** 1.0.0  
**Content-Type:** `application/json`  
**Response Format:** JSON

---

## 🔗 **Authentication**
The API now uses token-based authentication via Laravel Sanctum. Most endpoints are protected and require a valid Bearer token in the `Authorization` header. A few endpoints remain public (registration and login).

Summary:
- Public endpoints: `POST /api/v1/register`, `POST /api/v1/login`, `GET /api/v1/health`.
- Protected endpoints: all other `/api/v1/*` routes (categories, projects, ideas, users, posts, dashboard statistics, etc.).

How authentication works:
- When a user registers or logs in, the API returns a personal access token.
- Use the token exactly as returned in the `Authorization` header: `Authorization: Bearer {token}`.
- Tokens issued by Sanctum are typically in the form `1|<long-string>` (include the full string when calling the API).

Endpoints (quick reference):

- Register
    - POST /api/v1/register
    - Body: { name, email, password, password_confirmation }
    - Response: { user, token }

- Login
    - POST /api/v1/login
    - Body: { email, password }
    - Response: { user, token }

- Logout (current token)
    - POST /api/v1/logout
    - Protected (requires Authorization header)

- Logout all sessions (revoke all tokens)
    - POST /api/v1/logout-all
    - Protected

- Refresh token
    - POST /api/v1/refresh-token
    - Protected (returns a new token)

- Profile
    - GET /api/v1/profile (protected)
    - PUT /api/v1/profile (protected)

- Change password
    - PUT /api/v1/change-password (protected)

- Sessions
    - GET /api/v1/sessions (list active tokens) (protected)
    - DELETE /api/v1/sessions/{tokenId} (revoke specific token) (protected)

Example successful registration response

```json
{
    "success": true,
    "data": {
        "user": {
            "id": "0199415e-7f4c-7158-9652-087e59d884fd",
            "name": "Test User",
            "email": "test@example.com"
        },
        "token": "1|duNVR4VBrr4cZTAsfo8XqBxgKH3jzyfswC67P9T87f6c96ed",
        "token_type": "Bearer"
    },
    "message": "User registered successfully"
}
```

---

## 🧭 Calling the API from Postman (step-by-step)

1. Create an environment (optional)
     - `base_url` = `http://localhost:8000` (or the host/port your app runs on)

2. Register a user (public)
     - Method: POST
     - URL: `{{base_url}}/api/v1/register`
     - Body → raw → JSON:
         ```json
         {
             "name": "Your Name",
             "email": "you@example.com",
             "password": "password123",
             "password_confirmation": "password123"
         }
         ```
     - Send the request. You will receive a `token` in the response JSON.

3. Save token to environment (manual or test script)
     - Manual: copy `data.token` value and set an environment variable `auth_token`.
     - Automated (Postman test script) example (Tests tab):
         ```javascript
         var json = pm.response.json();
         if (json && json.data && json.data.token) {
                 pm.environment.set('auth_token', json.data.token);
         }
         ```

4. Use the token for protected requests
     - Add Authorization header to your requests:
         - Key: `Authorization`
         - Value: `Bearer {{auth_token}}`
     - Or use the Authorization tab → Bearer Token and paste `{{auth_token}}`.

5. Example: Get profile (protected)
     - Method: GET
     - URL: `{{base_url}}/api/v1/profile`
     - Add Authorization header (Bearer token)

Notes and best practices:
- Use a secure environment variable in Postman for `auth_token`.
- When testing multiple users, create separate environments or variables (e.g., `auth_token_user1`).
- Use the Sessions endpoints to inspect and revoke tokens when needed.

---

## 🖥️ Calling the API from the terminal (curl examples)

Replace `http://localhost:8000` with your base URL and `{TOKEN}` with the returned token.

1) Register (create user)

```bash
curl -s -X POST http://localhost:8000/api/v1/register \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"test@example.com","password":"password123","password_confirmation":"password123"}'
```

2) Login and extract token (bash + jq)

```bash
RESPONSE=$(curl -s -X POST http://localhost:8000/api/v1/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password123"}')
TOKEN=$(echo "$RESPONSE" | jq -r '.data.token')
echo "Token: $TOKEN"
```

3) Call protected endpoint (profile) with token

```bash
curl -s -X GET http://localhost:8000/api/v1/profile \
    -H "Authorization: Bearer $TOKEN"
```

4) Call another protected endpoint (categories) with token

```bash
curl -s -X GET http://localhost:8000/api/v1/categories \
    -H "Authorization: Bearer $TOKEN" | jq
```

5) Logout (revoke the current token)

```bash
curl -s -X POST http://localhost:8000/api/v1/logout \
    -H "Authorization: Bearer $TOKEN"
```

6) Logout all sessions (revoke all tokens for the authenticated user)

```bash
curl -s -X POST http://localhost:8000/api/v1/logout-all \
    -H "Authorization: Bearer $TOKEN"
```

7) List active sessions (tokens)

```bash
curl -s -X GET http://localhost:8000/api/v1/sessions \
    -H "Authorization: Bearer $TOKEN" | jq
```

The sessions response contains token entries with an `id` you can use to revoke a specific session.

8) Revoke a specific token (replace {tokenId} with the session id from `/sessions`)

```bash
curl -s -X DELETE http://localhost:8000/api/v1/sessions/{tokenId} \
    -H "Authorization: Bearer $TOKEN"
```

9) Refresh token

```bash
curl -s -X POST http://localhost:8000/api/v1/refresh-token \
    -H "Authorization: Bearer $TOKEN"
```

---

## ⚙️ Notes for frontend integration (React)

- After login/register, store the returned token securely on the client (in memory, or secure storage). For SPAs you may store it in memory or a short-lived storage; avoid localStorage for long-lived tokens unless you understand the XSS risks.
- For requests from the browser (axios/fetch), include the header:

    ```js
    headers: { Authorization: `Bearer ${token}` }
    ```

- If your React app uses an API proxy or different host/port, ensure CORS and Sanctum configuration are adjusted accordingly.

---

## 📊 **Standard Response Format**

### Success Response
```json
{
    "success": true,
    "data": {...},
    "message": "Operation completed successfully"
}
```

### Error Response
```json
{
    "success": false,
    "message": "Error description",
    "errors": {...}  // Only for validation errors
}
```

### Paginated Response
```json
{
    "success": true,
    "data": [...],
    "pagination": {
        "current_page": 1,
        "per_page": 15,
        "total": 100,
        "last_page": 7,
        "from": 1,
        "to": 15,
        "has_more_pages": true
    },
    "message": "Data retrieved successfully"
}
```

---

## 🏷️ **Categories API**

### Get All Categories
```http
GET /api/v1/categories
```

**Query Parameters:**
- `search` (string, optional): Search by title
- `sort_by` (string, optional): Field to sort by (default: created_at)
- `sort_order` (string, optional): asc/desc (default: desc)
- `per_page` (integer, optional): Items per page (default: 15)

**Response:**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": 1,
                "title": "Technology",
                "created_at": "2025-09-12T19:30:00.000000Z",
                "updated_at": "2025-09-12T19:30:00.000000Z"
            }
        ],
        "pagination": {...}
    },
    "message": "Categories retrieved successfully"
}
```

### Create Category
```http
POST /api/v1/categories
```

**Request Body:**
```json
{
    "title": "Technology"
}
```

**Validation Rules:**
- `title`: required, string, max:255, unique

**Response:** `201 Created`
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "Technology",
        "created_at": "2025-09-12T19:30:00.000000Z",
        "updated_at": "2025-09-12T19:30:00.000000Z"
    },
    "message": "Category created successfully"
}
```

### Get Single Category
```http
GET /api/v1/categories/{id}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "Technology",
        "projects": [
            {
                "id": 1,
                "title": "AI Project",
                "description": "AI project description",
                "field": "Technology",
                "category_id": 1
            }
        ],
        "created_at": "2025-09-12T19:30:00.000000Z",
        "updated_at": "2025-09-12T19:30:00.000000Z"
    },
    "message": "Category retrieved successfully"
}
```

### Update Category
```http
PUT /api/v1/categories/{id}
```

**Request Body:**
```json
{
    "title": "Updated Technology"
}
```

### Delete Category
```http
DELETE /api/v1/categories/{id}
```

**Note:** Cannot delete category with associated projects (409 Conflict)

### Get Category with Project Counts
```http
GET /api/v1/categories/{id}/projects
```

---

## 📊 **Projects API**

### Get All Projects
```http
GET /api/v1/projects
```

**Query Parameters:**
- `search` (string, optional): Search by title, description, or field
- `category_id` (integer, optional): Filter by category
- `field` (string, optional): Filter by field
- `sort_by` (string, optional): Field to sort by
- `sort_order` (string, optional): asc/desc
- `per_page` (integer, optional): Items per page

**Response:**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": 1,
                "title": "AI Project",
                "description": "Artificial intelligence project",
                "field": "Technology",
                "category_id": 1,
                "category": {
                    "id": 1,
                    "title": "Technology"
                },
                "created_at": "2025-09-12T19:30:00.000000Z",
                "updated_at": "2025-09-12T19:30:00.000000Z"
            }
        ]
    },
    "message": "Projects retrieved successfully"
}
```

### Create Project
```http
POST /api/v1/projects
```

**Request Body:**
```json
{
    "title": "AI Project",
    "description": "An artificial intelligence project",
    "field": "Technology",
    "category_id": 1
}
```

**Validation Rules:**
- `title`: required, string, max:255
- `description`: nullable, string
- `field`: nullable, string, max:255
- `category_id`: required, exists:categories,id

### Get Single Project
```http
GET /api/v1/projects/{id}
```

### Update Project
```http
PUT /api/v1/projects/{id}
```

### Delete Project
```http
DELETE /api/v1/projects/{id}
```

### Get Projects by Category
```http
GET /api/v1/projects/category/{categoryId}
```

### Get Projects by Field
```http
GET /api/v1/projects/field/{field}
```

### Get Featured Projects
```http
GET /api/v1/projects/featured?limit=10
```

### Get Project Statistics
```http
GET /api/v1/projects/statistics
```

**Response:**
```json
{
    "success": true,
    "data": {
        "total_projects": 25,
        "projects_by_category": [
            {
                "category": "Technology",
                "count": 15
            }
        ],
        "projects_by_field": [
            {
                "field": "AI",
                "count": 10
            }
        ],
        "recent_projects_count": 5
    },
    "message": "Projects statistics retrieved successfully"
}
```

---

## 💡 **Ideas API**

### Get All Ideas
```http
GET /api/v1/ideas
```

**Query Parameters:**
- `search` (string, optional): Search by name, description, or field
- `field` (string, optional): Filter by field
- `min_capacity` (integer, optional): Minimum capacity
- `max_capacity` (integer, optional): Maximum capacity
- `min_cost` (number, optional): Minimum cost
- `max_cost` (number, optional): Maximum cost
- `user_id` (string, optional): Filter by user (UUID)
- `sort_by` (string, optional): Field to sort by
- `sort_order` (string, optional): asc/desc
- `per_page` (integer, optional): Items per page

**Response:**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": "01993ea8-5084-70d2-a0d2-cf9a5d00c96a",
                "name": "Smart Home System",
                "field": "Technology",
                "capacity": 100,
                "cost": "5000.50",
                "description": "A comprehensive smart home automation system",
                "user_id": "01993ea8-4d64-7054-88f0-5de9a2349b92",
                "user": {
                    "id": "01993ea8-4d64-7054-88f0-5de9a2349b92",
                    "name": "John Doe",
                    "email": "john@example.com"
                },
                "created_at": "2025-09-12T19:30:00.000000Z",
                "updated_at": "2025-09-12T19:30:00.000000Z"
            }
        ]
    },
    "message": "Ideas retrieved successfully"
}
```

### Create Idea
```http
POST /api/v1/ideas
```

**Request Body:**
```json
{
    "name": "Smart Home System",
    "field": "Technology",
    "capacity": 100,
    "cost": 5000.50,
    "description": "A comprehensive smart home automation system",
    "user_id": "01993ea8-4d64-7054-88f0-5de9a2349b92"
}
```

**Validation Rules:**
- `name`: required, string, max:255
- `field`: nullable, string, max:255
- `capacity`: nullable, integer, min:1
- `cost`: nullable, numeric, min:0
- `description`: nullable, string
- `user_id`: required, exists:users,id

### Get Single Idea
```http
GET /api/v1/ideas/{id}
```

### Update Idea
```http
PUT /api/v1/ideas/{id}
```

### Delete Idea
```http
DELETE /api/v1/ideas/{id}
```

### Get Ideas by Field
```http
GET /api/v1/ideas/field/{field}
```

### Get Ideas by User
```http
GET /api/v1/ideas/user/{userId}
```

### Get Idea Statistics
```http
GET /api/v1/ideas/statistics
```

**Response:**
```json
{
    "success": true,
    "data": {
        "total_ideas": 50,
        "average_cost": 2500.75,
        "average_capacity": 150,
        "ideas_by_field": [
            {
                "field": "Technology",
                "count": 20
            }
        ],
        "cost_range": {
            "min": 100,
            "max": 10000
        },
        "capacity_range": {
            "min": 10,
            "max": 500
        }
    },
    "message": "Ideas statistics retrieved successfully"
}
```

---

## 👥 **Users API**

### Get All Users
```http
GET /api/v1/users
```

**Query Parameters:**
- `search` (string, optional): Search by name or email
- `verified` (boolean, optional): Filter by verification status
- `sort_by` (string, optional): Field to sort by
- `sort_order` (string, optional): asc/desc
- `per_page` (integer, optional): Items per page

**Response:**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": "01993ea8-4d64-7054-88f0-5de9a2349b92",
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+1234567890",
                "email_verified_at": "2025-09-12T19:30:00.000000Z",
                "created_at": "2025-09-12T19:30:00.000000Z",
                "updated_at": "2025-09-12T19:30:00.000000Z"
            }
        ]
    },
    "message": "Users retrieved successfully"
}
```

**Note:** Password and remember_token are always hidden from responses.

### Create User
```http
POST /api/v1/users
```

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+1234567890"
}
```

**Validation Rules:**
- `name`: required, string, max:255
- `email`: required, email, max:255, unique:users
- `password`: required, string, min:8, confirmed
- `phone`: nullable, string, max:20

### Get Single User
```http
GET /api/v1/users/{id}
```

**Response includes user's ideas:**
```json
{
    "success": true,
    "data": {
        "id": "01993ea8-4d64-7054-88f0-5de9a2349b92",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "ideas": [
            {
                "id": "01993ea8-5084-70d2-a0d2-cf9a5d00c96a",
                "name": "Smart Home System",
                "field": "Technology"
            }
        ],
        "created_at": "2025-09-12T19:30:00.000000Z",
        "updated_at": "2025-09-12T19:30:00.000000Z"
    },
    "message": "User retrieved successfully"
}
```

### Update User
```http
PUT /api/v1/users/{id}
```

**Request Body:**
```json
{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "+9876543210"
}
```

### Delete User
```http
DELETE /api/v1/users/{id}
```

**Note:** Cannot delete user with associated ideas (409 Conflict)

### Update User Password
```http
PUT /api/v1/users/{id}/password
```

**Request Body:**
```json
{
    "current_password": "password123",
    "new_password": "newpassword123",
    "new_password_confirmation": "newpassword123"
}
```

### Get User Profile
```http
GET /api/v1/users/{id}/profile
```

**Response:**
```json
{
    "success": true,
    "data": {
        "user": {
            "id": "01993ea8-4d64-7054-88f0-5de9a2349b92",
            "name": "John Doe",
            "email": "john@example.com"
        },
        "statistics": {
            "total_ideas": 5,
            "recent_ideas": 2,
            "ideas_by_field": [
                {
                    "field": "Technology",
                    "count": 3
                }
            ]
        }
    },
    "message": "User profile retrieved successfully"
}
```

### Get User Statistics
```http
GET /api/v1/users/statistics
```

---

## 📝 **Posts API**

### Get All Posts
```http
GET /api/v1/posts
```

**Query Parameters:**
- `search` (string, optional): Search by title or body
- `sort_by` (string, optional): Field to sort by
- `sort_order` (string, optional): asc/desc
- `per_page` (integer, optional): Items per page

**Response:**
```json
{
    "success": true,
    "data": {
        "data": [
            {
                "id": "01993ea8-5084-70d2-a0d2-cf9a5d00c96a",
                "title": "Getting Started with Laravel",
                "body": "This is a comprehensive guide to getting started with Laravel framework...",
                "created_at": "2025-09-12T19:30:00.000000Z",
                "updated_at": "2025-09-12T19:30:00.000000Z"
            }
        ]
    },
    "message": "Posts retrieved successfully"
}
```

### Create Post
```http
POST /api/v1/posts
```

**Request Body:**
```json
{
    "title": "Getting Started with Laravel",
    "body": "This is a comprehensive guide to getting started with Laravel framework. Laravel is a powerful PHP framework that makes web development easier and more enjoyable."
}
```

**Validation Rules:**
- `title`: required, string, max:255
- `body`: required, string

### Get Single Post
```http
GET /api/v1/posts/{id}
```

### Update Post
```http
PUT /api/v1/posts/{id}
```

### Delete Post
```http
DELETE /api/v1/posts/{id}
```

### Get Latest Posts
```http
GET /api/v1/posts/latest?limit=10
```

### Search Posts
```http
GET /api/v1/posts/search?query=Laravel
```

**Validation Rules:**
- `query`: required, string, min:3

### Get Post Statistics
```http
GET /api/v1/posts/statistics
```

**Response:**
```json
{
    "success": true,
    "data": {
        "total_posts": 25,
        "recent_posts": 5,
        "average_title_length": 45.2,
        "average_body_length": 850.5
    },
    "message": "Posts statistics retrieved successfully"
}
```

---

## 🔧 **System APIs**

### Health Check
```http
GET /api/v1/health
```

**Response:**
```json
{
    "success": true,
    "status": "healthy",
    "timestamp": "2025-09-12T19:30:00.000000Z",
    "version": "1.0.0"
}
```

### Dashboard Statistics
```http
GET /api/v1/dashboard/statistics
```

**Response:**
```json
{
    "success": true,
    "data": {
        "categories": 10,
        "projects": 25,
        "ideas": 50,
        "users": 15,
        "posts": 30,
        "recent_activity": {
            "recent_projects": 3,
            "recent_ideas": 8,
            "recent_posts": 5,
            "recent_users": 2
        }
    },
    "message": "Dashboard statistics retrieved successfully"
}
```

---

## ⚠️ **Error Codes**

| Code | Description                                         |
| ---- | --------------------------------------------------- |
| 200  | OK - Request successful                             |
| 201  | Created - Resource created successfully             |
| 404  | Not Found - Resource not found                      |
| 409  | Conflict - Cannot delete resource with dependencies |
| 422  | Unprocessable Entity - Validation failed            |
| 500  | Internal Server Error - Server error                |

---

## 📝 **Usage Examples**

### Frontend Integration Examples

#### JavaScript/Axios
```javascript
// Get all categories
const getCategories = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/categories');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching categories:', error.response.data);
    }
};

// Create a new project
const createProject = async (projectData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/projects', projectData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating project:', error.response.data);
    }
};

// Search ideas with filters
const searchIdeas = async (filters) => {
    const params = new URLSearchParams(filters);
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/ideas?${params}`);
        return response.data.data;
    } catch (error) {
        console.error('Error searching ideas:', error.response.data);
    }
};
```

#### React Hook Example
```javascript
import { useState, useEffect } from 'react';

const useApi = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1${endpoint}`);
                const result = await response.json();
                if (result.success) {
                    setData(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};
```

---

## 🔍 **Search & Filter Guidelines**

### Search Parameters
- Use `search` parameter for text-based searches
- Search is case-insensitive and uses partial matching
- Multiple words are treated as separate search terms

### Pagination
- Default page size: 15 items
- Use `per_page` to control page size (max: 100)
- Use `page` parameter for pagination

### Sorting
- Default sort: `created_at DESC`
- Use `sort_by` and `sort_order` parameters
- Available sort fields vary by endpoint

---

## 📊 **Data Relationships**

- **Categories** → have many **Projects**
- **Users** → have many **Ideas**
- **Projects** → belong to **Category**
- **Ideas** → belong to **User**
- **Posts** → standalone entities

---

## 🚀 **Best Practices**

1. **Always check the `success` field** in responses
2. **Handle validation errors** from 422 responses
3. **Use pagination** for large datasets
4. **Implement proper error handling** for network failures
5. **Cache frequently accessed data** like categories
6. **Use search parameters** to reduce data transfer
7. **Validate user input** before sending requests

---

**Last Updated:** September 12, 2025  
**API Version:** 1.0.0