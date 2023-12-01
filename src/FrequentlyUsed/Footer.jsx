import "../css/footer.css"

function Footer() {
  return (
    <div className="footer-container flex justify-between space-x-4 pt-16 pb-4">
      <div className="Footer-Description w-1/3">
        <div>
        <img src="Images/logo.png" alt="" className="h-8 navbar-logo-image  " />
        </div>
        <h1 className="text-xl mb-4 italic pt-5">
          Small description to describe Collect’s concept... Small description
          to describe Collect’s concept...
        </h1>
        <h1 className="text-xl italic">© Copyright Collect 2024</h1>
      </div>
      <div className="Footer-Links w-1/3">
        <ul className="space-y-4 text-center">
          <li>
            <a href="" className="text-2xl md:hover:text-red-700">Shop</a>
          </li>
          <li>
            <a href="" className="text-2xl md:hover:text-red-700">About</a>
          </li>
          <li>
            <a href="" className="text-2xl md:hover:text-red-700">Contact</a>
          </li>
        </ul>
      </div>
      <div className="w-3/12">
        <div className="Footer-Socials flex content-center ">
          <img src="../Images/location 1.png" className="content-center" alt="" /> <p>Betchay, Baabda, Lebanon</p>
        </div>
        <div className="Footer-Socials flex content-center">
          <img src="../Images/mail 1.png"  className="content-center" alt="" /> <p>collect.leb@gmail.com</p>
        </div>
        <div className="Footer-Socials flex content-center">
          <img src="../Images/insta 1.png" className="content-center" alt="" /> <p>@collect.leb</p>
        </div>
        <div className="Footer-Socials flex content-center">
          <img src="../Images/facebook 1.png"className="content-center" alt="" /> <p>@collect.leb</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
