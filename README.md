# JustCoreMarc
Project to facilitate the bidding of bus runs

## How to run
1. npm install
2. npm run start

## Services:

### /

Method: GET

### /v1/createuser

Method: POST 
payload structure: 
```javascript
{
	"username" : "Foo",
	"password" : "foo"
}
```

### /v1/login

Method: POST
payload structure: 
```javascript
{
	"username" : "Foo",
	"password" : "foo"
}
```

### /v1/logout

Method: GET 