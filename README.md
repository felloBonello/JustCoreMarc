# JustCoreMarc
Project to facilitate the bidding of bus runs  

## Run for development
1. Setup .env file  
2. npm install  
3. npm run dev  

## Services:
  
### POST /v1/createuser
Creates a user with the information supplied in the body.  
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
Returns an OAuth token in JWT if a successful login occured.  
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

### GET /v1/userinfo
Returns all information about the user.  
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

### GET /v1/workItems
Retrieves all available work items.  
##### Headers
Authorization: _token here_  
##### Response
```javascript
{
    "workItems": [
        {
            "workId": 103,
            "hasDetails": 0,
            "employeeId": null,
            "daysOff": [
                {
                    "day": "M"
                }
            ],
            "runs": [
                {
                    "runId": 7,
                    "workId": 103,
                    "routeNumber": 1,
                    "runNumber": 3,
                    "daysOn": "M-F",
                    "releasePoint": "G-H",
                    "timeOn": "05:49",
                    "timeOff": "03:24",
                    "endPoint": "DWS",
                    "platformTime": "09:35:00",
                    "reportTime": "00:15:00",
                    "travelTime": null,
                    "pays": "10:00:00",
                    "spreadTime": null,
                    "specialDetails": null,
                    "isShowUp": 0
                },
                {
                    "runId": 8,
                    "workId": 103,
                    "routeNumber": 16,
                    "runNumber": 3,
                    "daysOn": "SAT",
                    "releasePoint": "G-H",
                    "timeOn": "06:46",
                    "timeOff": "04:29",
                    "endPoint": "DAS",
                    "platformTime": "09:43:00",
                    "reportTime": "00:15:00",
                    "travelTime": null,
                    "pays": "10:00:00",
                    "spreadTime": null,
                    "specialDetails": null,
                    "isShowUp": 0
                }
            ]
        },
        {
            "workId": 104,
            "hasDetails": 0,
            "employeeId": null,
            "daysOff": [
                {
                    "day": "L"
                }
            ],
            "runs": [
                {
                    "runId": 9,
                    "workId": 104,
                    "routeNumber": 1,
                    "runNumber": 4,
                    "daysOn": "M-F",
                    "releasePoint": "G-H",
                    "timeOn": "06:16",
                    "timeOff": "03:39",
                    "endPoint": "DWS",
                    "platformTime": "09:23:00",
                    "reportTime": "00:15:00",
                    "travelTime": null,
                    "pays": "10:00:00",
                    "spreadTime": null,
                    "specialDetails": null,
                    "isShowUp": 0
                },
                {
                    "runId": 10,
                    "workId": 104,
                    "routeNumber": 1,
                    "runNumber": 2,
                    "daysOn": "SAT",
                    "releasePoint": "G-H",
                    "timeOn": "05:53",
                    "timeOff": "03:25",
                    "endPoint": "DWN",
                    "platformTime": "09:32:00",
                    "reportTime": "00:15:00",
                    "travelTime": null,
                    "pays": "10:00:00",
                    "spreadTime": null,
                    "specialDetails": null,
                    "isShowUp": 0
                }
            ]
        }
    ]
}
```

### GET /v1/workitems/me
Retrieves all work items a driver owns.  
##### Headers
Authorization: _token here_  
##### Response
```javascript
{
    "workItems": [
        {
            "workId": 102,
            "hasDetails": 0,
            "employeeId": 1,
            "daysOff": [
                {
                    "day": "Q"
                }
            ],
            "runs": [
                {
                    "runId": 3,
                    "workId": 102,
                    "routeNumber": 1,
                    "runNumber": 2,
                    "daysOn": "M-F",
                    "releasePoint": "G-H",
                    "timeOn": "07:35",
                    "timeOff": "12:09",
                    "endPoint": "DWN",
                    "platformTime": null,
                    "reportTime": null,
                    "travelTime": null,
                    "pays": null,
                    "spreadTime": null,
                    "specialDetails": null,
                    "isShowUp": 0
                },
                {
                    "runId": 4,
                    "workId": 102,
                    "routeNumber": 14,
                    "runNumber": 1,
                    "daysOn": "M-F",
                    "releasePoint": "HIBS",
                    "timeOn": "02:50",
                    "timeOff": "06:16",
                    "endPoint": "HIBN",
                    "platformTime": "08:00:00",
                    "reportTime": "00:15:00",
                    "travelTime": null,
                    "pays": "08:15:00",
                    "spreadTime": "00:45:00",
                    "specialDetails": null,
                    "isShowUp": 0
                },
                {
                    "runId": 5,
                    "workId": 102,
                    "routeNumber": 1,
                    "runNumber": 3,
                    "daysOn": "SAT",
                    "releasePoint": "G-H",
                    "timeOn": "06:23",
                    "timeOff": "11:27",
                    "endPoint": "DWN",
                    "platformTime": null,
                    "reportTime": null,
                    "travelTime": null,
                    "pays": null,
                    "spreadTime": null,
                    "specialDetails": null,
                    "isShowUp": 0
                },
                {
                    "runId": 6,
                    "workId": 102,
                    "routeNumber": 21,
                    "runNumber": 7,
                    "daysOn": "SAT",
                    "releasePoint": "RC",
                    "timeOn": "02:00",
                    "timeOff": "05:00",
                    "endPoint": "RK",
                    "platformTime": "08:04:00",
                    "reportTime": "00:15:00",
                    "travelTime": null,
                    "pays": "08:15:00",
                    "spreadTime": "00:30:00",
                    "specialDetails": null,
                    "isShowUp": 0
                }
            ]
        }
    ]
}
```

### POST /v1/selectWorkItem
Allows a driver to claim a work item, a work item contains multiple runs.  
##### Headers
Authorization: _token here_
#### Request
```javascript
{
    "workId": 101
}
```
#### Request
```javascript
{
  "affectedRows": 1
}
```