import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { firestore } from "./index";
import EmptyOrder from "./EmptyOrder";

const ShowOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Reference to the "orders" collection in Firestore
    const ordersCollection = firestore.collection("orders");

    // Fetch data from Firestore
    ordersCollection
      .get()
      .then((querySnapshot) => {
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({
            id:doc.id,
            data:doc.data(),
      });
        });
        // Set the orders array state with the fetched data
        setOrders(fetchedOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);


  
  //Function to hande delivery status
  const handleDeliveryStatus = (orderID) => {
    // Reference to the "orders" and "deliveredOrders" collections in Firestore
    const ordersCollection = firestore.collection("orders");
    const deliveredOrdersCollection = firestore.collection("deliveredOrders");

    // Find the order to move to "deliveredOrders"
    const orderToMove = orders.find((order) => order.id === orderID);

    if (orderToMove) {
      // Add the order to "deliveredOrders" collection
      const currentDate = new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      );
      
      orderToMove.data.dateDelivered = currentDate;
      
      deliveredOrdersCollection
        .add(orderToMove.data)
        .then(() => {
          console.log("Order moved to deliveredOrders collection");

          // Delete the order from "orders" collection
          ordersCollection
            .doc(orderID)
            .delete()
            .then(() => {
              console.log("Order deleted from orders collection");
              // Update the state to reflect the changes
              setOrders(orders.filter((order) => order.id !== orderID));
            })
            .catch((error) => {
              console.error("Error deleting order:", error);
            });
        })
        .catch((error) => {
          console.error("Error adding order to deliveredOrders:", error);
        });
    }
  };
  

  return (
    <>
      <AdminNavbar />

      <div className="bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded shadow">
          <h1 className="text-2xl font-semibold mb-4">Order Dashboard</h1>
          <div className="space-y-4">
          { orders.length === 0 ? (
              <EmptyOrder/> // Render CartEmpty when orders is empty
            ) : (
            orders.map((data) => (
              <div
                key={data.data.paymentId}
                className="p-4 border rounded shadow dark:bg-gray-700 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">
                    Order ID: {data.data.paymentId}
                  </span>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      onChange={() => handleDeliveryStatus(data.id)}
                    />
                    <span className="font-semibold text-green-500 dark:text-green-300">
                      Delivered
                    </span>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Cart Details</h2>
                    <div className="w-full h-48 overflow-y-scroll">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 bg-gray-600">Image</th>
                            <th className="py-2 px-4 bg-gray-600">Item Name</th>
                            <th className="py-2 px-4 bg-gray-600">Price</th>
                            <th className="py-2 px-4 bg-gray-600">Quantity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                          {data.data.cart.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td className="py-2 px-4">
                                <img
                                  src={item.imageUrl}
                                  alt="Item Image"
                                  className="w-16 h-16 object-cover rounded"
                                />
                              </td>
                              <td className="py-2 px-4 font-semibold">
                                {item.itemName}
                              </td>
                              <td className="py-2 px-4">₹{item.itemPrice}</td>
                              <td className="py-2 px-4">{item.cartQuantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Address Info</h2>
                    <p>Name: {data.data.addressInfo.name}</p>
                    <p>Address: {data.data.addressInfo.address}</p>
                    <p>Phone: (+91) {data.data.addressInfo.phoneNumber}</p>
                    <p>Pincode: {data.data.addressInfo.pincode}</p>
                    <p>Date: {data.data.addressInfo.date}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">Payment Info</h2>
                  <p>Payment ID: {data.data.paymentId}</p>
                  <p>Total Payment: ₹{data.data.totalPrice}</p>
                  <p>Email: {data.data.email}</p>
                </div>
              </div>
           ) ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowOrder;
