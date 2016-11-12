(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
    .directive('foundItems', foundItemsDirective);

    
  function foundItemsDirective() {
    var ddo = {
        templateUrl: 'menuList.html',
        scope: {
          items: '<',
          onRemove: '&'
        }
    };

    return ddo;
    }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.items = [];

    ctrl.getItems = function(searchTerm) {
      
      MenuSearchService.getMatchedMenuItems(searchTerm)
      .then(function (response) {
        ctrl.items = response;
      })
      .catch(function (err) {
        ctrl.items = [];
        console.log(err);
      });
    };
    
    ctrl.removeItem = function (itemIndex) {
        ctrl.items.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: 'GET',
        url: (ApiBasePath + "/menu_items.json")
      }); 
        
    return response.then(function (result) {
        var foundItems = [];
        for (var i = 0; i < result.data.menu_items.length; i++) {
            if (result.data.menu_items[i].description.indexOf(searchTerm) > -1) {
              foundItems.push(result.data.menu_items[i]);
            }
        }
        return foundItems;
      });
    };
  }
})();
