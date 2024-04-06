import React from 'react'; 
import './css/HeaderBanner.css';
import Header from './Header';
import DropdownMenu from './DropdownMenu';

function HeaderBanner(){ 
    return (
        <div className='banner'>
            <Header /> 
            <DropdownMenu />
        </div>
    );
}

export default HeaderBanner;
