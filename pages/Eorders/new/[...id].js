import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import styled from "styled-components";


import Center from "@/components/test/Center";
import Button from "@/components/test/Button";
import Table from "@/components/test/Table";
import Input from "@/components/test/Input";
import { withSwal } from 'react-sweetalert2';

import {useSession} from "next-auth/react";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

function NewOrder({swal}) {

  const {data: session} = useSession();

    const [eventData, setEventData] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get('/api/Events?id='+id).then(response => {
           // console.log(response.data);
            setEventData(response.data);
        });
        

      }, [id]);
      const {
        _id,
        name:existingName,
        date:existingDate,
        ticketsCategory:assignedTicketsCategory,
       
      }= {...eventData} 
////////////////////////////////////////
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [notes,setNotes] = useState('');


      const[cartProducts,setCartProducts] = useState([]);
      function moreOfThisProduct(product) {
        setCartProducts(prev => {
            return [...prev, product];
          });
         
      }
      function lessOfThisProduct(objproduct) {
        //console.log(objproduct)
        setCartProducts(prev => {
         const myindex = [...prev].findIndex(object => {
            return object.cname == objproduct.cname;
          });
        
        return [...prev].filter((p,pindex) => {
            return pindex !== myindex;
          });
        });          

      }
      let total = 0;
      let ototal = 0;
      let profit = 0;
      for (const product of cartProducts) {
        //const price = products.find(p => p === product)?.sprice || 0;
        total += Number (product.sprice);
        ototal += Number (product.oprice);
      }
      profit = total - ototal;
      

        async function goToPayment() {

          const validate = [];
          if (cartProducts.length ==0){
            validate.push({title:'Ticket quantity is empty' , description : 'Kindly add ticket quantity'});
          }
          if (name.length ==0){
            validate.push({title:'customer name is empty' , description : 'Kindly add customer name'});
          }
          if (phone.length ==0){
            validate.push({title:'customer phone is empty' , description : 'Kindly add customer phone'});
          }
          let createdby = session?.user?.name;

        if (validate.length ==0){
         const response = await axios.post('/api/checkout', {
           _id,name,phone,notes,total,profit,
          cartProducts,createdby
        });
        router.push('/Eorders/'+ id);
      }
      else{

        swal.fire({
          title: validate[0].title,
          text: validate[0].description,
          //showCancelButton: true,
          //cancelButtonText: 'Cancel',
          confirmButtonText: 'close',
          confirmButtonColor: '#d55',
          reverseButtons: true,
        });
      }
    //     if (response.data.url) {
    //       window.location = response.data.url;
    //     }
       }

  return (
    <Layout>
    
    <Center>
        {/* <ColumnsWrapper> */}
          <Box>
            <h2>Cart</h2>
          
            {assignedTicketsCategory?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Sale Price</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedTicketsCategory.map(product => (
                    <tr key={product.cname}>
                      <ProductInfoCell>
                        {product.cname}({product.sprice})
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product)}>+</Button>
                      </td>
                      <td>
                        {cartProducts.filter(id => id === product).length * product.sprice}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                     
                     <p>Total Amount:{total.toLocaleString()} </p>
                     <p>Profit      :{profit.toLocaleString()}</p>
                     <p>Net Amount  :{(total - profit).toLocaleString()}</p>
                   </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
           {/* {!!cartProducts?.length && ( */}
            <Box>
              <h2>Order information</h2>
              <Input type="text"
                     placeholder="Name"
                     value={name}
                     name="name"
                     onChange={ev => setName(ev.target.value)} 
                     
                     />
              <Input type="text"
                     placeholder="Phone"
                     value={phone}
                     name="phone"
                     onChange={ev => setPhone(ev.target.value)}
                     
                     />

               <Input type="text"
                     placeholder="notes"
                     value={notes}
                     name="notes"
                     onChange={ev => setNotes(ev.target.value)}
                     
                     />
 
              <Button black block
                      onClick={goToPayment}>
                      Add Order
              </Button>
            </Box>
          {/* )}  */}
        {/* </ColumnsWrapper> */}
      </Center> 

  
  </Layout>
  )
}



export default withSwal(({swal}, ref) => (
  <NewOrder swal={swal} />
));
