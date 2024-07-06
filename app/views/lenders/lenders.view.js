angular.module("lendersApp").controller("LendersViewController", [
  "$scope",
  "$uibModal",
  "lendersService",
  function ($scope, $uibModal, lendersService) {
    var vm = this;
    vm.lenders = [];
    vm.displayedLenderItems = [];
    vm.currentPage = 1;
    vm.itemsPerPage = 20;
    vm.loading = true;

    vm.fetchLenders = function () {
      lendersService
        .fetchLenders()
        .then(function (response) {
          vm.lenders = response.data;
          vm.totalItems = vm.lenders.length;
          vm.pageChange();
        })
        .catch(function (error) {
          console.error("Could not fetch lenders", error);
        })
        .finally(function () {
          vm.loading = false;
        });
    };

    vm.pageChange = function () {
      var start = (vm.currentPage - 1) * vm.itemsPerPage;
      var end = start + vm.itemsPerPage;
      vm.displayedLenderItems = vm.lenders.slice(start, end);
    };

    vm.openEditModal = function (lender) {
      var modalInstance = $uibModal.open({
        component: "editLenderModal",
        backdrop: "static",
        animation: false,
        keyboard: false,
        resolve: {
          lender: function () {
            return angular.copy(lender);
          },
        },
      });

      modalInstance.result
        .then(function (editedLender) {
          var index = vm.lenders.indexOf(lender);
          if (index !== -1) {
            vm.lenders[index] = editedLender;
            vm.displayedLenderItems[index] = editedLender;
            console.log(editedLender);
          }
        })
        .catch(function (error) {
          console.log("Modal dismissed at: " + new Date(), error);
        });
    };

    vm.fetchLenders();

    $scope.vm = vm;

    $scope.$watch("vm.currentPage", function () {
      vm.pageChange();
    });
  },
]);
