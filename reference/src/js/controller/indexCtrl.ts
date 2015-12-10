import * as config from '../config';

export function register(app) {
////////////// controller /////////////


	app.controller('indexCtrl',
			['$scope', '$stateParams', '$state', '$timeout', '$http', 'webPath',
	function( $scope,   $stateParams,   $state,   $timeout,   $http,   webPath) {

		var connectedListener, notConnectedListener;
		$scope.$on(
			"$destroy",
			function() {
				if (connectedListener) connectedListener();
				if (notConnectedListener) notConnectedListener();
			}
		);

		$scope.issue = '';

		if ($stateParams.fb == 'logined') {
			$scope.$emit('loading', true);
			if ($scope.fb.accessToken == undefined) {
				connectedListener = $scope.$on('FBConnected', () => {
					$scope.step = 'logined';
					$scope.$apply(() => {
						$scope.$emit('loading', false);
						$state.go('home.three');
					});
				});
				notConnectedListener = $scope.$on('FBNotConnected', () => {
					$scope.issue = '尚未允許應用程式';
					$scope.$apply(() => {
						$scope.$emit('loading', false);
					});
				});
			}else{
				$scope.step = 'logined';
				$scope.$emit('loading', false);
			}
		}else{
			$scope.step = $scope.fb.accessToken ? 'logined' : 'login';
		}
		

		$scope.login = () => {
			$scope.$emit('loading', true);
			window.location.href = `https://www.facebook.com/dialog/oauth?scope=email&client_id=${config.setting.appID}&redirect_uri=` + encodeURIComponent( webPath + `Default.html#/index/logined` );
		}

	}]);


////////////// controller /////////////
}




