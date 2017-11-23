# JustCoreMarc
Project to facilitate the bidding of bus runs  

## Run for development
1. Setup .env file  
2. npm install  
3. npm run dev  

## Services:
  
### POST /v1/createuser
#### Headers
Content-Type: application/json  
##### Request
```javascript
{
  "firstName" : "Corey",
  "lastName" : "Martin",
  "email" : "Corey@god.com",
  "dateOfBirth" : "1990/01/01",
  "employeeNumber" : 2,
  "username" : "Corey2",
  "password" : "password"
}
```
##### Response
```javascript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxLCJmaXJzdE5hbWUiOiJDb3JleSIsImxhc3ROYW1lIjoiTWFydGluIiwiZW1haWwiOiJDb3JleUBnb2QU9mQmlydGgiOiIxOTkwLTAxLTAxVDA1OjAwOjAwLjAwMFoiLCJlbXBsb3llZU51bWJlciI6MSwic2VuaW9yaXR5IjpudWxsLCJ1c2VybmFtZSI6IkNvcmV5IiwiaWF0IjoxNTA2NDQ0ODk0fQ.lvW_3YzM3XHDbdY6ql8-o3-K0WJ7OGnE3CSRs0sB2-E"
}
```

### POST /v1/login
##### Headers
Content-Type: application/json  
##### Request 
```javascript
{
  "username" : "Corey2",
  "password" : "foo"
}
```
#### Response
```javascript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxLCJmaXJzdE5hbWUiOiJDb3JleSIsImxhc3ROYW1lIjoiTWFydGluIiwiZW1haWwiOiJDb3JleUBnb2QU9mQmlydGgiOiIxOTkwLTAxLTAxVDA1OjAwOjAwLjAwMFoiLCJlbXBsb3llZU51bWJlciI6MSwic2VuaW9yaXR5IjpudWxsLCJ1c2VybmFtZSI6IkNvcmV5IiwiaWF0IjoxNTA2NDQ0ODk0fQ.lvW_3YzM3XHDbdY6ql8-o3-K0WJ7OGnE3CSRs0sB2-E"
}
```

### GET /v1/runs
##### Headers
Authorization: _token here_  
##### Response
```javascript
{
  "runs": [
    {
      "id": 1,
      "busRoute": 1,
      "startTime": "06:22:00",
      "endTime": "02:48:00",
      "startLocation": "G-H",
      "endLocation": "DWS",
      "daysOff": "Q"
    },
    ...
    ...
  ]
}
```

### GET /v1/userinfo
##### Headers
Authorization: _token here_  
#### Response
```javascript
{
  "decoded": {
    "employeeId": 1,
    "firstName": "Foo",
    "lastName": "Bar",
    "email": "Foo@bar.com",
    "dateOfBirth": "1990-01-01T05:00:00.000Z",
    "employeeNumber": 1,
    "seniority": 353,
    "isAllowed": true,
    "username": "Foo",
    "iat": 1506444894
  }
}
```

### POST /v1/selectWorkItem
##### Headers
Authorization: _token here_
#### Request
```javascript
{
    "workId": 101,
}
```
#### Request
```javascript
{
  "affectedRows": 1
}
```