import React from "react";
import logo from '../../Assets/Di-logo.png'


export default class InvoiceDetails extends React.PureComponent{
    render(){
        const invoice = this.props.invoice;
        const formattedDate = (rawDate) => {
          const date = new Date(rawDate);
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
          return date.toLocaleDateString('en-US', options);
        };
      
        return (
        <div className="mb-20 py-6 px-10 mt-4 bg-slate-100 text-base">
            <div className="flex justify-between">
                <div>
                <a href="#" title="" class="flex no-underline" >
                <img className="w-3/5" height={40} src={logo} alt="Logo" /> </a>
                <div>Digital Invoice compagny name</div>
                <div>{invoice.billingAddress.country}, {invoice.billingAddress.city}</div>
                <div>{invoice.billingAddress.state}, {invoice.billingAddress.zipCode}, {invoice.billingAddress.street}</div>
                </div>
                <div>
                <div className="border-b-2 pb-2 mb-2">Billing Number : <span className="text-gray-600 italic">DI-INV-{invoice.id}</span></div>
                <div>Client name : {invoice.customer.name}</div>
                <div>Client Email : {invoice.customer.email}</div>
                <div className="border-b-2 pb-2 mb-2">Client Phone : {invoice.customer.phone}</div>
                <div>{invoice.customer.address.country}, {invoice.customer.address.city}</div>
                <div>{invoice.customer.address.state}, {invoice.customer.address.zipCode}, {invoice.customer.address.street}</div>
                </div>
            </div>


            <div className="relative overflow-x-auto sm:rounded-lg  my-10">
          {/* ... (previous code for dropdown and search) */}

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Designation
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items && invoice.items.map((invoiceItem) => (
                <tr key={invoice.id} className="border-b-1 border-blue-500 hover:bg-slate-200 border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
                  {/* ... (render invoice data) */}
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {invoiceItem.id}
                </th>
                <td class="px-6 py-4">
            
                        <div class="text-base font-semibold">{invoiceItem.name}</div>
                </td>
                <td class="px-6 py-4">
                
                        <div class="text-base font-semibold">{invoiceItem.quantity}</div>
                </td>
                <td class="px-6 py-4">
                        <div class="text-base font-semibold"> {invoiceItem.price} FCFA</div>
                </td>
                <td class="px-6 py-4">
                        <div class="text-base font-semibold"> {invoiceItem.total} FCFA</div>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>



            <div className="flex justify-between">
                <div>
                    <div>Create at : {formattedDate(invoice.dateCreation)}</div>
                    <div>Last update : {formattedDate(invoice.dateMiseAJour)}</div>
                </div>
                <div className="flex">
                    <div className="bg-green-400 text-white p-3 font-semibold">Total Amount</div>
                    <div className="p-3 border-2 border-green-400 text-green-500 font-bold">{invoice.totalAmount} FCFA</div>
                </div>

            </div>
            
        </div>
        );
    }
}