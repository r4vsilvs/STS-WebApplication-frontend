import { useState } from "react"

export default function ImageSliderPage(props) {

    const images = props.images
    const [currentIndex, setCurrentIndex] = useState(0)


    return (
        <div className="w-full md:w-[500px] flex flex-col">
            <img src={images[currentIndex]} className="w-full h-[350px] sm:h-[400px] md:h-[500px] object-contain md:object-cover rounded-3xl transition-all duration-300" />
            <div className="w-full h-[100px] mt-4 flex justify-center items-center overflow-x-auto">
                {
                    images?.map(
                        (image, index) => {
                            return (
                                <img key={index} className={"w-[90px] h-[90px] m-2 rounded-2xl object-cover cursor-pointer hover:border-4 hover:border-gray-400 " + (index == currentIndex && "border-gray-600 border-4")} src={image} onClick={
                                    () => {
                                        setCurrentIndex(index)
                                    }
                                } />
                            )
                        }
                    )
                }
            </div>


        </div>
    )



}