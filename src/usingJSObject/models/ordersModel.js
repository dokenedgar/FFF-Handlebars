export const orders = [];


class ordersClass {
  constructor(){
 }
//place Order
  place(data) {
    const newOrder = {
      orderID: data.orderID,
      user: data.username,
      order: data.order,
      status: data.status
    }
  orders.push(newOrder);
  return newOrder;
 }

//get all orders by a particular USER
getOrders(userid){
  let order = [];
  orders.forEach((element, index) => {
    if (element.user === userid) {
      order = order.concat(element);
   }
  });
  return order;
}

//get all items from a specific order, using the orderID
getOrdersFromId(orderid){
  let order = [];
    orders.forEach((element, index) => {
    if (element.orderID === orderid) {
      order = order.concat(element);
    }
   });
    return order;
}

// Admin get all Orders
getAllOrders(){
  return orders;
}

updateOrderStatus(orderid, status){
  let order = [];
  orders.forEach((element, index) => {
    if (element.orderID === orderid) {
      element.status = status;
      order = order.concat(element);
    }
  });
  return order;
}

}

export const newOrdersObject = new ordersClass();