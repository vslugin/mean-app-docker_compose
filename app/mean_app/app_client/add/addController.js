(function() {
    function addController($http, $window) {
        var vm = this;
        vm.pageTitle='Добавление новости';

        vm.isInvalidForm = true;
        vm.fTitle = "";
        vm.fBody = "";

        vm.add = function () {

            $http.post('/api/news', {title:vm.fTitle, body:vm.fBody}, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .success(function (data) {
                    console.log('add news ok:', data);
                    $window.location.href = '/#/list';

            }).error(function (err) {
                if(err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed"){
                    $window.location.href = '/#/login';
                }
            })

        };

        vm.validate = function () {
            vm.isInvalidForm = !(vm.fTitle.length >= 3 && vm.fBody.length >= 6);
        };

        vm.validate();

    }

    angular.module('myApp')
        .controller('addController', addController);
})();