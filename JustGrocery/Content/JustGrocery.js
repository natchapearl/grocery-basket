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
            url: '/storefront'
        })
        $stateProvider.state({
            name: 'basket',
            component: 'basket',
            url: '/basket'
        });
    }

    //Register the component
    app.component('storeFront', {
        templateUrl: 'Content/StoreFront.html',
        controller: 'justGroceryController as gvm'
    });
    app.component('basket', {
        templateUrl: 'Content/Basket.html',
        controller: 'justGroceryController as gvm'
    });
})();

//----------Service----------//
(function () {
    'use strict';
    angular.module('JustGrocery')
        .service('groceryService', groceryService);

    groceryService.$inject = ['$http']

    function groceryService($http) {

        function _addItem() {
            var settings = {
                url: "api/grocery"
                , method: 'POST'
                , cache: false
            };
            return $http(settings);
        }

        function _updateItem(id) {
            var settings = {
                url: "api/grocery/" + id
                , method: 'PUT'
                , cache: false
            };
            return $http(settings);
        }

        function _deleteItem(id) {
            var settings = {
                url: "api/grocery/" + id
                , method: 'DELETE'
                , cache: false
            };
            return $http(settings);
            console.log(id);
        }

        return {
            addItem: _addItem,
            updateItem: _updateItem,
            deleteItem: _deleteItem
        };
    }
})();

//----------Controller----------//
(function () {
    'use strict';
    angular.module('JustGrocery')
        .controller('justGroceryController', justGroceryController);

    justGroceryController.$inject = ['groceryService', '$state'];

    function justGroceryController(groceryService, $state) {
        //Register the controller
        var gvm = this;
        gvm.createListBtn = _createList;
        gvm.itemList = [];
        gvm.data = {};
        gvm.addNewItem = _addNewItem;
        gvm.updateItem = _updateItem;
        gvm.deleteItem = _deleteItem;
        gvm.$onChanges = _init;

        function _createList() {
            $state.go('storeFront');
        }

        function _init() {
            console.log("Here!");
        }

        //Add item
        function _addNewItem() {
            groceryService.addItem(gvm.itemList)
                .then(_addItemSuccessful, _addItemFailed);
        }

        function _addItemSuccessful(response) {
            console.log(response);
            gvm.itemList = response.data.item;
        };

        function _addItemFailed(response) {
            console.log(response);
        }

        //Update item
        function _updateItem() {
            groceryService.updateItem()
                .then(_updateItemSuccessful, _updateItemFailed);
        }

        function _updateItemSuccessful(response) {
            console.log(response);
        };

        function _updateItemFailed(response) {
            console.log(response);
        }

        //Delete item
        function _deleteItem() {
            groceryService.deleteItem()
                .then(_deleteItemSuccessful, _deleteItemFailed);
        }

        function _deleteItemSuccessful(response) {
            console.log(response);
        };

        function _deleteItemFailed(response) {
            console.log(response);
        }

    }
})();