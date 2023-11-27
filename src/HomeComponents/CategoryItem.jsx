import "../css/categoryitem.css";

function CategoryItem() {
  return (
    <div className="CategoryItem-cont">
      <div className="categoryItem-img-container">
        <img src="../Images/vases.png" alt="" className="categoryItem-img" />
      </div>

      <h3 className="text-center text-2xl">Vases</h3>
    </div>
  );
}

export default CategoryItem;
