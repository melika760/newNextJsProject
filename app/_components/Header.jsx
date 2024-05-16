"use client"
import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import globalapi from '../_utils/globalapi'
  
const Header = () => {
  const[categorylist,setcategorylist]=useState([])
    useEffect(()=>{
        getCategoryList();
    },[])
const getCategoryList=()=>{
globalapi.getCategory().then(resp=>{
  setcategorylist(resp.data.data)
})
}
  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-8 '>
        <Image src="/pnglogo.png" width={150} height={100} alt='logo'/>
     
 <DropdownMenu>
  <DropdownMenuTrigger> <h2 className='md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 hidden cursor-pointer'>
 <LayoutGrid className='h-5 w-5'/>Category</h2></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
   <DropdownMenuSeparator/>
   {categorylist.map((category,index)=>{
    return(
      <DropdownMenuItem className="flex gap-2 items-center cursor-pointer" key={index}>
        <Image src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category?.attributes?.icon?.data[0]?.attributes?.url}`} alt='Category' width={23} height={23}
        />
        <h2 className='text-lg'>{category?.attributes?.name}</h2>
        </DropdownMenuItem>
    )
   })}
  </DropdownMenuContent>
</DropdownMenu>

            <div className='md:flex gap-3 items-center p-2 border rounded-full px-5 hidden'>
                <Search/>
                <input type='text' placeholder='search' className='outline-none'/>
            </div>
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='flex gap-2 items-center text-lg'>0<ShoppingBag/></h2>
        <Button>Login</Button>
      </div>
    </div>
  )
}

export default Header
