import React,{useState} from 'react'

const EventInfo = ({
    _id,
    name:existingName,
    date:existingDate,
    ticketsCategory:assignedTicketsCategory,
   
  }) => {
//   const [eventId,setEventId] = useState(_id|| '');
//   const [eventName,setName] = useState(existingName|| '');
//   const [eventDate,setDate] = useState(existingDate || '');

//   const [ticketsCategory,setTicketsCategory] = useState(assignedTicketsCategory || {});
//   console.log(ticketsCategory)
  return (
    <>
      <h1> Event : {existingName} - Date : {(new Date((existingDate)).toISOString().slice(0, 10))}
</h1>
      {/* <div className="mb-2">
          <label className="block">Ticket Category</label>
        
          {assignedTicketsCategory.length > 0 && assignedTicketsCategory.map((property,index) => (
            <div key={index} className="flex gap-1 mb-2" >
              <input type="text"
                     className="mb-0"
                    value={property.cname}
                    placeholder="Ticket name (example: adult)"/>
              <input type="text"
                     className="mb-0"
                     value={property.oprice}
                     placeholder="original price"/>
              <input type="text"
                     className="mb-0"
                     value={property.sprice}
                     placeholder="sell price"/>

              
            </div>
          ))}
        </div> */}

        {/* <div>eventId : {eventId}</div>
        <div>name : {eventName}</div>
        <div>date : {eventDate}</div>
        {ticketsCategory.length > 0 && ticketsCategory.map(p => (
            
          <div key={p.cname} className="">
            <p>{p.cname} - {p.oprice} - {p.sprice}</p>
        
          </div>
        ))} */}

    </>
  )
}

export default EventInfo