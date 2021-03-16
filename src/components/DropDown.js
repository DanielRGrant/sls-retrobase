import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';

// icons
import downArrow from '../assets/downArrow.png'


const DropdownMenu = (props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);  
  const onClick = () => setIsActive(!isActive);

  const options = props.options.map(option => {
      return(
          <li>
            {
              option.route
                ? <Link to={
                  option.route
                }>{option.title}</Link>
                : <span onClick={option.function}>{option.title}</span>
            }
          </li>
      )
  })

  return (
    <div className={`menu-container ${props.classes}`}>
      <button ref={dropdownRef} onClick={onClick} className="menu-trigger">
        <span className="flex-centered">{props.heading}</span>
      </button>
      <nav  className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
            {options}
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu