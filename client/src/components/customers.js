import React, { useState, useEffect } from 'react';
import './customers.css';

function Customers() {
  const [customers, setCustomers] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(customers => {
        const inputValue = value.toLowerCase().replace(/\s/g, "")
        const result = customers.filter(customer => {
          const name = customer.firstName + customer.lastName
          if (name.toLowerCase().trim().indexOf(inputValue) > -1)
            return name
        })
        setCustomers(result)
      });
  }, [value])


  return (
    <div>
      <h2>Customers</h2>
      <input onKeyUpCapture={(e) => setValue(e.target.value)} />
      <ul>
        {customers.map(customer =>
          <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
        )}
      </ul>
    </div>
  );
}

export default Customers;
