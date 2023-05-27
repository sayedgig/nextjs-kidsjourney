
import mongoose, {model, Schema, models} from "mongoose";

const EorderSchema = new Schema({
  line_items:Object,
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


export const Eorder = models?.Eorder || model('Eorder', EorderSchema);