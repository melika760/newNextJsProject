import React from 'react'
import ProductItems from './ProductItems'

const ProductList = ({productlist}) => {
  return (
    <div className='mt-10'>
     <h2 className='text-green-600 font-bold text-2xl'>Our popular Products</h2>
     <div  className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6'>
        {productlist.map((product,index)=>(index<8 &&
            <ProductItems product={product} key={index}/>
        ))}
     </div>
    </div>
  )
}

export default ProductList
