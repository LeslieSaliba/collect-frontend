import { useState } from 'react';
import "../css/sidebarAdmin.css";


function SidebarAdmin() {
  const [selectedSection, setSelectedSection] = useState('Orders');
  const [hoveredSection, setHoveredSection] = useState(null);

  const sectionData = [
    {
      name: 'Orders',
      imageSrc: '../Images/dashboardIcons/cart.png',
      imageSrcHover: '../Images/dashboardIcons/cart-red.png',
    },
    {
      name: 'Categories',
      imageSrc: '../Images/dashboardIcons/categories.png',
      imageSrcHover: '../Images/dashboardIcons/categories-red.png',
    },
    {
      name: 'Products',
      imageSrc: '../Images/dashboardIcons/products.png',
      imageSrcHover: '../Images/dashboardIcons/products-red.png',
    },
    {
      name: 'Banner',
      imageSrc: '../Images/dashboardIcons/banner.png',
      imageSrcHover: '../Images/dashboardIcons/banner-red.png',
    },
    {
      name: 'Customers',
      imageSrc: '../Images/dashboardIcons/users.png',
      imageSrcHover: '../Images/dashboardIcons/users-red.png',
    },
    {
      name: 'Team',
      imageSrc: '../Images/dashboardIcons/team.png',
      imageSrcHover: '../Images/dashboardIcons/team-red.png',
    },
    {
      name: 'Analytics',
      imageSrc: '../Images/dashboardIcons/analytics.png',
      imageSrcHover: '../Images/dashboardIcons/analytics-red.png',
    },
  ];

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setHoveredSection(section);
  };

  return (
    <div className="sidebar bg-gray-100 h-screen fixed left-0 top-0 w-36">
      <img src="../Images/logo.png" alt="Collect logo" className='p-6' />

      <ul className="list-none p-0">
        {sectionData.map((section, index) => (
          <li
            key={index}
            onClick={() => handleSectionClick(section.name)}
            onMouseEnter={() => setHoveredSection(section.name)}
            onMouseLeave={() => setHoveredSection(null)}
            className={`flex items-center cursor-pointer p-4 transition-colors ${
              (hoveredSection === section.name || selectedSection === section.name) ? 'text-red-700 bg-gray-200' : ''
            }`}
            style={{ transitionDuration: '0s' }}
          >
            <img
              src={
                (hoveredSection === section.name || selectedSection === section.name)
                  ? section.imageSrcHover
                  : section.imageSrc
              }
              alt={`${section.name} icon`}
              className="w-6 h-6 mr-3 transition-all duration-300"
            />
            <span className="transition-all">
              {section.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarAdmin;