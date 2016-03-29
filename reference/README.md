# 架構說明

使用 gulp + webpack + typescript(可選) + AngularJS 1.X(可選) + html-webpack-plugin + requireJS(可選) 的架構演示各種不同類型網站整合在同一個 gulp 建構工具架構下，並且能符合各種情況。

## 執行建構

```shell
$ npm install
$ tsd install

$ npm run dev          // 測試模式發佈
$ npm run dev:minify   // 測試模式 + minify
$ npm run dev:watch    // livereload監控
$ npm run dev:server   // webpack-dev-server監控
$ npm run release      // 正式模式發佈 + minify

```

> 測試模式下，能由 html 上將網站 config 設定覆寫掉.
> 
> webpack-dev-server 監控時編譯速度較快，But 不是經由 webpack 即時產出的資源無法預覽，可以先 npm run dev，再 npm run dev:server ，HTML 則皆須經由 html-webpack-plugin 才能預覽.
>
> livereload 監控稍慢些，但是都會輸出成實體檔案所以適合情況比 webpack-dev-server 監控廣泛.