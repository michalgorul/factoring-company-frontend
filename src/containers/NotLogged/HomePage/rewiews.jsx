import React from 'react';
import {Stars, StarFill, StarHalf} from 'react-bootstrap-icons';
import Google from '../../../images/google-symbol1.png'

import styled from "styled-components";
import {Marginer} from '../../../components/marginer';


const FullWidth = styled.div`
  width: 100%;
`;


const Reviews = () => {
    return (

        <FullWidth className="bg-light">
            <div className="container-lg">
                <div className="text-center">
                    <Marginer direction="vertical" margin={25}/>
                    <h2><Stars/> Application Reviews</h2>
                    <p className="lead text-muted">Funding solutions tailored to your business needs</p>
                </div>

                <div className="row justify-content-center my-5">
                    <div className="col-lg-8">
                        <div className="list-group">
                            <div className="list-group-item py-3">
                                <div className="pb-2">
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                </div>
                                <h5 className="mb-1">A must-buy for every businessman</h5>
                                <p className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur error veniam
                                    sit expedita est illo maiores neque quos nesciunt, reprehenderit autem odio commodi labore
                                    praesentium voluptate repellat in id quisquam.</p>
                                <small>Review by Mario</small>
                            </div>
                            <div className="list-group-item py-3">
                                <div className="pb-2">
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                </div>
                                <h5 className="mb-1">A must-buy for every businessman</h5>
                                <p className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur error veniam
                                    sit expedita est illo maiores neque quos nesciunt, reprehenderit autem odio commodi labore
                                    praesentium voluptate repellat in id quisquam.</p>
                                <small>Review by Mario</small>
                            </div>
                            <div className="list-group-item py-3">
                                <div className="pb-2">
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                </div>
                                <h5 className="mb-1">A must-buy for every businessman</h5>
                                <p className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur error veniam
                                    sit expedita est illo maiores neque quos nesciunt, reprehenderit autem odio commodi labore
                                    praesentium voluptate repellat in id quisquam.</p>
                                <small>Review by Mario</small>
                            </div>
                            <div className="list-group-item py-3">
                                <div className="pb-2">
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                </div>
                                <h5 className="mb-1">A must-buy for every businessman</h5>
                                <p className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur error veniam
                                    sit expedita est illo maiores neque quos nesciunt, reprehenderit autem odio commodi labore
                                    praesentium voluptate repellat in id quisquam.</p>
                                <small>Review by Mario</small>
                            </div>
                            <div className="list-group-item py-3">
                                <div className="pb-2">
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarFill/>
                                    <StarHalf/>
                                </div>
                                <h5 className="mb-1">A must-buy for every businessman</h5>
                                <p className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur error veniam
                                    sit expedita est illo maiores neque quos nesciunt, reprehenderit autem odio commodi labore
                                    praesentium voluptate repellat in id quisquam.</p>
                                <small>Review by Mario</small>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <blockquote className="blockquote text-centered">
                        <p className="lead "><strong>Excelent</strong>, <strong>4.8</strong> out of <strong>5</strong> based on
                            125,522 reviews.</p>
                    </blockquote>
                </div>
                <div className="d-flex justify-content-center">
                    <blockquote className="blockquote">
                        <div className="media">
                            <span className="media-left">
                                <img src={Google} alt="Google" width="50" height="50" className="center-block"/>
                            </span>
                        </div>
                    </blockquote>
                </div>
            </div>
        </FullWidth>

    );
}

export default Reviews;