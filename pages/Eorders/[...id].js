import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import EventInfo from "@/components/EventInfo";
import {useRouter} from "next/router";
import OrderInfo from "@/components/OrderInfo";
import Link from "next/link";


const OrderList = () => {
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
      
  return (
    <Layout>
    
    {eventData && (
        <>
      <EventInfo {...eventData} />
      <Link className="btn-primary" href={'/Eorders/new/'+id}>Add new order</Link>
      <OrderInfo {...eventData} />
      </>
    )}

  
  </Layout>
  )
}

export default OrderList