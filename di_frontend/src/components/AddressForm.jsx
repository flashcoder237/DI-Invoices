import { useState } from "react";
import Select from "./atoms/select";
import Input from "./atoms/input";
import { countries, cities, streets, states, zipCodes } from './../data'

const AddressForm = ({motif,onAddressChange, addressType, defaultAddress}) => {
  const [isChecked, setIsChecked] = useState(false);
  console.log(defaultAddress);
  const [address, setAddress] = useState(defaultAddress);

  const handleAddressChange = (selectInput, name) => {
    try{
    const addressItems = selectInput.split(',');
    setAddress({
        "street": addressItems[0].trim(),
        "city": addressItems[1].trim(),
        "state": addressItems[3].trim(),
        "zipCode": addressItems[5].trim(),
        "country": addressItems[4].trim()
      })
    console.log("Addresse valide");
    onAddressChange(address, addressType);
    }catch(error){
      console.log("Addresse non valide");
    }
  };
  const handleSelectChangeCountry = (selectedValue) => {
    setAddress({
         ...address,
         'country': selectedValue,
    })
    onAddressChange(address, addressType);
   };

  const handleSelectChangeCity = (selectedValue) => {
   setAddress({
        ...address,
        'city': selectedValue,
   })
   onAddressChange(address, addressType);
  };

  const handleSelectChangeState = (selectedValue) => {
    setAddress({
         ...address,
         'state': selectedValue,
    })
    onAddressChange(address, addressType);
   };
   const handleSelectChangeStreet = (selectedValue) => {
    setAddress({
         ...address,
         'street': selectedValue,
    })
    onAddressChange(address, addressType);
   };
   
   const handleSelectChangeZipCode = (selectedValue) => {
    setAddress({
         ...address,
         'zipCode': selectedValue,
    })
    onAddressChange(address, addressType);
   };

  return (
    <div className="bg-slate-50 shadow shadow-primary-50 p-6">
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="flex items-center bg-slate-100 px-4 py-4 rounded">
          <input
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="ml-4">Manually enter address for {motif}</div>
        </div>
      {isChecked && (
         <Input
              type="text"
              name="address"
              placeholder=" "
              labelName="Ex: 123 Rue l, bordeau,.."
              pattern="/^(.+),(.+),(\d{5}),(.+),(\d{5}),(.+)$/"
              required="true"
              onInputChange={handleAddressChange}
        />
      )}
      </div>
      {!isChecked && (
      <div className="grid md:grid-cols-2 md:gap-6 p-6 my-4 bg-slate-100">
      <Select 
        listAddressItem={countries}
        labelSelect="Select country"
        isChecked={isChecked}
        value={defaultAddress.country}
        required
        onSelectChange={handleSelectChangeCountry}
        />

        <Select 
        listAddressItem={cities}
        labelSelect="Select city"
        isChecked={isChecked}
        value={defaultAddress.city}
        required
        onSelectChange={handleSelectChangeCity}
        />

        <Select 
        listAddressItem={streets}
        labelSelect="Select street"
        isChecked={isChecked}
        defaultAddress={defaultAddress.street}
        required
        onSelectChange={handleSelectChangeStreet}
        />

        <Select 
        listAddressItem={states}
        labelSelect="Select states"
        isChecked={isChecked}
        value={defaultAddress.state}
        required
        onSelectChange={handleSelectChangeState}
        />

        <Select 
        listAddressItem={zipCodes}
        labelSelect="Select ZipCode"
        isChecked={isChecked}
        value={defaultAddress.zipCode}
        required
        onSelectChange={handleSelectChangeZipCode}
        />

      </div>)}
    </div>
  );
};

export default AddressForm;
