import {HomePage} from './containers/NotLogged/HomePage'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import NotFound from './containers/NotFound';
import Login from './containers/NotLogged/LoginPage';
import Register from './containers/NotLogged/RegisterPage';
import TermsOfUse from './containers/TermsOfUse/termsOfUse';
import MainPageLogged from './containers/Logged/MainPage';
import Customers from './containers/Logged/Customers';
import Invoices from './containers/Logged/Invoices';
import Credit from './containers/Logged/Credit';
import Reports from './containers/Logged/Reports';
import Documents from './containers/Logged/Documents';
import FileListPage from './containers/Logged/Documents/fileListPage';
import Profile from './containers/Logged/Profile';
import Layout from './containers/Logged/Layout';
import CustomerDetails from './containers/Logged/Customers/customerDetails';
import CustomerCreate from './containers/Logged/Customers/customerCreate';
import CustomerEdit from './containers/Logged/Customers/customerEdit';
import CompanyEdit from './containers/Logged/Profile/companyEdit';
import ProfileEdit from './containers/Logged/Profile/profileEdit';
import Support from './containers/Logged/Support';
import InvoiceDetails from './containers/Logged/Invoices/invoiceDetails';
import EditBankAccount from './containers/Logged/BankAccount';
import CreditDetails from './containers/Logged/Credit/creditDetails';
import InvoiceCreate from './containers/Logged/Invoices/invoiceCreate';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import GeneralInfoEdit from './containers/Logged/Invoices/generalInfoEdit';
import PaymentInfoEdit from './containers/Logged/Invoices/paymentInfoEdit';
import CreateBankAccount from './containers/Logged/Profile/bankCreate';
import CompanyCreate from './containers/Logged/Profile/companyCreate';
import CustomerCompanyCreate from './containers/Logged/Customers/companyCreate';
import PasswordReset from './containers/NotLogged/LoginPage/resetPasswordRequest';
import PasswordResetConfirmation from './containers/NotLogged/LoginPage/confirmation';
import PasswordResetChange from './containers/NotLogged/LoginPage/resetPasswordChange';
import PasswordResetSuccess from './containers/NotLogged/LoginPage/success';
import ProductEdit from './containers/Logged/Product/productEdit';
import ProductCreate from './containers/Logged/Product/productCreate';
import Transactions from './containers/Logged/Transactions';
import CustomerReports from './containers/Logged/Reports/CustomerReports/index';
import VatReport from './containers/Logged/Reports/CustomerReports/vatReport';
import CreditCreate from "./containers/Logged/Credit/creditCreate";
import CreateCustomerBankAccount from "./containers/Logged/Customers/customerBankCreate";
import CreditHistory from "./containers/Logged/Credit/creditHistory";
import CreditPay from "./containers/Logged/Credit/creditPay";
import CreditSchedule from "./containers/Logged/Credit/creditSchedule";
import TransactionDetails from "./containers/Logged/Transactions/transactionDetails";
import ExpenseReports from "./containers/Logged/Reports/ExpenseReports";
import Charts from "./containers/Logged/Reports/Charts";


const UserComponents = ({match}) => {
    return (
        <Layout>
            <Switch>
                <ProtectedRoute path={`${match.url}/main`} exact component={MainPageLogged}/>
                <ProtectedRoute path={`${match.url}/help`} exact component={Support}/>
                <ProtectedRoute path={`${match.url}/customers`} exact component={Customers}/>
                <ProtectedRoute path={`${match.url}/customers/create`} exact component={CustomerCreate}/>
                <ProtectedRoute path={`${match.url}/customers/edit/:id`} exact component={CustomerEdit}/>
                <ProtectedRoute path={`${match.url}/customers/company/create/:id`} exact component={CustomerCompanyCreate}/>
                <ProtectedRoute path={`${match.url}/customers/bank/create/:id`} exact component={CreateCustomerBankAccount}/>
                <ProtectedRoute path={`${match.url}/bank-account/edit/:id`} exact component={EditBankAccount}/>
                <ProtectedRoute path={`${match.url}/customers/:id`} component={CustomerDetails}/>
                <ProtectedRoute path={`${match.url}/invoices`} exact component={Invoices}/>
                <ProtectedRoute path={`${match.url}/invoices/create`} exact component={InvoiceCreate}/>
                <ProtectedRoute path={`${match.url}/invoices/edit/general-info/:id`} exact component={GeneralInfoEdit}/>
                <ProtectedRoute path={`${match.url}/invoices/edit/payment-info/:id`} exact component={PaymentInfoEdit}/>
                <ProtectedRoute path={`${match.url}/invoices/:id`} exact component={InvoiceDetails}/>
                <ProtectedRoute path={`${match.url}/credit`} exact component={Credit}/>
                <ProtectedRoute path={`${match.url}/credit/create`} exact component={CreditCreate}/>
                <ProtectedRoute path={`${match.url}/credit/:id`} exact component={CreditDetails}/>
                <ProtectedRoute path={`${match.url}/credit/history/:id`} exact component={CreditHistory}/>
                <ProtectedRoute path={`${match.url}/credit/overpay/:id`} exact component={CreditPay}/>
                <ProtectedRoute path={`${match.url}/credit/schedule/:id`} exact component={CreditSchedule}/>
                <ProtectedRoute path={`${match.url}/reports`} exact component={Reports}/>
                <ProtectedRoute path={`${match.url}/reports/customers`} exact component={CustomerReports}/>
                <ProtectedRoute path={`${match.url}/reports/customers/vat`} exact component={VatReport}/>
                <ProtectedRoute path={`${match.url}/reports/expense`} exact component={ExpenseReports}/>
                <ProtectedRoute path={`${match.url}/reports/charts`} exact component={Charts}/>
                <ProtectedRoute path={`${match.url}/documents`} exact component={Documents}/>
                <ProtectedRoute path={`${match.url}/documents/list/:catalog`} exact component={FileListPage}/>
                <ProtectedRoute path={`${match.url}/transactions`} exact component={Transactions}/>
                <ProtectedRoute path={`${match.url}/transactions/:id`} exact component={TransactionDetails}/>
                <ProtectedRoute path={`${match.url}/profile`} exact component={Profile}/>
                <ProtectedRoute path={`${match.url}/profile/edit`} exact component={ProfileEdit}/>
                <ProtectedRoute path={`${match.url}/profile/company/create`} exact component={CompanyCreate}/>
                <ProtectedRoute path={`${match.url}/profile/bank/create`} exact component={CreateBankAccount}/>
                <ProtectedRoute path={`${match.url}/profile/company/edit/:id`} exact component={CompanyEdit}/>
                <ProtectedRoute path={`${match.url}/product/create`} exact component={ProductCreate}/>
                <ProtectedRoute path={`${match.url}/product/edit/:id`} exact component={ProductEdit}/>
                <ProtectedRoute path="*" render={() => (<Redirect to="/404"/>)}/>
            </Switch>
        </Layout>
    );
};


function App() {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/login/password/reset" exact component={PasswordReset}/>
                        <Route path="/login/password/reset/confirmation" exact component={PasswordResetConfirmation}/>
                        <Route path="/password/reset/change/success" exact component={PasswordResetSuccess}/>
                        <Route path="/password/reset/change" component={PasswordResetChange}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/terms-of-use" exact component={TermsOfUse}/>
                        <Route path="/user" component={UserComponents}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
