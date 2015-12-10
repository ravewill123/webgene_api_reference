export function register(app) {
    ////////////// controller /////////////


    app.controller('headerCtrl',
        ['$scope', '$stateParams', '$state', '$timeout', 'getSearch',
            function($scope, $stateParams, $state, $timeout, getSearch) {

                $scope.loading = false;
                $scope.$on('loading', (event, bo) => {
					$scope.loading = bo;
                });

            }]);


    ////////////// controller /////////////
}