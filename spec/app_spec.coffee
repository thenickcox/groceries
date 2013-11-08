"use strict"
describe "ItemCtrl", ->
  scope = undefined
  beforeEach angular.mock.module("Grocerease")
  beforeEach angular.mock.inject(($rootScope, $controller) ->
    scope = $rootScope.$new()
    $controller "ItemCtrl",
      $scope: scope

  )

  # test helpers
  item = text: 'apple', bought: false
  item2 = text: 'oranges', bought: false

  pushItemOne = ->
    scope.items.push item
  pushItemTwo = ->
    scope.items.push item2
  pushTwoItems = ->
    pushItemOne()
    pushItemTwo()

  describe 'clearAll()', ->
    it 'removes all items from the scope', ->
      pushItemOne()
      scope.clearAll()
      expect(scope.items).toBe.empty

  describe 'clearChecked()', ->
    it 'should only clear items with a bought attribute set to true', ->
      pushTwoItems()
      scope.items[0].bought = true
      scope.clearChecked()
      expect(scope.items.length).toEqual(1)

  describe 'remove()', ->
    it 'should remove an item from the scope when called and passed an item', ->
      pushTwoItems()
      scope.remove(1)
      expect(scope.items.length).toEqual(1)
      expect(scope.items).toContain item
      expect(scope.items).not.toContain item2

  describe 'boughtItems()', ->
    it 'should count the items with the bought attribute set to true', ->
      pushItemOne()
      item.bought = true
      expect(scope.boughtCount()).toEqual(1)
      pushItemTwo()
      item2.bought = true
      expect(scope.boughtCount()).toEqual(2)
      item2.bought = false
      expect(scope.boughtCount()).toEqual(1)

  describe 'pluralizeItems()', ->
    it 'should correctly pluralize the word items based on the passed-in int', ->
      expect(scope.pluralizeItems(1)).toBe('item')
      expect(scope.pluralizeItems(2)).toBe('items')

  describe 'boughtPercent()', ->
    it 'should calculate the percentage of items with true for the bought attribute value', ->
      pushTwoItems()
      item.bought = false
      item2.bought = false
      expect(scope.boughtPercent()).toEqual(0)
      item2.bought = true
      expect(scope.boughtPercent()).toEqual(50)
      item.bought = true
      expect(scope.boughtPercent()).toEqual(100)

  describe 'emptyOrFullStatement()', ->
    it 'suggests that we go shopping if there are no items', ->
      expect(scope.emptyOrFullStatement(0, 1)).toBe("Let's go shopping!")

    it 'says disco if all items are bought', ->
      expect(scope.emptyOrFullStatement(1, 1)).toBe('Disco!')

  describe 'progressStatement()', ->
    it 'tells the number of items we have and the number without true for a bought attribute value', ->
      expect(scope.progressStatement(1, 0)).toBe('1 total item, 1 item remaining')
      expect(scope.progressStatement(2, 1)).toBe('2 total items, 1 item remaining')


