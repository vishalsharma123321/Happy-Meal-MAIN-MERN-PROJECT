import { assets } from "../../assets/assets"
import "./Footer.css"
const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit facilis ullam molestias delectus corrupti aspernatur quod voluptatibus! Aliquid consequuntur modi optio sed esse similique vitae.</p>
            <div className="footer-socail-icons">
               <img src={assets.facebook_icon} alt="" /> 
               <img src={assets.twitter_icon} alt="" /> 
               <img src={assets.linkedin_icon} alt="" /> 
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+91 7666954092</li>
                <li>vishalsharma2212003@gmial.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &#169; Tomato.com - All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
