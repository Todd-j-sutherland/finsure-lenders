angular.module("lendersApp").config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/lenders", {
        templateUrl: "app/views/lenders/lenders.view.html",
        controller: "LendersViewController",
      })
      .otherwise({
        redirectTo: "/lenders",
      });
  },
]);
