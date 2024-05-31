import { TrashIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const CartItems = ({cartItemsLists,DeleteItem}) => {

  return (
    <div>
      <div className='h-[500px] overflow-auto'>
        {cartItemsLists.map((item,index)=>(
         <div className='flex justify-between items-center p-2 mb-5' key={index}>
               <div className='flex gap-6 items-center'>
                <div>
                  <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+item.image} width={70} height={70} alt={item.name} className='border p-2 shadow-sm'/>
                </div>
              <div>
              <h2 className='font-bold'>{item.name}</h2>
                <h2>Quantity:{item.quantity}</h2>
                <h2 className='text-lg font-bold'>$ {item.amount}</h2>
              </div>
            </div>
            <TrashIcon className='cursor-pointer' onClick={()=>DeleteItem(item.id)}/>
         </div>
        ))}
      </div>
    
    </div>
  )
}

export default CartItems
