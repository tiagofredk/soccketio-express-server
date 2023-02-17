##### Delete Project
- endpoint "/api/deleteproject"
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


##### Create Channel
- endpoint "/api/newchannel"
- method: post
- protected route: true
- request body: sessionToken: string, user: {}, projectId: string, newChannel: string
- cookie: withCredentials: true
 
```javascript
    {
    "newChannel": "Meetings",
    "projectId": "63ef47de74bb7f355622324e",
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWY0N2RlNzRiYjdmMzU1NjIyMzI0YiIsImlhdCI6MTY3NjYyNTg4NiwiZXhwIjoxNjc2NjI2NDg2fQ.bp4jP-jWVBWpl-w5u3CBRqVF9pjJx-8QAhi8KSwOAxY",
        "user": {
            "_id": "63ef47de74bb7f355622324b",
            "username": "chat bot 3",
            "email": "chatbot3@email.com",
            "activeProject": "DF",
            "projects": [
                "63ef47de74bb7f355622324e"
            ],
            "__v": 1,
            "password": null
        }
}
```

##### Create Channel
- endpoint "/api/newchannelmessage"
- method: post
- protected route: true
- request body: sessionToken: string, user: {}, projectId: string, newChannel: string
- cookie: withCredentials: true
 
```javascript
    {
    "newChannel": "Meetings",
    "projectId": "63ef47de74bb7f355622324e",
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWY0N2RlNzRiYjdmMzU1NjIyMzI0YiIsImlhdCI6MTY3NjYyNTg4NiwiZXhwIjoxNjc2NjI2NDg2fQ.bp4jP-jWVBWpl-w5u3CBRqVF9pjJx-8QAhi8KSwOAxY",
        "user": {
            "_id": "63ef47de74bb7f355622324b",
            "username": "chat bot 3",
            "email": "chatbot3@email.com",
            "activeProject": "DF",
            "projects": [
                "63ef47de74bb7f355622324e"
            ],
            "__v": 1,
            "password": null
        }
}
```

##### New Channel Message
- endpoint "/api/newchannelmessage"
- method: post
- protected route: true
- request body: sessionToken: string, user: {}, channelId: string, message: string
- cookie: withCredentials: true,

```javascript
    {
    "message": "This is a new idea from chat bot 3, to channel New Ideas",
    "channelId": "63ef4a378297794db121cdc4",
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWY0N2RlNzRiYjdmMzU1NjIyMzI0YiIsImlhdCI6MTY3NjYyNTg4NiwiZXhwIjoxNjc2NjI2NDg2fQ.bp4jP-jWVBWpl-w5u3CBRqVF9pjJx-8QAhi8KSwOAxY",
        "user": {
            "_id": "63ef47de74bb7f355622324b",
            "username": "chat bot 3",
            "email": "chatbot3@email.com",
            "activeProject": "DF",
            "projects": [
                "63ef47de74bb7f355622324e"
            ],
            "__v": 1,
            "password": null
        }
}
```

##### Delete Channel
- endpoint "/api/deletechannel"
- method: delete
- protected route: true
- request body: sessionToken: string, user: {}, projectId: string, channelDump: channelId string
- cookie: withCredentials: true,

```javascript
    {
    "channelDump": "63ef4c02a01989b2257156c1",
    "projectId": "63ef47de74bb7f355622324e",
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWY0N2RlNzRiYjdmMzU1NjIyMzI0YiIsImlhdCI6MTY3NjYyNTg4NiwiZXhwIjoxNjc2NjI2NDg2fQ.bp4jP-jWVBWpl-w5u3CBRqVF9pjJx-8QAhi8KSwOAxY",
        "user": {
            "_id": "63ef47de74bb7f355622324b",
            "username": "chat bot 3",
            "email": "chatbot3@email.com",
            "activeProject": "DF",
            "projects": [
                "63ef47de74bb7f355622324e"
            ],
            "__v": 1,
            "password": null
        }
}
```

