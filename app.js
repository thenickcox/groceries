angular
  .module('FormSync', ['goinstant'])
  .config(function(platformProvider) {
    platformProvider.set('https://goinstant.net/thenickcox/groceries');
  });

function ItemCtrl($scope, GoAngular) {

  var goAngular = new GoAngular($scope, 'ItemCtrl', { include: ['items'] });

  goAngular.initialize().then(
    function(){
      $scope.items = [];

      $scope.addItem = function() {
        $scope.items.push({text: $scope.itemText, bought:false});
        $scope.itemText = '';
      }

      $scope.clearAll = function(){
        $scope.items = [];
      }

      $scope.clearChecked = function(){
        var listPreChecked = $scope.items;
        $scope.items = [];
        angular.forEach(listPreChecked, function(item){
          if (!item.bought) $scope.items.push(item);
        });
      }

      $scope.remove = function(index){
        $scope.items.splice(index, 1);
      }

      $scope.totalItems = function(){
        var total = 0;
        angular.forEach($scope.items, function(){
          total += 1;
        });
        return total;
      }
    }
  );
}
