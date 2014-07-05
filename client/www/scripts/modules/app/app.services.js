// Copyright StrongLoop 2014
app.service('AppService', [
  '$location',
  '$state',
  function($location, $state) {
    var svc = {};
    svc.isViewAuth = function(stateName){
      switch(stateName){

      }
    };
    return svc;
  }
]);
app.service('AppStorageService', [
  function() {
    var svc = {};

    var getSlScope = function() {
      var slScope = window.localStorage.getItem('slScope');
      if (!slScope) {
        return {};
      }
      return JSON.parse(slScope);
    };

    svc.setItem = function(itemName, item) {
      var localScope = getSlScope();
      localScope[itemName] = item;
      return window.localStorage.setItem('slScope', JSON.stringify(localScope));
    };
    svc.getItem = function(itemName) {
      var localScope = getSlScope();
      return localScope[itemName];
    };
    svc.removeItem = function(itemName) {
      var localScope = getSlScope();
      delete localScope[itemName];
      return localScope;
    };
    svc.clearStorage = function() {
      return window.localStorage.setItem('slScope', JSON.stringify({}));
    };
    return svc;
  }
]);
app.service('NavigationService', [
  '$location',
  function($location) {
    var svc = {};
    svc.postLogoutNav = function(){
      $location.path('/login');
    };
    return svc;
  }
]);
