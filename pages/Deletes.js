import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import { withSwal } from 'react-sweetalert2';


    function Deletes({swal}) {    


  const [Events,setEvents] = useState([]);
  


  useEffect(() => {
    fetchEvents();
  }, [])
  function fetchEvents() {
    axios.get('/api/Deletes').then(result => {
      setEvents(result.data);
      //console.log("get",result.data);
    });
  }
  
 

//////////////////////////////



  
  return (
    <Layout>
      <h1>Deletes</h1>
        
      <table className="basic mt-4">
          <thead>
          <tr>
             <td>Event Id</td>
            <td>Event name</td>
            <td>Event Date</td>
            
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
               
               
              </td>
            </tr>
          ))}
          </tbody>
        </table>
     
    </Layout>
  );
}

export default withSwal(({swal}, ref) => (
    <Deletes swal={swal} />
  ));