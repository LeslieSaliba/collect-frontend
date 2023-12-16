import "../css/AboutUsHeader.css";
import "../css/footer.css";
import "../css/ContactUsHeader.css";
function ContactUsHeader() {
  return (
    <div className="contactUsHeader-cont pt-12">
            <p href="" className="text-4xl italic  mb-16 font-medium ml-40 pl-4 contactUs-title">
              Contact Us
            </p>
      <div className="max-w-screen flex mx-40 gap-40 p-4 pt-0 contactUs-mini">
        <div className="w-1/2 contactUs-mini-socials">
          <table className="Footer-Socials contactUs-socials-table">
            <tr>
              <td className="Footer-Socials flex items-center">
                <img
                  src="../Images/location 1.png"
                  className="content-center footer-socials-img"
                  alt=""
                />
                <p className="ml-2">Betchay, Baabda, Lebanon</p>
              </td>
            </tr>
            <tr>
              <td className="Footer-Socials flex items-center">
                <img
                  src="../Images/mail 1.png"
                  className="content-center footer-socials-img"
                  alt=""
                />
                <p className="ml-2">collect.leb@gmail.com</p>
              </td>
            </tr>
            <tr>
              <td className="Footer-Socials flex items-center">
                <img
                  src="../Images/insta 1.png"
                  className="content-center footer-socials-img"
                  alt=""
                />
                <p className="ml-2">@collect.leb</p>
              </td>
            </tr>
            <tr>
              <td className="Footer-Socials flex items-center">
                <img
                  src="../Images/facebook 1.png"
                  className="content-center footer-socials-img"
                  alt=""
                />
                <p className="ml-2">@collect.leb</p>
              </td>
            </tr>
          </table>
        </div>
        <div className="w-1/2 ml-32 mt-32 contactus-img-cont">
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
