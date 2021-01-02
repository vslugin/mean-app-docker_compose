(function() {
    function loginController($http, $window) {
        var vm = this;
        vm.pageTitle='Вход в систему';

        vm.isInvalidForm = true;
        vm.fLogin = "";
        vm.fPassword = "";
        vm.errorMsg = "";

        vm.login = function () {

            $http.post('/api/login', {name:vm.fLogin, password:vm.fPassword})
                .success(function (data) {
                    localStorage.setItem('token', data.token);
                    $window.location.href = '/#/list';

            }).error(function (err) {
                vm.errorMsg = 'Ошибка входа: ' + err.message;
            })

        };

        vm.validate = function () {
            vm.errorMsg = "";
            vm.isInvalidForm = !(vm.fLogin.length >= 3 && vm.fPassword.length >= 6);
        };

        vm.validate();

    }

    angular.module('myApp')
        .controller('loginController', loginController);
})();