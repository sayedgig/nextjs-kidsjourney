import mongoose, {model, models, Schema} from "mongoose";

const EventSchema = new Schema({
  name: {type:String,required:true},
  date: {type:Date,required:true},
  archieve:{type:Boolean,default:0},
  delete:{type:Boolean,default:0},
  path: {type:String,required:true},
  ticketsCategory: [{type:Object}],
});

export const Event = models?.Event || model('Event', EventSchema);