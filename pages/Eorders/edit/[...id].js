import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import styled from "styled-components";


import Center from "@/components/test/Center";
import Button from "@/components/test/Button";
import Table from "@/components/test/Table";
import Input from "@/components/test/Input";
import Title from "@/components/test/Title";

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


const editOrder = () => {
    const [eventData, setEventData] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    
   
////////////////////////////////////////

  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [notes,setNotes] = useState('');
  const[cartProducts,setCartProducts] = useState([]);
  
  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/EordersDetails?id='+id).then(response => {

/*
      {"_id":{"$oid":"646e37f2c1b2371ca9bcaf5d"},"line_items":[{"quantity":{"$numberInt":"4"},"cname":"adult","sprice":"50","oprice":"40"},{"quantity":{"$numberInt":"3"},"cname":"kid","sprice":"100","oprice":"90"}],"event":{"$oid":"646af26bd642794474f3b125"},"name":"sayed","phone":"77230","notes":"ss dd ss","total":"500","profit":"70","createdAt":{"$date":{"$numberLong":"1684944882456"}},"updatedAt":{"$date":{"$numberLong":"1684944882456"}},"__v":{"$numberInt":"0"}}
      */ 
      // console.log(response.data);
        //setEventData(response.data);
        setName(response.data?.name);
        setPhone(response.data?.phone);
        setNotes(response.data?.notes);
        setCartProducts([]);
        response.data?.line_items.map(
          item =>{
            for (let i = 0; i < item.quantity; i++) {
              setCartProducts(prev => {
                return [...prev, {cname:item.cname,sprice:item.sprice,oprice:item.oprice}];
              });
            }

          }
        );   
        
        axios.get('/api/Events?id='+response.data?.event).then(result => {
          setEventData(result.data);
          //console.log("get",result.data);
        });


    });
    

  }, [id]);

  const {
    _id,
    name:existingName,
    date:existingDate,
    ticketsCategory:assignedTicketsCategory,
   
  }= {...eventData} 
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

  //console.log("cartProducts",cartProducts);

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
         const response = await axios.put('/api/checkout', {
           event:_id,name,phone,notes,total,profit,id,
          cartProducts,
        });
        router.push('/Eorders/'+ _id);
    
       }
       const backToList= () => {
        router.push('/Eorders/'+ _id);

       }


  return (
    <Layout>
    
    <Center>
        {/* <ColumnsWrapper> */}
          <Box>
            <Title>Event: {existingName}  in Date { String(existingDate).slice(0, 10)} </Title>
            

            <hr />
          
            {assignedTicketsCategory?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product(Sale Price)</th>
                    <th>Quantity</th>
                    <th>Amount</th>
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
                          {cartProducts.filter(id => id.cname === product.cname).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product)}>+</Button>
                      </td>
                      <td>
                        {(cartProducts.filter(id => id.cname === product.cname).length * product.sprice).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{total.toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
           {/* {!!cartProducts?.length && ( */}
            <Box>
              <Title>Order information </Title>
              <Input type="text"
                     placeholder="Name"
                     value={name}
                     name="name"
                     onChange={ev => setName(ev.target.value)} />
              <Input type="text"
                     placeholder="Phone"
                     value={phone}
                     name="phone"
                     onChange={ev => setPhone(ev.target.value)}/>

               <Input type="text"
                     placeholder="notes"
                     value={notes}
                     name="notes"
                     onChange={ev => setNotes(ev.target.value)}/>
 
              <Button black 
                      onClick={goToPayment}>
                Update
              </Button>
              <Button 
                      onClick={backToList}>
                Cancel
              </Button>
            </Box>
          {/* )}  */}
        {/* </ColumnsWrapper> */}
      </Center> 

  
  </Layout>
  )
}

export default editOrder