import React from 'react'
import pic from '../assets/gallery/1.png'

function Gallery() {
    return (
        <div className="bg-primary pt-40 pb-28 sm:pt-32">
            <div className="flex flex-col items-center px-5">
                <div className="text-5xl md:text-2xl mb-16">Галерея</div>
                <div className="gallery-grid grid grid-cols-3 gap-20 md:grid-cols-2">
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                    <div>
                        <img className="w-300" src={pic} alt="" />
                        <div className="text-xl mt-4">Пилинг лица</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery
