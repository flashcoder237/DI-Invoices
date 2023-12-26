const InvoiceItemcard = ({name, price, quantity,onRemoveItemCard}) => {
    const handleRemoveItem = () => {
        onRemoveItemCard({ name: name, quantity: quantity, price: quantity });
      };
    return(
        <div className="relative bg-slate-500 p-2 rounded  text-white shadow-md">
            <div className="flex">
            <div className="mr-3">Quantity : {quantity}</div>
            <div
            onClick={handleRemoveItem} 
            className="absolute right-1 bg-red-600 text-[10px] rounded p-1 cursor-pointer">Remove product</div>
            </div>
            <div className="flex mt-1 border-2 border-slate-600 justify-between">
            <div className="p-1 pl-2">{name}</div>
            <div className="pl-2 p-1 bg-slate-600">{price} FCFA</div>
            </div>
        </div>
    );
   };
   
   export default InvoiceItemcard;