import "../css/footer.css";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer-container flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 pt-8 md:pt-16 pb-4 px-4 md:px-10">
      <div className="Footer-Description w-full md:w-1/3 text-center md:text-left">
        <img src="Images/logo.png" alt="" className="h-8 navbar-logo-image footer-logo" />
        <p className="text-sm md:text-lg mb-4 italic pt-5">
        Collect is THE place to shop vintage items in Lebanon.
        </p>
        <p className="text-sm md:text-lg italic footer-full-screen">© Copyright Collect 2024</p>
      </div>
      <div className="Footer-Links w-full md:w-1/3 text-center md:text-left">
        <ul className="space-y-4">
          <li>
            <Link to='/shop'> <a href="" className="text-sm md:text-lg md:hover:text-red-700">Shop</a></Link>
          </li>
          <li>
            <Link to='/AboutUs'><a href="" className="text-sm md:text-lg md:hover:text-red-700">About</a></Link>
          </li>
          <li>
            <Link to='/ContactUs'><a href="" className="text-sm md:text-lg md:hover:text-red-700">Contact</a></Link>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-3/12 footer-socials-div ">
        <table className="Footer-Socials">
          <tr>
            <td className="Footer-Socials flex items-center">
              <img src="../Images/location 1.png" className="content-center footer-socials-img" alt="Location" />
              <p className="ml-2">Betchay, Baabda, Lebanon</p>
            </td>
          </tr>
          <tr>
            <td className="Footer-Socials flex items-center">
              <a href="mailto:collect.leb@gmail.com">
                <img src="../Images/mail 1.png" className="content-center footer-socials-img" alt="Email" />
              </a>
              <a href="mailto:collect.leb@gmail.com" class="ml-2">collect.leb@gmail.com</a>
            </td>
          </tr>
          <tr>
            <td className="Footer-Socials flex items-center">
              <a href="https://www.instagram.com/collect.leb/" target="_blank" rel="noopener noreferrer"><img src="../Images/insta 1.png" className="content-center footer-socials-img" alt="Instagram" /></a>
              <a href="https://www.instagram.com/collect.leb/" target="_blank" rel="noopener noreferrer" className="ml-2">@collect.leb</a>
            </td>
          </tr>
          <tr>
            <td className="Footer-Socials flex items-center">
              <a href="https://www.facebook.com/collect.leb/photos" target="_blank" rel="noopener noreferrer"><img src="../Images/facebook 1.png" className="content-center footer-socials-img" alt="Facebook" /></a>
              <a href="https://www.facebook.com/collect.leb/photos" target="_blank" rel="noopener noreferrer" className="ml-2">@collect.leb</a>
            </td>
          </tr>
        </table>
      </div>
      <p className="text-sm md:text-lg italic footer-phone-screen">© Copyright Collect 2024</p>
    </div>
  );
}

export default Footer;
