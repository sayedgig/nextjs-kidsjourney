import Layout from "@/components/Layout";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';
import Link from "next/link";
import EventImage from './../components/EventImage';
import ShowTable from "@/components/ShowTable";




function Events({swal}) {
    
  const [editedEvent, setEditedEvent] = useState(null);
  const [name,setName] = useState('');
  const [eDate,setEDate] = useState('');
  const[imagePath,setImagePath] = useState('$');



  const [Events,setEvents] = useState([]);
  const [ticketsCategory,setTicketsCategory] = useState([]);


  useEffect(() => {
    fetchEvents();
  }, [])
  function fetchEvents() {
    axios.get('/api/Events').then(result => {
      setEvents(result.data);
      //console.log("get",result.data);
    });
  }
  async function saveEvent(ev){
    ev.preventDefault();
   if (ticketsCategory.length > 0){
    const data = {
      name,
      date:eDate,
      path:imagePath,
      
      ticketsCategory:ticketsCategory.map(p => ({
        cname:p.cname,
        oprice:p.oprice,
        sprice:p.sprice,

      })),
    };
    // console.log("data",data);
    if (editedEvent) {
      data._id = editedEvent._id;
      await axios.put('/api/Events', data);
      setEditedEvent(null);
    } else {
      await axios.post('/api/Events', data).then(result => {
       // console.log("post",result.data);
      });;
    }
    setName('');
    setEDate('');
    setImagePath('$');
    setTicketsCategory([]);
    fetchEvents();
   } else{

    swal.fire({
      title: 'Ticket Category is empty',
      text: `kindly add ticket category price`,
      //showCancelButton: true,
      //cancelButtonText: 'Cancel',
      confirmButtonText: 'close',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    });
   }
   
  }
  function editEvent(event){
    setEditedEvent(event);
    setName(event.name);
    setImagePath(event.path);
    
    //console.log("date",moment(event.date).utc().format("YYYY-MM-DD"));

    setEDate(new Date((event.date)).toISOString().slice(0, 10));
    
    setTicketsCategory(
      event.ticketsCategory.map(({cname,oprice,sprice}) => ({
      cname,
      oprice,
      sprice
      }))
    );
      }
  function deleteEvent(Event){
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to archieve ${Event.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Archive!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const {_id} = Event;
        await axios.delete('/api/Events?_id='+_id);
        fetchEvents();
      }
    });
  }
//////////////////////////////

  function addTicketscategory() {
    setTicketsCategory(prev => {
      return [...prev, {cname:'',oprice:'',sprice:''}];
    });
  }
  function handleTecketscategoryNameChange(index,property,ev) {
    ev.preventDefault();
    setTicketsCategory(prev => {
      const properties = [...prev];
      //console.log(prev);
      properties[index].cname = ev.target.value;
      return properties;
    });
  }
  function handleTecketscategoryOpriceChange(index,property,newOprice) {
    
    setTicketsCategory(prev => {
      const properties = [...prev];
      properties[index].oprice = newOprice;
      return properties;
    });
  }
  function handleTecketscategorySpriceChange(index,property,newSprice) {
    setTicketsCategory(prev => {
      const properties = [...prev];
      properties[index].sprice = newSprice;
      return properties;
    });
  }
  function removeTicketcategory(indexToRemove) {
    //console.log("orders",orders);
    if(orders.length == 0)
    {
      setTicketsCategory(prev => {
        return [...prev].filter((p,pIndex) => {
          return pIndex !== indexToRemove;
        });
      });
    }
    else 
    {
      swal.fire({
        title: 'This event has Orders',
        text: `it is not allowed to remove it`,
        //showCancelButton: true,
        //cancelButtonText: 'Cancel',
        confirmButtonText: 'close',
        confirmButtonColor: '#d55',
        reverseButtons: true,
      });
    }
    
  }

  ////////////////////
 const[orders,setOrders] = useState([]);
  useEffect(() => {
    if (editedEvent)
    fetchOrder('all',editedEvent._id);
    else
    setOrders([]);

    
  }, [editedEvent]);
  const fetchOrder = (user,_id) => {
    setOrders([]);
    axios.get('/api/Eorders?id='+ _id + '&user=' + user).then(response => {
      setOrders(response.data);
      //console.log("response",response.data);
    }).catch(err => {
      console.error(err);
    });
  };


  
  

  return (
    <Layout>
      <h1>Events</h1>
      <label>
        {editedEvent
          ? `Edit Event ${editedEvent.name}`
          : 'Create new Event'}
      </label>
      <form onSubmit={saveEvent}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Event name'}
            onChange={ev => setName(ev.target.value)}
            value={name}
            required
            />
          <input
            type="date"
            placeholder={'Event Date'}
            onChange={ev => setEDate(ev.target.value)}
            value={eDate}
            required
            />
            <select value={imagePath} 
             onChange={(e)=>{setImagePath(e.target.value)}}
           >
              {/* <option key = {0} value={image.path}>NoImage</option> */}
              {EventImage.map((image,index)=>{
                return(
                  <option key ={index+1} value={image.path}>{image.name}</option>
                )
              })}
            </select>
          
        </div>

        <div className="mb-2">
          {imagePath && imagePath.length>1 && (<img src ={`/${imagePath}`}  style={{width:100 , height:100}} />)}
        
          <label className="block">Ticket Category</label>
          <button
            onClick={addTicketscategory}
            type="button"
            className="btn-default text-sm mb-2">
            Add new Ticket Category
          </button>
          {ticketsCategory.length > 0 && ticketsCategory.map((property,index) => (
            <div key={index} className="flex gap-1 mb-2" >
              <input type="text"
                     className="mb-0"
                     onChange={ev => handleTecketscategoryNameChange(index,property,ev)}
                     value={property.cname}
                    placeholder="Ticket name (example: adult)"/>
              <input type="text"
                     className="mb-0"
                     onChange={ev =>
                       handleTecketscategoryOpriceChange(
                         index,
                         property,ev.target.value
                       )}
                     value={property.oprice}
                     placeholder="original price"/>
              <input type="text"
                     className="mb-0"
                     onChange={ev =>
                       handleTecketscategorySpriceChange(
                         index,
                         property,ev.target.value
                       )}
                     value={property.sprice}
                     placeholder="sell price"/>

              <button
                onClick={() => removeTicketcategory(index)}
                type="button"
                
                className="btn-red">
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-1">
          {editedEvent && (
            <button
              type="button"
              onClick={() => {
                setEditedEvent(null);
                setName('');
                setEDate('');
                setImagePath('$');
                setTicketsCategory([]);
              }}
              className="btn-default">Cancel</button>
          )}
          <button type="submit"
                  className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedEvent && (
        <>
        <table className="basic mt-4">
          <thead>
          <tr>
             <td>Event Id</td>
            <td>Event Name</td>
            <td>Event Date</td>
            <td></td>
          </tr>
          </thead>
          <tbody>
          {Events.length > 0 && Events.map(Event => (
            <tr key={Event._id}>
              <td>{Event._id.substr(0, 6).toUpperCase()}</td>
              <td>{Event.name}</td>
              <td>{String(Event.date).slice(0,10)}</td>
              <td>
              <Link className="btn-default" href={'/Eorders/'+Event._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Orders
                </Link>
                <button
                  onClick={() => editEvent(Event)}
                  className="btn-default mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(Event)}
                  className="btn-red">Archieve</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        {/* <ShowTable Events ={Events} editEvent = {editEvent} deleteEvent={deleteEvent} /> */}
        </>
      )}
    </Layout>
  );
}

export default withSwal(({swal}, ref) => (
  <Events swal={swal} />
));
