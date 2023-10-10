import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getTotal } from '../../Redux/Slices/cartSlice';
import NavBar from './NavBar';
import { toast } from 'react-toastify';
import { firestore } from '../Admin/index';
import Modal from './Modal';


const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { cart, totalQuantity, totalPrice } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal())

  }, [cart])


  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const buyNow = async () => {
    // validation 
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }
    // console.log(addressInfo)

    var options = {
      key: "rzp_test_bo3ItkSwX6zJGj",
      key_secret: "ngJDnpnSQSuzcRX98mvi4lk3",
      amount: parseInt(totalPrice * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "ApnaWear",
      description: "for testing purpose",
      handler: function (response) {

        // console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id
        // store in firebase 
        const orderInfo = {
          cart,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("userProfile")).email,
          userid: JSON.parse(localStorage.getItem("userProfile")).uid,
          paymentId,
          totalPrice,
        }

        const saveOrderToFirestore = async (orderInfo) => {
          try {
            const orderDetail = firestore.collection('orders');
            const docRef = await orderDetail.add(orderInfo);
            return docRef
          } catch (error) {
            console.error(error);
          }
        };
        saveOrderToFirestore(orderInfo)
        localStorage.removeItem('cartData')
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      },

      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();  
  }


  return (
    <>
      <NavBar />
      <div className="bg-gray-900 text-white font-sans h-screen flex flex-col">
        <header className="bg-gray-800 shadow-lg p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
          </div>
        </header>

        <div className="flex-grow flex flex-col md:flex-row">
          <section className="py-8  lg:ml-10 md:w-3/4">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="overflow-auto max-h-96">
                  {/* You can map through your cart items here */}
                  <CartItem cart={cart} />
                  {/* Add more CartItem components as needed */}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 p-4 shadow-md md:w-1/4 md:mt-0 mt-4">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg">Subtotal:</p>
                  <p className="text-gray-400">Total Quantity:</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">₹ {totalPrice}</p>
                  <p className="text-gray-400">{totalQuantity}</p>
                </div>
              </div>
              <div className="mt-4 text-right">
                <p className="text-xl font-semibold">Total: ₹ {totalPrice}</p>
                <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full" onClick={openModal}>
                  Checkout
                </button>
              </div>
            </div>
          </section>
        </div>
        <Modal
          name={name}
          address={address}
          pincode={pincode}
          phoneNumber={phoneNumber}
          setName={setName}
          setAddress={setAddress}
          setPincode={setPincode}
          setPhoneNumber={setPhoneNumber}
          buyNow={buyNow}
          isOpen={isModalOpen} onClose={closeModal}
        />
      </div>
    </>

  );
};

export default Cart;
