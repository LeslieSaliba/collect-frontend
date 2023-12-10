import "../css/categoryitem.css";

function CategoryItem({CategoryName, CategoryImage}) {
  return (
    <div className="CategoryItem-cont">
      <div className="categoryItem-img-container">
        <img src={CategoryImage} alt="" className="categoryItem-img" />
      </div>

      <h3 className="text-center text-2xl">{CategoryName}</h3>
    </div>
  );
}

export default CategoryItem;
