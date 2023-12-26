// ViewInvoice.js
import React, { useEffect, useState ,useRef } from 'react';
import { fetchInvoiceById } from '../services/invoiceService';
import {useParams} from 'react-router-dom';
import ReactToPrint from "react-to-print";
import InvoiceDetails from '../components/invoice/invoiceDetails';
import { Link } from 'react-router-dom';



 const ViewInvoice = () => {
    useEffect(() => {
      const loadInvoice = async () => {
        try {
          const response = await fetchInvoiceById(param.id);
          setInvoice(response);
        } catch (error) {
          console.error('Error loading invoice:', error);
          // Gérer l'erreur (affichage d'un message, journalisation, etc.)
        }
      };
  
      loadInvoice();
    }, []);
    const param = useParams();
    const [invoice, setInvoice] = useState(null);
    let componentRef = useRef();
  
    if (!invoice) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
          <ReactToPrint
                trigger={() => <button className="px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md tems-center hover:bg-red-700 focus:bg-red-700">Print out Invoice!</button>}
                content={() => componentRef}
              />
            <Link to={`/invoices/edit/${param.id}`}>
            <button className="mx-3 px-4 py-3 text-slate-800 font-semibold  transition-all duration-200 bg-slate-200 border border-transparent rounded-md tems-center hover:text-white hover:bg-slate-700 focus:bg-slate-700">Edit Invoice</button>
            </Link>
            <InvoiceDetails  invoice={invoice} ref={(el) => (componentRef = el)}/>
        </div>
    );
  };

export default ViewInvoice;