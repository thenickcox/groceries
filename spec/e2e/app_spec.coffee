GroceriesAppPage = ->
  this.get = ->
    browser.get 'http://localhost:8000'

describe 'groceries', ->
  it 'should work', ->
    page = new GroceriesAppPage()
    page.get()
    span = element(by_.css('.bought-remaining'))
    expect(span.getText()).toEqual("Let's go shopping!")

