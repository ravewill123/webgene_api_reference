#WebGene 資料夾結構與程式規範


## Folder Map

```	
	/admin     
	/api
	/asset
		/video
		/audio
		/svg
	/css
	/font
	/img
	/js
		/vendor
	/mobile
		/css
		/js
			/vendor
		/asset
	/sass
		/partial
		/page
	/template
	/upload	
	
```


## Folder Description

folder              |    Description   
--------------------|-------------------------------
/admin              |  後台資料夾
/api                |  應用程式接口
/asset              |  網站資源檔案 , e.g. json , xml 
/video              |  網站影片檔
/audio              |  網站音檔
/svg                |  svg 向量圖檔
/sass               |  sass 未編譯檔案
/partial            |  sass 網站共通元件
/page               |  sass 特殊版面css
/css                |  css 檔案
/font               |  引入字體檔 
/img                |  網站圖片檔
/js                 |  javascript檔案
/vendor             |  第三方程式庫
/template           |  網站樣板
/mobile             |  行動裝置站台
/upload             |  後台上傳資料夾


        

##JS文件命名
> 頁面+Page.js -- indexPage.js
>
> 功能+.js -- menu.js, service.js
>
> 模塊功能+.js -- service.ng.js, service.js


##文件縮排
使用4空白縮排

```
 var city = new Backbone.Collection([
     {name: "Taipei"},
     {name: "Taichung"},
     {name: "Kaohsiung"}
 ]);
 

 <ul>
     <li class="item1"><a href="rule.html">活動辦法</a></li>
     <li class="item4"><a href="winner.html">得獎名單</a></li>
     <li class="item6"><a href="index.html">回首頁</a></li>
 </ul>
```

##變數命名

一般小寫駝峰型 - lower camel case,

除非是常用的縮寫，否則用完整英文名，無意義迴圈變數除外，例如 var i;

```
 // 一般
 var city, photoSize, articleList, variableNamesLikeThis;
```

## 全域變數用全大寫_連接
非必要盡量避免使用全域變數

```
 var FB;
 var APP;
 var SERVER_CONFIG;
 window.STATE;
```

##Function名稱
用完整英文名

可被new出來建構式函式的開頭大寫

```
 var sidebar = {
     move: function() {},
     scroll: function() {}
 }
 
 // 可被new的函式開頭大寫
 var ClassName = function() {
     ...
 }
 new ClassName();
 var MyClass = some.long.namespace.MyClass;
 new MyClass();
```

##註解
能註解就要寫註解

```
 /**
  * 註解說明
  *
  * @param {Array} list
  * @param {Object} values
  * @return {Boolean} return 是否存在
  */
 function checkList(list, values) {
     return true;
 }
 
 /////////////////
 // About 
 /////////////////
 
 function about() {
     ...
 }
 
 /////////////////
 // 航班查尋 
 /////////////////
 
 function searchFlight() {
 
 }
 
 /* 註解 */
 // 註解
 
```

##程式各自獨立的功能要有各自的scope
程式碼拆成小區塊，Debug比較容易，不要全混在一起增加複雜性

scope各自獨立減少程式衝突的情況

```
 (function() {
     var count = 0;
     function init() {
         count = 1;
     }
     
     function addFish() {
         count++;
     }
 })();
 
 var APP = {
     count: 0,
     initialize: function() {},
     addFish: function() {}
 }
 
 $(function() {
     window.VERSION = 'v1';
     window.init = function (){
     
     }
     ...
 });
```

##推薦framework或library
> Underscore.js -- 有各種完整的輔助函式可用，能讓程式碼更簡潔，讓自己寫的程式碼更容易觀看。
>
> AngularJS -- 加快網頁開發速度降低開發複雜度。
>
> ui-router -- 讓AngularJS使用router更靈活
