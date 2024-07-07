angular.module("lendersApp").component("editLenderModal", {
  templateUrl: "app/components/lenders/modal/edit-lender-modal.component.html",
  bindings: {
    resolve: "<",
    close: "&",
    dismiss: "&",
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.lender = angular.copy($ctrl.resolve.lender);
    };

    $ctrl.save = function () {
      if ($ctrl.editLenderForm.$valid) {
        $ctrl.close({ $value: $ctrl.lender });
      }
    };

    $ctrl.cancel = function () {
      $ctrl.dismiss({ $value: "cancel" });
    };
  },
});
