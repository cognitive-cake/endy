'use strict';

(function () {
  var PARAMETERS = {
    progressFrameClass: 'progress',
    progressVisualizationClass: 'progress__visualization',
    progressBarClass: 'progress-bar',
    progressBarFillerClass: 'progress-bar__filler',
    progressValueClass: 'progress__value',
    radixForValue: 10,
    fillerUnits: '%',
    transformUnits: 'px',
    valueUnits: '%',
    valuePositionUnits: 'px'
  };

  var progressFrame = document.querySelector('.' + PARAMETERS.progressFrameClass);
  var barFiller = progressFrame.querySelector('.' + PARAMETERS.progressBarFillerClass);
  var progressValue = progressFrame.querySelector('.' + PARAMETERS.progressValueClass);
  var progressVisualization = progressFrame.querySelector('.' + PARAMETERS.progressVisualizationClass);

  var oldValue;

  // Отслеживание изменения data-атрибутов
  var observer = new MutationObserver(onDataAttributeChange);
  var observerConfig = {
    attributes: true
  };

  // --- Обработчики событий ---

  // Если изменился атрибут
  function onDataAttributeChange() {
    var newValue = getValueFromDataAttribute();
    if (newValue !== oldValue) {
      setFillerWidth(newValue);
      setNewDisplayedValue(newValue);
      setPositionOfDisplayedValue(newValue);

      oldValue = newValue;
    }
  }

  // ^^^ Обработчики событий ^^^

  // Возвращает текущее значение атрибута data-progress
  function getValueFromDataAttribute() {
    var rawValue = progressValue.dataset.progress;
    var value = parseInt(rawValue, PARAMETERS.radixForValue);
    return value;
  }

  // Устанавливает ширину уровня заполненности
  function setFillerWidth(value) {
    barFiller.style.width = value + PARAMETERS.fillerUnits;
  }

  // Прописывает новую величину прогресс-бара в DOM-элементе
  function setNewDisplayedValue(value) {
    progressValue.textContent = value + PARAMETERS.valueUnits;
  }

  // Позиционирует DOM-элемент, отображающий текущую величину
  function setPositionOfDisplayedValue(value) {
    var position = calculatePosition(value);
    progressValue.style.left = position + PARAMETERS.valuePositionUnits;
  }

  // Рассчитывает позицию для DOM-элемента progress__value
  function calculatePosition(value) {
    // Комментарий, объясняющий, почему не написана более очевидная реализация позиционирования через проценты.
    // В ТЗ этого сказано не было, но на макете видно, что при значении '100%' цифра не выходит за границы прогресс-бара, а при значении '40%' - центр элемента находится ровно под границей уровня заполненности.
    // В первом варианте позиция задавалась вот так:
    // var cssString = 'transform: translateX(-50%);' + 'left: ' + value + '%;';
    // progressValue.style.cssText = cssString;
    // Т.е. через проценты и центрование с помощью transform. От этого варианта пришлось отказаться, т.к. при такой реализации неполучается отследить момент, когда отображаемое значение прогресс-бара начинает вылезать за пределы родителя.
    var valueBlockWidth = progressValue.offsetWidth;
    var parentWidth = progressVisualization.offsetWidth;
    var position = parentWidth * value / 100 - valueBlockWidth / 2;
    if (position < 0) {
      position = 0;
    } else if (position + valueBlockWidth > parentWidth) {
      position = parentWidth - valueBlockWidth;
    }
    return position;
  }

  // Выполнение скрипта
  onDataAttributeChange();
  observer.observe(progressValue, observerConfig);
})();
