import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid'; 

const RazorpayCheckout = ({ therapist }) => {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (e) => {


    const response = await fetch("http://localhost:8080/api/order", {
      method: "POST",
      body: JSON.stringify({
        amount: therapist.price * 100,
        currency:"INR",
        receipt: uuidv4(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);
    
    const options = {
      key: "rzp_test_G1aye3YQvA22CA", // Enter the Key ID generated from the Dashboard
      amount:therapist.price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency:"INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:8080/api/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.on("payment.success", function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      console.log(response);      
    })
    rzp1.open();
    e.preventDefault();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handlePayment}
      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700"
    >
      Book Appointment
    </motion.button>
  );
};

export default RazorpayCheckout;