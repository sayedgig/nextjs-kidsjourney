const fs = require("fs");
const PDFDocument = require("pdfkit");

async function  createInvoice(invoice, path) {

  
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  await doc.pipe(fs.createWriteStream(path));
 // return doc;
}

function generateHeader(doc) {
  doc
   // .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("KIDS JOURNEY", 110, 57)
    .fontSize(10)
    .text(`${new Date().toLocaleString('en-us', {weekday:'long'})}`, 200, 50, { align: "right" })
    .text(`${formatDate(new Date())}`, 200, 65, { align: "right" })
    .text("Doha-Qatar", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {

  const {
    myEvent,
    orders,
    total,
    ototal,
    profit,
    lineTotalQuantity  
} = invoice;
  doc
    .fillColor("#444444")
    .fontSize(20)
    //.text("Invoice", 50, 160);
    .text(myEvent.name, 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Event Number:", 50, customerInformationTop)
    ////////////////////////////////
    .font("Helvetica-Bold")
    .text(myEvent._id, 150, customerInformationTop)
    //////////////////////////
    .font("Helvetica")
    .text("Event Date:", 50, customerInformationTop + 15)
    ////////////////////////////////////
    .text(new Date(myEvent.date).toLocaleString('en-us', {weekday:'long'}) + ' : ' + formatDate(new Date(myEvent.date)), 150, customerInformationTop + 15)
    ///////////////////////////
    // .text("Balance Due:", 50, customerInformationTop + 30)
    // //////////////////////////
    // .text(
    //   formatCurrency(profit),
    //   150,
    //   customerInformationTop + 30
    // )
    /*
     ////////////////////////////////////////
    .font("Helvetica-Bold")
    .text(eventName, 300, customerInformationTop)
    /////////////////////////////////
    .font("Helvetica")
    //.text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      //invoice.shipping.city +
        "Doha, Qatar" ,
        //invoice.shipping.state +
       // ", " +
        //invoice.shipping.country
        
      300,
      customerInformationTop + 30
      
    )
    */
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {


  
  const {
    myEvent,
    orders,
    total,
    ototal,
    profit,
    lineTotalQuantity  
} = invoice;

//console.log(lineTotalQuantity);

  let i;
  const invoiceTableTop = 280;

  doc.font("Helvetica-Bold");
  
  doc
    .fontSize(10)
    .text("NAME", 50, invoiceTableTop)
    .text("PHONE", 150, invoiceTableTop)
    .text("NOTES", 200, invoiceTableTop, { width: 90, align: "right" });
    let kk = 0;
    for (const item of myEvent.ticketsCategory) {

      doc.text(String(item.cname).toUpperCase(), 370 + kk, invoiceTableTop);
      kk=kk+75;
    }
    

  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  let zz =0;
  let position =0
  for ( const order of orders) {
    position = invoiceTableTop + (zz + 1) * 30;
    zz=zz+1;
   doc
   .fontSize(10)
    .text(order.name, 50, position)
    .text(order.phone, 150, position)
    .text(order.notes || '', 200, position, { width: 90, align: "right" });
    let rr = 0;
    for (const line of order.line_items) {
      doc.text(line.quantity, 370 + rr, position);
      rr=rr+75;
    }
    
     generateHr(doc, position + 20);
   }

  
  
  let qq=0;
  let subtotalPosition  = position + 30;
  doc.text("Total", 50, subtotalPosition)
  for (const item of lineTotalQuantity) {

    doc.text(String(item.qty).toUpperCase(), 370 + qq, subtotalPosition);
    qq=qq+75;
  }
  // generateTableRow(
  //   doc,
  //   subtotalPosition,
  //   "",
  //   "",
  //   "Subtotal",
  //   "",
  //   formatCurrency(invoice.subtotal)
  // );
/*
  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  */
  doc.font("Helvetica");



}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Doaa Mahmoud - Sahar Gamal . Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
