(function() {
    function listController($http, $interval, $window) {

        var vm = this;
        vm.pageTitle='Список новостей';
        vm.tableModel=[];

        vm.modalAlertDfl = {
            successMsg: '',
            errorMsg: '',
            id: undefined,
            title: 'Удаление записи',
            message: '',
            doDelete: function () {
                $http.delete('/api/news/'+vm.modalAlert.id, {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}).success(function () {
                    vm.modalAlert.successMsg = 'Удалено успешно';
                    vm.updateList();
                    jQuery('#modalAlert').modal('hide');
                }).error(function (err) {
                    vm.modalAlert.errorMsg = 'Ошибка удаления: ' + err.message;
                })
            }
        };

        vm.modalAlert = angular.copy(vm.modalAlertDfl);

        vm.delete = function (id) {

            vm.modalAlert.id = id;
            vm.modalAlert.message = 'Действительно удалить новость с id=' + id +'?';

            jQuery('#modalAlert').on("hidden.bs.modal", function () {
                vm.modalAlert = angular.copy(vm.modalAlertDfl);
            });

            jQuery('#modalAlert').modal('show');


        };

        vm.updateList = function () {

            console.log('update');

            $http.get('/api/news', {headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}).success(function (data) {
                vm.tableModel = data;
            }).error(function (err) {
                if(err.message === "UnauthorizedError: No authorization token was found" || err.message === "UnauthorizedError: jwt malformed"){
                    $window.location.href = '/#/login';
                }
            })
        };

        vm.updateList();

    }

    angular.module('myApp')
        .controller('listController', listController);
})();