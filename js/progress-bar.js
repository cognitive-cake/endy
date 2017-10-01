'use strict';

(function () {
  var PARAMETERS = {
    progressFrameClass: 'order-progress',
    progressBarFillerClass: 'progress-bar__filler',
    progressValueClass: 'progress__value',
    radixForValue: 10,
    fillerUnits: '%',
    valueUnits: '%',
    valuePositionUnits: 'px',
    dataAttribute: 'data-progress'
  };

  var orderProgress = document.querySelector('.' + PARAMETERS.progressFrameClass);
  var allValueElements = orderProgress.querySelectorAll('.' + PARAMETERS.progressValueClass);

  // Отслеживание изменения data-атрибутов
  var observer = new MutationObserver(onDataAttributeChange);
  var observerConfig = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [PARAMETERS.dataAttribute]
  };

  // --- Обработчики событий ---

  // Если изменился атрибут
  function onDataAttributeChange(arrayOfMutationRecords) {
    var record = arrayOfMutationRecords[0];
    var visualizationElement = record.target.parentElement;
    var valueElement = record.target;
    var newValue = getValueFromDataAttribute(valueElement);

    if (newValue !== +record.oldValue) {
      setFillerWidth(visualizationElement, newValue);
      setNewDisplayedValue(valueElement, newValue);

      var position = calculatePosition(valueElement, visualizationElement, newValue);
      setPositionOfDisplayedValue(valueElement, position);
    }
  }

  // ^^^ Обработчики событий ^^^

  // Возвращает текущее значение атрибута data-progress
  function getValueFromDataAttribute(element) {
    var rawValue = element.dataset.progress;
    var value = parseInt(rawValue, PARAMETERS.radixForValue);
    return value;
  }

  // Устанавливает ширину уровня заполненности
  function setFillerWidth(element, value) {
    var barFiller = element.querySelector('.' + PARAMETERS.progressBarFillerClass);
    barFiller.style.width = value + PARAMETERS.fillerUnits;
  }

  // Прописывает новую величину прогресс-бара в DOM-элементе
  function setNewDisplayedValue(element, value) {
    element.textContent = value + PARAMETERS.valueUnits;
  }

  // Рассчитывает позицию для DOM-элемента progress__value
  function calculatePosition(valueElement, visualizationElement, value) {
    var valueBlockWidth = valueElement.offsetWidth;
    var parentWidth = visualizationElement.offsetWidth;
    var position = parentWidth * value / 100 - valueBlockWidth / 2;
    if (position < 0) {
      position = 0;
    } else if (position + valueBlockWidth > parentWidth) {
      position = parentWidth - valueBlockWidth;
    }
    return position;
  }

  // Позиционирует DOM-элемент, отображающий текущую величину
  function setPositionOfDisplayedValue(element, position) {
    element.style.left = position + PARAMETERS.valuePositionUnits;
  }

  // Отрисовка прогресс-баров в соответствии со значениями, которые были переданы вместе с index.html.
  function setDefaultView(valueElement) {
    var visualizationElement = valueElement.parentElement;
    var newValue = getValueFromDataAttribute(valueElement);

    setFillerWidth(visualizationElement, newValue);
    setNewDisplayedValue(valueElement, newValue);

    var position = calculatePosition(valueElement, visualizationElement, newValue);
    setPositionOfDisplayedValue(valueElement, position);
  }

  // Выполнение скрипта
  allValueElements.forEach(function (element) {
    setDefaultView(element);
    observer.observe(element, observerConfig);
  });
})();
