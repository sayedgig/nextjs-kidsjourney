
import mongoose, {model, Schema, models} from "mongoose";

const EorderDeleteSchema = new Schema({
  line_items:Object,
  eorder:{type:mongoose.Types.ObjectId, ref:'Eorder'},
  event:{type:mongoose.Types.ObjectId, ref:'Event'},
  name:{type:String,required:true},
  phone:{type:String,required:true},
  notes:{type:String},
  total:{type:String},
  profit:{type:String},
  createdby:{type:String,default:'online'},

}, {
  timestamps: true,
});


export const EorderDelete = models?.EorderDelete || model('EorderDelete', EorderDeleteSchema);