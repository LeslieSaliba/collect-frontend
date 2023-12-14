import "../css/AboutUsHeader.css";
import "../css/footer.css"
import "../css/ContactUsHeader.css";
function ContactUsHeader() {
  return (
    <div className="contactUsHeader-cont pt-12">
      <div className="max-w-screen flex mx-40 gap-40 p-4 ">
        <div className="w-1/2">
          <p href="" className="text-4xl italic  mb-24 font-medium">
            Contact Us
          </p>
          <div className="Footer-Socials flex content-center mb-2">
            <img src="../Images/location 1.png" className="content-center" alt="" /> <p className="text-lg ml-4">Betchay, Baabda, Lebanon</p>
          </div>
          <div className="Footer-Socials flex content-center mb-2">
            <a href="mailto:collect.leb@gmail.com">
              <img src="../Images/mail 1.png" className="content-center" alt="Email" />
            </a>
            <a href="mailto:collect.leb@gmail.com" class="text-lg ml-4">collect.leb@gmail.com</a>
          </div>
          <div className="Footer-Socials flex content-center mb-2">
            <a href="https://www.instagram.com/collect.leb/" target="_blank" rel="noopener noreferrer">
              <img src="../Images/insta 1.png" className="content-center" alt="Instagram" />
            </a>
            <a href="https://www.instagram.com/collect.leb/" target="_blank" rel="noopener noreferrer" class="text-lg ml-4">@collect.leb</a>
          </div>
          <div className="Footer-Socials flex content-center mb-2">
            <a href="https://www.facebook.com/collect.leb/photos" target="_blank" rel="noopener noreferrer">
              <img src="../Images/facebook 1.png" className="content-center" alt="Facebook" />
            </a>
            <a href="https://www.facebook.com/collect.leb/photos" target="_blank" rel="noopener noreferrer" class="text-lg ml-4">@collect.leb</a>
          </div>
        </div>

        <div className="w-1/2 ml-32 mt-32 ">
          <img
            src="../Images/vases.png"
            alt="Hero Image"
            className=" ContactUsHeader-img"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactUsHeader;
