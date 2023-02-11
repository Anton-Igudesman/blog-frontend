import React from 'react';
import "../../App.css"

export default function HomePage () {
    return (
        <div className="main-container">
         <div className="pb-10 bg-gray-800 main-container">
           <div className="relative container px-4 mx-auto">
             <div className="welcome-container flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
               <div className="post-header w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <span className="text-lg font-bold text-blue-400">
                  Create Posts to Stimulate the Mind
                </span>
                <h2 className="max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white font-bold font-heading">
                  Express Your Ideas{" "}
                  <span className="text-yellow-500">And Instantly Share With the World!</span>
                </h2>
                <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100">
                  Posts are published in a collaborative and free-thinking environment
                </p>
              </div>
              <div className="w-full lg:w-1/2 px-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}