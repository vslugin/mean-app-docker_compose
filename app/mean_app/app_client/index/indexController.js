(function() {
    function indexController() {
        var vm = this;
        vm.test='эта страница index';
    }

    angular.module('myApp')
        .controller('indexController', indexController);
})();