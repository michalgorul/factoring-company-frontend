import React from "react";
import {BrandLogo} from "../brandLogo";
import {Navbar, Nav, Container, OverlayTrigger} from "react-bootstrap";
import Popover from 'react-bootstrap/Popover'


export function NavbarSection() {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3" className="text-primary"><span className="ms-3 me-2">Support available</span></Popover.Title>
            <Popover.Content>
                <span className="ms-2 h6">Office hours:</span>
                <p className="ms-2" style={{fontSize: "16px"}}>Mon-Fri: 6AM-8PM <br/> Sat-Sun: 9AM-5PM</p>
            </Popover.Content>
        </Popover>
    );

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/"><BrandLogo textSize={22}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-sm-center justify-content-md-end align-center">
                    <div className="">
                        <Nav className="">
                            <Nav.Link href="/" className="text-white h5 me-4">Contact</Nav.Link>
                            <Nav.Link href="/login" className="text-white h5 me-2">Login</Nav.Link>
                            <Nav.Link href="/register" className="text-white h5 d-lg-none">Register</Nav.Link>
                            <Nav.Link href="/register" className="btn btn-primary rounded-pill text-white h4 d-none d-lg-block">
                                <span style={{fontSize: "17px"}}>Register</span></Nav.Link>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}