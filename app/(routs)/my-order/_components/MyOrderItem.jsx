import React from 'react'
import Image from 'next/image'
const MyOrderItem = ({order}) => {
  return (
    <div className='md:w-[60%] sm:w-full'>
    <div className='grid grid-cols-5 mt-3 items-center'>
    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+order.product.data.attributes.images.data[0].attributes.url} width={80} height={80} alt='EachOrderImages' className='border shadow-md'/>
  <div className='col-span-2 ml-3'>
    <h2>{order.product.data.attributes.name}</h2>
    <h2>Item Price: ${order.product.data.attributes.Sellingprice}</h2>
  </div>
  <h2>Quantity:{order.quantity}</h2>
  <h2 className='ml-5'>Price:${order.price}</h2>
  
  </div>
  <hr className='mt-3'></hr>
  </div>
  )
}

export default MyOrderItem
