function Thankyou ({closeModal}) {
    return (
        <div className="  flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl m-12 w-2/3 mx-auto">
               Thank you for your order!
                You have received a confirmation email.

            <div><a href="https://www.instagram.com/collect.leb?igshid=OGQ5ZDc2ODk2ZA==" target='_blank' className='underline'>Follow us </a> to get all the latest news about Collect!</div>
            </p>
            <div className="flex justify-end bg-gray-100 p-6 items-center">
              <button 
              onClick={closeModal}
              className="bg-red-700 text-white  font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block " >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    export default Thankyou;