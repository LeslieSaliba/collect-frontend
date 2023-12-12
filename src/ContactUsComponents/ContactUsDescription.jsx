import "../css/ContactUsDescription.css";
import { useForm } from "@formspree/react";
import { useState } from "react";
function ContactUsDescription() {
  const [state, handleSubmit] = useForm("xknldeaq");
   const [showThanksMessage, setShowThanksMessage] = useState(false);
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     message: "",
   });
   const handleInputChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value,
     });
   };
  const handleFormSubmit = (e) => {
    console.log("hi");
    e.preventDefault();
    handleSubmit(e);
    setFormData({ name: "", email: "", message: "" });
   
    setShowThanksMessage(true);
    
    setTimeout(() => {
      setShowThanksMessage(false);
    }, 5000); 
  }
  return (
    <div className="  mx-40 ">
      <p className="text-3xl text-center  underline HomeArrival-title">
        GET IN TOUCH
      </p>
      <div className="text-center ">
        <form className="py-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
            />
            <span className="mx-4"></span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              className=" md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
            />
          </div>
          <textarea
            className="w-full px-4 py-2 h-32 bg-gray-100 focus:outline-none  text-lg text-black"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleInputChange}
            name="message"
          ></textarea>
          <button
            className="bg-white text-red-700 font-bold py-2 px-6 border border-red-700 text-lg inline-block mt-5 flex ml-auto justify-center"
            disabled={state.submitting}
            type="submit"
          >
            SEND
          </button>
        </form>
        {state.succeeded &&  showThanksMessage && (
          <p className="text-red-700">
            Thank you for contacting us! <br />
            We will get back to you shortly.
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactUsDescription;
