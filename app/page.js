import Slider from "./_components/Slider";
import globalapi from "./_utils/globalapi";
import Categorylist from "./_components/Categorylist";
import ProductList from "./_components/ProductList";
import Image from "next/image";
import { MailCheck, MapPinIcon, PhoneCall} from "lucide-react";
export default async function Home() {
  const sliderlist=await globalapi.getSlider();
  const categorylist=await globalapi.getCategoryList();
  const productlist=await globalapi.getProductList()
  return (
    <div className="p-10 px-5 md:px-16">
     <Slider sliderlist={sliderlist}/>
     <Categorylist categorylist={categorylist} />
     <ProductList productlist={productlist}/>

<div className=" flex flex-col lg:flex-row  lg:gap-12 relative w-full mt-20">
<div className="flex-1  xl:px-10  xl:pt-12 pt-0 px-0 ">
  <h2 className="text-primary text-lg">We deliver your order in 24 hours</h2>
  <p className="text-green-700 flex  mt-3 gap-3" ><PhoneCall/> +44 7445 124151
  </p>
  <p className="text-green-700 flex  mt-3 gap-3" ><MailCheck/> melikaaatafazoli@gmail.com
  </p>
  <p className="text-green-700 flex  mt-3 gap-3" ><MapPinIcon/> 62 Warren road,Twickenham,London
  </p>
</div>
<div className="relative xl:w-[800px] sm:w-[200px] md:w-[600px] h-[100px]  mt-20  ">
  <Image src="/hero.png" alt="footer" className=" object-contain hover:scale-125 transition-all ease-in-out" width={255} height={100}/>
  <Image src="/hero-bg.png" className="absolute -top-5 md:-right-1/4 md:-left-1/4  bg-repeat-round -z-10 w-full  h-[300px] overflow-hidden"width={300} height={100}/>
</div>


</div>
    </div>
  );
}
