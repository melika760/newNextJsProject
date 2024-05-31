"use client"
import globalapi from '@/app/_utils/globalapi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import moment from 'moment';
import MyOrderItem from './_components/MyOrderItem'
import { getCookie } from 'cookies-next'


const MyOrder = () => {
const jwt=getCookie("jwt")
const user=JSON.parse(getCookie("user"))
const[orderItems,setOrderItems]=useState([])
const router=useRouter()
useEffect(()=>{
if(!jwt){
router.replace("/")
}
getorder()
},[])
const getorder=async()=>{
    const lists=await globalapi.getorders(user.id,jwt)
    console.log(lists)
    setOrderItems(lists)
}
  return (
    <div>
     <h2 className='bg-primary p-3 text-xl font-bold text-center text-white'>My Orders</h2>
    <div className='py-8 mx-7'>
      <h2 className='text-3xl font-bold text-primary'>Order history</h2>
 <div>
  {orderItems.map((item,index)=>(
         <Collapsible key={index}>
         <CollapsibleTrigger>
        <div className='border p-2 bg-slate-100 grid  grid-cols-2  gap-2 md:grid-cols-3  md:gap-24 rounded-md '> 
          <h2><span className='font-bold mr-2'>Order at:</span>{moment(item?.createdAt).format("DD/MM/yyy")}</h2>
          <h2><span className='font-bold mr-2'>Total Amount:</span>${item?.totalOrderAmount}</h2>
          <h2><span className='font-bold mr-2 '>Status:</span>{item?.status}</h2>
          </div>
         </CollapsibleTrigger>
         <CollapsibleContent>
         {item.orderItemList.map((order,index_)=>(
         <MyOrderItem order={order} key={index_}/>
         ))}
         </CollapsibleContent>
       </Collapsible>
  ))}
 </div>

    </div>
    </div>
  )
}

export default MyOrder
