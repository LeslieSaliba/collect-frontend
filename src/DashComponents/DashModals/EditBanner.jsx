import { useState } from 'react';
import axios from 'axios';

function EditBanner({ }) {
    const [error, setError] = useState('');

    const handleSubmit = () => { }

    return (
        <div>
            <p className="text-red-700 text-3xl text-center underline my-5">EDIT BANNER</p>
            <div className="text-center">
                <form className="py-4" onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Text"
                            // value={}
                            // onChange={}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black w-full"
                        />
                    </div>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Button text"
                            // value={}
                            // onChange={}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black uppercase w-full"
                        />
                    </div>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Link"
                            // value={}
                            // onChange={}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                        />
                    </div>

                    {/* {error && <p className="text-red-700 text-sm">{error}</p>} */}
                    <div className="flex justify-end">
                        <button
                            className="text-red-700 border border-red-700 px-4 py-2 hover:bg-red-100">
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBanner;
