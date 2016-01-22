export function register(app) {
    ////////////// factory /////////////


    app.factory('getSearch', function() {
        return function(name) {
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (!results) {
                return 0;
            }
            return results[1] || 0;
        }
    })
        .factory('webPath', function() {
            var path;
            if (location.hash != "") {
                path = location.href.split(location.hash).slice(0, -1)[0];
            } else {
                path = location.href;
            }
            return path.split("/").slice(0, -1).join('/') + '/';
        })
        .factory('facebookService', ['$q', function($q) {
            return {
                me: function() {
                    var deferred = $q.defer();
                    FB.api('/me', {
                        fields: 'id,email,name'
                    }, function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            deferred.resolve(response);
                        }
                    });
                    return deferred.promise;
                },
                login: function() {
                    var deferred = $q.defer();
                    FB.login(function(response) {
                        deferred.resolve(response);
                    }, {
                            scope: 'email',
                            return_scopes: true
                        });
                    return deferred.promise;
                }
            }
        }])
        .factory('serializeData', function() {
            return function(data) {
                if (!angular.isObject(data)) {
                    return ((data == null) ? "" : data.toString());
                }
                var buffer = [];
                for (let name in data) {
                    if (!data.hasOwnProperty(name)) {
                        continue;
                    }

                    var value = data[name];

                    buffer.push(
                        encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value)
                    );
                }
                var source = buffer.join("&").replace(/%20/g, "+");
                return (source);
            }
        });


    ////////////// factory /////////////
}