import React, { useState, useEffect } from "react";
import { Button } from '@mui/material'


const ProductDisplay = () => (
  <section>
    
    <form action="/create-checkout-session" method="POST">
      <Button sx={{backgroundColor: 'red'}}>
        Checkout
      </Button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Buy() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <ProductDisplay />
  );
}