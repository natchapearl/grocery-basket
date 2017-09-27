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
        //$stateProvider.state({
        //    name: 'basket',
        //    component: 'basket',
        //    url: '/basket'
        //});
    }

    //Register the component
    app.component('storeFront', {
        templateUrl: 'Content/StoreFront.html',
        controller: 'justGroceryController as gvm'
    });
    //app.component('basket', {
    //    templateUrl: 'Content/Basket.html',
    //    controller: 'justGroceryController as gvm'
    //});
})();

//----------Service----------//
(function () {
    'use strict';
    angular.module('JustGrocery')
        .service('groceryService', groceryService);

    groceryService.$inject = ['$http']

    function groceryService($http) {

        function _addItem(data) {
            var settings = {
                url: 'api/grocery'
                , method: 'POST'
                , cache: false
                , responseType: 'json'
                , contentType: "application/json; character=UTF-8"
                , data: data
            };
            return $http(settings);
        }
        function _getList() {
            var settings = {
                url: 'api/grocery'
                , method: 'GET'
                , cache: false
                , responseType: 'json'
                , contentType: "application/json; character=UTF-8"
            };
            return $http(settings);
        }

        function _updateItem(data) {
            var settings = {
                url: 'api/grocery/' + id
                , method: 'PUT'
                , cache: false
                , responseType: 'json'
                , contentType: "application/json; character=UTF-8"
                , data: data
            };
            return $http(settings);
        }

        function _deleteItem(id) {
            var settings = {
                url: 'api/grocery/' + id
                , method: 'DELETE'
                , cache: false
                , responseType: 'json'
                , contentType: "application/json; character=UTF-8"
            };
            return $http(settings);
            console.log(id);
        }

        function _clearWholeList() {
            var settings = {
                url: 'api/grocery/'
                , method: 'DELETE'
                , cache: false
                , responseType: 'json'
                , contentType: "application/json; character=UTF-8"
            };
            return $http(settings);
        }

        return {
            addItem: _addItem,
            getList: _getList,
            updateItem: _updateItem,
            deleteItem: _deleteItem,
            clearWholeList: _clearWholeList
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
        gvm.addItemBtn = _addNewItem;
        gvm.addNewItem = _addNewItem;
        gvm.$onInit = _getList;
        gvm.updateItem = _updateItem;
        gvm.deleteItemBtn = _deleteItem;
        gvm.deleteItem = _deleteItem;
        gvm.clearListBtn = _clearList;
        gvm.itemList = [];


        //View basket page
        function _viewBasket() {
            $state.go = ('basket');
        }

        //Add item
        function _addNewItem() {
            //groceryService.addItem({ item: gvm.item, quantity: gvm.quantity, comment: gvm.comment })
            groceryService.addItem(gvm.data)
                .then(_addItemSuccessful, _addItemFailed);
        }

        function _addItemSuccessful(response) {
            console.log(response);
            gvm.itemList.push(Object.assign({}, gvm.data));
        };

        function _addItemFailed(response) {
            console.log(response);
        }

        //Get list
        function _getList() {
            groceryService.getList()
                .then(_getListSuccessful, _getListFailed);
        }

        function _getListSuccessful(response) {
            console.log(response);
            if (response.data.Groceries != null) {
                gvm.itemList = response.data.Groceries;
            }
            console.log(gvm.itemList);
        };

        function _getListFailed(response) {
            console.log(response);
        }

        //Update item
        function _updateItem(id) {
            groceryService.updateItem(id)
                .then(_updateItemSuccessful, _updateItemFailed);
        }

        function _updateItemSuccessful(response) {
            console.log(response);
        };

        function _updateItemFailed(response) {
            console.log(response);
        }

        //Delete item
        function _deleteItem(id, index) {
            console.log(id);
            gvm.index = index;
            groceryService.deleteItem(id)
                .then(_deleteItemSuccessful, _deleteItemFailed);
            gvm.itemList.splice(index, 1);
        }

        function _deleteItemSuccessful(response, index) {
            console.log(response);
        };

        function _deleteItemFailed(response) {
            console.log(response);
        }

        //Clear list
        function _clearList() {
            groceryService.clearWholeList()
                .then(_clearListSuccessful, _clearListFailed);
        }

        function _clearListSuccessful(response) {
            console.log(response);
            gvm.itemList = [];
        }

        function _clearListFailed(response) {
            console.log(response);
        }

    }
})();