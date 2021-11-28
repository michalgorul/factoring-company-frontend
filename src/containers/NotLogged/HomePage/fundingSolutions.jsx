import React from 'react'
import {Check} from 'react-bootstrap-icons';
import {Marginer} from '../../../components/marginer';
import styled from "styled-components";

const FullWidth = styled.div`
  width: 100%;
`;

export function FundingSolution() {

    return (
        <FullWidth className="bg-light">
            <div className="container-lg">
                <div className="text-center">
                    <Marginer direction="vertical" margin={25}/>
                    <h2>Funding Plans</h2>
                    <p className="lead text-muted">Funding solutions tailored to your business needs</p>
                </div>
            </div>


            <div className="row my-5 align-items-center justify-content-center container-fluid">
                <div className="col-9 col-lg-5">
                    <div className="card border-0 h-10 mb-3">
                        <div className="card-body text-center py-4">
                            <h4 className="card-title">Line of Credit</h4>
                            <p className="lead card-subtitle mb-4">Quick access to capital you want</p>
                            <p className="card-text mx-5 text-muted d-none d-lg-block">
                                <Check/> Credit lines up to
                                <span className="h5 text-muted"> $100,000</span>
                            </p>
                            <p className="card-text mx-5 text-muted d-none d-lg-block">
                                <Check/> Only pay for what you use
                            </p>
                            <p className="card-text mx-5 text-muted d-none d-lg-block">
                                <Check/> No prepayment penalties
                            </p>
                            <a href="/" className="btn btn-outline-primary btn-lg mt-3">Learn more</a>
                        </div>
                    </div>
                </div>

                <div className="col-9 col-lg-5">
                    <div className="card border-0">
                        <div className="card-body text-center py-4 flex-fill">
                            <h4 className="card-title">Invoice Factoring</h4>
                            <p className="lead card-subtitle mb-4">Turn unpaid invoices into cash</p>
                            <p className="card-text mx-5 text-muted d-none d-lg-block">
                                <Check/> Credit lines up to
                                <span className="h5 text-muted"> $1 million</span>
                            </p>
                            <p className="card-text mx-5 text-muted d-none d-lg-block">
                                <Check/> Rates from 1%
                            </p>
                            <p className="card-text mx-5 text-muted d-none d-lg-block">
                                <Check/> You choose the period
                            </p>
                            <a href="/" className="btn btn-outline-primary btn-lg mt-3">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
        </FullWidth>

    )

}