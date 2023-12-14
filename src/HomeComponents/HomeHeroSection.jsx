import "../css/homeherosection.css"
import {Link} from 'react-router-dom';

function HomeHeroSection() {
  return (
<div className="flex items-center justify-between bg-gray-100 HomeHeroSection-container gap-32">
  <div className="flex flex-col ml-32 homeherosection-title-cont">
    <h1 className="text-4xl mb-4 w-96 homeherosection-title"><span className="italic">Handpicked</span> fine items from around the world</h1>
    <p className="text-lg italic homeherosection-subtitle">Collectibles store </p>
   
    <Link to='/Shop'><button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block mt-5">
      SHOP NOW
    </button></Link>
  </div>
 
  <div className="homeherosection-img">
    <img
      src="../Images/carpets.png"  
      alt="Hero Image"
      className="object-cover"
    />
  </div>
</div>
  );
}

export default HomeHeroSection;