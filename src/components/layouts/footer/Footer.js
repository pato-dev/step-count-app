import React from 'react'
import './footer.css';

const Footer = () => {
    return (
        <main className='footer_container'>
            <div className='content'>
                <span>
                    &copy;{new Date().getFullYear()} All Right Reserved.
                </span>
            </div>
        </main>
    )
}

export default Footer;
