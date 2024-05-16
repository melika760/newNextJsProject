import Slider from "./_components/Slider";
import globalapi from "./_utils/globalapi";
import Categorylist from "./_components/Categorylist";
import ProductList from "./_components/ProductList";
export default async function Home() {
  const sliderlist=await globalapi.getSlider();
  const categorylist=await globalapi.getCategoryList();
  const productlist=await globalapi.getProductList()
  return (
    <div className="p-5 md:p-12 px-16">
     <Slider sliderlist={sliderlist}/>
     <Categorylist categorylist={categorylist} />
     <ProductList productlist={productlist}/>
    </div>
  );
}
