import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import CountryDropdown from '../CountryDropdown';
import { IoIosSearch } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { useContext, useState } from 'react';
import { MyContext } from '../../App';
import { useCart } from '../../CartContext';
import { useAuth } from '../../AuthContext';
import Tooltip from '@mui/material/Tooltip';

const Header = () => {
    const context = useContext(MyContext);
    const { cartCount, cartTotal } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleUserIconClick = (e) => {
        if (user) {
            setAnchorEl(e.currentTarget); // open dropdown
        } else {
            navigate("/login"); // not logged in, just go to login
        }
    };

    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout();
        handleClose();
        navigate("/");
    };

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="logoWrapper d-flex align-items-center col-sm-3">
                            <Link to={'/'}><img src="/Images/logo.png" alt='Logo' /></Link>
                        </div>

                        <div className='col-sm-9 d-flex align-items-center part2'>
                            {
                                context.countryList.length !== 0 && <CountryDropdown />
                            }

                            <SearchBox />

                            <div className='part3 d-flex align-items-center ms-auto'>
                                <Tooltip title={user ? "My Account" : "Sign in"}>
                                    <Button className='circle mr-3' onClick={handleUserIconClick}>
                                        <FiUser />
                                    </Button>
                                </Tooltip>
                                
                                
<Menu
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    PaperProps={{
        className: "accountDropdown",
        elevation: 3,
    }}
>
    <div className="accountDropdownHeader">
        <div className="accountDropdownAvatar">
            {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
            <p className="accountDropdownName">Hi, {user?.name}</p>
            <p className="accountDropdownEmail">{user?.email}</p>
        </div>
    </div>
    <Divider />
     <MenuItem component={Link} to="/account" onClick={handleClose} className="accountDropdownItem">
    My Account
   </MenuItem>
        <MenuItem component={Link} to="/account/orders" onClick={handleClose} className="accountDropdownItem">
    Order History
       </MenuItem>
       <MenuItem component={Link} to="/account/addresses" onClick={handleClose} className="accountDropdownItem">
    Addresses
       </MenuItem>
    <Divider />
    <MenuItem onClick={handleLogout} className="accountDropdownItem accountDropdownLogout">
        Log out
    </MenuItem>
</Menu>
                                {/* Cart stays exactly the same */}
                                <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className='ml-auto cartTab d-flex align-items-center'>
                                        <span className='price'>${cartTotal.toFixed(2)}</span>
                                        <div className='position-relative ml-2'>
                                            <Button className='circle'><IoBagOutline /></Button>
                                            <span className='count d-flex align-items-center justify-content-center'>{cartCount}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Navigation />
        </>
    )
}

export default Header;