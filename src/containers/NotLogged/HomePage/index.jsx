import React from 'react';
import {NavbarSection} from '../../../components/navbar';
import {PageContainer} from '../../../components/pageContainer';
import Contact from './contact';
import Footer from './footer';
import {FundingSolution} from './fundingSolutions';
import {QuickInfo} from './quickInfo';
import Reviews from './rewiews';
import ToTopButton from './scrollToTop';
import {TopSection} from './topSection';

export function HomePage() {
    return <PageContainer>
        <TopSection>
            <NavbarSection/>
        </TopSection>
        <FundingSolution/>
        <QuickInfo/>
        <Reviews/>
        <Contact/>
        <Footer/>
        <ToTopButton/>
    </PageContainer>
}