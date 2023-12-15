import React, { useState } from 'react';
import Input from './atoms/input';

const InvoiceItemForm = ({ onAddInvoiceItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleAddItem = () => {
    if (itemName.trim() === '' || itemQuantity.trim() === '' || itemPrice.trim() === '') {
        // Afficher un message d'erreur ou prendre toute autre action que vous souhaitez
        console.log('Veuillez remplir tous les champs.');
        return;
      }

    onAddInvoiceItem({ name: itemName, quantity: itemQuantity, price: itemPrice });
    // Réinitialiser les champs après l'ajout
    setItemName('');
    setItemQuantity('');
    setItemPrice('');
  };

  return (
    <div>
      <div className='grid md:grid-cols-2 md:gap-6 mb-6'>
        <Input
          type='text'
          name='floating_text'
          placeholder=' '
          labelName='Product Name'
          value={itemName}
          onInputChange={(e) => setItemName(e)}
        />
        <Input
          type='number'
          name='floating_number'
          placeholder=' '
          labelName='Quantity'
          value={itemQuantity}
          onInputChange={(e) => setItemQuantity(e)}
        />
        <Input
          type='number'
          name='floating_number'
          placeholder=' '
          labelName='Price'
          value={itemPrice}
          onInputChange={(e) => setItemPrice(e)}
        />
        <div
          onClick={handleAddItem}
          className=' text-white bg-slate-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Add Invoice Item
        </div>
      </div>
    </div>
  );
};

export default InvoiceItemForm;
