angular.module("lendersApp").service("lendersService", [
  "$http",
  function ($http) {
    this.fetchLenders = function () {
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
    };
  },
]);
