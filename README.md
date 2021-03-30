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

```
Update Plant Object for PUT requests to /plants/:id
{ 
user_id: required comes from params.id,
nickname: required, unique,
species: string, optional, defaults to ("Unknown")
image: string, optional, defaults to (null),
water: string, required format is "2021-01-28",
H2OFrequency: string, required
}
```

Plant object for POST requests to /users/:id/plants
```
{	id: integer, database generated
	nickname: string, required, unique,
	species: string, optional, defaults to ("Unknown")
	H2OFrequency: string, required,
	image: string, optional, defaults to (null),
	user_id: requiered comes from params.id,
	water: string, required format is "2021-01-28"
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


