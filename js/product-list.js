'use strict';

(function () {
  var PARAMETERS = {
    formClass: 'order-list',
    singleOrderClass: 'single-order',

    amountControlsClass: 'amount-controls',
    buttonClass: 'amount-controls__btn',
    buttonDecClass: 'amount-controls__btn-dec',
    buttonIncClass: 'amount-controls__btn-inc',
    valueClass: 'amount-controls__value',
    radixForValue: 10,
    decrementStep: 1,
    incrementStep: 1,
    minValue: 1,

    removeButtonClass: 'remove-btn',
    returnButtonClass: 'remove-btn--red',
    wordDelete: 'Удалить',
    wordReturn: 'Вернуть',
    disabledClass: 'disabled',
    disabledAttribute: 'disabled'
  };

  var orderForm = document.querySelector('.' + PARAMETERS.formClass);

  // --- Обработчики событий ---

  // Клик на кнопках изменения кол-ва товара
  function onAmountControlsClick(event) {
    var clickTarget = event.target;

    while (clickTarget !== orderForm) {

      if (clickTarget.classList.contains(PARAMETERS.buttonClass) && !clickTarget.classList.contains(PARAMETERS.disabledClass)) {

        var amountControls = clickTarget.parentElement;
        var decButton = amountControls.querySelector('.' + PARAMETERS.buttonDecClass);

        changeAmount(clickTarget);
        checkForMinValue(amountControls, decButton);
        return;

      }

      clickTarget = clickTarget.parentElement;
    }
  }

  // Клик на кнопке удаления
  function onRemoveClick(event) {
    var clickTarget = event.target;
    while (clickTarget !== orderForm) {
      if (clickTarget.classList.contains(PARAMETERS.removeButtonClass)) {
        var parentElement = clickTarget.parentElement;
        if (clickTarget.classList.contains(PARAMETERS.returnButtonClass)) {
          switchButtonToRemove(clickTarget);
          enablePosition(parentElement);
        } else {
          switchButtonToReturn(clickTarget);
          disablePosition(parentElement);
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

  // Проверка на минимальное кол-во товара и работа с кнопкой "-"
  function checkForMinValue(amountControls, decButton) {
    if (hasMinAmount(amountControls)) {
      disableButton(decButton);
    } else if (decButton.classList.contains(PARAMETERS.disabledClass)) {
      enableButton(decButton);
    }
  }

  // Функция возвращает true, если указано минимальное количество товара
  function hasMinAmount(amountControls) {
    var valueField = amountControls.querySelector('.' + PARAMETERS.valueClass);
    return parseInt(valueField.value, PARAMETERS.radixForValue) <= PARAMETERS.minValue;
  }

  // Делает кнопку декремента недоступной и неактивной
  function disableButton(decButton) {
    decButton.classList.add(PARAMETERS.disabledClass);
    decButton.setAttribute(PARAMETERS.disabledAttribute, '');
  }

  // Делает кнопку декремента доступной и активной
  function enableButton(decButton) {
    decButton.classList.remove(PARAMETERS.disabledClass);
    decButton.removeAttribute(PARAMETERS.disabledAttribute);
  }

  // Изменение кнопки с "Удалить" на "Вернуть"
  function switchButtonToReturn(clickTarget) {
    clickTarget.classList.add(PARAMETERS.returnButtonClass);
    clickTarget.textContent = PARAMETERS.wordReturn;
  }

  // Изменение кнопки с "Вернуть" на "Удалить"
  function switchButtonToRemove(clickTarget) {
    clickTarget.classList.remove(PARAMETERS.returnButtonClass);
    clickTarget.textContent = PARAMETERS.wordDelete;
  }

  // Активация товарной позиции
  function enablePosition(parentElement) {
    var elements = parentElement.children;
    for (var i = 0; i < elements.length; i++) {
      var singleNode = elements[i];
      singleNode.classList.remove(PARAMETERS.disabledClass);
      singleNode.removeAttribute(PARAMETERS.disabledAttribute);
    }
  }

  // Деактивация товарной позиции
  function disablePosition(parentElement) {
    var elements = parentElement.children;
    for (var i = 0; i < elements.length; i++) {
      var singleNode = elements[i];
      if (!singleNode.classList.contains(PARAMETERS.removeButtonClass)) {
        singleNode.classList.add(PARAMETERS.disabledClass);
      }
      if (singleNode.classList.contains(PARAMETERS.amountControlsClass)) {
        singleNode.setAttribute(PARAMETERS.disabledAttribute, '');
      }
    }
  }


  // Выполнение скрипта
  window.addEventListener('load', function () {
    var allOrders = orderForm.querySelectorAll('.' + PARAMETERS.singleOrderClass);
    for (var i = 0; i < allOrders.length; i++) {
      var element = allOrders[i];
      var amountControls = element.querySelector('.' + PARAMETERS.amountControlsClass);
      var decButton = element.querySelector('.' + PARAMETERS.buttonDecClass);

      if (hasMinAmount(amountControls)) {
        disableButton(decButton);
      }
    }
  });
  orderForm.addEventListener('click', onAmountControlsClick);
  orderForm.addEventListener('click', onRemoveClick);
})();
