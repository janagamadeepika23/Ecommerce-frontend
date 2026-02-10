import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_big.png";
import cart_icon from "../../assets/cart_icon.png";
import bag_icon from "../../assets/bag_icon.png";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useCart } from "../CartContext";
import "./Navbar.css";

const Navbar = ({ setShowlogin }) => {
  const { cartItems, token, setToken } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setToken("");
    setShowDropdown(false);
    navigate("/");
  };

  const orderHandler = () => {
    setShowDropdown(false);
    navigate("/orders");
  };

  const cartCount = cartItems ? cartItems.length : 0;

  return (
    <div className="nav">
      <div className="navSection">
      
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>

       
        <Link to="/" className="shopper">SHOPPER</Link>

     
        <div className="search">
          <input type="text" placeholder="Search..." autoComplete="off" />
        </div>

        
        {!token ? (
          <button
            className="login-button"
            onClick={() => setShowlogin(true)}
          >
            Sign in
          </button>
        ) : (
          <div className="user-menu">
            <FaUserCircle
              className="profile-icon"
              onClick={() => setShowDropdown(prev => !prev)}
            />

            {showDropdown && (
              <div className="logout-dropdown">
               
                <div className="logout-item order" onClick={orderHandler}>
                  <img src={bag_icon} className="order-icon" alt="Orders" />
                  <span>Orders</span>
                </div>

              
                <div className="logout-item" onClick={logoutHandler}>
                  <FiLogOut className="logout-icon" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        )}

      
        <Link to="/cart">
          <div className="cart">
            <img src={cart_icon} alt="Cart" />
            <span>{cartCount}</span>
          </div>
        </Link>
      </div>

   
      <div className="subMenu">
        <ul>
          <Link to="/mobiles"><li>Mobiles</li></Link>
          <Link to="/computers"><li>Computers</li></Link>
          <Link to="/mens"><li>Mens</li></Link>
          <Link to="/watches"><li>Watches</li></Link>
          <Link to="/woman"><li>Womans</li></Link>
          <Link to="/furniture"><li>Furniture</li></Link>
          <Link to="/ac"><li>AC</li></Link>
          <Link to="/kitchen"><li>Kitchen</li></Link>
          <Link to="/fridges"><li>Fridge</li></Link>
          <Link to="/speakers"><li>Speakers</li></Link>
          <Link to="/tv"><li>TVs</li></Link>
          <Link to="/books"><li>Books</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
