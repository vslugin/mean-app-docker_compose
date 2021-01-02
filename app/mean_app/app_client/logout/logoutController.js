(function() {
    function logoutController($window) {
        localStorage.removeItem('token');
        $window.location.href = '/#/login';
    }

    angular.module('myApp')
        .controller('logoutController', logoutController);
})();