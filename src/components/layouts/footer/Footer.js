import React from 'react'
import './footer.css';

const Footer = () => {
    return (
        <main className='main_container-footer'>
            <div className='content'>
                <span>
                    &copy;{new Date().getFullYear()} All Right Reserved.
                </span>
                <span>Pato_Dev.</span>
            </div>
        </main>
    )
}

export default Footer;
