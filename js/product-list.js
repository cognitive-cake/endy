'use strict';

(function () {
  var PARAMETERS = {
    formClass: 'order-list',
    singlePositionClass: 'single-product',
    buttonClass: 'amount-controls__btn',
    buttonDecClass: 'amount-controls__btn-dec',
    buttonIncClass: 'amount-controls__btn-inc',
    disabledClass: 'disabled',
    valueClass: 'amount-controls__value',
    radixForValue: 10,
    decrementStep: 1,
    incrementStep: 1
  };

  var orderForm = document.querySelector('.' + PARAMETERS.formClass);
  var allOrders = orderForm.querySelectorAll('.' + PARAMETERS.singlePositionClass);

  function onAmountControlsClick(event) {
    var clickTarget = event.target;
    // debugger;
    while (clickTarget !== orderForm) {
      if (clickTarget.classList.contains(PARAMETERS.buttonClass) && !clickTarget.classList.contains(PARAMETERS.disabledClass)) {
        changeAmount(clickTarget);
        return;
      }
      clickTarget = clickTarget.parentElement;
    }
  }

  function changeAmount(clickedBtn) {
    var counter = clickedBtn.parentElement.querySelector('.' + PARAMETERS.valueClass);

    if (clickedBtn.classList.contains(PARAMETERS.buttonDecClass)) {
      counter.value = parseInt(counter.value, PARAMETERS.radixForValue) - PARAMETERS.decrementStep;
    } else if (clickedBtn.classList.contains(PARAMETERS.buttonIncClass)) {
      counter.value = parseInt(counter.value, PARAMETERS.radixForValue) + PARAMETERS.incrementStep;
    }
  }

  orderForm.addEventListener('click', onAmountControlsClick);
})();
