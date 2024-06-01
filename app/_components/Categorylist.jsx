import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Categorylist = ({categorylist}) => {
  return (
    <div className='mt-5'>
      <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2 '>
        {categorylist.map((category,index)=>(
            <Link href={"/product-categories/"+category.attributes?.name} key={index} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200'>
                <Image src={category.attributes?.icon?.data[0]?.attributes?.url} alt='iconsCategory' width={50} height={50} unoptimized={true}
                className='group-hover:scale-125 transition-all ease-in-out'/>
           <h2 className='text-green-800'>{category.attributes?.name}</h2>
               
                
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Categorylist
