// import logo from './logo.svg';
import SignInForm from "../components/commons/SignInForm";
import InvoiceList from "../components/invoice";
import Header from "../components/commons/Header";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (

    <div className="no-underline">
      <Header/>
      <div className="App container">
      <Route path="/" exact component={InvoiceList} />
      <Route path="/signin" exact component={SignInForm} />
      {/* <Route path="/invoice/:id" component={InvoiceDetails} /> */}
      <InvoiceList/>
    </div>
    </div>
  );
}

export default App;
