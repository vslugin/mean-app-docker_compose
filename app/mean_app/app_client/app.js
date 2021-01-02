(function() {

    angular.module('myApp', ['ngRoute']);

    function config($routeProvider) {

        $routeProvider
            // .when('/', {
            //         templateUrl: 'index/index.html',
            //         controller: 'indexController',
            //         controllerAs: 'vm'
            //     }
            // ).when('/page1', {
            //     templateUrl: 'page1/page1.html',
            //     controller: 'page1Controller',
            //     controllerAs: 'vm'
            // }
            .when('/login', {
                templateUrl: 'login/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            },
            )
            .when('/logout', {
                    templateUrl: 'logout/logout.html',
                    controller: 'logoutController',
                    controllerAs: 'vm'
                },
            )
            .when('/list', {
                    templateUrl: 'list/list.html',
                    controller: 'listController',
                    controllerAs: 'vm'
            },
            ).when('/add', {
                templateUrl: 'add/add.html',
                controller: 'addController',
                controllerAs: 'vm'
            },
            ).when('/edit/:id', {
                    templateUrl: 'edit/edit.html',
                    controller: 'editController',
                    controllerAs: 'vm'
            }

        ).otherwise({redirectTo: '/list'});

    }

    angular.module('myApp')
        .config(['$routeProvider', config]);

})();