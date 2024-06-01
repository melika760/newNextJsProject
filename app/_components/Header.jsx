"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React,{useContext, useEffect,useState} from 'react'
import Image from 'next/image'
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from 'lucide-react'
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
import { UpdatedCartContext } from '../_context/UpdatedCartContext';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItems from './CartItems'
import { toast } from 'sonner'
import { deleteCookie, getCookie } from 'cookies-next'
  
const Header = () => {
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
  const[categorylist,setcategorylist]=useState([]);
  const[cartItemsLists,setcartItemslist]=useState([])
  const { updatedcart, setupdatedcart, cartItems, setCartItems } = useContext(UpdatedCartContext);
  const isLogin=getCookie("jwt")?true:false
  const[totalitems,setTotalItems]=useState(0);
  const[Subtotal,setSubtotal]=useState(0)
  const router=useRouter();
  useEffect(()=>{
    let total=0
    cartItemsLists.forEach(element => {
        total=total+element.amount
    });
    setSubtotal(total.toFixed(2))
},[cartItemsLists]);
    useEffect(()=>{
        getCategoryList();
    },[]);
    useEffect(()=>{
      
      getItems();
  },[updatedcart])


const getItems=async()=>{
  if(!jwt){return;}
  const userId=user.id.toString();
const cartItemList=await globalapi.getItems(userId,jwt);
console.log(cartItemList)
setcartItemslist(cartItemList)
setTotalItems(cartItemList?.length)

}

   
const getCategoryList=()=>{
globalapi.getCategory().then(resp=>{
  setcategorylist(resp.data.data)
})}
const DeleteItem=(id)=>{
  globalapi.removeItem(id,jwt).then(resp=>{
    toast("Item removed");
    getItems()
})

}
const onSignOut=()=>{
  deleteCookie("jwt");
    deleteCookie("user");
  router.push("/signin")
}
  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-8 '>
        <Link href={"/"}> <Image src="/pnglogo.png" width={150} height={100} alt='logo' className='cursor-pointer'/>
    </Link>
 <DropdownMenu>
  <DropdownMenuTrigger> <h2 className='md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 hidden cursor-pointer'>
 <LayoutGrid className='h-5 w-5'/>Category</h2></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
   <DropdownMenuSeparator/>
   {categorylist.map((category,index)=>{
    return(
      <Link href={"/product-categories/"+category.attributes?.name} key={index}>
      <DropdownMenuItem className="flex gap-2 items-center cursor-pointer" >
        <Image src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category?.attributes?.icon?.data[0]?.attributes?.url}`} alt='Category' width={23} height={23}
        />
        <h2 className='text-lg'>{category?.attributes?.name}</h2>
        </DropdownMenuItem>
        </Link>
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
      <Sheet>
  <SheetTrigger>
  <h2 className='flex gap-2 items-center text-lg'>
        <ShoppingBasket className='h-7 w-7'/>
          <span className='bg-primary text-white rounded-full px-2'>{totalitems}</span>
          </h2>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle className="bg-primary text-white font-bold text-lg p-2 mt-5">My Cart</SheetTitle>
      <SheetDescription>
        {cartItemsLists.length<1 &&<div className='flex flex-col items-center'>
          <Image src={"/CartEmpty.png"} alt='CartEmpty' width={250} height={250} className='w-[80%]'/>
          <p className='text-primary font-bold text-lg'>Your Cart is Empty</p>
          </div>}
       <CartItems cartItemsLists={cartItemsLists} DeleteItem={DeleteItem}/>
      </SheetDescription>
    </SheetHeader>
    <SheetClose asChild>
    <div className='absolute w-[90%] bottom-6 flex flex-col'>
        <h2 className='text-lg flex justify-between font-bold'>Subtotal <span>$ {Subtotal}</span></h2>
        <Button onClick={()=>router.push(jwt?"/Checkout":"/signin")}>View Cart</Button>
      </div>
    </SheetClose>
  </SheetContent>
</Sheet>

      
      {!isLogin? <Link href={"/signin"}>
        <Button>Login</Button></Link>:
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
        <CircleUserRound className='h-12 w-12 bg-green-100 text-primary p-2 rounded-full cursor-pointer'/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
  <Link href={'/my-order'}>
    <DropdownMenuItem>My orders</DropdownMenuItem></Link>
    <DropdownMenuItem onClick={()=>onSignOut()}>LogOut</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}
      </div>
    </div>
  )
}

export default Header
