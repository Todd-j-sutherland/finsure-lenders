angular.module("lendersApp").controller("LendersViewController", [
  "$scope",
  "lendersService",
  function ($scope, lendersService) {
    lendersService
      .fetchLenders()
      .then(function (response) {
        $scope.lenders = response.data;
        console.log($scope.lenders);
        console.log(response);
      })
      .catch(function (error) {
        throw new Error("could not fetch lenders");
      });
  },
]);
