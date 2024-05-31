"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useInput from '../_hooks/use-input'
import globalapi from '@/app/_utils/globalapi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react'

const SignIn = () => {
const {value:email,ValueIsvalid:EmailIsvalid, hasError:EmailHasError,Changehandler:EmailChange,Blurhandler:EmailBlur}=useInput(value=>value.includes("@"));
const {value:password,ValueIsvalid:PasswordIsvalid, hasError:PasswordHasError,Changehandler:PasswordChange,Blurhandler:PasswordBlur}=useInput(value=>value.trim().length>6);
const router=useRouter()
const[loader,setloader]=useState()
useEffect(()=>{
    const jwt=sessionStorage.getItem("jwt")
    if(jwt){
        router.push("/")
    }
},[])
const onSignIn=()=>{
    setloader(true)
    globalapi.SignIn(email,password).then(resp=>{
        sessionStorage.setItem("user",JSON.stringify(resp.data.user))
        sessionStorage.setItem("jwt",JSON.stringify(resp.data.jwt))
        toast("LogIn Successfully")
        router.push('/')
        setloader(false)
    },(e)=>{
        toast(e.response?.data?.error?.message)
        setloader(false)
    })

}
  return (
    <div className='flex items-baseline justify-center my-20'>
     <div className='flex flex-col items-center p-10 bg-slate-100 border border-gray-200'>
        <Image src={"/pnglogo.png"} width={200} height={200} alt='Logo'/>
        <h2 className='font-bold text-3xl'>Sign In to Account</h2>
        <h2 className='text-gray-500'>Enter your email and password to Sign In</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
            <Input placeholder="Email" value={email} onChange={EmailChange} onBlur={EmailBlur} className={`${EmailHasError&&"border-red-500"}`}/>
            {EmailHasError && <p className="text-red-500">Please Enter valid email.</p>}
            <Input type='password' placeholder="Password"  value={password} onChange={PasswordChange} onBlur={PasswordBlur} className={`${PasswordHasError&&"border-red-500"}`}/>
            {PasswordHasError && <p className="text-red-500">Please Enter valid password.</p>}
            <Button onClick={()=>onSignIn()}disabled={ !PasswordIsvalid || !EmailIsvalid}>{loader?<LoaderIcon className='animate-spin'/>:"Sign in"}</Button>
            <p>Don't have an account?
                <Link href="/create-account" className='text-blue-500'>Click here to create new account</Link>
            </p>
        </div>
     </div>
    </div>
  )
}

export default SignIn
