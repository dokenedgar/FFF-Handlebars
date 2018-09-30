'use strict';

var Orderbtn = document.getElementById('checkOut_btn');
Orderbtn.style.opacity = '0.3';
var lastAddedElement = document.getElementById('foodName');
var parentDiv = document.getElementById('foodName').parentNode;
var item = 0;

var Element_total = document.getElementById('total');
var totalAmount = 0;

var orders = [];
var addToOrder = function addToOrder(CheckBoxelement) {
  var foodName = document.getElementById('foodName');
  var checkValue = CheckBoxelement.value;
  var detail = checkValue.split(',');

  if (CheckBoxelement.checked === true) {
    // create order summary object for selected food
    var newOrder = { food: detail[0], price: detail[1], quantity: detail[2] };
    orders.push(newOrder);
    totalAmount += Number(detail[1]);
    Element_total.value = 'Total: ' + totalAmount;
    item++;
    var para = document.createElement('P');
    para.setAttribute('id', detail[0]);
    var paraText = document.createTextNode(detail[0] + ', Price: ' + detail[1]);
    para.appendChild(paraText);
    parentDiv.insertBefore(para, lastAddedElement);
    parentDiv = document.getElementById(detail[0]).parentNode;
    var lastAddedElementID = document.getElementById(detail[0]);
    Orderbtn.style.opacity = '1';

    var btnminus = document.createElement('BUTTON');
    btnminus.setAttribute('id', 'minus' + detail[0]);
    var minusText = document.createTextNode(' - ');
    btnminus.appendChild(minusText);
    lastAddedElementID.insertAdjacentElement('beforeend', btnminus);

    var quantity = document.createElement('INPUT');
    quantity.setAttribute('id', 'Quant' + detail[0]);
    var quanText = 1;
    quantity.value = quanText;
    document.getElementById('minus' + detail[0]).insertAdjacentElement('afterend', quantity);

    var btnplus = document.createElement('BUTTON');
    btnplus.setAttribute('id', 'plus' + detail[0]);
    var btnText = document.createTextNode(' + ');
    btnplus.appendChild(btnText);
    document.getElementById('Quant' + detail[0]).insertAdjacentElement('afterend', btnplus);

    document.getElementById('plus' + detail[0]).addEventListener('click', function () {
      var quant = document.getElementById('Quant' + detail[0]);
      var current = Number(quant.value);
      if (current >= 0) {
        current += 1;
        quant.value = current;
        totalAmount = totalAmount + Number(detail[1]);
        Element_total.value = 'Total: ' + totalAmount;
        orders.forEach(function (element, index) {
          if (element.food === detail[0]) {
            element.quantity = current;
            element.price = detail[1] * current;
          }
        });
      }
    });
    document.getElementById('minus' + detail[0]).addEventListener('click', function () {
      var quant = document.getElementById('Quant' + detail[0]);
      var current = Number(quant.value);
      if (current > 0) {
        current -= 1;
        quant.value = current;
        totalAmount = totalAmount - Number(detail[1]);
        Element_total.value = 'Total: ' + totalAmount;
        orders.forEach(function (element, index) {
          if (element.food === detail[0]) {
            element.quantity = current;
            element.price = detail[1] * current;
          }
        });
      }
    });
  } else {

    var orderIndex = void 0;
    orders.forEach(function (element, index) {
      if (element.food === detail[0]) {
        orderIndex = index;
      }
    });
    orders.splice(orderIndex, 1);
    item--;
    foodName.innerText = '';
    var quant = document.getElementById('Quant' + detail[0]);
    var current = Number(quant.value);
    totalAmount = totalAmount - current * Number(detail[1]);
    Element_total.value = 'Total: ' + totalAmount;
    var element = document.getElementById(detail[0]);
    element.parentNode.removeChild(element);
    if (item > 0) {} else if (item === 0) {
      Orderbtn.style.opacity = '0.3';
    }
  }
};

var submitOrderButton = function submitOrderButton() {
  if (item > 0) {
    fetch('https://dokenedgar.herokuapp.com/api/v1/placeOrder/' + localStorage.loggedUser, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.fff_token },
      body: JSON.stringify(orders)
    }).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      var obj = JSON.parse(JSON.stringify(data));
      window.location.href = '/orders'; //+ localStorage.loggedUser + '/orders';
    }).catch(function (err) {
      return window.location.href = 'https://dokenedgar.herokuapp.com/signin';
    });
  }
};