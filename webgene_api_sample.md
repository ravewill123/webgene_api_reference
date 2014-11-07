#WEBGENE API SAMPLE 

##![icon][1] 註冊新使用者

![img](http://blog.webgene.com.tw/wp-content/uploads/2013/08/531790_10151762254634275_727473753_n.jpg)

API情境說明與注意事項，例如：登入身分驗證於登入頁面時存於Session，前端程式不再 POST 相關資訊，這邊僅回傳 User 額外填寫資訊。

###Method
> `POST` user.php

###Parameters

Param | Type | Description  | Option 
--------|-------|----------|------|------
[name][2]| string | user 全名 | M| 
[email][2] | string | user email | M| 
[tel][2] | string | user 手機 | O|
[friends][2] | JSON | 朋友uid清單使用 "," 分隔 | M

**`M- Mandatory, O - Optional`**


> **e.q.**
>
>`friends`: ["100005896","1000566322","10005531"]

###Response

* `code`: 正常200, 有錯誤時500
* `message`: 錯誤訊息 ( code=200時回覆 _**null**_ ).
* `user_id`: 使用者ID. 

```
{
	"code":200,
	"message":null,
	"user_id":13
}
```

<br/><br/><br/><br/>

##![icon][1] 註冊新使用者

![img](http://blog.webgene.com.tw/wp-content/uploads/2013/08/531790_10151762254634275_727473753_n.jpg)

API情境說明與注意事項，例如：登入身分驗證於登入頁面時存於Session，前端程式不再 POST 相關資訊，這邊僅回傳 User 額外填寫資訊。

###Method
> `POST` user.php

###Parameters

Param | Type | Description  | Option 
--------|-------|----------|------|------
[name][2]| string | user 全名 | M| 
[email][2] | string | user email | M| 
[tel][2] | string | user 手機 | O|
[friends][2] | JSON | 朋友uid清單使用 "," 分隔 | M

**`M- Mandatory, O - Optional`**


> **e.q.**
>
>`friends`: ["100005896","1000566322","10005531"]

###Response

* `code`: 正常200, 有錯誤時500
* `message`: 錯誤訊息 ( code=200時回覆 _**null**_ ).
* `user_id`: 使用者ID. 

```
{
	"code":200,
	"message":null,
	"user_id":13
}
```

    


<br/><br/><br/>
_**Icon from [Glyphicons][0]**_

[0]: http://glyphicons.com/ "Glyphicons"
[1]: https://raw.githubusercontent.com/ravewill123/webgene_api_reference/evan/glyphicons/png/glyphicons_036_file.png "API Item"
[2]: "#"