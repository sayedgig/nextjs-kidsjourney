import {Event} from "@/models/Event";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  //await isAdminRequest(req,res);

  if (method === 'GET') {
    

    if (req.query?.id) {
      res.json(await Event.findOne({_id:req.query.id}));
    } else {
      res.json(await Event.find({archieve:true}));
    }
  }

    if (method === 'DELETE') {
      const {_id} = req.query;
      //await Event.deleteOne({_id});
      await Event.updateOne({_id},{
        archieve:0,
      });
      res.json('ok');
    }
  

}