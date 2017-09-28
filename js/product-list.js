'use strict';

(function () {
  var PARAMETERS = {
    formClass: 'order-list',
    singlePositionClass: 'single-order',
    buttonClass: 'amount-controls__btn',
    buttonDecClass: 'amount-controls__btn-dec',
    buttonIncClass: 'amount-controls__btn-inc',
    disabledClass: 'disabled',
    valueClass: 'amount-controls__value',
    radixForValue: 10,
    decrementStep: 1,
    incrementStep: 1,
    minValue: 1
  };

  var orderForm = document.querySelector('.' + PARAMETERS.formClass);

  // --- Обработчики событий ---

  // Отлавливаем клик на кнопках изменения кол-ва товара
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

  // ^^^ Обработчики событий ^^^

  // Изменение количества товара
  function changeAmount(clickedBtn) {
    var counter = clickedBtn.parentElement.querySelector('.' + PARAMETERS.valueClass);

    if (clickedBtn.classList.contains(PARAMETERS.buttonDecClass)) {
      counter.value = parseInt(counter.value, PARAMETERS.radixForValue) - PARAMETERS.decrementStep;
    } else if (clickedBtn.classList.contains(PARAMETERS.buttonIncClass)) {
      counter.value = parseInt(counter.value, PARAMETERS.radixForValue) + PARAMETERS.incrementStep;
    }
  }

  // Функция возвращает true, если указано минимальное количество товара
  function hasMinAmount(singleProductCard) {
    var valueField = singleProductCard.querySelector('.' + PARAMETERS.valueClass);
    return parseInt(valueField.value, PARAMETERS.radixForValue) === PARAMETERS.minValue;
  }

  // Делает кнопку неактивной
  function disableButton(singleProductCard) {
    var decBtn = singleProductCard.querySelector('.' + PARAMETERS.buttonDecClass);
    decBtn.classList.add(PARAMETERS.disabledClass);
    decBtn.setAttribute('disabled', '');
  }

  // Делает кнопку активной
  function enableButton(singleProductCard) {
    var decBtn = singleProductCard.querySelector('.' + PARAMETERS.buttonDecClass);
    decBtn.classList.remove(PARAMETERS.disabledClass);
    decBtn.removeAttribute('disabled');
  }


  // Выполнение скрипта
  window.addEventListener('load', function () {
    var allOrders = orderForm.querySelectorAll('.' + PARAMETERS.singlePositionClass);
    allOrders.forEach(function (element) {
      if (hasMinAmount(element)) {
        disableButton(element);
      }
    });
  });
  orderForm.addEventListener('click', onAmountControlsClick);
})();
