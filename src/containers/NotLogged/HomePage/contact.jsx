import React from 'react';
import {ChatRightDotsFill, EnvelopeFill, PersonFill, QuestionCircle} from "react-bootstrap-icons"
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {Marginer} from '../../../components/marginer';

const Contact = () => {

    const renderTooltipEmail = props => (
        <Tooltip {...props}>Enter an email address we can reply to.</Tooltip>
    );
    const renderTooltipName = props => (
        <Tooltip {...props}>Pretty self explanatory...</Tooltip>
    );

    return (

        <div className="container-lg">
            <div className="text-center">
                <Marginer direction="vertical" margin={35}/>
                <h2>Get in Touch</h2>
                <p className="lead">Questions to ask? Fill out the form to contact me directly...</p>
            </div>
            <div className="row my-4 align-items-center justify-content-center container-fluid">
                <div className="col-11 col-lg-8">
                    <form>
                        <label className="form-label">Email address:</label>
                        <div className="input-group mb-4">
                      <span className="input-group-text">
                        <EnvelopeFill className="text-secondary"/>
                      </span>
                            <input type="text" id="email" className="form-control" placeholder="e.g. john@xyz.com"/>
                            <span className="input-group-text">
                      <OverlayTrigger placement="bottom" overlay={renderTooltipEmail} key="bottom">
                        <QuestionCircle className="text-muted"/>
                      </OverlayTrigger>
                      </span>
                        </div>
                        <label className="form-label">Name:</label>
                        <div className="mb-4 input-group">
                      <span className="input-group-text">
                        <PersonFill className="text-secondary"/>
                      </span>
                            <input type="text" id="name" className="form-control" placeholder="e.g. Mario"/>
                            <span className="input-group-text">
                        <OverlayTrigger placement="bottom" overlay={renderTooltipName} key="bottom">
                          <QuestionCircle className="text-muted"/>
                        </OverlayTrigger>
                      </span>
                        </div>
                        <label className="form-label">What is your question about?</label>
                        <div className="mb-4 input-group">
                    <span className="input-group-text">
                      <ChatRightDotsFill className="text-secondary"/>
                    </span>
                            <select className="form-select" id="subject">
                                <option value="pricing" selected>Pricing query</option>
                                <option value="content">Content query</option>
                                <option value="other">Other query</option>
                            </select>
                        </div>
                        <div className="mb-4 mt-5 form-floating">
                            <textarea className="form-control" id="query" style={{height: "140px"}}
                                      placeholder="query"> </textarea>
                            <label>Your query...</label>
                        </div>
                        <div className="mb-4 text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    );
}

export default Contact;