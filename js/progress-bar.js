'use strict';

(function () {
  var PARAMETERS = {
    frameClass: 'order-progress',
    singleElementClass: 'progress',
    visualizationElementClass: 'progress__visualization',
    barFillerClass: 'progress-bar__filler',
    valueClass: 'progress__value',

    radixForValue: 10,
    fillerUnits: '%',
    valueUnits: '%',
    valuePositionUnits: 'px',

    dataAttribute: ['data-progress']
  };

  var orderProgress = document.querySelector('.' + PARAMETERS.frameClass);
  var allProgressBars = orderProgress.querySelectorAll('.' + PARAMETERS.singleElementClass);

  // Отслеживание изменения data-атрибутов
  var observer = new MutationObserver(onDataAttributeChange);
  var observerConfig = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: PARAMETERS.dataAttribute
  };

  // --- Обработчики событий ---

  // Если изменился атрибут
  function onDataAttributeChange(arrayOfMutationRecords) {
    var record = arrayOfMutationRecords[0];
    var progressElement = record.target;
    var barFiller = progressElement.querySelector('.' + PARAMETERS.barFillerClass);
    var visualizationElement = progressElement.querySelector('.' + PARAMETERS.visualizationElementClass);
    var valueElement = progressElement.querySelector('.' + PARAMETERS.valueClass);


    var newValue = getValueFromDataAttribute(progressElement);

    if (newValue !== +record.oldValue) {
      setFillerWidth(barFiller, newValue);
      setNewDisplayedValue(valueElement, newValue);

      var position = calculatePosition(valueElement, visualizationElement, newValue);
      setPositionOfDisplayedValue(valueElement, position);
    }
  }

  // ^^^ Обработчики событий ^^^

  // Возвращает текущее значение атрибута data-progress
  function getValueFromDataAttribute(progressElement) {
    var rawValue = progressElement.dataset.progress;
    var value = parseInt(rawValue, PARAMETERS.radixForValue);
    return value;
  }

  // Устанавливает ширину уровня заполненности
  function setFillerWidth(barFiller, value) {
    barFiller.style.width = value + PARAMETERS.fillerUnits;
  }

  // Прописывает новую величину прогресс-бара в DOM-элементе
  function setNewDisplayedValue(valueElement, value) {
    valueElement.textContent = value + PARAMETERS.valueUnits;
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
  function setPositionOfDisplayedValue(valueElement, position) {
    valueElement.style.left = position + PARAMETERS.valuePositionUnits;
  }

  // Отрисовка прогресс-баров в соответствии со значениями, которые были переданы вместе с index.html.
  function setDefaultView(progressElement) {
    var barFiller = progressElement.querySelector('.' + PARAMETERS.barFillerClass);
    var visualizationElement = progressElement.querySelector('.' + PARAMETERS.visualizationElementClass);
    var valueElement = progressElement.querySelector('.' + PARAMETERS.valueClass);

    var newValue = getValueFromDataAttribute(progressElement);

    setFillerWidth(barFiller, newValue);
    setNewDisplayedValue(valueElement, newValue);

    var position = calculatePosition(valueElement, visualizationElement, newValue);
    setPositionOfDisplayedValue(valueElement, position);
  }

  // Выполнение скрипта
  for (var i = 0; i < allProgressBars.length; i++) {
    var element = allProgressBars[i];
    setDefaultView(element);
    observer.observe(element, observerConfig);
  }
})();
