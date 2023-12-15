// import logo from './logo.svg';
import CreateInvoice from "./components/invoice/createInvoice";
import InvoiceList from "./components/invoice";
import ReactDOM from "react-dom/client";
import Header from "./components/header";
import SuccessPage from "./pages/successPage";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (

    <div className="flex flex-col no-underline items-center justify-center">
      <Router >
      <Header/>
      <div className="container items-center justify-center mt-20">
      <Routes >
          <Route path="/" element={<InvoiceList />} />
          <Route exact path="/addinvoice" element={<CreateInvoice />} />
          <Route exact path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
      </Router>
    </div>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

 