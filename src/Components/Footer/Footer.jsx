import React from 'react'
 import './Footer.css'
import logo_big from "../../assets/logo_big.png";
 import instagram_icon from "../../assets/instagram.png";
    import pintester_icon from "../../assets/pintester_icon.png";
  
     import whatsapp_icon from "../../assets/whatsapp_icon.png";
  const Footer = () => { 
    return (
       <div className='footer'>
         <div className='footer-logo'>
            <img src={logo_big} alt=''/>
          <p>SHOPPER</p> 
          </div>
          <div className='paragraph'>
            <p> Shoppers can easily compare prices, read detailed product descriptions, 
              and access reviews from previous customers across different websites,
               helping them make more informed purchasing decisions.</p>
          </div>
          
           <ul className='footer-links'>
            
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
         
                 <div className='footer-social-icon'> 
                  <div className='footer-icons-container'>
                     <img src={instagram_icon} alt=""/>
                      </div> 
                      <div className='footer-icons-container'> </div>
                        <img src={pintester_icon} alt=""/>
                       <div className='footer-icons-container'> </div>
                         <img src={whatsapp_icon} alt=""/>
                        </div> <div className='footer-copyright'>
                           <hr/> 
                           <p>Copyright @ 2025-All Right Reserved.</p>
                            </div> 
                            </div>
                             ) }
 export default Footer
