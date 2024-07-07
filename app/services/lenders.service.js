angular.module("lendersApp").service("lendersService", [
  "$http",
  "$timeout",
  "$q",
  function ($http, $timeout, $q) {
    var retryAttempt = true;

    this.fetchLenders = function () {
      return $timeout(function () {
        if (retryAttempt) {
          retryAttempt = false;
          return $q.reject("First attempt fail, try again");
        } else {
          return $http
            .get("../../data/data.json")
            .then(function (response) {
              console.log("API Response:", response.data);
              return response.data;
            })
            .catch(function (error) {
              console.error("API Error:", error);
              throw error;
            });
        }
      }, 3000);
    };
  },
]);
