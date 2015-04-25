angular.module('starter.services', [])
    /////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////                    Local storage service                   /////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    .factory('$localStorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            clear: function () {
                $window.localStorage.clear();

            }
        }
    }])


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////               Project service                 ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

    .factory('ProjectService', function ($q, $http, $localStorage) {

        return {
            getProjects: function () {
                var dfd = $q.defer()

                var _target_url = 'http://ashish.staging.workinggrouplink.com/erapis/v2/projects.json?access_token='
                    + $localStorage.get('access_token', null)

                $http.get(_target_url).
                    success(function (data, status, headers, config) {
                        console.log(JSON.stringify(data), 'success')
                        dfd.resolve(data)
                    }),
                    error(function (data, status, headers, config) {
                        console.log(JSON.stringify(data), 'error')
                    });

                return dfd.promise
            },
            createProject: function(options) {
                console.log(JSON.stringify(options));
                var dfd = $q.defer()

                var _target_url = 'http://ashish.staging.workinggrouplink.com/erapis/v2/projects.json?access_token='
                    + $localStorage.get('access_token', null)


                var req = {
                    method: 'POST',
                    url: _target_url,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    params: {
                        name: optioncs.parameters.name,
                        billing_code: options.parameters.billing_code,
                        client_name: options.parameters.client_name
                    }
                }

                $http(req)
                    .success(function(data){
                        console.log('created', JSON.stringify(data))
                        alert("Project successfully created");
                        $state.go(app.project_new,{}, {reload:true})
                    })
                    .error(function(data){
                        console.log('Error', JSON.stringify(data))
                    });


                return dfd.promise

            }
        }


    }).filter('checkmark', function() {
        return function(input) {
            console.log(input)
            //return input ? '\u2713' : '\u2718';
        };
    })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////                 Organization Service                 /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    .factory('OrganizationService', function ($q, $http, $localStorage) {

        return {
            getOrganizations: function (project_id) {
                var dfd = $q.defer()

                var _target_url = 'http://ashish.staging.workinggrouplink.com/erapis/v2/organizations.json?access_token='
                    + $localStorage.get('access_token', null) + '&project_id=' + project_id

                $http.get(_target_url).
                    success(function (data, status, headers, config) {
                        console.log(JSON.stringify(data), 'success')
                        dfd.resolve(data)
                    }).
                    error(function (data, status, headers, config) {
                        console.log(JSON.stringify(data), 'error')
                    });

                return dfd.promise
            }
        }
    })