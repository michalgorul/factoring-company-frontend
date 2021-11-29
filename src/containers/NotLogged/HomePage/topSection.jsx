import React from 'react'
import styled from 'styled-components'
import {BrandLogo} from "../../../components/brandLogo";
import {Marginer} from "../../../components/marginer";

import TopSectionIllustration from '../../../images/illustration.png';
import TopSectionBg from '../../../images/TopSectionBG.jpg';

const TopSectionContainer = styled.div`
  width: 100%;
  height: 70%;
  background: url(${TopSectionBg}) no-repeat fixed 0px -150px;
  background-size: cover;
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(57, 138, 231, 0.79);
  display: flex;
  flex-direction: column;
`;


export function TopSection(props) {

    const {children} = props;
    return (

        <TopSectionContainer>
            <BackgroundFilter>
                {children}
                <div className="container-lg">
                    <div className="row d-flex justify-content-start justify-content-lg-start align-items-center">
                        <div className="col-lg-6 text-center">
                            <BrandLogo logoSize={160} className="d-none d-md-block"/>
                            <h1>
                                <div className="display-2 text-white">Best funding</div>
                                <div className="display-5 text-white">for your business</div>
                            </h1>
                            <Marginer direction="vertical" margin={15}/>
                            <a href={"/register"} className="btn btn-lg btn-primary rounded-pill text-white">Apply Now</a>
                            <Marginer direction="vertical" margin={30}/>
                        </div>
                        <div className="col-lg-6 text-center d-none d-lg-block">
                            <img src={TopSectionIllustration} className="img-fluid" alt="ebook"/>
                        </div>
                    </div>
                </div>
            </BackgroundFilter>
        </TopSectionContainer>
    )
}