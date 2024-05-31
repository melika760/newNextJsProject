"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React,{useContext, useEffect, useState} from 'react'
import globalapi from '@/app/_utils/globalapi'
import useInput from '@/app/(auth)/_hooks/use-input'
import { useRouter } from 'next/navigation'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'sonner'
import { UpdatedCartContext } from '@/app/_context/UpdatedCartContext'
import { getCookie } from 'cookies-next'

const Checkout = () => {
const {value:name,ValueIsvalid:NameIsvalid, hasError:NameHasError,Changehandler:NameChange,Blurhandler:NameBlur}=useInput(value=>value.trim()!=="");
const {value:email,ValueIsvalid:EmailIsvalid, hasError:EmailHasError,Changehandler:EmailChange,Blurhandler:EmailBlur}=useInput(value=>value.includes("@"));
const {value:Phone,ValueIsvalid:PhoneIsvalid, hasError:PhoneHasError,Changehandler:PhoneChange,Blurhandler:PhoneBlur}=useInput(value=>{if(value.trim()===""||value.trim().length<10){return false;}else{return true;}});  
const {value:Zip,ValueIsvalid:ZipIsvalid, hasError:ZipHasError,Changehandler:ZipChange,Blurhandler:ZipBlur}=useInput(value=>{if(value.trim()===""||value.trim().length<6){return false;}else{return true;}});  
const {value:Address,ValueIsvalid:AddressIsvalid, hasError:AddressHasError,Changehandler:AddressChange,Blurhandler:AddressBlur}=useInput(value=>value.trim()!=="");
const jwt=getCookie("jwt");
let user = null;
const userCookie = getCookie("user");

if (userCookie) {
  try {
    user = JSON.parse(userCookie);
  } catch (error) {
    console.error("Error parsing user cookie:", error);
  }
}
  const[cartItemsLists,setcartItemslist]=useState([]);
  const[totalitems,setTotalItems]=useState(0);
  const[Subtotal,setSubtotal]=useState(0);
  const[TotalAmount,setTotal]=useState(0);
  const {updatedcart,setupdatedcart}=useContext(UpdatedCartContext)
  const router=useRouter()
 
  useEffect(()=>{
    if(!jwt){
      router.push("/signin")
    }
    getItems()
  },[])
  useEffect(()=>{
    if(!cartItemsLists){
      return;
    }
    let total=0
    cartItemsLists.forEach(element => {
        total=total+element.amount
    });

    setTotal((total*1.09+15).toFixed(2));
    setSubtotal(total.toFixed(2))
},[cartItemsLists]);
  const getItems=async()=>{
    const cartItemList=await globalapi.getItems(user.id,jwt)
    setcartItemslist(cartItemList)
    setTotalItems(cartItemList?.length)
    }
    const calculation=()=>{
      const TotalAmounts=Subtotal*1.09+15;
     
return TotalAmounts.toFixed(2)    }
const onApprove=(data)=>{
  console.log(data);
  const payload={
   data:{
    paymentId:data.paymentID,
    totalOrderAmount:TotalAmount,
    name:name,
    email:email,
    phone:Phone,
    address:Address,
    zip:Zip,
    orderItemList:cartItemsLists,
    userId:user.id
   }
  }
  globalapi.createOrder(payload,jwt).then(resp=>{
    console.log(resp)
    toast("Your Order Submitted Successfully!")
    cartItemsLists.forEach((item,index)=>{
      globalapi.removeItem(item.id,jwt).then(resp=>{
        setupdatedcart(!updatedcart)
      })
      
    })
setcartItemslist("")
    router.replace("/order-confirmation")
  })
}
  return (
    <div>
      <h2 className='bg-primary p-3 text-xl font-bold text-center text-white'>Checkout</h2>
      <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
<div className='mx-10 border'>
  <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalitems})</h2>
<div className='p-4 flex flex-col gap-4'>
<h2 className='font-bold flex justify-between'>Subtotal:<span>${Subtotal}</span></h2>
<hr></hr>
<h2 className='flex justify-between'>Delivery : <span>$15.00</span></h2>
<h2 className='flex justify-between'>Tax (9%) : <span>${(Subtotal*0.09).toFixed(2)}</span></h2>
<hr></hr>
<h2 className='flex justify-between font-bold'>Total : <span>${calculation()}</span></h2>
{/* <Button onClick={()=>onApprove({paymentID:"123445"})}>Check</Button> */}
{TotalAmount>15 &&<PayPalButtons style={{layout:"horizontal"}}
disabled={!NameIsvalid||!EmailIsvalid||!ZipIsvalid||!PhoneIsvalid||!AddressIsvalid}
onApprove={onApprove}
createOrder={(data,actions)=>{
  return actions.order.create({
    purchase_units:[
      {
        amount:{
          value:TotalAmount,
          currency_code:"USD"
        }
      }
    ]
  })
}}/>}

</div>
</div>
<div className='md:col-span-2 mx-20  mt-8'>
<h2 className='font-bold text-3xl'>Billing Details</h2>
<div className='grid sm:grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-10 mt-3 '>
<div className='flex flex-col justify-between gap-2'>
<Input placeholder="Name" value={name} onChange={NameChange} onBlur={NameBlur} className={NameHasError?"border-red-500 bg-red-50 ":""}/>
{NameHasError && <p className='text-red-500 text-md'>Please Enter Your Name</p>}
</div>
<div className='flex flex-col justify-between gap-2'>
<Input type="email" placeholder="Email" value={email} onChange={EmailChange} onBlur={EmailBlur} className={EmailHasError?"border-red-500 bg-red-50":""}/>
{EmailHasError && <p className='text-red-500 text-md'>Please Enter Your Email</p>}
</div>
</div>
<div className='grid sm:grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-10 mt-3 '>
<div className='flex flex-col justify-between gap-2'>
<Input placeholder="phone" value={Phone} onChange={PhoneChange} onBlur={PhoneBlur} className={PhoneHasError?"border-red-500 bg-red-50":""}/>
{PhoneHasError && <p className='text-red-500 text-md'>Please Enter Your Phone Number</p>}
</div>
<div className='flex flex-col justify-between gap-2'>
<Input placeholder="Zip" value={Zip} onChange={ZipChange} onBlur={ZipBlur} className={ZipHasError?"border-red-500 bg-red-50":""}/>
{ZipHasError && <p className='text-red-500 text-md'>Please Enter Your Zipcode</p>}
</div>
</div>
<div className='mt-3'>
<Input placeholder="Address"  value={Address} onChange={AddressChange} onBlur={AddressBlur} className={AddressHasError?"border-red-500 bg-red-50":""} />
{AddressHasError && <p className='text-red-500 text-md'>Please Enter Your Address</p>}
</div>
</div>
      </div>
    </div>
  )
}

export default Checkout
