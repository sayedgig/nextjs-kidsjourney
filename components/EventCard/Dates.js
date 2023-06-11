// import { useContext } from "react";
// import { State } from "../context/stateContext";


export default function Dates({eventNumber, eventDate}) {
//   const { invoiceNumber, invoiceDate, dueDate } = useContext(State);

  return (
    <>
      <article className="mt-10 mb-14 flex items-end justify-end">
        <ul>
          <li className="p-1 ">
            <span className="font-bold">Event number:</span> {String(eventNumber).slice(0,6)}
          </li>
          <li className="p-1 bg-gray-100">
            <span className="font-bold">Event date:</span> {eventDate}
          </li>
          <li className="p-1 ">
            <span className="font-bold">Print date:</span> {getCurrentDate()}
          </li>
        </ul>
      </article>
    </>
  );
}


 function getCurrentDate(){
    const separator='/' ;
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }