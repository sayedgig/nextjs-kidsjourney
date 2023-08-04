import Layout from '@/components/Layout'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import events from './events';

const Caculation = () => {
  const [Events,setEvents] = useState([]);
 
  useEffect(() => {
    fetchEvents();
  }, [])



  

  
    let SaharOrders = 0;
    let SaharProfit = 0;
    let SaharTotal= 0;
    let SaharNet= 0;

    
    let DoaaOrders = 0;
    let DoaaProfit = 0;
    let DoaaTotal= 0;
    let DoaaNet= 0;

    
  
    for (const event of Events) {
      
      SaharOrders += Number (event.orders.filter((ord)=> ord.createdby=='sahar youssef').length);
      SaharProfit += Number (event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.profit) , 0 ) || 0);
      SaharTotal += Number (event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.total) , 0 ) || 0);
      
      
      if (event.paid)
      SaharNet += Number (event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.profit) , 0 ) || 0);
      else
      SaharNet += Number (event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.total) , 0 ) || 0);


      DoaaOrders += Number (event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').length);
      DoaaProfit += Number (event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.profit) , 0 )) ;
      DoaaTotal += Number (event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.total) , 0 )) ;
      if (event.paid)
      DoaaNet += Number (event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.profit) , 0 ) || 0);
      else
      DoaaNet += Number (event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.total) , 0 ) || 0);

      
    }

  function fetchEvents() {
    axios.get('/api/Events').then(result => {
      setEvents(result.data);
    });
    
  }

 

      async function  PayEvent (Event,stype){
        
         
            const {_id} = Event;
            if (stype=='Paid')
            await axios.put(`/api/EventPaid?_id=`+_id);
            else
            await axios.delete(`/api/EventPaid?_id=`+_id);

            fetchEvents();
          
        };
      
 
  return (
    <Layout>
     
        <table className="basic mt-4">
          <thead>
          <tr>
             {/* <th rowspan="2">Event Id</th> */}
            <th rowspan="2">Event Name</th>
            <th rowspan="2"> Event Date</th>
            <th rowspan="2"> Paid </th>
            <th colspan="4" style={{backgroundColor: `rgb(24,176,242)`}} >Sahar</th>
            <th colspan="4" style={{backgroundColor: `rgb(97,242,24)`}}  >Doaa</th>

            {/* <td>Orders</td>
            
            <td>Profit</td>
            <td>Cost</td>
            <td>Total</td> */}
            
          </tr>
          <tr>
            <th style={{backgroundColor: `rgb(24,176,242)`}}>Orders</th>
            <th style={{backgroundColor: `rgb(24,176,242)`}}>Profit</th>
            <th style={{backgroundColor: `rgb(24,176,242)`}}>Cost</th>
          
            {/* <th style={{backgroundColor: `rgb(24,176,242)`}}>Total</th> */}
            <th style={{backgroundColor: `rgb(24,176,242)`}}>Balance</th>



            <th style={{backgroundColor: `rgb(97,242,24)`}}>Orders</th>
            <th style={{backgroundColor: `rgb(97,242,24)`}}>Profit</th>
            <th style={{backgroundColor: `rgb(97,242,24)`}}>Cost</th>
          
            {/* <th style={{backgroundColor: `rgb(97,242,24)`}}>Total</th> */}
            <th style={{backgroundColor: `rgb(97,242,24)`}}>Balance</th>

         </tr>
          </thead>
          <tbody>
          {Events.length > 0 && Events.map(Event => (
            <tr key={Event._id}>
              {/* <td>{Event._id.substr(0, 6).toUpperCase()}</td> */}
              <td>{Event.name}</td>
              <td>{String(Event.date).slice(0,10)}</td>
              <td className={Event.paid ? 'text-green-600' : 'text-red-600'}>
              {/* {Event.paid ? 'YES' : 'NO'} */}
                 <button
                  onClick={() => {PayEvent(Event,Event.paid ?'UnPaid':'Paid')}}
                  className={Event.paid ? 'btn-green':  'btn-default' }>{Event.paid ? 'Paid': 'UnPaid' }</button>
               </td>

              <td>{Event.orders.filter((ord)=> ord.createdby=='sahar youssef').length}</td>
              <td>{
                 Number( 
              Event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.profit) , 0 )
              ).toLocaleString() 
              }</td>
              <td>{
                Event.paid ? 0 :
                Number(
              Event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.total) , 0 ) 
               -  
               Event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.profit) , 0 ) 
               ).toLocaleString() 
 
              }</td>
              
             

              

               {/* <td>
                {
                Number(
                Event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.total) , 0 )
                ).toLocaleString() 
                }</td> */}
               <td>
                {
                Number(
                Event.paid ? 
                Event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.profit) , 0 ) 
                :
                Event.orders.filter((ord)=> ord.createdby=='sahar youssef').reduce((a,v) =>  a = a + Number(v.total) , 0 )

                
                ).toLocaleString() 
                }</td>
              
              <td>{Event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').length}</td>
              <td>{
                 Number(
              Event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.profit) , 0 )
              ).toLocaleString()  
              }</td>
              <td>{
                Event.paid ? 0 :
                Number(
              Event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.total) , 0 ) 
               -  
               Event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.profit) , 0 ) 
               ).toLocaleString()  
              }</td>
              {/* <td>{
                Number(
                  
                   Event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.total) , 0 )
              ).toLocaleString()  
            }</td> */}
             
              <td>{
                Number(
                  Event.paid ? 
                  Event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.profit) , 0 ) 
                  :
                   Event.orders.filter((ord)=> ord.createdby=='Doaa Mahmoud').reduce((a,v) =>  a = a + Number(v.total) , 0 )
              ).toLocaleString()  
            }</td>

              
            </tr>
          ))}

           <tr >
              {/* <td></td> */}
              <td>Total</td>
              <td></td>
              <td></td>

              <td style={{backgroundColor: `rgb(24,176,242)`}}>{ Number(SaharOrders).toLocaleString() }</td>
              <td style={{backgroundColor: `rgb(24,176,242)`}}>{Number(SaharProfit).toLocaleString() }</td>
              <td style={{backgroundColor: `rgb(24,176,242)`}}>{
                  Number(SaharNet - SaharProfit ).toLocaleString()
               }</td>
              {/* <td style={{backgroundColor: `rgb(24,176,242)`}}>{Number(SaharTotal).toLocaleString()}</td> */}
              <td style={{backgroundColor: `rgb(24,176,242)`}}>{Number(SaharNet).toLocaleString()}</td>
              
              <td style={{backgroundColor: `rgb(97,242,24)`}}>{Number(DoaaOrders).toLocaleString()}</td>
              <td style={{backgroundColor: `rgb(97,242,24)`}}>{Number(DoaaProfit).toLocaleString()}</td>
              <td style={{backgroundColor: `rgb(97,242,24)`}}>{
                  Number(DoaaNet - DoaaProfit).toLocaleString()
               }</td>
              {/* <td style={{backgroundColor: `rgb(97,242,24)`}}>{Number(DoaaTotal).toLocaleString() }</td> */}

              <td style={{backgroundColor: `rgb(97,242,24)`}}>{Number(DoaaNet).toLocaleString() }</td>
            </tr>
          </tbody>
        </table>
        {/* <ShowTable Events ={Events} editEvent = {editEvent} deleteEvent={deleteEvent} /> */}
        
    </Layout>
      )
}

export default Caculation