import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const DashBoardCard=({cardName,cardAmount,cardLogo})=>{
    return <div className="bg-slate-400 rounded-md">
        <div className="flex justify-between items-center bg-slate-100 px-3 py-1 border-t-4 border-red-400">
            <div>
                <div>{cardName}</div>
                <div className="text-[25px] font-bold">${cardAmount}</div>
            </div>
            <div>
                <ShoppingCartIcon className="size-5"/>
            </div>
        </div>
        <div className="grid grid-cols-1 px-3 py-1 h-[60px]">
           
        </div>
    </div>
}
export default DashBoardCard;