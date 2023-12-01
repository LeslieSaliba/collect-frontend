
import ContactUsDescription from "../ContactUsComponents/ContactUsDescription";
import ContactUsHeader from "../ContactUsComponents/ContactUsHeader";
import Footer from '../FrequentlyUsed/Footer';
import NavBar from '../FrequentlyUsed/NavBar';
import "../css/AboutUs.css"

function ContactUs() {
  return (
    <>
    <NavBar/>
    <div className=" AboutUs-cont mb-20">
    <ContactUsHeader />
    <ContactUsDescription />
    </div>
    <Footer/>
    </>
  );
}

export default ContactUs;
