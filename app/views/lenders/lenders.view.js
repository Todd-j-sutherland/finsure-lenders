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
    vm.errorLoading = false;
    vm.errorLoadingMessage = "";
    vm.totalItems = 0;

    vm.$onInit = function () {
      vm.fetchLenders();
    };

    vm.fetchLenders = function () {
      vm.loading = true;
      vm.errorLoading = false;
      lendersService
        .fetchLenders()
        .then(function (data) {
          vm.lenders = data;
          vm.totalItems = vm.lenders.data.length;
          vm.pageChange();
          vm.loading = false;
        })
        .catch(function (error) {
          console.error("Could not fetch lenders", error);
          vm.errorLoadingMessage = "Failed to load lenders. Please try again.";
          vm.errorLoading = true;
          vm.loading = false;
        });
    };

    vm.pageChange = function () {
      var start = (vm.currentPage - 1) * vm.itemsPerPage;
      var end = start + vm.itemsPerPage;
      if (vm.lenders.data) {
        vm.displayedLenderItems = vm.lenders.data.slice(start, end);
      }
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

      modalInstance.result.then(function (editedLender) {
        var index = vm.lenders.data.indexOf(lender);
        if (index !== -1) {
          vm.lenders.data[index] = editedLender;
          vm.displayedLenderItems[index] = editedLender;
          vm.pageChange();
        }
      });
    };

    vm.retryFetch = function () {
      vm.errorLoading = false;
      vm.loading = true;
      vm.fetchLenders();
    };

    vm.conditionalDecimalPlaces = function (value) {
      return value === 0 ? 0 : 2;
    };

    $scope.vm = vm;

    $scope.$watch("vm.currentPage", function () {
      vm.pageChange();
    });
  },
]);
