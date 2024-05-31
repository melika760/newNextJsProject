const {default:axios}=require("axios");
const axiosClient=axios.create({
    baseURL:"https://groceryadmin.onrender.com/api"
})
const getCategory=()=>axiosClient.get("/categories/?populate=*");
const getSlider=()=>axiosClient.get("/sliders/?populate=*").then(resp=>{
    return resp.data.data
})
const getCategoryList=()=>axiosClient.get("/categories/?populate=*").then(resp=>{
    return resp.data.data
});
const getProductList=()=>axiosClient.get("/products/?populate=*").then(resp=>{
    return resp.data.data
});
const getproductbycategory=(category)=>axiosClient.get('/products?filters[categories][name][$in]='+category+"&populate=*").then(resp=>{return resp.data.data})
const register=(username,email,password)=>axiosClient.post("/auth/local/register",{
username:username,
email:email,
password:password
})
const SignIn=(email,password)=>axiosClient.post("/auth/local",{
    identifier:email,
    password:password
    })
const addToCart=(data,jwt)=>{
    const cleanedJwt = jwt.replace(/^"|"$/g, '');
    return axiosClient.post("/user-carts", data, {
        headers: { Authorization: 'Bearer ' + cleanedJwt }
      });   
}
const getItems=(userId,jwt)=>{
    const cleanedJwt = jwt.replace(/^"|"$/g, '');
    return(axiosClient.get("/user-carts?filters[userId][$eq]="+userId+"&[populate][products][populate][images][populate][0]=url",{
        headers: { Authorization: 'Bearer ' + cleanedJwt } 
    }).then(resp=>{
        const data=resp.data.data;
       
        const cartItems=data.map((item,index)=>({
        name:item.attributes.products?.data[0]?.attributes.name,
        quantity:item.attributes.quantity,
        amount:item.attributes.amount,
        image:item.attributes.products?.data[0].attributes.images.data[0].attributes.url,
        actualPrice:item.attributes.products?.data[0].attributes.mrp,
        price:item.attributes.products?.data[0].attributes.mrp,
        id:item.id,
        product:item.attributes.products?.data[0].id
           }));
        return cartItems;
    }))
}
const removeItem=(id,jwt)=>{
    const cleanedJwt = jwt.replace(/^"|"$/g, '');
    return axiosClient.delete("/user-carts/"+id, {
        headers: { Authorization: 'Bearer ' + cleanedJwt }
      }); }  
const createOrder=(data,jwt)=>{
    const cleanedJwt = jwt.replace(/^"|"$/g, '');
    return axiosClient.post("/orders", data, {
        headers: { Authorization: 'Bearer ' + cleanedJwt }
      });   
}
const getorders=(userId,jwt)=>{
    const cleanedJwt = jwt.replace(/^"|"$/g, '');
    return axiosClient.get("/orders?filters[userId][$eq]="+userId+"&populate[orderItemList][populate][product][populate][images]=url",{
        headers: { Authorization: 'Bearer ' + cleanedJwt } 
    }).then(resp=>{
        const result=resp.data.data
        const orderList=result.map(item=>({
            id:item.id,
            totalOrderAmount:item.attributes.totalOrderAmount,
            paymentId:item.attributes.paymentId,
            orderItemList:item.attributes.orderItemList,
            createdAt:item.attributes.createdAt,
            status:item.attributes.Status
        }
    ))
    return orderList
    })
}
const getProfile=(userId,jwt)=>{const cleanedJwt = jwt.replace(/^"|"$/g, '');
return axiosClient.get("/orders?filters[userId][$eq]="+userId+"&populate=*",{
    headers: { Authorization: 'Bearer ' + cleanedJwt } 
}).then(resp=>{
    const results=resp.data.data;
const profiledata={
        id:results[0].id,
        name:results[0].attributes.name,
        email:results[0].attributes.email,
        zip:results[0].attributes.zip,
        phone:results[0].attributes.phone,
        address:results[0].attributes.address,

    }
return profiledata;
})

}
export default{
    getCategory,
    getSlider,
    getCategoryList,
    getProductList,
    getproductbycategory,
    register,
    SignIn,
    addToCart,
    getItems,
    removeItem,
    createOrder,
    getorders,
    getProfile,
}