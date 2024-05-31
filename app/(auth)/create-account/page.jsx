"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React,{useEffect,useState} from 'react'
import useInput from '../_hooks/use-input'
import globalapi from '@/app/_utils/globalapi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react';
import { getCookie, setCookie } from 'cookies-next';
const CreateAccount = () => {
const {value:username,ValueIsvalid:NameIsvalid, hasError:NameHasError,Changehandler:NameChange,Blurhandler:NameBlur}=useInput(value=>value.trim()!=="");
const {value:email,ValueIsvalid:EmailIsvalid, hasError:EmailHasError,Changehandler:EmailChange,Blurhandler:EmailBlur}=useInput(value=>value.includes("@"));
const {value:password,ValueIsvalid:PasswordIsvalid, hasError:PasswordHasError,Changehandler:PasswordChange,Blurhandler:PasswordBlur}=useInput(value=>value.trim().length>6);
const router=useRouter()
const[loader,setloader]=useState()
useEffect(()=>{
    const jwt=getCookie("jwt")
    if(jwt){
        router.push("/")
    }
   
},[])
function onCreateAccount(){
    
    setloader(true)
globalapi.register(username,email,password).then(resp=>{
  
    setCookie("user",JSON.stringify(resp.data.user))
    setCookie("jwt",JSON.stringify(resp.data.jwt))
    toast("Account created successfully")
    setloader(false)
    router.push("/")
},(e)=>{
    toast(e.response?.data?.error?.message)
    setloader(false)
})
}
  return (
    <div className='flex items-baseline justify-center my-20'>
     <div className='flex flex-col items-center p-10 bg-slate-100 border border-gray-200'>
        <Image src={"/pnglogo.png"} width={200} height={200} alt='Logo'/>
        <h2 className='font-bold text-3xl'>Create an Account</h2>
        <h2 className='text-gray-500'>Enter your email and password to create an account</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
            <Input placeholder="Username" value={username} onChange={NameChange} onBlur={NameBlur} className={`${NameHasError&&"border-red-500"}`}/>
            {NameHasError && <p className="text-red-500">Please Enter your name.</p>}
            <Input placeholder="Email" value={email} onChange={EmailChange} onBlur={EmailBlur} className={`${EmailHasError&&"border-red-500"}`}/>
            {EmailHasError && <p className="text-red-500">Please Enter valid email.</p>}
            <Input type='password' placeholder="Password"  value={password} onChange={PasswordChange} onBlur={PasswordBlur} className={`${PasswordHasError&&"border-red-500"}`}/>
            {PasswordHasError && <p className="text-red-500">Please Enter valid password.</p>}
            <Button onClick={()=>onCreateAccount()}disabled={!NameIsvalid || !PasswordIsvalid || !EmailIsvalid}>{loader?<LoaderIcon className='animate-spin'/>:"Create An Account"}</Button>
            <p>Already have an account?
                <Link href="/signin" className='text-blue-500'>Click here to Sign in</Link>
            </p>
        </div>
     </div>
    </div>
  )
}

export default CreateAccount
