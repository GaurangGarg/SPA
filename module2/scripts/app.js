(function () {
  'use strict';

  angular.module('ShoppingListCheckOffApp', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ShoppingListCheckOffService() {
    var service = this;
    var toBuy = [
      { name: "cookies", quantity: 10 },
      { name: "chips", quantity: 10 },
      { name: "candies", quantity: 10 },
      { name: "coke", quantity: 10 },
      { name: "crackers", quantity: 10 }
    ];
    var bought = [];

    service.removeBuyitem = function (itemIdex) {
      var item = toBuy.splice(itemIdex, 1);
      service.addBought(item[0].name, item[0].quantity);
    };

    service.addBought = function(itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      bought.push(item);
    };

    service.getBuy = function () {
      return toBuy;
    };

    service.getBought = function () {
      return bought;
    };
  }

  function ToBuyController(ShoppingListCheckOffService) {
    var buyCtrl = this;
    buyCtrl.itemList = ShoppingListCheckOffService.getBuy();

    buyCtrl.removeItem = function (itemIdex) {
      ShoppingListCheckOffService.removeBuyitem(itemIdex);
    }
  }

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtCtrl = this;
    boughtCtrl.itemList = ShoppingListCheckOffService.getBought();
  }

})();
