import React from 'react'; 
import Dropdown from 'rsuite/Dropdown'; 
import 'rsuite/Dropdown/styles/index.css';
import './css/DropdownMenu.css';
import MenuIcon from '@rsuite/icons/Menu';
import PeoplesIcon from '@rsuite/icons/Peoples';
import StorageIcon from '@rsuite/icons/Storage';


function DropdownMenu(){ 
    return (
        <div className='dropdown'> 
            <Dropdown title="More Information" icon={<MenuIcon />} size='lg'> 
                <Dropdown.Item icon={<PeoplesIcon />} className='dropdown_item' onClick={handleClick}> 
                    Team 
                </Dropdown.Item> 
                <Dropdown.Item icon={<StorageIcon />} className='dropdown_item' onClick={handleClick}> 
                    Used API
                </Dropdown.Item> 
            </Dropdown> 
        </div> 
  );
};

const handleClick = () => {
    window.open("https://youtu.be/dQw4w9WgXcQ");
};

export default DropdownMenu;