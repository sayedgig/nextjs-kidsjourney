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
      res.json(await Event.find({archieve:false}));
    }
  }

  if (method === 'POST') {
    const {name,date,ticketsCategory} = req.body;
    console.log("testdata",name,date,ticketsCategory)
    const EventDoc = await Event.create({
      name,
      date,
      ticketsCategory,
      
    });
    res.json(EventDoc);
  }

  if (method === 'PUT') {
    const {name,date,ticketsCategory,_id} = req.body;
    const EventDoc = await Event.updateOne({_id},{
      name,
      date,
      ticketsCategory,
      
    });
    res.json(EventDoc);
  }

  if (method === 'DELETE') {
    const {_id} = req.query;
    //await Event.deleteOne({_id});
    await Event.updateOne({_id},{
      archieve:1,
    });
    res.json('ok');
  }
}