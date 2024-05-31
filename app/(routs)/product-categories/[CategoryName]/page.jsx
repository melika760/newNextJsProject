import globalapi from '@/app/_utils/globalapi'
import React from 'react'
import TopCategoryList from './_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';

async function ProductCategory({params}){
    const productlist= await globalapi.getproductbycategory(params.CategoryName)
    const categorylist=await globalapi.getCategoryList();
  return (
    <div>
      <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'> {decodeURIComponent(params.CategoryName)}</h2>
      <TopCategoryList categorylist={categorylist} selectedCategory={decodeURIComponent(params.CategoryName)}/>
      <div className='p-5 md:p-10'>
      <ProductList productlist={productlist}/>
      </div>
    </div>
  )
}

export default ProductCategory
