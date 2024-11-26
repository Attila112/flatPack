import React from 'react';
import image1 from "../../images/aboutUs1.jpg"
import image2 from "../../images/aboutUs2.jpg"

function AboutUs(props) {
    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                    <div
                        className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                        <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                            <img className=" rounded-xl object-cover"
                                 src={image1} alt="about Us image"/>
                        </div>
                        <img className="sm:ml-0 ml-auto rounded-xl object-cover"
                             src={image2}
                             alt="about Us image"/>
                    </div>
                    <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                        <div className="w-full flex-col justify-center items-start gap-8 flex">
                            <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                <h2
                                    className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                    Empowering Each Other to Succeed</h2>
                                <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                    A real estate search platform provides users with a convenient way to find and
                                    explore property listings tailored to their needs. It streamlines the search process
                                    by offering detailed information, filtering options, and image galleries, helping
                                    users make informed decisions. Such a platform is essential for connecting potential
                                    buyers or renters with property managers or owners, making the property search
                                    experience efficient and accessible.</p>
                            </div>
                            <div
                                className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">3+</h3>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Years of
                                        Experience</h6>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">125+</h4>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Successful
                                        Purchase</h6>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">52+</h4>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy
                                        Clients</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;