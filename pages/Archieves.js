import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import { withSwal } from 'react-sweetalert2';
import AgGridEvent from "@/components/ag-grid/AgGridEvent";


    function Archieves({swal}) {    


  const [Events,setEvents] = useState([]);
  


  useEffect(() => {
    fetchEvents();
  }, [])
  function fetchEvents() {
    axios.get('/api/Archieves').then(result => {
      setEvents(result.data);
      //console.log("get",result.data);
    });
  }

  
  
  function archieveEvent(Event){
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to activate ${Event.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, activate!',
      confirmButtonColor: 'green',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const {_id} = Event;
        await axios.delete('/api/Archieves?_id='+_id);
        fetchEvents();
      }
    });
  }

  function deleteEvent(Event){
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${Event.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const {_id} = Event;
        await axios.put('/api/Archieves?_id='+_id);
        fetchEvents();
      }
    });
  }

//////////////////////////////

  
  return (
    <Layout>
      <h1>Archives</h1>
        
      {/* <table className="basic mt-4">
          <thead>
          <tr>
             <td>Event Id</td>
            <td>Event name</td>
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
                  onClick={() => archieveEvent(Event)}
                  className="btn-green">Active</button>

                  
                <button
                  onClick={() => deleteEvent(Event)}
                  className="btn-red">Delete</button>

              </td>
            </tr>
          ))}
          </tbody>
        </table> */}

     <AgGridEvent 
                 EventsData={Events} 
                 archieveEvent={archieveEvent} 
                 deleteEvent={deleteEvent}
     />
        

     
    </Layout>
  );
}

export default withSwal(({swal}, ref) => (
    <Archieves swal={swal} />
  ));