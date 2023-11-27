import "../css/HomeArrival.css"
import ArrivalItem from './ArrivalItem';

function HomeArrival() {
  return (
    <div className='max-w-screen-xl mx-auto p-4 HomeArrival-cont'>
       
       
      
        <p class="text-3xl text-center  underline HomeArrival-title">LATEST ARRIVALS</p>
        <div className="homeCategeries-link-container mb-5 italic">
        <a href=""className="text-3xl homeCategeries-link">See all arrivals <span className="ml-2 text-3xl">&#8594;</span></a>
        </div>
            <div className="flex flex-wrap items-center justify-between "> 
        <ArrivalItem />
        <ArrivalItem />
        <ArrivalItem />
        <ArrivalItem />
        </div>
        
    </div>
  );
}

export default HomeArrival;
