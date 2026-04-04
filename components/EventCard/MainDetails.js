// import { useContext } from "react";
// import { State } from "../context/stateContext";

export default function MainDetails() {
 // const { name, address } = useContext(State);

  return (
    <>
      <section className="flex flex-col items-end justify-end">
        <h2 className="font-bold text-3xl uppercase mb-1">KIDS JOURNEY</h2>
        <img src ={`/kidsJourney.jpg`}  style={{width:150 , height:150}} />
        {/* <p>Contacts </p>
        <p>Doaa Mahmoud : 30240480</p>
        <p>Sahar Yousef : 30240480</p> */}

      </section>
    </>
  );
}
