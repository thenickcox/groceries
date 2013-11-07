(function() {
  "use strict";
  describe("ItemCtrl", function() {
    var item, item2, pushItemOne, pushItemTwo, pushTwoItems, scope;
    scope = void 0;
    beforeEach(angular.mock.module("Grocerease"));
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      return $controller("ItemCtrl", {
        $scope: scope
      });
    }));
    item = {
      text: 'apple',
      bought: false
    };
    item2 = {
      text: 'oranges',
      bought: false
    };
    pushItemOne = function() {
      return scope.items.push(item);
    };
    pushItemTwo = function() {
      return scope.items.push(item2);
    };
    pushTwoItems = function() {
      pushItemOne();
      return pushItemTwo();
    };
    describe('clearAll()', function() {
      return it('removes all items from the scope', function() {
        pushItemOne();
        scope.clearAll();
        return expect(scope.items).toBe.empty;
      });
    });
    describe('clearChecked()', function() {
      return it('should only clear items with a bought attribute set to true', function() {
        pushTwoItems();
        scope.items[0].bought = true;
        scope.clearChecked();
        return expect(scope.items.length).toEqual(1);
      });
    });
    describe('remove()', function() {
      return it('should remove an item from the scope when called and passed an item', function() {
        pushTwoItems();
        scope.remove(1);
        expect(scope.items.length).toEqual(1);
        expect(scope.items).toContain(item);
        return expect(scope.items).not.toContain(item2);
      });
    });
    describe('boughtItems()', function() {
      return it('should count the items with the bought attribute set to true', function() {
        pushItemOne();
        item.bought = true;
        expect(scope.boughtCount()).toEqual(1);
        pushItemTwo();
        item2.bought = true;
        expect(scope.boughtCount()).toEqual(2);
        item2.bought = false;
        return expect(scope.boughtCount()).toEqual(1);
      });
    });
    describe('pluralizeItems()', function() {
      return it('should correctly pluralize the word items based on the passed-in int', function() {
        expect(scope.pluralizeItems(1)).toBe('item');
        return expect(scope.pluralizeItems(2)).toBe('items');
      });
    });
    describe('boughtPercent()', function() {
      return it('should calculate the percentage of items with true for the bought attribute value', function() {
        pushTwoItems();
        item.bought = false;
        item2.bought = false;
        expect(scope.boughtPercent()).toEqual(0);
        item2.bought = true;
        expect(scope.boughtPercent()).toEqual(50);
        item.bought = true;
        return expect(scope.boughtPercent()).toEqual(100);
      });
    });
    describe('emptyOrFullStatement()', function() {
      it('suggests that we go shopping if there are no items', function() {
        return expect(scope.emptyOrFullStatement(0, 1)).toBe("Let's go shopping!");
      });
      return it('says disco if all items are bought', function() {
        return expect(scope.emptyOrFullStatement(1, 1)).toBe('Disco!');
      });
    });
    return describe('progressStatement()', function() {
      return it('tells the number of items we have and the number without true for a bought attribute value', function() {
        expect(scope.progressStatement(1, 0)).toBe('1 total item, 1 item remaining');
        return expect(scope.progressStatement(2, 1)).toBe('2 total items, 1 item remaining');
      });
    });
  });

}).call(this);
