'use strict';

(function () {
  var PARAMETERS = {
    progressFrameClass: 'progress',
    progressVisualizationClass: 'progress__visualization',
    progressBarClass: 'progress-bar',
    progressBarFillerClass: 'progress-bar__filler',
    progressValueClass: 'progress__value',
    radixForValue: 10,
    widthUnits: '%',
    valueUnits: '%'
  };

  var progressFrame = document.querySelector('.' + PARAMETERS.progressFrameClass);
  var progressBar = progressFrame.querySelector('.' + PARAMETERS.progressBarClass);
  var barFiller = progressFrame.querySelector('.' + PARAMETERS.progressBarFillerClass);
  var progressValue = progressFrame.querySelector('.' + PARAMETERS.progressValueClass);

  var oldValue;

  function onDataAttributeChange() {
    var newValue = getValueFromDataAttribute();
    if (newValue !== oldValue) {
      setFillerWidth(newValue);
      setNewDisplayedValue(newValue);
      setPositionOfDisplayedValue(newValue);

      oldValue = newValue;
    }
  }

  function getValueFromDataAttribute() {
    var rawValue = progressValue.dataset.progress;
    var value = parseInt(rawValue, PARAMETERS.radixForValue);
    return value;
  }

  function setFillerWidth(value) {
    barFiller.style.width = value + PARAMETERS.widthUnits;
  }

  function setNewDisplayedValue(value) {
    progressValue.textContent = value + PARAMETERS.valueUnits;
  }

  function setPositionOfDisplayedValue(value) {
    progressValue.style.left = value + PARAMETERS.widthUnits;
  }

  // Выполнение скрипта
  onDataAttributeChange();
})();
