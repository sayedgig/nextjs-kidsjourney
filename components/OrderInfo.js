import axios from 'axios';
import Link from 'next/link';
import React,{useEffect, useState} from 'react'
import Table from './test/Table';

import XLSX from "xlsx";
import { useRouter } from 'next/router';
const ExcelJS = require("exceljs");


    
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
          
          await axios.delete('/api/Eorders?id='+id);
          fetchOrder('all');
        
      };

      let total = 0;
      let ototal = 0;
      let profit = 0;
      let TotalQuant = 0;
      let line_quantity = [];
      let createdBy =[];
      
      
    
      for (const order of orders) {
        //const price = products.find(p => p === product)?.sprice || 0;
        total += Number (order.total);
        profit += Number (order.profit);
        createdBy.push({Id:order.createdby,qty:1})
        for (const item of order.line_items) {
          TotalQuant += Number (item.quantity);
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
     
    const[tableStyle,setTableStyle] = useState('TableStyleLight3');
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
    const [data, setData] = useState([]);
    const exportExcelFile = () => {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("My Sheet");

            // merge a range of cells
            sheet.mergeCells('D2:H2');
            sheet.mergeCells('D3:H3');
      // ... merged cells are linked
      sheet.getCell('H2').value = existingName;
      sheet.getCell('H2').font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
      sheet.getCell('H3').value = new Date(existingDate);
      sheet.getCell('H3').font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
      

     let myColumns= [
        {name: 'ID', totalsRowLabel: 'Total', filterButton: false},
        {name: 'NAME', totalsRowLabel: '', filterButton: false},
        {name: 'PHONE', totalsRowLabel: '', filterButton: false},
        {name: 'NOTES', totalsRowLabel: '', filterButton: false},
        {name: 'ADMIN', totalsRowLabel: '', filterButton: false},
        // ,style : {font:{bold: true, name: 'Comic Sans MS'}}
      ];
          for (const item of assignedTicketsCategory) {            
            myColumns=[...myColumns ,{name: String(item.cname).toUpperCase(), totalsRowFunction: 'sum', filterButton: false} ]
          }
     /////////////////////////////////////////////////////

let myRows = [];
let recordNo =0;


          for (const order of orders) {
            let dataRow =[];
            recordNo=recordNo+1;

            dataRow.push(recordNo);            dataRow.push(order?.name);
            dataRow.push(order?.phone);
            dataRow.push(order?.notes); 
            dataRow.push(String(order?.createdby).slice(0,5)); 
            for (const item of order.line_items) {
              //console.log(item.cname)
              dataRow.push(Number(item.quantity));
            }

            // Book Bus  Privet Car 

            //dataRow.push(Number(order?.total)) ;
            myRows.push(dataRow);
          }
          
        //{console.log(tableStyle,myColumns,myRows)}

      sheet.addTable({
        name: 'MyTable',
        ref: 'D4',
        headerRow: true,
        totalsRow: true,
        style: {
          theme: `${tableStyle}`,
          showRowStripes: true,
        },
        columns: myColumns,
        rows: myRows,
      });
      
      let zz=0;
      for (const order of orders) {
        zz=zz+1
        //console.log(zz);
        //.includes('Sahar') ?`rgb(24,176,242)`:`rgb(97,242,24)` 
        if(sheet.getCell(`H${4+zz}`).value.includes('Sahar'))
        // sheet.getCell(`H${4+zz}`).fill = {
        //   type: 'gradient',
        //   gradient: 'path',
        //   center:{left:0.5,top:0.5},
        //   stops: [
        //     {position:0, color:{argb:'FF009EFF'}},
        //     {position:1, color:{argb:'FF009EFF'}}
        //   ]
        // };
        sheet.getCell(`H${4+zz}`).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{argb:'FF009EFF'},
        };
        
        else

        sheet.getCell(`H${4+zz}`).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{argb:'FF00FF00'},
        };
        // sheet.getCell(`H${4+zz}`).fill = {
        //   type: 'gradient',
        //   gradient: 'path',
        //   center:{left:0.5,top:0.5},
        //   stops: [
        //     {position:0, color:{argb:'FF00FF00'}},
        //     {position:1, color:{argb:'FF00FF00'}}
        //   ]
        // };

        
         // sheet.getCell(`H${4+zz}`).font = { name: 'Comic Sans MS', family: 4, size: 12, bold: true };
        
        // 
         
      }


        workbook.xlsx.writeBuffer().then(function (data) {
          const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = existingName+_id+".xlsx";
          anchor.click();
          window.URL.revokeObjectURL(url);
        });
  
        
     
    };

    const PrintCard = () =>{
      router.push('/PrintEvent/'+ _id);

    }

  return (
    <>
       <h1>Orders # {_id.substr(0, 6).toUpperCase()}</h1>
       {/* <button className="btn-default" onClick={()=>downloadExcel()}>
              Event PDF
        </button> */}
        <div className="flex gap-1">
     
      <button  onClick={exportExcelFile} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  
  <span>Export XLSX</span>
</button>
   
  <select value={tableStyle} onChange={(e)=>{setTableStyle(e.target.value)}}
              className=" text-sm mb-2 " style={{width:`30%`}}>

    <option value="TableStyleLight1">TableStyleLight1</option>
    <option selected value="TableStyleLight2">TableStyleLight2</option>
    <option value="TableStyleLight3">TableStyleLight3</option>
    <option value="TableStyleDark1">TableStyleDark1</option>
    <option value="TableStyleDark2">TableStyleDark2</option>

    <option value="TableStyleDark3">TableStyleDark3</option>

  </select>

 
  
      <button  onClick={PrintCard} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  
  <span>Download PDF</span>
</button>
</div>
      <table className="basic">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>phone</th>
            <th>notes</th>
            <th>Admin</th>
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
            <td style={{
                            backgroundColor: String(order.createdby).includes('Sahar') ?`rgb(24,176,242)`:`rgb(97,242,24)` 
                      }} 
            >
              {String(order.createdby).slice(0,5)}
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
                    <th>Admin Orders</th>
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
                      <button onClick={()=>filterByUser('all')} style={{Color: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`}} >All User</button>
                    {resultCreatedby.length > 0 && resultCreatedby.map((property,index) => (
                          <button onClick={()=>filterByUser(property.Id)} 
                          style={{
                            backgroundColor: String(property.Id).includes('Sahar') ?`rgb(24,176,242)`:`rgb(97,242,24)` }} key={index}>{property.Id}:{property.qty}</button>
                      ))}
                      </div>
                    </td>
                    <td>
                      <p>Total Quantity : {TotalQuant}</p>
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