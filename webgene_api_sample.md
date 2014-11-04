#WEBGENE API SAMPLE 

##Add New User

###Diagram
![img](http://blog.webgene.com.tw/wp-content/uploads/2013/08/531790_10151762254634275_727473753_n.jpg)

writing down this api description here …. if nothing to say , u can leave blank here….. 

###Method
> `POST` user.php

###Paramaters

* `name`: Full Name of user.
* `email`: Email of user.
* `tel`: Phone number of user.

Param | Type | Description
--------|-------|--------------
`name`| string | user fullname 
`email` | string | user email 
`tel` | string | user cell

###Response

* `code`: Request status code.
* `message`: Error message (if no error will be _**null**_).
* `user_id`: User identity number from database. 

```
{
	"code":200,
	"message":"success",
	"user_id":13
}
```

<br/>

##Remove User Data

###Diagram
![img](http://blog.webgene.com.tw/wp-content/uploads/2013/08/531790_10151762254634275_727473753_n.jpg)

###Method
> `POST` user_delete.php

###Paramaters

* `id`: User identity number.

Param | Type | Description
--------|-------|--------------
`id`| int | user id 

###Response

* `code`: Request status code.
* `message`: Error message (if no error will be _**null**_).
* `user_id`: User identity number from database. 

```
{
	"code":200,
	"message":"success",
}
```
    
