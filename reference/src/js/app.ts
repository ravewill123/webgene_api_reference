/// <reference path="declare.d.ts" />
import * as config from './config';


var app = angular.module('app', ['ui.router', 'ngSanitize', 'ngAnimate'])
//////////////////////////////////////////////////////
// 初始資料
//////////////////////////////////////////////////////
.run([  '$rootScope', '$state', '$stateParams', 'webPath', '$window', 'getSearch',
function($rootScope,   $state,   $stateParams,   webPath,   $window,   getSearch) {
	$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.data = {};
    $rootScope.fb = {};
    $rootScope.setting = config.setting;

    // FB init
    $window.fbAsyncInit = () => {
        FB.init({ 
          appId: config.setting.appID,
          status: true, 
          cookie: true, 
          xfbml: true,
          version: 'v2.5'
        });
        FB.getLoginStatus( response => {
            if (response.status === 'connected') {
                // 確認權限
                FB.api('/me/permissions', {}, (fbResponse:any) => {
                    let havePermission = false;
                    if (fbResponse) {
                        for (let i = 0; i < fbResponse.data.length; i++) {
                            if (fbResponse.data[i].permission == 'email') {
                                havePermission = true;
                                break;
                            }
                        }
                        if (havePermission) {
                            $rootScope.fb.accessToken = response.authResponse.accessToken;
                            $rootScope.fb.uid = response.authResponse.userID;
                            $rootScope.$broadcast('FBConnected');
                        }else{
                            $rootScope.$broadcast('FBNotPermission');
                        }
                    }
                });
            } else if (response.status === 'not_authorized') {
                $rootScope.$broadcast('FBNotConnected');
                
            } else {
                $rootScope.$broadcast('FBNotConnected');
                
            }
        });
    };
    (d => {
	        var js,
	            id = 'facebook-jssdk',
	            ref = d.getElementsByTagName('script')[0];
	        if (d.getElementById(id)) {
	            return;
	        }
	        js = d.createElement('script');
	        js.id = id;
	        js.async = true;
	        js.src = "//connect.facebook.net/zh_TW/sdk.js";
	        ref.parentNode.insertBefore(js, ref);
	})(document);

}])
//////////////////////////////////////////////////////
// 設定路由
//////////////////////////////////////////////////////	
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
function( $stateProvider,   $urlRouterProvider,   $httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    // 404
    $urlRouterProvider
    .otherwise('/index/');
    // state
    $stateProvider
        .state('home', {
            url: '',
            // templateUrl: 'template/header.html',
            template: require("raw!../template/header.html"),
            controller: 'headerCtrl',
            abstract: true
        })
        .state('home.index', {
            url: '/index/:fb',
            template: require("raw!../template/index.html"),
            controller: 'indexCtrl'
        })
        .state('home.three', {
            url: '/three',
            template: require("raw!../template/three.html"),
            controller: 'threeCtrl'
        });

}]);


//////////////////////////////////////////////////////
// register factory
//////////////////////////////////////////////////////

import factoryLibs = require('./factory/libs.ts');
factoryLibs.register(app);


//////////////////////////////////////////////////////
// register controller
//////////////////////////////////////////////////////

import headerCtrl = require('./controller/headerCtrl.ts');
headerCtrl.register(app);

import indexCtrl = require('./controller/indexCtrl.ts');
indexCtrl.register(app);

import threeCtrl = require('./controller/threeCtrl.ts');
threeCtrl.register(app);






// 預載圖片
var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.loadManifest(['img/snow.png']);
function handleComplete() {
    // 啟動angular
    angular.bootstrap(document, ['app']);
}