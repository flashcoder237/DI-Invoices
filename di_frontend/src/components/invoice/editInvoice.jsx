import React,  { useEffect, useState }from 'react';
import Input from '../atoms/input';
import InvoiceItemForm from '../InvoiceItemForm';
import AddressForm from '../AddressForm';
import InvoiceItemcard from '../InvoiceItemCard';
import { createInvoice } from '../../services/invoiceService';


const CreateInvoice = () =>{
    const [customerInfo, setCustomerInfo] = useState({});
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [billingAddress, setBillingAddress] = useState({});
    const [invoiceItemsSatisfy, setInvoiceItemsSatisfy] = useState(true)
    
    const handleInputCustomerChange = (selectValue, name) => {
        setCustomerInfo({
          ...customerInfo,
          [name]: selectValue,
        });
      };

      const handleAddressChange = (address, addressType) => {
        if(addressType==="Customers"){
                setCustomerInfo({
                    ...customerInfo,
                    'address': address,
                  });
        }else{
            setBillingAddress(address);
        }
      };
       
      
    const handleRemoveItemCard = (itemDetails) => {
      setInvoiceItems(invoiceItems.filter((item) => item.name !== itemDetails.name && item.price !== itemDetails.price && item.quantity !== itemDetails.quantity));
        }

    const handleAddInvoiceItem = (itemDetails) => {
        const existingItem = invoiceItems.find(
            (item) => item.name === itemDetails.name && item.price === itemDetails.price
          );
          if (existingItem) {
            // Si un article similaire existe, mettez à jour la quantité
            const updatedItems = invoiceItems.map((item) =>
              item.name === itemDetails.name && item.price === itemDetails.price
                ? { ...item, quantity: parseInt(item.quantity) + parseInt(itemDetails.quantity) }
                : item
            );
        
            setInvoiceItems(updatedItems);
          } else {
            // Sinon, ajoutez simplement le nouvel article
            setInvoiceItems([...invoiceItems, itemDetails]);
          }
        
          setInvoiceItemsSatisfy(false);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
          // Construire le corps de la requête avec les détails du formulaire
          const requestBody = {
            billingAddress: billingAddress,
            customer: customerInfo,
            items: invoiceItems,
          };
      
          const resultCreateIvoice = createInvoice(requestBody);
          console.log(resultCreateIvoice);
        }catch (error) {
          console.error('Erreur lors de la création de la facture :', error);
          
      }
      };

    

    return(
        <div className='w-full'>
            <form class="mx-auto w-full" onSubmit={handleSubmit}>
            <div className='flex'>
                <div className='flex-1 mx-5'>
            <div className='mb-3 border-b-2'>
            <div className=''>Billing Address</div>

            <AddressForm
            motif="Invoice"
            addressType="billing"
            onAddressChange={handleAddressChange}
            />
            </div>
                <div className='my-6'>Customers informations</div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <Input
                        type="email"
                        name="email"
                        id="floating_email"
                        placeholder=" "
                        labelName="Email Address"
                        required={invoiceItemsSatisfy}
                        onInputChange={handleInputCustomerChange}
                    />

                    <Input
                        type="text"
                        name="name"
                        id="floating_name"
                        placeholder=" "
                        labelName="Name"
                        required={invoiceItemsSatisfy}
                        onInputChange={handleInputCustomerChange}
                    />

                    <Input
                        type="tel"
                        name="phone"
                        id="floating_phone"
                        pattern="[6]{1}[0-9]{8}"
                        placeholder=" "
                        labelName="Phone number (652 761 931)"
                        required={invoiceItemsSatisfy}
                        onInputChange={handleInputCustomerChange}
                    />
                </div>
                  
                <div className=''>Customer Address</div>
                 <AddressForm
                 motif="Customers"
                 addressType="Customers"
                 onAddressChange={handleAddressChange}
                 />
                </div>
                <div className='flex-1 mx-5'>
                    <div className='mb-5'>Invoice article informations</div>
                    <InvoiceItemForm onAddInvoiceItem={handleAddInvoiceItem} />
                    
                    
                <div class="grid md:grid-cols-4 md:gap-6">
                {invoiceItems.map((item, index) => (
              <InvoiceItemcard
            onRemoveItemCard={handleRemoveItemCard}
              key={index} name={item.name} price={item.price} quantity={item.quantity} />))}
              
                </div>
                <button type="submit" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </div>
            </form>
        </div>
    );
};

export default CreateInvoice;