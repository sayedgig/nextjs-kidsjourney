// import React, { useContext } from "react";
// import { State } from "../context/stateContext";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Table({
    _id,
    name:existingName,
    date:existingDate,
    ticketsCategory:assignedTicketsCategory,
   
  }) {
//   const { list, total } = useContext(State);


const [orders,setOrders] = useState([]);

useEffect(() => {
  fetchOrder();
  
}, []);
const fetchOrder = () => {
  setOrders([]);
  axios.get('/api/Eorders?id='+ _id + '&user=all').then(response => {
    setOrders(response.data);
  }).catch(err => {
    console.error(err);
  });
};


      let TotalQuant = 0;
      let line_quantity = [];
      
      for (const order of orders) {
        //const price = products.find(p => p === product)?.sprice || 0;
        
        for (const item of order.line_items) {
          TotalQuant += Number (item.quantity);
          line_quantity.push({
            Id:item.cname.toUpperCase(),
            qty:item.quantity
          });
        }
      }
      var result = [];
      line_quantity.reduce(function(res, value) {
        if (!res[value.Id]) {
          res[value.Id] = { Id: value.Id, qty: 0 };
          result.push(res[value.Id])
        }
        res[value.Id].qty += value.qty;
        return res;
      }, {});
      

  return (
    <>
      {/* <table width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>

       */}

      <table  width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <th className="font-bold">#</th>
            <th className="font-bold">NAME</th>
            <th className="font-bold">PHONE</th>
            {/* <th className="font-bold">NOTES</th> */}
            
            {assignedTicketsCategory.length > 0 && assignedTicketsCategory.map((property,index) => (
              <th className="font-bold" key={index}>{String(property.cname).toUpperCase()}</th>
          ))}
           
           
          </tr>
        </thead>
        <tbody>
         {orders.length > 0 && orders.map((order,ind) => (
          <tr key={order._id} className="h-10">
            <td style={{textAlign: `center`}}>
              {ind+1
              // order._id.substr(0, 6).toUpperCase()
              }</td>
            
            <td style={{textAlign: `center`}}>{order.name}
            </td>
            <td style={{textAlign: `center`}}>
              {order.phone}
            </td>
            {/* <td style={{textAlign: `center`}}>
              {order.notes}
            </td> */}
          
            {order.line_items.length > 0 && order.line_items.map((property,index) => (
              <td  style={{textAlign: `center`}} key={index}>{property.quantity}</td>
             ))}


           
           
          </tr>
        ))} 


          <tr className="bg-gray-200 p-1">
            <td style={{textAlign: `center` }}  >
              
            </td>
            
            <td style={{textAlign: `center`, color:`red`}} className="font-bold">
            TOTAL
            </td>
            <td style={{textAlign: `center`}}>
              
            </td>
            {/* <td style={{textAlign: `center`}}>
            
            </td> */}
          
             {result.length > 0 && result.map((property,index) => (
                          <td style={{textAlign: `center`, color:`red`}}  className="font-bold" key={index}>{property.qty}</td>
                      ))}
                    
           
           
          </tr>
        </tbody>
      </table>

      {/* <div className="flex items-end justify-end text-gray-800 text-2xl font-bold"> 
        <table >
                    
               
                    
                    {result.length > 0 && result.map((property,index) => (
                          <tr className="font-bold" key={index}><td>{property.Id} </td><td>:{property.qty}</td></tr>
                      ))}
                    
              
        </table>
      </div> */}

      
    </>
  );
}
