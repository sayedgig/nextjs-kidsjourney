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
    
    //console.log(req.query?.user,req.query?.id );
    
      if (req.query?.name)
      { 
           res.json(await Eorder.aggregate([
            {
              $search: {
                index: "autocomplete",
                autocomplete: {
                  query: req.query.name,
                  path: "name",
                  fuzzy: {
                    maxEdits: 1,
                  },
                  tokenOrder: "sequential",
                },
              },
            },
            {
              $project: {
                searchName: 1,
                _id: 1,
                name: 1,
                phone: 1,
                notes: 1,
                createdby:1,
                score: { $meta: "searchScore" },
              },
            },
            {
              $limit: 10,
            },
          ])
          );//createdby:req.query?.user
    
        }

        if (req.query?.phone)
        { 
             res.json(await Eorder.aggregate([
              {
                $search: {
                  index: "autocomplete",
                  autocomplete: {
                    query: req.query.phone,
                    path: "phone",
                    fuzzy: {
                      maxEdits: 1,
                    },
                    tokenOrder: "sequential",
                  },
                },
              },
              {
                $project: {
                  searchName: 1,
                  _id: 1,
                  name: 1,
                  phone: 1,
                  notes: 1,
                  createdby:1,
                  score: { $meta: "searchScore" },
                },
              },
              {
                $limit: 10,
              },
            ])
           );//createdby:req.query?.user
      
          }
  }


 
}