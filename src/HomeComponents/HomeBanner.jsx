import "../css/homebanner.css"

function HomeBanner() {
  return (
    <div className="HomeBanner-container flex items-center justify-center">
        <div className="HomeBanner-container-mini flex items-center justify-between my-16">
    <div className="HomeBanner-title-btn ml-20">
        <h1 className="text-4xl mb-4 w-96 italic">Check out our selection of Christmas gifts under 50$</h1>
        <button className="bg-white text-red-700 font-bold py-2 px-10 border border-red-700  text-lg inline-block mt-5">
            DISCOVER
        </button>
    </div>
    <div>
        <img src="../Images/merge.png" alt="" className="HomeBanner-img" />
    </div>
    </div>
</div>
  );
}

export default HomeBanner;
