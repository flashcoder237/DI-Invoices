import React, { useEffect, useState } from 'react';
import { fetchInvoices } from '../../services/invoiceService';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentInvoices, setCurrentInvoices] = useState();

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};
useEffect(() => {
  // Filtrer les factures en fonction de la chaîne de recherche
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mettre à jour les factures actuelles
  setCurrentInvoices(filteredInvoices.slice(indexOfFirstItem, indexOfLastItem));
}, [searchTerm, currentInvoices]);


  useEffect(() => {
    // Chargement des factures lors du montage du composant
    const loadInvoices = async () => {
      try {
        const responseData = await fetchInvoices();
        const data = responseData;
        const processedInvoices = data.map((InvoiceData) => ({
          id: InvoiceData.id,
          invoiceNumber : InvoiceData.invoiceNumber,
          billingAddress: InvoiceData.billingAddress,
          Invoiceitems: InvoiceData.items,
          customer : InvoiceData.customer,
          totalAmount : InvoiceData.totalAmount,
          dateCreation : InvoiceData.dateCreation,
          dateMiseAJour : InvoiceData.dateMiseAJour,

        }));
        setInvoices(processedInvoices);
      } catch (error) {
        console.error('Error loading invoices:', error);
        // Gérer l'erreur (affichage d'un message, journalisation, etc.)
      }
    };

    loadInvoices();
  }, []);

   // Pagination state
   const itemsPerPage = 5;
   const [currentPage, setCurrentPage] = React.useState(1);
 
   // Calculate current items to display based on pagination
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  

   // Change page function
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (

        <div className="relative overflow-x-auto sm:rounded-lg  mb-20">
          <div class="flex items-center justify-between flex-rows flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div>
            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span class="sr-only">Action button</span>
                Search method
                <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
           
            <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 h-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                    </li>
                </ul>
                <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                </div>
            </div>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-12 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            
        </div>
    </div>
          {/* ... (previous code for dropdown and search) */}

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Invoice Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices && currentInvoices.map((invoice) => (
                <tr key={invoice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {/* ... (render invoice data) */}
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                    <input
                  type="checkbox"
                  name="check"
                  id="checkbox-table-3"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
    
                </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    DI-INV-{invoice.id}
                </th>
                <td class="px-6 py-4">
                <div class="">
                        <div class="text-base font-semibold">{invoice.customer.name}</div>
                        <div class="font-normal text-gray-500">{invoice.customer.email}</div>
                    </div>
                </td>
                <td class="px-6 py-4">
                <div class="">
                        <div class="text-base font-semibold">Create at {invoice.dateCreation}</div>
                        <div class="font-normal text-gray-500">Update at {invoice.dateMiseAJour}</div>
                    </div>
                </td>
                <td class="px-6 py-4">
                <div class="">
                        <div class="text-base font-semibold"> {invoice.totalAmount} FCFA</div>
                        {invoice.items && (
                        <div class="font-normal text-gray-500">{invoice.items.length} Products</div>)}
                    </div>
                </td>
                  <td className="px-6 py-4">
                    <button className="p-2 mx-2 rounded text-white font-medium bg-blue-800 dark:text-blue-500 hover:underline">
                      View
                    </button>
                    <button className="p-2 mx-2 rounded text-white font-medium bg-red-800 dark:text-blue-500 hover:underline">
                      Delete
                    </button>
                    <button className="p-2 mx-2 rounded text-white font-medium bg-slate-500 dark:text-blue-500 hover:underline">
                     <a href="">Edit</a>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="flex items-center flex-rows flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, invoices.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{invoices.length}</span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </a>
              </li>
              {Array.from({ length: Math.ceil(invoices.length / itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? 'bg-blue-50 text-blue-600' : ''}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(invoices.length / itemsPerPage)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      
  );
};

export default InvoiceList;
