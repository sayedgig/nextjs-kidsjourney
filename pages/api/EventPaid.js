import {Event} from "@/models/Event";
import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  //await isAdminRequest(req,res);



    if (method === 'DELETE') {
      const {_id} = req.query;
      //await Event.deleteOne({_id});
      await Event.updateOne({_id},{
        paid:0,
      });
      res.json('ok');
    }

    if (method === 'PUT') {
      const {_id} = req.query;
      //await Event.deleteOne({_id});
      await Event.updateOne({_id},{
        paid:1,
      });
      res.json('ok');
    }
  

}