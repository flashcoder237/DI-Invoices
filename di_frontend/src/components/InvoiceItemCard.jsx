const InvoiceItemcard = ({name, price, quantity,onRemoveItemCard}) => {
    const handleRemoveItem = () => {
        onRemoveItemCard({ name: name, quantity: quantity, price: quantity });
      };
    return(
        <div className="bg-slate-500 p-2 rounded  text-white shadow-md">
            <div className="relative  flex">
            <div>Quantity : {quantity}</div>
            <div
            onClick={handleRemoveItem} 
            className="bg-red-800 absolute right-0 text-[10px] rounded p-1 cursor-pointer">Remove</div>
            </div>
            <div className="flex">
            <div>{name}</div>
            <div>{price}</div>
            </div>
        </div>
    );
   };
   
   export default InvoiceItemcard;