(function() {
    function editController($http, $window, $routeParams, $timeout) {
        var vm = this;
        vm.pageTitle='Редактирование новости';

        vm.isInvalidForm = true;
        vm.id = "";
        vm.fTitle = "";
        vm.fBody = "";

        vm.edit = function () {

            $http.put('/api/news/'+vm.id, {title:vm.fTitle, body:vm.fBody},{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
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

        vm.getData = function (id) {
            $http.get('/api/news/'+id, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                .success(function (data) {

                    vm.id = data._id;
                    vm.fTitle = data.title;
                    vm.fBody = data.body;
                    vm.validate();

                }).error(function (err) {
                if(err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed"){
                    $window.location.href = '/#/login';
                }
            })
        };

        vm.getData($routeParams.id);
    }

    angular.module('myApp')
        .controller('editController', editController);
})();