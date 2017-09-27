'use strict';

(function () {
  var orderForm = document.querySelector('.order-list');
  var allOrders = orderForm.querySelectorAll('.single-product');
  
  orderForm.addEventListener('click', onAmountClick);
  
  function onAmountClick(event) {
    var currentTarget = event.target;
  }
})();
