import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';
import EventImage from './../components/EventImage';




function EventCopy({Event}) {
    
  //const [editedEvent, setEditedEvent] = useState(Event);
  const [name,setName] = useState(Event.name);
  const [eDate,setEDate] = useState(Event.data);
  const[imagePath,setImagePath] = useState(Event.imagePath);
  const [ticketsCategory,setTicketsCategory] = useState(Event.ticketsCategory);

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
  
      await axios.post('/api/Events', data).then(result => {
       // console.log("post",result.data);
      });;
    }
    setName('');
    setEDate('');
    setImagePath('$');
    setTicketsCategory([]);
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
    
      setTicketsCategory(prev => {
        return [...prev].filter((p,pIndex) => {
          return pIndex !== indexToRemove;
        });
      });
    
    
    
  }

  return (
    <>
      <h1>Events</h1>
      <label>
              Create new Event
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
      
    </>
  );
}

export default EventCopy
