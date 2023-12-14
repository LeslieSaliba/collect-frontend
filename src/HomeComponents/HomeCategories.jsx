import { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/homecategories.css"
import CategoryItem from './CategoryItem';
import {Link} from 'react-router-dom';


function HomeCategories() {

  const [highlightedCategories, setHighlightedCategories] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
    .then(response => {
      const sortedCategories = response.data.data
        .filter(category => category.highlighted)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const last4Categories = sortedCategories.slice(0, 4);

      setHighlightedCategories(last4Categories);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}, []); 


  return (
    <div className='HomeCategories-cont'>
        <div className="max-w-screen-xl mx-auto p-4 homeCategories-mini">
        <div className="homeCategeries-link-container italic">
        <Link to='/shop'><a href=""className="text-3xl homeCategeries-link">See all categories <span className="ml-2 text-3xl">&#8594;</span></a> </Link>
        </div>
            <div className="flex flex-wrap items-center justify-between HomeCategories-items-cont"> 
         {highlightedCategories.map(category => (
            <CategoryItem
              key={category._id}
              CategoryName={category.name}
              CategoryImage={category.image}
            />
          ))}
        </div>
        </div>
    </div>
  );
}

export default HomeCategories;
