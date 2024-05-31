import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Image from 'next/image'
  
const Slider = ({sliderlist}) => {
  return (
    <Carousel>
  <CarouselContent>
   {sliderlist.map((slider,index)=>(
     <CarouselItem key={index}>
        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+slider.attributes?.image?.data[0]?.attributes?.url} width={1000} height={450} alt='slider' className=' h-[150px] md:h-[550px] w-full object-cover rounded'/>
     </CarouselItem>
   ))}
   
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

  )
}

export default Slider
