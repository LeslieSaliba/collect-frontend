import NavBar from "../FrequentlyUsed/NavBar";
import ScrollToTopButton from "../FrequentlyUsed/ScrollToTopButton";
import HomeHeroSection from "../HomeComponents/HomeHeroSection";
import HomeCategories from "../HomeComponents/HomeCategories";
import HomeArrival from "../HomeComponents/HomeArrival";
import HomeBanner from "../HomeComponents/HomeBanner";
import HomeProducts from "../HomeComponents/HomeProducts";
import Footer from "../FrequentlyUsed/Footer";

function HomePage() {
  return (
    <div >
      <NavBar />
      <HomeHeroSection />
      <HomeCategories />
      <HomeArrival />
      <HomeBanner />
      <HomeProducts />
      <ScrollToTopButton />
      <Footer />
       
    
    </div>
  );
}

export default HomePage;
