// import { useContext } from "react";
// import { State } from "../context/stateContext";

export default function ClientDetails({ eventName , path }) {
//   const { clientName, clientAddress } = useContext(State);

  return (
    <>
      <section className="mt-5">
        <h2 className="text-3xl uppercase font-bold mb-1">{String(eventName).toUpperCase()}</h2>
        {path.length>0 && (<img src ={`/${path}`}  style={{width:150 , height:150}} />
)}
      </section>
    </>
  );
}
