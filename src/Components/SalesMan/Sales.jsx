import { useEffect, useState } from "react";
import { BaseUrl } from "../../Constant/ApiDomain";
import axios from "axios";
import { ConstData } from "../Dashboard/Data";

const SalesMan=()=>{
    const [salesMans,setSalesMan]= useState()
    const [loader,setLoader] = useState(true)
    useEffect(()=>{
        const fetchProduct=async()=>{
            const get_products = await axios.get(`${BaseUrl}api/products`);
            const products = get_products.data;


            const productCostMap = ConstData.reduce((acc, product) => {
                acc[product.product] = product.cost_per_box;
                return acc;
              }, {});
        
            // Group products by sales_person and calculate total sales
            const salesMap = products.reduce((acc, product) => {
                const costPerBox = productCostMap[product.product];
                const salesPerson = product.sales_person;
                const sales = product.sales; // Assuming `sales` is the field representing sales amount
                const cost_ = parseFloat(costPerBox) * parseFloat(product.boxes)
                const profit = parseFloat(sales) - parseFloat(cost_.toFixed(2))
                if (!acc[salesPerson]) {
                    acc[salesPerson] = {
                        sales_person: salesPerson,
                        total_sales: 0, // Initialize total sales
                        total_profit:0,
                        total_box:0
                    };
                }
                acc[salesPerson].total_sales += parseInt(sales); // Sum up sales
                acc[salesPerson].total_profit += parseInt(profit.toFixed(2))
                acc[salesPerson].total_box += parseInt(product.boxes)
                return acc;
            }, {});

            // Convert the sales map to an array and sort by total sales (optional)
            const uniqueSalesMans = Object.values(salesMap).sort(
            (a, b) => b.total_sales - a.total_sales // Sort descending by total sales
            );

            setSalesMan(uniqueSalesMans);  // Set the sorted product data
    
           
            setLoader(false)
        }
        fetchProduct()
    },[])
    const handleSort=()=>{

    }
    return <>
    <div className="w-full h-full overflow-y-auto relative">
      <table className="table-fixed w-full border-collapse">
        <thead className="sticky top-0 bg-slate-500 text-white z-10">
          <tr className="text-left">
            <th className="px-3 py-4">Sales Person</th>
            <th className="px-3 py-4">Sales</th>
            <th className="px-3 py-4">Total Boxes</th>
            <th className="px-3 py-4">Profit</th>
          </tr>
        </thead>
        <tbody>
          {salesMans?.map((person, index) => (
            <tr key={index} className="hover:bg-slate-500 cursor-pointer">
              <td className="py-2">{person?.sales_person}</td>
              <td className="py-2">{person?.total_sales}</td>
              <td className="py-2">{person?.total_box}</td>
              <td className="py-2">{person?.total_profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        
    </>
}
export default SalesMan;