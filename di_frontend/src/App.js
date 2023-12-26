// import logo from './logo.svg';
import CreateInvoice from "./components/invoice/createInvoice";
import InvoiceList from "./components/invoice";
import ReactDOM from "react-dom/client";
import Header from "./components/header";
import SuccessPage from "./pages/successPage";
import ViewInvoice from "./pages/viewInvoice";
import CustomerList from "./components/customer";
import InvoiceItemList from "./components/invoiceItem";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (

    <div className="flex flex-col no-underline items-center justify-center">
      <Router >
      <Header/>
      <div className="container items-center justify-center mt-10">
      <Routes >
          <Route exact path="/invoices" element={<InvoiceList />} />
          <Route exact path="/invoicesitems" element={<InvoiceItemList />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:name" element={<InvoiceList />} />
          <Route exact path="/invoicesitems/:name" element={<InvoiceList type="invoiceitem"/>} />
          <Route exact path="/addinvoice" element={<CreateInvoice mode="creation" />} />
          <Route exact path="/success" element={<SuccessPage />} />
          <Route path="/invoices/:id" element={<ViewInvoice />} />
          <Route path="/invoices/edit/:id" element={<CreateInvoice mode="edition" />} />
      </Routes>
    </div>
      </Router>
    </div>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

 