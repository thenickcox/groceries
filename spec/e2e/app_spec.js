describe('alert', function(){
  var ptor = protractor.getInstance();
  beforeEach(function(){
    browser.driver.get('http://localhost:8000/index.html');
    button = ptor.findElement(protractor.By.id('alertButton'));
    button.click();
  });
  it('has the right text', function(){
    expect(button.getText()).toEqual('Button');
  });
  it('tells the alert message', function(){
    var alertDialog = ptor.switchTo().alert();
    expect(alertDialog.getText()).toEqual('Hello');
  });
});

