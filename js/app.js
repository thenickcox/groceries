'use strict';

angular
  .module('Grocerease', ['ui.bootstrap']);

function ItemCtrl($scope, $window) {

  $scope.items = [];


    $scope.addItem = function() {
      $scope.items.push({text: $scope.itemText, bought:false});
      $scope.itemText = '';
    };

    $scope.clearAll = function(){
      $scope.items = [];
    };

    $scope.clearChecked = function(){
      var listPreChecked = $scope.items;
      $scope.items = [];
      angular.forEach(listPreChecked, function(item){
        if (!item.bought) $scope.items.push(item);
      });
    };

    $scope.remove = function(index){
      $scope.items.splice(index, 1);
    };

    $scope.emptyOrFullStatement = function(total, bought){
      if (total === 0) {
        return "Let's go shopping!";
      }
      return 'Disco!';
    };

    $scope.progressStatement = function(total, bought){
      if (total === 0 || total === bought){
        return $scope.emptyOrFullStatement(total, bought);
      }
      var remainingNumber =        total - bought,
          totalItemStatement =     total + ' total ' +
                                   $scope.pluralizeItems(total),
          remainingItemStatement = remainingNumber + ' ' +
                                   $scope.pluralizeItems(remainingNumber) +
                                   ' remaining';
      return [totalItemStatement, remainingItemStatement].join(', ')
    };

    $scope.totalItems = function(){
      return $scope.items.length;
    };

    $scope.boughtCount = function(){
      var itemCount = 0;
      angular.forEach($scope.items, function(item){
        itemCount += item.bought ? 1 : 0;
      });
      return itemCount;
    };

    $scope.pluralizeItems = function(itemCount){
      return itemCount === 1 ? 'item' : 'items';
    };

    $scope.boughtPercent = function(){
      return ($scope.boughtCount() / $scope.items.length) * 100;
    };

    $scope.ngAlert = function(){
      $window.alert('Hello');
    };

};
