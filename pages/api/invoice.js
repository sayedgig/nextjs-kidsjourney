
import {Category} from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {Eorder} from "@/models/Eorder";
import {Event} from "@/models/Event";
import fs from 'fs'
import path from 'path'
import { createInvoice } from "./createInvoice";


export default async function handle(req, res) {
  const {method} = req;
  //await isAdminRequest(req,res);






  await mongooseConnect();
   var myEvent = await Event.findOne({_id:req.query?.id})
   var orders = await Eorder.find({event:req.query?.id})
   let total = 0;
   let ototal = 0;
   let profit = 0;
   let line_quantity = [];
   for (const order of orders) {
     total += Number (order.total);
     profit += Number (order.profit);
     for (const item of order.line_items) {
       line_quantity.push({
         Id:item.cname.toUpperCase(),
         qty:item.quantity
       });
     }
   }
   var lineTotalQuantity = [];
      line_quantity.reduce(function(res, value) {
        if (!res[value.Id]) {
          res[value.Id] = { Id: value.Id, qty: 0 };
          lineTotalQuantity.push(res[value.Id])
        }
        res[value.Id].qty += value.qty;
        return res;
      }, {});
////////////////////////////////////////

const data = {
  myEvent,
  orders,
  total,
  ototal,
  profit,
  lineTotalQuantity

}
   


  if (method === 'GET') {
    
    let filePath = '';

    if (data.orders.length>0)
    {
      await createInvoice(data, 'images_folder/'+myEvent._id +".pdf");
       filePath = path.resolve('.', 'images_folder/'+myEvent._id +".pdf");

    }else {
        filePath = path.resolve('.', 'images_folder/photo.pdf');
    }
  
    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'application/pdf')
    res.send(imageBuffer)
    
    
  }

}

// const { createInvoice } = require("./createInvoice.js");

// const invoice = {
//   shipping: {
//     name: "John Doe",
//     address: "1234 Main Street",
//     city: "San Francisco",
//     state: "CA",
//     country: "US",
//     postal_code: 94111
//   },
//   items: [
//     {
//       item: "TC 100",
//       description: "Toner Cartridge",
//       quantity: 2,
//       amount: 6000
//     },
//     {
//       item: "USB_EXT",
//       description: "USB Cable Extender",
//       quantity: 1,
//       amount: 2000
//     }
//   ],
//   subtotal: 8000,
//   paid: 0,
//   invoice_nr: 1234
// };


