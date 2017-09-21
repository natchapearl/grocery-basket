(function () {
    'use strict';

    //Refer the angular module
    var app = angular.module('JustGrocery');

    //Register the configuration callback
    app.config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        //Register the state
        $stateProvider.state({
            name: 'storeFront',
            component: 'storeFront',
            url: '/storeFront'
        });
        $stateProvider.state({
            name: 'basket',
            component: 'basket',
            url: '/basket'
        });
    }

    //Register the component
    app.component('storeFront', {
        templateUrl: 'JustGrocery.html',
        controller: 'justGroceryController as gvm'
    });
    app.component('basket', {
        templateUrl: 'JustGrocery.html',
        controller: 'justGroceryController as gvm'
    });
})();

//----------Factory----------//
(function () {
    'use strict';
    angular.module('JustGrocery')
        .factory('getGroceryListService', getGroceryListService);

    getGroceryListService.$inject = ['$http']

    function getGroceryListService($http) {

        function _getList() {
            var settings = {
                url: "api/grocery"
                , method: 'GET'
            };
            return $http(setting);
        }
        return {
            getList: _getList
        };
    }
})();

//----------Controller----------//
(function () {
    'use strict';
    angular.module('JustGrocery')
        .controller('justGroceryController', justGroceryController);

    justGroceryController.$inject = ['getGroceryListService', '$state', 'alertService'];

    function justGroceryController(getGroceryListService, $state, alertService)

    //Register the controller
    var gvm = this;
    
})();