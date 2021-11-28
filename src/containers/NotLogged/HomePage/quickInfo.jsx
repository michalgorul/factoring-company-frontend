import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Support from '../../../images/check.png'
import Bulb from '../../../images/bulb.png'
import Basket from '../../../images/basket.png'
import styled from "styled-components";

const LogoImage = styled.div`
  width: ${({size}) => (size ? size + "px" : "5em")};
  height: ${({size}) => (size ? size + "px" : "5em")};
  display: block;
  margin-left: auto;
  margin-right: auto;

  img {
    width: 100%;
    height: 100%;
  }
`;

export class QuickInfo extends Component {
    render() {
        return (
            <div className="container-lg">
                <div className="text-center">
                    <h2>In short</h2>
                    <p className="lead text-muted">Get peace of mind when you partner with Factoring Company</p>
                </div>

                <div className="row my-5 align-items-center justify-content-center container-fluid">
                    <div className="col-10 col-lg-4">
                        <div className="card border-0 h-10">
                            <LogoImage>
                                <img src={Basket} className="card-img-top mt-4 mb-2" alt="basket"/>
                            </LogoImage>
                            <div className="card-body text-center py-4 mt-2">
                                <h4 className="card-title">Easy to get started</h4>
                                <p className="lead card-subtitle mb-4">Factoring Company makes business funding quick and
                                    painless. Apply online and get approved in as fast as 5 minutes.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-10 col-lg-4">
                        <div className="card border-0">
                            <LogoImage>
                                <img src={Bulb} className="card-img-top mt-4 mb-2" alt="bulb"/>
                            </LogoImage>
                            <div className="card-body text-center py-4 mt-2">
                                <h4 className="card-title">As you wish</h4>
                                <p className="lead card-subtitle mb-4">Use your available credit line when you want, for any
                                    business need. Enjoy no long-term contracts or prepayment fees.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 col-lg-4">
                        <div className="card border-0">
                            <LogoImage>
                                <img src={Support} className="card-img-top mt-4 mb-5" alt="support"/>
                            </LogoImage>
                            <div className="card-body text-center py-4 mt-2">
                                <h4 className="card-title">Dedicated support</h4>
                                <p className="lead card-subtitle mb-4">Our team is available to walk you through the process and
                                    help you obtain the funds you need.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
