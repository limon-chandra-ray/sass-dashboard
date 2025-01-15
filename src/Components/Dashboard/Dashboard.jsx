import React, { useEffect, useState } from 'react';
import DashBoardCard from './Card';
import LineChart from './LineChart';
import axios from 'axios';
import { ConstData } from './Data';
import DoughnutChart from './DoughnutChart';
import { BaseUrl } from '../../Constant/ApiDomain';
import DoughnutChart2 from './DoughuntChart2';


const Dashboard = () => {
    const [products,setProduct] = useState([])
    const [loader,setLoader] = useState(true)
    const [filterProduct,setFilterProduct] = useState([])
    const [productType,setProductType] = useState("all")
    const [saleCountry,SetSaleCountry] = useState("All")
    const [productRate,setProductRate] = useState(ConstData)
    const [firstDate,setFirstDate] = useState(null)
    const [lastDate,setLastDate] = useState(null)
    const [monthlyData,setMonthlyData]= useState([])
    const [dmonths,setDMonth] = useState([])
    const [countrySale,setCountrySale] = useState([])
    const country = ["All","India","USA","UK","Canada","New Zealand","Australia"]
    const [productA,setProductA] = useState(
        {
            "sale":0,
            "box":0,
            "cost":0,
            "profit":0
        }
    )
    useEffect(()=>{
        const fetchProduct=async()=>{
            const get_products = await axios.get(`${BaseUrl}api/products`)
            const products = get_products.data
            // Sort products by date in ascending order
            const sortedProducts = products.sort((a, b) => {
                const dateA = new Date(a.date);  // Convert to date object
                const dateB = new Date(b.date);  // Convert to date object
                return dateA - dateB;  // Compare dates
            });
    
            setProduct(sortedProducts);  // Set the sorted product data
    
            // Find first and last dates
            if (sortedProducts.length > 0) {
                setFirstDate(sortedProducts[0].date)
                setLastDate(sortedProducts[sortedProducts.length - 1].date)
            }
            setLoader(false)
        }
        fetchProduct()
        
    },[]) 
    const handleProductType=(type)=>{
        setProductType(type)
    }
    const handleGeography=(country)=>{
        console.log(country)
        SetSaleCountry(country)
    }
    useEffect(()=>{
        if (productType == 'all' && saleCountry === 'All'){
            setFilterProduct(products)
        }else if(productType == 'all' && saleCountry !== 'All'){
            const filtered = products.filter((pf)=> pf.geography === saleCountry) 
            setFilterProduct(filtered)
        }else if(productType !== 'all' && saleCountry === 'All'){
            const product_type_products = productRate.filter((pdr) => pdr.category === productType);
            const filtered = products.filter((pf) =>
                product_type_products.some((ptp) => ptp.product === pf.product) 
            );
            setFilterProduct(filtered);
        }
        else{
            const product_type_products = productRate.filter((pdr) => pdr.category === productType);
            const filtered = products.filter((pf) =>
                product_type_products.some((ptp) => ptp.product === pf.product &&  pf.geography === saleCountry) 
            );
            setFilterProduct(filtered);
        }
        
    },[products,productType,saleCountry])
    useEffect(()=>{
        const productCount = filterProduct.reduce((acc, sale) => {
            if(sale.product){
                acc[sale.product] = (acc[sale.product] || 0) + parseInt(sale.boxes);
            }
            
            return acc;
          }, {});

        const productSaleAmount = filterProduct.reduce((acc, sale) => {
            acc[sale.product] = (acc[sale.product] || 0) + parseInt(sale.sales);
            return acc;
          }, {});

        // Calculate total cost, total sales, and total profit for each product
        const productBySaleCostProfit =()=>{
            let All_total_cost = 0
            let total_products = 0
            let total_sales = 0
            if(productType === 'all'){
                productRate.map((pd)=>{
                    const product_name = pd.product
                    if(productCount[product_name]){
                        const total_product = productCount[product_name]
                        total_products += total_product
                        const total_cost = parseFloat(total_product) * parseFloat(pd.cost_per_box)
                        All_total_cost += parseFloat(total_cost.toFixed(2))
                        total_sales += productSaleAmount[product_name]
                        
                    }else{
                        console.log("No Product")
                    }
                })
            }else{
                productRate.filter((pdr)=>pdr.category === productType).map((pd)=>{
                    const product_name = pd.product
                    if(productCount[product_name]){
                        const total_product = productCount[product_name]
                        total_products += total_product
                        const total_cost = parseFloat(total_product) * parseFloat(pd.cost_per_box)
                        All_total_cost += parseFloat(total_cost.toFixed(2))
                        total_sales += productSaleAmount[product_name]
                        
                    }else{
                        console.log("No Product")
                    }
                })
            }

            setProductA((prev)=>({
                ...prev,
                "sale":parseInt(total_sales),
                "box":total_products,
                "cost":parseInt(All_total_cost),
                "profit":parseInt(total_sales - All_total_cost)
            }))

        }
        productBySaleCostProfit()
    },[filterProduct])

    useEffect(()=>{
        const calculateMonthlyStats = () => {
            if (firstDate && lastDate) {
                // Create an array of months between first and last date
                const months = [];
                const startDate = new Date(firstDate);
                const endDate = new Date(lastDate);
    
                // Loop to create the months in between
                while (startDate <= endDate) {
                    months.push({
                        year: startDate.getFullYear(),
                        month: startDate.getMonth(), // 0-based (January is 0)
                        label: `${startDate.toLocaleString('default', { month: 'long' })} ${startDate.getFullYear()}`,
                    });
                    startDate.setMonth(startDate.getMonth() + 1); // Move to next month
                }
                setDMonth(months)
                // Initialize productCount to track boxes sold per product
                const productCount = filterProduct.reduce((acc, sale) => {
                    if (sale.product) {
                        acc[sale.product] = (acc[sale.product] || 0) + parseInt(sale.boxes);
                    }
                    return acc;
                }, {});
    
                // Initialize productSaleAmount to track total sales per product
                const productSaleAmount = filterProduct.reduce((acc, sale) => {
                    acc[sale.product] = (acc[sale.product] || 0) + parseInt(sale.sales);
                    return acc;
                }, {});
    
                // Calculate per-month sales values
                const monthlyData = months.map((month) => {
                    const monthKey = `${month.year}-${month.month}`;
                    const monthStats = {
                        label: month.label,
                        sales: 0,
                        cost: 0,
                        profit: 0,
                        box:0
                    };
    
                    filterProduct.forEach((product) => {
                        const productDate = new Date(product.date);
                        const productYear = productDate.getFullYear();
                        const productMonth = productDate.getMonth(); // 0-based month
    
                        if (productYear === month.year && productMonth === month.month) {
                            const productName = product.product;
                            const productSales = productSaleAmount[productName] || 0;
                            const productCost = productRate.find((rate) => rate.product === productName)?.cost_per_box || 0;
                            const productBoxCount = productCount[productName] || 0;
    
                            // Update sales, cost, and profit for this product in the specific month
                            monthStats.sales += productSales;
                            monthStats.box += parseInt(product.boxes);
                            monthStats.cost += productBoxCount * parseFloat(productCost);
                            monthStats.profit += productSales - (productBoxCount * parseFloat(productCost));
                        }
                    });
    
                    return { monthKey, sales: monthStats.sales,box:monthStats.box, cost: monthStats.cost, profit: monthStats.profit };
                });
                setMonthlyData(monthlyData)
                
            }
        };
    
        calculateMonthlyStats();
        const perCountryProductSale=()=>{
            const productCount = filterProduct.reduce((acc, sale) => {
                if(sale.geography){
                    acc[sale.geography] = (acc[sale.geography] || 0) + parseInt(sale.boxes);
                }
                
                return acc;
              }, {});
            // Transform the productCount object into a list of objects
            const productCountList = Object.entries(productCount).map(([geography, totalBoxes]) => ({
                geography,
                totalBoxes,
            }));
            
            setCountrySale(productCountList);
        }
        perCountryProductSale()
    },[firstDate,lastDate,filterProduct,productType,saleCountry])
        console.log(countrySale)
        return <>
        {
            loader ?
            <div className='h-full w-full flex justify-center items-center'><div className='animate-pulse text-[25px] text-green-800'>Loader....</div></div>:
        <> 
        <div className='py-5 text-[30px] text-center bg-slate-600 text-orange-300'>Product Sales Admin Dashboard</div>
        <div className="grid grid-cols-4 gap-4 py-3">
            
            <DashBoardCard cardName={"Sales"}  cardAmount={productA?.sale}/>
            <DashBoardCard cardName={"Boxes"} cardAmount={productA?.box}/>
            <DashBoardCard cardName={"Costs"} cardAmount={productA?.cost}/>
            <DashBoardCard cardName={"Profits"} cardAmount={productA?.profit}/>
        </div>

        <div className='grid grid-cols-12'>
            <div className="bg-white p-4 shadow rounded mt-4 col-span-2 flex flex-row gap-x-3">
            <div className='grid grid-cols-1 gap-y-2'>
                    <div>Product Category : </div>
                    <button className={`${productType === "all"?"bg-green-400":"bg-slate-100"} py-2 px-5 rounded-md`} onClick={()=>handleProductType("all")} >All</button>
                    <button className={`${productType === "Bars"?"bg-green-400":"bg-slate-100"} py-2 px-5 rounded-md`}  
                    onClick={()=>handleProductType("Bars")}>Bars</button>
                    <button className={`${productType === "Bites"?"bg-green-400":"bg-slate-100"} py-2 px-5 rounded-md`}  
                    onClick={()=>handleProductType("Bites")}>Bites</button>
                    <button className={`${productType === "Other"?"bg-green-400":"bg-slate-100"} py-2 px-5 rounded-md`} 
                    onClick={()=>handleProductType("Other")}>Other</button>
            </div>
            <div className='grid grid-cols-1 gap-y-2'>
                    <div>Salse Country: </div>
                    {
                        country?.map((des,index)=><button key={index} className={`${saleCountry === `${des}` ?"bg-green-400":"bg-slate-100"} py-2 px-2 rounded-md`} 
                        onClick={()=>handleGeography(`${des}`)} >{des}</button>)
                    }
                    
            </div>
            </div>
            <div className="bg-white p-4 shadow rounded mt-4 col-span-6">
                <LineChart monthlyDataList={monthlyData} months_list={dmonths}/>
            </div>
            <div className='col-span-4 flex flex-col justify-center items-center gap-y-3'>
                <DoughnutChart productA={productA}/>
                <div className=''>
                    <DoughnutChart2 countrySale={countrySale}/>
                </div>
                
            </div>
        </div>
                
        
    </>
    
  
    }
    </>
  
};

export default Dashboard;