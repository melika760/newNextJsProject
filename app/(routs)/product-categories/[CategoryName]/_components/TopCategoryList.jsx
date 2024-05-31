import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const TopCategoryList = ({categorylist,selectedCategory}) => {
  
  return (
    <div className='mt-5'>
    <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2>
    <div className='flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center '>
      {categorylist.map((category,index)=>{
        const cleanedCategory = decodeURIComponent(category.attributes.name).replace(/\b\w/g, (char) => char.toUpperCase());
        return(  <Link href={"/product-categories/"+category.attributes?.name} className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200 w-[150px] min-w-[100px] ${selectedCategory===cleanedCategory && "bg-green-600 text-white"}`} key={index}>
        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category.attributes?.icon?.data[0]?.attributes?.url} alt='iconsCategory' width={50} height={50} unoptimized={true}
        className='group-hover:scale-125 transition-all ease-in-out'/>
   <h2 className={`text-green-800 ${selectedCategory===cleanedCategory && " text-white"}`}>{cleanedCategory}</h2>
       
        
    </Link>)
      }
        
      )}
    </div>
  </div>
  )
}

export default TopCategoryList
