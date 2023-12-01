import "../css/AboutUsHeader.css";
function AboutUsHeader() {
  return (
    <div className="aboutusHeader-cont pt-12">
    <div className="max-w-screen flex mx-40 gap-40 p-4 ">
      <div className="w-1/2">
        <p href="" className="text-4xl italic  mb-24 font-medium">
          About Collect
        </p>
        <p className="text-2xl">
          Small description about Collect concept and team. Small description
          about Collect concept and team. Small description about Collect
          concept and team. Small description about Collect concept and team.{" "}
        </p>
      </div>

      <div className="w-1/2 ml-32 mt-32 ">
        <img
          src="../Images/boat.png"
          alt="Hero Image"
          className=""
        />
      </div>
    </div>
    </div>
  );
}

export default AboutUsHeader;
