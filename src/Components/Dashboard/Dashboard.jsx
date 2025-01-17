import { useEffect, useState } from "react"
import { BaseUrl } from "../../Constant/ApiDomain"
import { useFetchProducts } from "../../hooks/usefetchProducts"
import { useFilterProducts } from "../../hooks/usefilterProducts"
import { ConstData } from "./Data"
import ActionButton from "../Shared/Button"
import { calculateCountrySale, calculateMonthlyStats, productBySaleCostProfit } from "../../utils/stats"
import LineChart from "./LineChart"
import DoughnutChart from "./DoughnutChart"
import DoughnutChart2 from "./DoughuntChart2"
import DashBoardCard from "./Card"

const Dashboard=()=>{
    const {products,dateRange,loading} = useFetchProducts(BaseUrl)
    const [filterProduct,setFilterProduct] = useState(products)
    const [productType,setProductType] = useState("all")
    const [saleCountry,SetSaleCountry] = useState("All")
    const country = ["All","India","USA","UK","Canada","New Zealand","Australia"]
    const productCategory = ['all','Bars','Bites','Other']
    const handleProductType=(type)=>{
        setProductType(type)
    }
    const handleGeography=(country)=>{
        SetSaleCountry(country)
    }
    const filters = {"productType":productType,"saleCountry":saleCountry}
    const filter_products = useFilterProducts(products,filters,ConstData) 
    const {monthlyData, dmonths} = calculateMonthlyStats(dateRange,filterProduct,ConstData)
    const countrySale = calculateCountrySale(filterProduct)
    const total_sale_cost_profitt = productBySaleCostProfit(filterProduct,ConstData,productType)
    // console.log(total_sale_cost_profitt)
    useEffect(()=>{
        
        setFilterProduct(filter_products)
    },[products,productType,saleCountry])
    
    return <>
    {
        loading ?
            <div className='h-full w-full flex justify-center items-center'><div className='animate-pulse text-[25px] text-green-800'>Loader....</div></div>:
        <>
            <div className='py-5 text-[30px] text-center bg-slate-600 text-orange-300'>Product Sales Admin Dashboard</div>
            <div className="grid grid-cols-4 gap-4 py-3">
                
                <DashBoardCard cardName={"Sales"}  cardAmount={total_sale_cost_profitt?.sale}/>
                <DashBoardCard cardName={"Boxes"} cardAmount={total_sale_cost_profitt?.box}/>
                <DashBoardCard cardName={"Costs"} cardAmount={total_sale_cost_profitt?.cost}/>
                <DashBoardCard cardName={"Profits"} cardAmount={total_sale_cost_profitt?.profit}/>
            </div>
            <div className='grid grid-cols-12'>
                <div className="bg-white p-4 shadow rounded mt-4 col-span-2 flex flex-row gap-x-3">
                    <div className='grid grid-cols-1 gap-y-2'>
                            <div>Product Category : </div>
                            {
                                productCategory?.map((category,index)=> <ActionButton key={index} productType={productType} active={category} onClick={handleProductType}/>)
                            }

                    </div>
                    <div className='grid grid-cols-1 gap-y-2'>
                            <div>Salse Country: </div>
                            {
                                country?.map((des,index)=><ActionButton key={index} productType={saleCountry} active={des} onClick={handleGeography}/>)
                            }
                            
                    </div>
                </div>
                <div className="bg-white p-4 shadow rounded mt-4 col-span-6">
                    <LineChart monthlyDataList={monthlyData} months_list={dmonths}/>
                </div>
                <div className='col-span-4 flex flex-col justify-center items-center gap-y-3'>
                    <DoughnutChart productA={total_sale_cost_profitt}/>
                    <div className=''>
                        <DoughnutChart2 countrySale={countrySale}/>
                    </div>
                    
                </div>
            </div>
        </>
    }
    
    
    </>
}
export default Dashboard