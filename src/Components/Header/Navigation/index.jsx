import { useState } from 'react';
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";

const Navigation = () => {

    const [isopenSidebarVal, setisopenSidebarVal] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const toggleSidebar = () => {
        setisopenSidebarVal((isOpen) => !isOpen);
        setActiveSubmenu(null);
    };

    const toggleSubmenu = (category) => {
        setActiveSubmenu((activeCategory) =>
            activeCategory === category ? null : category
        );
    };
    
    return(
        <nav>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-3 navPart1'>
                        <div className='catWrapper'>
                            <Button
                                className='allCatTab align-items-center'
                                onClick={toggleSidebar}
                                aria-expanded={isopenSidebarVal}
                            >
                                <span className='icon1'><IoIosMenu/></span>
                                <span className="text">ALL CATEGORIES</span>
                                <span className='icon2'><FaAngleDown/></span>
                            </Button>

                            <div className={`sidebarNav ${isopenSidebarVal ? 'open' : ''}`}>
                        
                                <ul>
                                    <li className={activeSubmenu === "men" ? "active" : ""}>
                                        <Button
                                            onClick={() => toggleSubmenu("men")}
                                            aria-expanded={activeSubmenu === "men"}
                                        >
                                            men <FaAngleRight className='ml-auto'/>
                                        </Button>
                                        <div className="submenu">
                                            <Link to="/men/clothing"><Button>clothing</Button></Link>
                                            <Link to="/men/footwear"><Button>footwear</Button></Link>
                   
                                        </div>
                                    </li>
                                    <li className={activeSubmenu === "women" ? "active" : ""}>
                                        <Button
                                            onClick={() => toggleSubmenu("women")}
                                            aria-expanded={activeSubmenu === "women"}
                                        >
                                            women <FaAngleRight className='ml-auto'/>
                                        </Button>
                                        <div className="submenu">
                                            <Link to="/women/clothing"><Button>clothing</Button></Link>
                                            <Link to="/women/footwear"><Button>footwear</Button></Link>
                                    
                                        </div>
                                    </li>
                                    <li><Link to="/beauty"><Button>beauty</Button></Link></li>
                                     <li><Link to="/kids"><Button>kids</Button></Link></li>
                                    <li><Link to="/bags-luggage"><Button>bags&luggage</Button></Link></li>
                                    <li><Link to="/sports-outdoor"><Button>sports&outdoor</Button></Link></li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-9 navPart2 d-flex align-items-center'>
                        <ul className='list list-inline ms-auto '>
                            <li className='list-inline-item'><Link to="/"><Button>Home</Button></Link></li>
                            
                            <li className="list-inline-item">
                                <Link to="/men"><Button>Men</Button></Link>
                                <div className='submenu shadow'>
                                    <Link to="/men/clothing"><Button>clothing</Button></Link>
                                    <Link to="/men/footwear"><Button>footwear</Button></Link>
                         
                                </div> 
                            </li>
                            
                            <li className='list-inline-item'>
                                <Link to="/women"><Button>Women</Button></Link>
                                <div className='submenu shadow'>
                                    <Link to="/women/clothing"><Button>clothing</Button></Link>
                                    <Link to="/women/footwear"><Button>footwear</Button></Link>

                                </div>
                            </li>
                            
                            <li className='list-inline-item'><Link to="/beauty"><Button>beauty</Button></Link></li>
                             <li className='list-inline-item'><Link to="/kids"><Button>kids</Button></Link></li>
                            <li className='list-inline-item'><Link to="/bags-luggage"><Button>bags&luggage</Button></Link></li>
                            <li className='list-inline-item'><Link to="/sports-outdoor"><Button>sports&outdoor</Button></Link></li>
                            <li className='list-inline-item'><Link to="/blogs"><Button>Blog</Button></Link></li>
                            <li className='list-inline-item'><Link to="/contact"><Button>Contact</Button></Link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navigation;
