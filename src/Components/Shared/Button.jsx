const ActionButton = ({ active, onClick,productType }) => {
    return(
    <button
      className={`${productType === active ? 'bg-green-400' : 'bg-slate-100'} py-2 px-5 rounded-md`}
      onClick={()=>onClick(active)}
    >
      {active}
    </button>
  )};
export default ActionButton;