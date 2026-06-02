import mediaUpload from '../utils/mediaUpload';
import { useState } from 'react';



export function TestPage() {

    const [image, setImage] = useState(null);


    function fileUpload() {
        mediaUpload(image).then(
            (res) => {
                alert("Upload Success: " + res)
            }
        ).catch(
            (res) => {
                alert("Upload Failed: " + res)
            }
        )



    }
    return (

        <div className='w-full h-screen flex justify-center items-center'>
            <input
                onChange={(e) => {

                    setImage(e.target.files[0])

                }}
                type="file" className="w-64 h-12 border border-gray-300 rounded-lg px-3" />
            <button onClick={fileUpload} className="ml-4 w-32 h-12 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">Upload</button>
        </div>
    )
}