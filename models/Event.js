import mongoose, {model, models, Schema} from "mongoose";

const EventSchema = new Schema({
  name: {type:String,required:true},
  date: {type:Date,required:true},
  archieve:{type:Boolean,default:0},
  ticketsCategory: [{type:Object}],
});

export const Event = models?.Event || model('Event', EventSchema);