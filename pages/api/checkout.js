import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Eorder} from "@/models/Eorder";
import {Event} from "@/models/Event";
import { EorderEdit } from "@/models/EorderEdit";




export default async function handler(req,res) {
  

  

  if (req.method === 'POST') {
    // res.json('should be a POST request');
    // return;
  
  const {
    _id,name,phone,notes,total,profit,
    cartProducts,createdby
  } = req.body;



  await mongooseConnect();

  let line_items = [];
  // var map = new Map();
  // let uniqueObjects = cartProducts.filter((web) => {
  //    if (map.get(web.cname)) {
  //       return false;
  //    }
  //    map.set(web.cname, web);
  //    return true;
  // });

//console.log("uniqueObjects",uniqueObjects)

var myEvent = await Event.findOne({_id})
myEvent.ticketsCategory.map(product => {
    line_items.push({
        quantity : cartProducts.filter(id => id.cname === product.cname).length,
        cname:product.cname,
        sprice:product.sprice,
        oprice:product.oprice
    });
  })
    


  const orderDoc = await Eorder.create({
    line_items,event:_id,name,phone,notes,total,profit,createdby
  });

  res.json('ok');
  }

  if (req.method === 'PUT') {
      
    const {
      event,name,phone,notes,total,profit,id,
      cartProducts,createdby
    } = req.body;
  
   //console.log(id,event)
    
  
    await mongooseConnect();
  
    let line_items = [];
  
  //console.log(event)
  var myEvent = await Event.findOne({_id:event})
  myEvent.ticketsCategory.map(product => {
    line_items.push({
        quantity : cartProducts.filter(id => id.cname === product.cname).length,
        cname:product.cname,
        sprice:product.sprice,
        oprice:product.oprice
    });
  })
    

    //audit Edit record
    var EditOreder = await Eorder.findOne({_id:id })
    var obj1 = EditOreder._doc;
    delete obj1["_id"];
    var obj2 = {...obj1, eorder:id}
    // console.log(obj2);
    const orderEdit = await EorderEdit.create(obj2);

  
  
    //const {id1} = [...id];
    
    const orderDoc = await Eorder.updateOne({_id:id},{
      line_items,event,name,phone,notes,total,profit,createdby
    });
  

    //console.log(orderDoc);
    res.json('ok');
    }
  
}