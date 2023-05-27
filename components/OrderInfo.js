import axios from 'axios';
import Link from 'next/link';
import React,{useEffect, useState} from 'react'
import Table from './test/Table';

import XLSX from "xlsx";
import { useRouter } from 'next/router';

const OrderInfo = ({
    _id,
    name:existingName,
    date:existingDate,
    ticketsCategory:assignedTicketsCategory,
   
  }) => {

    const router = useRouter();


    const [orders,setOrders] = useState([]);
    // const[userFilter,setUserFilter]= useState('all');
     const filterByUser = (user) => {
    //   setUserFilter(user);
       fetchOrder(user);

     }
    useEffect(() => {
      fetchOrder('all');
      
    }, []);
    const fetchOrder = (user) => {
      setOrders([]);
      //console.log('/api/Eorders?id='+ _id + '&user=' + user);
      axios.get('/api/Eorders?id='+ _id + '&user=' + user).then(response => {
        setOrders(response.data);
        //console.log("response",response.data);
      }).catch(err => {
        console.error(err);
      });
    };


    async function deleteEvent(id) {
     //console.log(id);
          
          await axios.delete('/api/Eorders?_id='+id);
          fetchOrder();
        
      };

      let total = 0;
      let ototal = 0;
      let profit = 0;
      let line_quantity = [];
      let createdBy =[];
      
      
    
      for (const order of orders) {
        //const price = products.find(p => p === product)?.sprice || 0;
        total += Number (order.total);
        profit += Number (order.profit);
        createdBy.push({Id:order.createdby,qty:1})
        for (const item of order.line_items) {
          line_quantity.push({
            Id:item.cname.toUpperCase(),
            qty:item.quantity
          });
        }
      }

      //console.log("line_quantity",line_quantity);

      var result = [];
      line_quantity.reduce(function(res, value) {
        if (!res[value.Id]) {
          res[value.Id] = { Id: value.Id, qty: 0 };
          result.push(res[value.Id])
        }
        res[value.Id].qty += value.qty;
        return res;
      }, {});
      
     // console.log("result",result);
     var resultCreatedby = [];
     createdBy.reduce(function(res, value) {
       if (!res[value.Id]) {
         res[value.Id] = { Id: value.Id, qty: 0 };
         resultCreatedby.push(res[value.Id])
       }
       res[value.Id].qty += value.qty;
       return res;
     }, {});
     

    const  downloadExcel = async () => {
      //
      // const data = {
      //   eventId: _id,
      //   eventName:existingName,
      //   eventDate:existingDate,
      //   eventTicketsCategory:assignedTicketsCategory,
      //   orders:orders,
      //   total:total,
      //   profit:profit,
      //   lineTotalQuantity:result,
      // }
          const href = '/api/invoice?id='+ _id
          const link = document.createElement('a');
          link.href = href;
          link.setAttribute('download', _id+'.pdf'); //or any other extension
          document.body.appendChild(link);
          link.click();

          //clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
    };
  return (
    <>
       <h1>Orders # {_id.substr(0, 6).toUpperCase()}</h1>
       <button className="btn-default" onClick={()=>downloadExcel()}>
              Event PDF
        </button>
      <table className="basic">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>phone</th>
            <th>notes</th>
            {assignedTicketsCategory.length > 0 && assignedTicketsCategory.map((property,index) => (
              <th key={index}>{property.cname}({property.sprice})</th>
          ))}
            <th>amount</th>
            {/* <th>user</th> */}

            <th></th>
          </tr>
        </thead>
        <tbody>
         {orders.length > 0 && orders.map((order,ind) => (
          <tr key={order._id}>
            <td>
              {ind+1
              // order._id.substr(0, 6).toUpperCase()
              }</td>
            
            <td>{order.name}
            </td>
            <td>
              {order.phone}
            </td>
            <td>
              {order.notes}
            </td>
            {order.line_items.length > 0 && order.line_items.map((property,index) => (
              <td key={index}>{property.quantity}</td>
             ))}


            <td>
              {order.total}
            </td>
            {/* <td>
              {order.createdby}
            </td> */}
            <td>

            <Link className="btn-default" href={'/Eorders/edit/'+order._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit
                </Link>
            <button
                  onClick={() => deleteEvent(order._id)}
                  className="btn-red">Delete</button>
            </td>
          </tr>
        ))} 
        </tbody>
      </table>

      <Table>
                <thead>
                  <tr>
                    <th>Order Count</th>
                    <th>User Orders</th>
                    <th>Total Quantity</th>
                    
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                    {orders.length}
                      </td>             
                    <td>
                      <div class="flex flex-col items-start">
                      <button onClick={()=>filterByUser('all')} style={{backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`}} >All User</button>
                    {resultCreatedby.length > 0 && resultCreatedby.map((property,index) => (
                          <button onClick={()=>filterByUser(property.Id)} style={{backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`}} key={index}>{property.Id}:{property.qty}</button>
                      ))}
                      </div>
                    </td>
                    <td>
                    {result.length > 0 && result.map((property,index) => (
                          <p key={index}>{property.Id}:{property.qty}</p>
                      ))}
                    </td>
                    <td>
                      <p>Total Amount:{total.toLocaleString()} </p>
                      <p>Profit      :{profit.toLocaleString()}</p>
                      <p>Net Amount  :{(total - profit).toLocaleString()}</p></td>
                    
                  </tr>
                </tbody>
              </Table>

    </>
  )
}

export default OrderInfo