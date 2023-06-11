// import { useContext } from "react";
// import { State } from "../context/stateContext";

export default function ClientDetails({ eventName }) {
//   const { clientName, clientAddress } = useContext(State);

  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{String(eventName).toUpperCase()}</h2>
        <p>Qatar</p>
      </section>
    </>
  );
}
