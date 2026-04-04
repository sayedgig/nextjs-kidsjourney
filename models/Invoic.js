import mongoose, {model, models, Schema} from "mongoose";

const InvoiceSchema = new Schema({
  invoicedate: {type:Date,required:true},
  event: {type:mongoose.Types.ObjectId, ref:'Event'},
  ticketscategory: [{type:Object}],
  invoiceNotes: {type:String,required:true},
});

//"clientName","clientPhone","createdAt","paymentDue":"2023-11-02","paymentTerms":"22","description":"22","status":"pending","items":[{"name":"22","quantity":"1","price":"1","total":{"$numberInt":"1"}}],"total":{"$numberInt":"1"}}

export const Invoice = models?.Invoice || model('Invoice', InvoiceSchema);