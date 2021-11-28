import React, {useState} from "react";
import styled from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronCircleUp} from '@fortawesome/free-solid-svg-icons'

const Button = styled.div`
  position: fixed;
  width: 100%;
  left: 85%;
  bottom: 120px;
  height: 20px;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: #002fffd1;
`

const ToTopButton = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button>
            <FontAwesomeIcon icon={faChevronCircleUp} onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}}/>
        </Button>

    );
};

export default ToTopButton;