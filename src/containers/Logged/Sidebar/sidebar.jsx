import React from 'react';
import {
    CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem
} from 'cdbreact';
import {NavLink} from 'react-router-dom';
import {Marginer} from '../../../components/marginer';
import {logout} from '../../../services/authenticationService';

const Sidebar = () => {

    return (
        <div className="vh-100" style={{position: "sticky", top: "0"}}>
            <CDBSidebar textColor="#fff" backgroundColor="#060053">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"> </i>}>
                    <a href={"/user/main"} className="text-decoration-none"
                       style={{color: 'inherit', fontSize: "20px"}}>Factoring</a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/user/invoices" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="file-invoice-dollar">Invoices</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/credit" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="credit-card">Credit</CDBSidebarMenuItem>
                        </NavLink>
                        <Marginer direction="vertical" margin={35}/>
                        <NavLink exact to="/user/customers" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="users">Customers</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/reports" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="file-signature">Reports</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/documents" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="file-alt">Documents</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/transactions" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="wallet">Transactions</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Your Profile</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/user/help" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle">Help & Contact</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter>
                    <div className="mb-3">
                        <CDBSidebarMenuItem icon="sign-out-alt"><a href="/" className="text-decoration-none" onClick={logout}
                                                                   style={{color: "white"}}>Log Out</a></CDBSidebarMenuItem>
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;