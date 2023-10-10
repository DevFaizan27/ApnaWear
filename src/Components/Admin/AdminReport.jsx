import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { firestore } from './index';

const AdminReport = () => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  const { items } = useSelector(state => (state.items))


  useEffect(() => {
    // Reference to the "user" collection in Firestore
    const userCollection = firestore.collection('/users');

    // Get the number of documents in the "user" collection
    userCollection
      .get()
      .then((querySnapshot) => {
        const numberOfUsers = querySnapshot.size;
        setUserCount(numberOfUsers); // Update the state with the user count
      })
      .catch((error) => {
        console.error('Error getting number of users:', error);
      });
  }, []);

  useEffect(() => {
    // Reference to the "user" collection in Firestore
    const orderCollection = firestore.collection('/orders');

    // Get the number of documents in the "user" collection
    orderCollection
      .get()
      .then((querySnapshot) => {
        const numberOfOrders = querySnapshot.size;
        setOrderCount(numberOfOrders); // Update the state with the user count
      })
      .catch((error) => {
        console.error('Error getting number of users:', error);
      });
  }, []);


  //for getting total sales
  const deliveredCollection = firestore.collection('/deliveredOrders');


  deliveredCollection
  .get()
  .then((querySnapshot) => {
    let totalSalesAmount = 0;
    querySnapshot.forEach((doc) => {
      const orderData = doc.data();
      console.log(orderData)
      totalSalesAmount += orderData.totalPrice || 0; // Add totalPrice to totalSalesAmount
    });
    setTotalSales((totalSalesAmount)/1000); // Update the state with the total sales amount
  })
  .catch((error) => {
    console.error('Error calculating total sales:', error);
  })


  const data = [
    { name: 'Total Users', value: userCount },
    { name: 'Total Orders', value: orderCount },
    { name: 'Total Items', value: items.length },
    { name: 'Total Sales in (k)', value: totalSales },

  ];

  return (
    <div className="bg-dark-theme h-screen flex flex-col  mt-2 items-center">
      <h2 className="text-2xl font-semibold mb-4 text-white">Report</h2>
      <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <BarChart width={600} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  )
}

export default AdminReport