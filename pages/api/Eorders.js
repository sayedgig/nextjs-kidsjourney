import {Eorder} from "@/models/Eorder";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  //await isAdminRequest(req,res);
//{"_id":{"$oid":"64704246439406a81de7b399"},"line_items":[{"quantity":{"$numberInt":"2"},"cname":"mini","sprice":"35","oprice":"25"},{"quantity":{"$numberInt":"3"},"cname":"mega","sprice":"60","oprice":"50"}],"event":{"$oid":"646f3b71238267f75bd176d9"},"name":"a","phone":"a","notes":"a","total":"250","profit":"50","createdby":"online","createdAt":{"$date":{"$numberLong":"1685078598523"}},"updatedAt":{"$date":{"$numberLong":"1685078598523"}},"__v":{"$numberInt":"0"}}
  if (method === 'GET') {
    
    console.log(req.query?.user,req.query?.id );
    if (req.query?.id ) {
      if (req.query?.user=='all')
           res.json(await Eorder.find({event: req.query.id}));
      else
           res.json(await Eorder.find({event: req.query.id,createdby:req.query?.user}));//createdby:req.query?.user
    } else {
      res.json(await Eorder.find());
    }
    
  }

//   if (method === 'POST') {
//     const {name,date,ticketsCategory} = req.body;
//     console.log("testdata",name,date,ticketsCategory)
//     const EorderDoc = await Eorder.create({
//       name,
//       date,
//       ticketsCategory,
      
//     });
//     res.json(EorderDoc);
//   }

//   if (method === 'PUT') {
//     const {name,date,ticketsCategory,_id} = req.body;
//     const EorderDoc = await Eorder.updateOne({_id},{
//       name,
//       date,
//       ticketsCategory,
      
//     });
//     res.json(EorderDoc);
//   }

  if (method === 'DELETE') {
  
    const {_id} = req.query;
    //console.log(_id)
    await Eorder.deleteOne({_id});
    res.json(true);
    
    
  }
}