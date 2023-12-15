import "../css/AboutUsHeader.css";
function AboutUsHeader() {
  return (
    <div className="aboutusHeader-cont pt-12">
       <p href="" className="text-4xl italic  mb-24 font-medium ml-40 pl-4 aboutusHeader-title">
          About Collect
        </p>
    <div className="max-w-screen flex mx-40 gap-40 p-4 aboutusHeader-mini">
      <div className="w-1/2 aboutusHeader-title-cont">
        <p className="text-2xl aboutusHeader-description">
          Small description about Collect concept and team. Small description
          about Collect concept and team. Small description about Collect
          concept and team. Small description about Collect concept and team.{" "}
        </p>
      </div>
      <div className="w-1/2 ml-32 mt-32 aboutusHeader-img-cont">
        <img
          src="../Images/boat.png"
          alt="Hero Image"
          className="aboutusHeader-img"
        />
      </div>
    </div>
    </div>
  );
}

export default AboutUsHeader;
