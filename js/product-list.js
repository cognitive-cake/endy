'use strict';

(function () {
  var PARAMETERS = {
    formClass: 'order-list',
    singleOrderClass: 'single-order',
    amountControlsClass: 'amount-controls',
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
    while (clickTarget !== orderForm) {
      if (clickTarget.classList.contains(PARAMETERS.buttonClass) && !clickTarget.classList.contains(PARAMETERS.disabledClass)) {
        var amountControls = clickTarget.parentElement;
        var decButton = amountControls.querySelector('.' + PARAMETERS.buttonDecClass);

        changeAmount(clickTarget);
        if (hasMinAmount(amountControls)) {
          disableButton(decButton);
        } else if (decButton.classList.contains(PARAMETERS.disabledClass)) {
          enableButton(decButton);
        }
        return;
      }
      clickTarget = clickTarget.parentElement;
    }
  }

  // ^^^ Обработчики событий ^^^

  // Изменение количества товара
  function changeAmount(clickedButton) {
    var counter = clickedButton.parentElement.querySelector('.' + PARAMETERS.valueClass);

    if (clickedButton.classList.contains(PARAMETERS.buttonDecClass)) {
      counter.value = parseInt(counter.value, PARAMETERS.radixForValue) - PARAMETERS.decrementStep;
    } else if (clickedButton.classList.contains(PARAMETERS.buttonIncClass)) {
      counter.value = parseInt(counter.value, PARAMETERS.radixForValue) + PARAMETERS.incrementStep;
    }
  }

  // Функция возвращает true, если указано минимальное количество товара
  function hasMinAmount(amountControls) {
    var valueField = amountControls.querySelector('.' + PARAMETERS.valueClass);
    return parseInt(valueField.value, PARAMETERS.radixForValue) === PARAMETERS.minValue;
  }

  // Делает кнопку неактивной
  function disableButton(decButton) {
    decButton.classList.add(PARAMETERS.disabledClass);
    decButton.setAttribute('disabled', '');
  }

  // Делает кнопку активной
  function enableButton(decButton) {
    decButton.classList.remove(PARAMETERS.disabledClass);
    decButton.removeAttribute('disabled');
  }


  // Выполнение скрипта
  window.addEventListener('load', function () {
    var allOrders = orderForm.querySelectorAll('.' + PARAMETERS.singleOrderClass);
    allOrders.forEach(function (element) {
      var amountControls = element.querySelector('.' + PARAMETERS.amountControlsClass);
      var decButton = element.querySelector('.' + PARAMETERS.buttonDecClass);
      if (hasMinAmount(amountControls)) {
        disableButton(decButton);
      }
    });
  });
  orderForm.addEventListener('click', onAmountControlsClick);
})();
