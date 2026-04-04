import {Eorder} from "@/models/Eorder";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    //await isAdminRequest(req,res);
  
    if (method === 'GET') {
      
  
      if (req.query?.id) {
        res.json(await Eorder.findOne({_id: req.query.id}));
      } else {
        res.json(await Eorder.find());
      }
      
    }

    // if (method === 'PUT') {
    //   const {_id} = req.query;
    //   const {
    //     createdby
    //   } = req.body;
    
      
    //   await Eorder.updateOne({_id},{
    //     createdby:createdby,
    //   });
    //   res.json('ok');
    // }
}