import ClientDetails from '@/components/EventCard/ClientDetails';
import Dates from '@/components/EventCard/Dates';
import Header from '@/components/EventCard/Header';
import MainDetails from '@/components/EventCard/MainDetails';
import Table from '@/components/EventCard/Table';
import EventInfo from '@/components/EventInfo';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print';

const PrintEvent = () => {
    const componentRef = useRef();

    const [eventData, setEventData] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {

        if (!id) {
          return;
        }
        axios.get('/api/Events?id='+id).then(response => {
            //console.log(response.data);
            setEventData(response.data);
        });
        

      }, [id]);

      const {
        _id,
        name:existingName,
        date:existingDate,
        ticketsCategory:assignedTicketsCategory,
       
      } = {...eventData};
      
  return (
    <Layout>
    
    {eventData && (
        <>
      {/* <EventInfo {...eventData} />   */}
      <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Download
              </button>
            )}
            content={() => componentRef.current}
        />
      <div ref={componentRef} className="p-5">
            <Header />

            <MainDetails />

            <ClientDetails eventName={existingName} />

            <Dates  eventNumber={_id}  eventDate={existingDate}/>

            <Table {...eventData}/>

      </div>
      </div>
      
      </>
    )}

  
  </Layout>
  )
}


export default PrintEvent