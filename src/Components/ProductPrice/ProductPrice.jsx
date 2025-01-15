import { ConstData } from "../Dashboard/Data";

const ProductPrice=()=>{
    return <>
    <div className="w-full h-full overflow-y-auto relative">
      <table className="table-fixed w-full border-collapse">
        <thead className="sticky top-0 bg-slate-500 text-white z-10">
          <tr className="text-left">
            <th className="px-3 py-4">Product Name</th>
            <th className="px-3 py-4">Product Category</th>
            <th className="px-3 py-4">Cost Per Box</th>
          </tr>
        </thead>
        <tbody>
          {ConstData?.map((product, index) => (
            <tr key={index} className="hover:bg-slate-500 cursor-pointer">
              <td className="py-2">{product?.product}</td>
              <td className="py-2">{product?.category}</td>
              <td className="py-2">{product?.cost_per_box}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
}
export default ProductPrice;