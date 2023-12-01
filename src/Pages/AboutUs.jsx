import AboutUsDescription from "../AboutUsComponents/AboutUsDescription";
import AboutUsHeader from "../AboutUsComponents/AboutUsHeader";
import Footer from '../FrequentlyUsed/Footer';
import NavBar from '../FrequentlyUsed/NavBar';
import "../css/AboutUs.css"

function AboutUs() {
  return (
    <>
    <NavBar/>
    <div className="AboutUs-cont mb-20 ">
    <AboutUsHeader />
    <AboutUsDescription />
    </div>
    <Footer/>
    </>
  );
}

export default AboutUs;
