#WEBGENE API SAMPLE


#![icon][1] 註冊新使用者

![img](http://blog.webgene.com.tw/wp-content/uploads/2013/08/531790_10151762254634275_727473753_n.jpg)

API情境說明與注意事項，例如：登入身分驗證於登入頁面時存於Session，前端程式不再 POST 相關資訊，這邊僅回傳 User 額外填寫資訊。

###API
> #### user.php

###Request Parameters

> **POST** *`M- Mandatory, O - Optional`*

Param    |    Type  | Description  |Option 
---------|:--------:|--------------|:-----:
name     | *string* | user 全名     | M |
email    | *string* | user email   | M |
phone      | *string* | user 手機, 驗證09開頭10個數字字元 | O |
friends  | *json*   | 朋友uid清單 ["100005896","1000566322"] | M


> **GET** *`M- Mandatory, O - Optional`*

Param    |    Type  | Description  |Option 
---------|:--------:|--------------|:-----:
r        | *string* | 亂數: new Date().getTime() | O | 


> **e.q.**
> 
> "user.php?r=" + new Date().getTime()
> 
> 額外想記錄下來的寫法，例如FB分享的組網址方式之類，透過實際程式碼更能理解規則。



###Response JSON

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



#![icon][1] 讀取使用者清單

![img](http://blog.webgene.com.tw/wp-content/uploads/2013/08/531790_10151762254634275_727473753_n.jpg)

API情境說明與注意事項，例如：登入身分驗證於登入頁面時存於Session，前端程式不再 POST 相關資訊，這邊僅回傳 User 額外填寫資訊。

###API
> #### getUser.php

###Request Parameters

> **GET** *`M- Mandatory, O - Optional`*

Param    |    Type  | Description  |Option 
---------|:--------:|--------------|:-----:
r        | *string* | 亂數防快取     | O | 



###Response XML

* `name`: user 全名
* `email`: user email
* `phone`:user 手機
* `friends`: 使用者uid

```
<?xml version="1.0"?>
<data>
 <user>
     <name><![CDATA[name]]></name>
     <email>mail@webgene.com.tw</email>
     <phone>0987654321</phone>
     <friends>
         <uid>100005896</uid>
         <uid>1000566322</uid>
     </friends>
 </user>
 <user>
     <name><![CDATA[name]]></name>
     <email>mail@webgene.com.tw</email>
     <phone>0987654321</phone>
     <friends>
         <uid>100005896</uid>
         <uid>1000566322</uid>
     </friends>
 </user>
</data>
```



_**Icon from [Glyphicons][0]**_

[0]: http://glyphicons.com/ "Glyphicons"
[1]: https://raw.githubusercontent.com/ravewill123/webgene_api_reference/evan/glyphicons/png/glyphicons_036_file.png "API Item"
[2]: "#"