import "../css/homecategories.css"
import CategoryItem from './CategoryItem';

function HomeCategories() {
  return (
    <div className='HomeCategories-cont'>
       
        <div className="max-w-screen-xl mx-auto p-4 homeCategories-mini">
        <div className="homeCategeries-link-container italic">
           <a href=""className="text-3xl homeCategeries-link">See all categories <span className="ml-2 text-3xl">&#8594;</span></a>
        </div>
            <div className="flex flex-wrap items-center justify-between "> 
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        </div>
        </div>
    </div>
  );
}

export default HomeCategories;
