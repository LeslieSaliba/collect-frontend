import "../css/ContactUsDescription.css";

function ContactUsDescription() {
  return (
    <div className="  mx-40 ">
      <p className="text-3xl text-center  underline HomeArrival-title">
        GET IN TOUCH
      </p>
      <div className="text-center ">
        <form className="py-4">
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              placeholder="Name"
              className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
            />
            <span className="mx-4"></span>
            <input
              type="email"
              placeholder="E-mail"
              className=" md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
            />
          </div>
          <textarea
            className="w-full px-4 py-2 h-32 bg-gray-100 focus:outline-none  text-lg text-black"
            placeholder="Your message..."
          ></textarea>
          <button className="bg-white text-red-700 font-bold py-2 px-6 border border-red-700 text-lg inline-block mt-5 flex ml-auto justify-center">
            <p>SEND</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsDescription;
