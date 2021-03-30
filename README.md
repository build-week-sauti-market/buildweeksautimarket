# Backend buildweeksautimarket
API URL: https://buildweeksautimarket.herokuapp.com/


Users object:
```
{	id: integer created by the database,
	user_name: string, required,unique
	password: string, required,max 18 characteres
  
}
```
```
POST to /auth/market/registration
{ username: string, required, unique,
  password: string, required,
  location: sting
 }
 
 POST to /auth/market/login
 { username: string, required
   password: string, required
 }
 
  
 POST to /auth/market/logout
 { username: string, required
   password: string, required
 }
 ```
	

API Methods:

| Action	| Method|	Route |
|---------------|-------|-------------|
| Login		|POST	| api/auth/login|
| Register	|POST	|api/auth/register|
| logout urer |POST	|api/auth/:id	|
|Get Market Info|GET   |api/auth/market	|
|GET Market Info By Id	|GET  |api/auth/market/:id|
|POST Market Info|POST 	|api/auth/market |
|Updtade Market Info |PUT	|api/auth/market/:id|
| Delete Market Info	|DELETE	|api/auth/market/:id|	


