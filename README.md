# JustCoreMarc
Project to facilitate the bidding of bus runs

## Run for development
1. Setup .env file
2. npm install
3. npm run dev

## Services:

### /

GET / HTTP/1.1  
Host: localhost:3000  
  
### /v1/createuser

POST /v1/createuser HTTP/1.1  
Host: localhost:3000  
Content-Type: application/json  
  
payload structure:
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

### /v1/login

POST /v1/login HTTP/1.1  
Host: localhost:3000  
Content-Type: application/json  
  
payload structure: 
```javascript
{
	"username" : "Corey2",
	"password" : "martinmartin"
}
```

### /v1/logout

GET /v1/logout HTTP/1.1  
Host: localhost:3000  