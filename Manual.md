##### Delete an entire project
- endpoint "/api/deleteproject", 
- method: delete
- protected route: true
- request body: sessionToken, authenticated, user, projectId
```javascript
    {
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWQwMjlkNjNhYzg4MWU5ZDliMTdhNyIsImlhdCI6MTY3NjUzOTgwOSwiZXhwIjoxNjc2NTQwNDA5fQ.JyzLdRL71cXKNb_JQpOncngPebUPZR3Kd7KyPogPaG8",
        "authenticated": true,
        "user": {
            "_id": "63ed029d63ac881e9d9b17a7",
            "username": "chatbot 4",
            "email": "chatbot4@email.com",
            "password": null,
            "activeProject": "DF",
            "projects": [
                "63ed029d63ac881e9d9b17aa"
            ],
            "__v": 1
        },
    "projectId": "63edfcf20464988652e34d48"
}
```

