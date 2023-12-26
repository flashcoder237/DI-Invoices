import React,  { useEffect, useState }from 'react';
import Input from '../atoms/input';
import InvoiceItemForm from '../InvoiceItemForm';
import AddressForm from '../AddressForm';
import InvoiceItemcard from '../InvoiceItemCard';
import { createInvoice } from '../../services/invoiceService';
import { updateInvoice } from '../../services/invoiceService';
import {useParams} from 'react-router-dom';
import { fetchInvoiceById } from '../../services/invoiceService';
import { Link } from 'react-router-dom';


const CreateInvoice = (props) =>{
    const defaultAdrress =  {
      "street": "Broadway",
      "city": "Paris",
      "state": "Ontario",
      "zipCode": "75001",
      "country": "France"
  }
    const [customerInfo, setCustomerInfo] = useState({address: defaultAdrress});
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [billingAddress, setBillingAddress] = useState(defaultAdrress);
    const [successOperation, setSuccessOperation] = useState(0)
    const [invoiceItemsSatisfy, setInvoiceItemsSatisfy] = useState(false)
    const param = useParams();
    const mode = props.mode;
    

    useEffect(() => {
      const fetchInvoiceDetails = async (id) => {
        try {
          const invoiceDetails = await fetchInvoiceById(id); 
          setBillingAddress(invoiceDetails.billingAddress);
          setCustomerInfo(invoiceDetails.customer);
          setInvoiceItems(invoiceDetails.items);
        } catch (error) {
          console.error('Error fetching invoice details:', error);
          // Handle error
        }
      };
      if (param.id) {
        fetchInvoiceDetails(param.id);
      }
    }, []); 
    
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
      const filterInvoices = invoiceItems.filter((item) => item.name !== itemDetails.name && item.price !== itemDetails.price && item.quantity !== itemDetails.quantity);
      setInvoiceItems(filterInvoices);
    }

    useEffect(() => {
    }, []);

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
        
        if (mode==="edition") {
          try{
            // Construire le corps de la requête avec les détails du formulaire
            const requestBody = {
              billingAddress: billingAddress,
              customer: customerInfo,
              items: invoiceItems,
            };
            console.log(requestBody.items);

            const resultUpdateIvoice = updateInvoice(param.id, requestBody);
            setSuccessOperation(1)
            console.log(resultUpdateIvoice);

          }catch (error) {
            setSuccessOperation(2)
            console.error('Erreur lors de la création de la facture :', error);
            
          }
          
        } else {   
          try{
            // Construire le corps de la requête avec les détails du formulaire
            const requestBody = {
              billingAddress: billingAddress,
              customer: customerInfo,
              items: invoiceItems,
            };
            
            const resultCreateIvoice = createInvoice(requestBody);
            setSuccessOperation(1)
          }catch (error) {
            setSuccessOperation(2)
            console.error('Erreur lors de la création de la facture :', error);
            
          }
          }
        };
  

    return(
        <div className='w-full border-t-2 pt-10 border-blue-200 border-b-2 mb-10'>
            <form class="mx-auto w-full" onSubmit={handleSubmit}>
            <div className='flex'>
                <div className='flex-1 mx-5'>
            <div className='mb-3 border-b-2'>
            <div className=''>Billing Address</div>

            <AddressForm
            motif="Invoice"
            addressType="billing"
            defaultAddress={billingAddress}
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
                        value={customerInfo.email}
                        onInputChange={handleInputCustomerChange}
                    />

                    <Input
                        type="text"
                        name="name"
                        id="floating_name"
                        placeholder=" "
                        labelName="Name"
                        value={customerInfo.name}
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
                        value={customerInfo.phone}
                        required={invoiceItemsSatisfy}
                        onInputChange={handleInputCustomerChange}
                    />
                </div>
                  
                <div className=''>Customer Address</div>
                 <AddressForm
                 motif="Customers"
                 addressType="Customers"
                 onAddressChange={handleAddressChange}
                 defaultAddress={customerInfo.address}
                 />
                </div>
                <div className='flex-1 mx-5'>
                    <div className='mb-5'>Invoice article informations</div>
                    <InvoiceItemForm onAddInvoiceItem={handleAddInvoiceItem} />
                    
                    
                <div class="grid md:grid-cols-3 md:gap-6">
                {invoiceItems.map((item, index) => (
              <InvoiceItemcard
            onRemoveItemCard={handleRemoveItemCard}
              key={index} name={item.name} price={item.price} quantity={item.quantity} />))}
              
                </div>
                <button type="submit" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                {successOperation===1 && (
                  <div className='p-6 mt-4 bg-green-200 border-b-2 border-t-2 border-green-500'>
                  Opéraition doing success, 
                  {param.id && ( 
                  <Link className="text-green-800 underline" to={`/invoices/${param.id}`}>
                  click here to view receipt
                  </Link> 
                  )}
                  {!param.id && ( 
                  <Link to={`/invoices`}>
                  click here to view all receipts
                  </Link> 
                  )}
                </div>
                )}

{successOperation===2 && (
                  <div className='p-6 bg-red-200 border-b-2 border-t-2 border-red-500'>
                  Operation failed 
                </div>
                )}
                </div>
            </div>
            </form>
        </div>
    );
};

export default CreateInvoice;