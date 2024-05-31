"use client"
import { Button } from '@/components/ui/button';
import { ShoppingBasket, LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import globalapi from '../_utils/globalapi';
import { toast } from 'sonner';
import { UpdatedCartContext } from '../_context/UpdatedCartContext';
import { getCookie } from 'cookies-next';

const ProductDetails = ({ product }) => {
  const jwt = getCookie("jwt");
  let user = null;
  const userCookie = getCookie("user");
  
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }
  const { updatedcart, setupdatedcart, cartItems, setCartItems } = useContext(UpdatedCartContext);
  const [loading, setloading] = useState(false);
  const [totalprice, setTotalprice] = useState(product.attributes.Sellingprice ?
    product.attributes.Sellingprice :
    product.attributes.mrp);
  const [quantity, setQuantity] = useState(1);
  const[cartItemlists,setcartItemlists]=useState([])
  const router = useRouter();
  useEffect(()=>{
    getItems()
  },[updatedcart])
  const getItems=async()=>{
    if(!jwt){return;}
    const userId=user.id.toString()
  const cartItemList=await globalapi.getItems(userId,jwt);
 setcartItemlists(cartItemList)
  
  }
  const addToCart = async () => {
    setloading(true);
    if (!jwt) {
      router.push("/signin");
      setloading(false);
      return;
    }
    const existingProductIndex = cartItemlists.findIndex(cartItem => cartItem.product === product.id);
    if (existingProductIndex !== -1) {
      const existingProduct = cartItemlists[existingProductIndex];
      const newQuantity = existingProduct.quantity + quantity;
      const newAmount = (newQuantity * totalprice).toFixed(2);
      

      try {
        await globalapi.removeItem(existingProduct.id,jwt)
        getItems();
        const data = {
          data: {
            quantity: newQuantity,
            amount: newAmount,
            products: product.id,
            users_permissions_user: user.id,
            userId: user.id
          }
        };
        const resp = await globalapi.addToCart(data, jwt);
        toast("Cart updated successfully");
        setupdatedcart(!updatedcart);
      } catch (e) {
        console.error("Error while updating the cart:", e.response || e.message || e);
        toast("Error while updating the cart");
      } finally {
        setloading(false);
      }
    } else {
      // Add new product to cart
      const data = {
        data: {
          quantity: quantity,
          amount: (quantity * totalprice).toFixed(2),
          products: product.id,
          users_permissions_user: user.id,
          userId: user.id
        }
      };

      try {
        const resp = await globalapi.addToCart(data, jwt);
        toast("Added to Cart");

        // Fetch the new cart item and update state
        const newCartItem = {
          name: product.attributes.name,
          quantity: quantity,
          amount: (quantity * totalprice).toFixed(2),
          image: product.attributes.images?.data[0]?.attributes?.url,
          actualPrice: product.attributes.mrp,
          price: product.attributes.mrp,
          id: resp.data.id, // Ensure id is correctly assigned
          product: product.id
        };
        setCartItems([...cartItems, newCartItem]);
        setupdatedcart(!updatedcart); // Toggle the boolean to trigger a re-render or any side-effect
      } catch (e) {
        console.error("Error while adding to cart:", e.response || e.message || e);
        toast("Error while adding to cart");
      } finally {
        setloading(false);
      }
    }
  };


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 text-black bg-white'>
      <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.attributes?.images?.data[0]?.attributes?.url} alt='productDetail' width={300} height={300} className='p-5 h-[320px] w-[300px] object-contain rounded-3xl border shadow-md' />
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
        <h2 className='text-small text-gray-500'>{product.attributes.description}</h2>
        <div className='flex gap-3'>
          {product.attributes.Sellingprice && <h2 className='font-bold text-3xl'>${product.attributes.Sellingprice}</h2>}
          <h2 className={`font-bold text-3xl ${product.attributes.Sellingprice && "line-through text-gray-500"}`}>${product.attributes.mrp}</h2>
        </div>
        <h2 className='font-bold font-md text-lg'>Quantity: ({product.attributes.itemQuantityType})</h2>
        <div className='flex flex-col items-baseline gap-3'>
          <div className='flex gap-3 items-center'>
            <div className='p-2 border flex gap-10 items-center px-5'>
              <button onClick={() => { if (quantity > 1) { setQuantity(quantity - 1) } }}>-</button>
              <h2>{quantity}</h2>
              <button onClick={() => { setQuantity(quantity + 1) }}>+</button>
            </div>
            <h2 className='text-3xl font-bold'>= ${(quantity * totalprice).toFixed(2)}</h2>
          </div>
          <Button className="flex gap-3" onClick={addToCart} disabled={loading}>
            <ShoppingBasket />
            {loading ? <LoaderIcon className='animate-spin' /> : "Add To Cart"}
          </Button>
        </div>
        <h2><span className='font-bold'>Category:</span> {product.attributes.categories.data[0].attributes.name}</h2>
      </div>
    </div>
  );
}

export default ProductDetails;
