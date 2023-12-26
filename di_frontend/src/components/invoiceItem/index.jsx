import React, { useEffect, useState } from 'react';
import { fetchinvoicesItems } from '../../services/invoiceItemService';
import { Link } from 'react-router-dom';

const InvoiceItemList = () => {
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentInvoiceItems, setCurrentInvoiceItems] = useState();


const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

useEffect(() => {
  // Filtrer les factures en fonction de la chaîne de recherche
    const filteredInvoiceItems = invoiceItems.filter((invoiceItem) =>
    invoiceItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mettre à jour les factures actuelles
  setCurrentInvoiceItems(filteredInvoiceItems.slice(indexOfFirstItem, indexOfLastItem));
}, [searchTerm, currentInvoiceItems]);


  useEffect(() => {
    // Chargement des factures lors du montage du composant
    const loadInvoiceItems = async () => {
      try {
        const responseData = await fetchinvoicesItems();
        const data = responseData;
        const processedInvoiceItems = data.map((InvoiceItemData) => ({
          name : InvoiceItemData.name,
          price: InvoiceItemData.price,
        }));
        setInvoiceItems(processedInvoiceItems.filter(
            (invoiceItem, index, self) =>
              index === self.findIndex((c) => c.name === invoiceItem.name)
          ));
      } catch (error) {
        console.error('Error loading InvoiceItems:', error);
        // Gérer l'erreur (affichage d'un message, journalisation, etc.)
      }
    };

    loadInvoiceItems();
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

        <div className="relative overflow-x-auto sm:rounded-lg  mb-20 mt-10">
          <div class="flex items-center justify-between flex-rows flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
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

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvoiceItems && currentInvoiceItems.map((invoiceItem) => (
                <tr key={invoiceItem.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {/* ... (render invoiceItems data) */}
                  
                <th scope="row" class="px-6 py-4 font-bold text-xl text-white whitespace-nowrap dark:text-white">
                    <div className='flex flex-col justify-center text-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-slate-500'>
                        <div className=''>
                        {invoiceItem.name[0]}
                        </div>
                    </div>
                </th>
                <td class="px-6 py-4">
                
                        <div class="text-base font-semibold">{invoiceItem.name}</div>
                
                </td>
                <td class="px-6 py-4">
                        <div class="font-normal text-gray-500">{invoiceItem.price}</div>
                </td>
                  <td className="px-6 py-4">
                  <Link to={`/invoicesitems/${invoiceItem.name}`}>
                    <button className="p-2 mx-2 rounded text-white font-medium bg-blue-600 dark:text-blue-500 hover:underline">
                      View assiociated invoices
                    </button>
                  </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="flex items-center flex-rows flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, invoiceItems.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{invoiceItems.length}</span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <a
                  href="#"
                  className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'cursor-not-allowed opacity-50 z-0' : ''}`}
                  onClick={() => {
                    if(currentPage!==1)
                    paginate(currentPage - 1)}}
                >
                  Previous
                </a>
              </li>
              {Array.from({ length: Math.ceil(invoiceItems.length / itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-500'}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === Math.ceil(invoiceItems.length / itemsPerPage) ? 'cursor-not-allowed opacity-50' : ''}`}
                  onClick={() => {
                    if(currentPage !== Math.ceil(invoiceItems.length / itemsPerPage))
                    paginate(currentPage + 1)
                  }}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      
  );
};

export default InvoiceItemList;
