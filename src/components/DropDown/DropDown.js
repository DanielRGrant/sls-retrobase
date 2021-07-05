import { useRef } from 'react';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import { renderOptions } from './renderHooks';

// icons
import downArrow from '../../assets/downArrow.png'


const DropdownMenu = (props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);  
  const onClick = () => setIsActive(!isActive);

  const options = renderOptions(props.options);

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