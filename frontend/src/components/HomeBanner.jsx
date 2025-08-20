import React, { useState, useEffect } from "react";
import heroPic1 from "/workspaces/Soul-Felt-Music-site/frontend/src/assets/hero_section_pics/heroPic1.png";
import heroWelcomePic from "/workspaces/Soul-Felt-Music-site/frontend/src/assets/hero_section_pics/heroWelcomePic.svg";





const DemoBannerMobile = () => {
  return (
    <div data-layer="Frame 32" className="Frame32  w-[425px] h-auto aspect-[425/630] minMobile:aspect-[320/475]  relative bg-[#101516]">
      <div data-layer="WelcomeSvg" className="Welcomesvg z-10 w-full h-48 left-0 top-[0%] minMobile:ml-[11%]  absolute">
          <img data-layer="envato-labs-image-edit 4" className="EnvatoLabsImageEdit4 w-full  pl-[15%] left-0 top-0 minMobile:pt-[10%]  minMobile:pl-[0%] absolute" src={heroWelcomePic} />
      </div>
    <div data-layer="Frame 30" className="Frame30 w-full aspect-{423.68/423.68} left-0 top-[166.82px] absolute">
        <img data-layer="envato-labs-ai-3b01044f-1de4-4452-9c34-535e87650b3f 2" className="EnvatoLabsAi3b01044f1de444529c34535e87650b3f2  left-0 top-0 absolute" src={heroPic1} />
        <div data-layer="ButtonGroup" className="Buttongroup w-full left-0 top-0 absolute flex flex-col items-center pt-[11%]">
          <div data-layer="Title" className="Title mt-8 mb-6 text-center text-[#fffced] text-[6vw] sm:text-[5vw] font-bold font-['Roboto'] leading-tight">Experience the Soul of Music</div>
          <div data-layer="ButtonFrames" className="Buttonframes w-full flex justify-center items-center gap-4 mt-4">
            <div data-layer="Frame 29" className="Frame29 w-full flex justify-center items-center gap-4 pt-[15%] text-nowrap">
              <button data-layer="Frame" className="Frame flex-1 min-w-[120px] max-w-[70vw] px-6 py-3 bg-[#aa2a46] rounded-md shadow-md flex justify-center items-center">
                <span data-layer="Button Text" className="ButtonText text-center text-[#fffced] text-lg sm:text-xl font-medium font-['Roboto'] leading-7">Explore Music</span>
              </button>
              <button data-layer="Frame" className="Frame flex-1 min-w-[100px] max-w-[60vw] px-6 py-3 bg-[#fffced]/10 rounded-md shadow-md outline outline-1 outline-[#fffced]/20 flex justify-center items-center">
                <span data-layer="Button Text" className="ButtonText text-center text-[#fffced] text-lg sm:text-xl font-medium font-['Roboto'] leading-7">Join Now</span>
              </button>
            </div>
          </div>
        </div>
    </div>

    <div className="MainPageIndicatorContainer flex absolute w-full bottom-[10%] minMobile:bottom-[6%] justify-center">
    <div data-layer="pageIndicator" className=" flex absolute w-[80.10px] h-[15.89px]   ">
          <div data-layer="Rectangle" className="Rectangle size-[15.89px] left-[0.66px] top-0 absolute bg-[#fffced]/30 rounded-full" />
          <div data-layer="Rectangle" className="Rectangle size-[15.89px] left-[32.44px] top-0 absolute bg-[#fffced]/30 rounded-full" />
          <div data-layer="Rectangle" className="Rectangle size-[15.89px] left-[64.21px] top-0 absolute bg-[#aa2a46] rounded-full" />
      </div>
    </div>
      
</div>
  )
}


const DemoBannerTablet = () => {
  return (
    <div className="relative w-full max-w-[900px] aspect-[900/700] mx-auto bg-[#101516] flex flex-col items-center justify-center overflow-hidden rounded-[2vw]">
      {/* White background frame */}
      <div className="absolute inset-0 w-full h-full bg-white rounded-[2vw] z-0" />
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-full bg-[#101516] rounded-[2vw] z-0" />
      {/* Welcome SVG */}
      <div className="absolute  left-[5%] top-0 w-[40vw] max-w-[443px] h-[60%] z-10 pointer-events-none">
        <img
          className="w-full h-full object-contain"
          src={heroWelcomePic}
          alt="Welcome"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-none top-[22%] w-[59%] max-w-[530px] h-[63%] max-h-[442px] z-0">
        <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        />
      </div>
      {/* Main Content */}
      <div className="absolute w-full h-full flex flex-col justify-center items-center z-30 pt-[12%] pb-[4%] px-[8%]">
        <div className=" absolute  text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2rem,5vw,3.5rem)] mb-[12%]">
          Experience the Soul of Music
        </div>
        <div className="  w-full flex flex-row justify-center items-center gap-[3vw] mt-[3%]">
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1rem,2vw,1.5rem)] font-medium font-['Roboto'] transition-all">
            Explore Music
          </button>
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#fffced]/10 rounded-[0.7vw] shadow-md outline outline-1 outline-[#fffced]/20 text-[#fffced] text-[clamp(1rem,2vw,1.5rem)] font-medium font-['Roboto'] transition-all">
            Join Now
          </button>
        </div>
        <div className=" absolute mt-[50%] w-full flex flex-row justify-center items-center gap-[1vw]">
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#aa2a46] rounded-full" />
        </div>
      </div>
    </div>
  );
};
const DemoBannerLaptop = () => {
  return (
    <div className="relative w-full max-w-[1440px] aspect-[1440/700] mx-auto bg-[#101516] flex flex-col items-center justify-center overflow-hidden rounded-[1.4vw]">
      {/* White background frame */}
      <div className="absolute inset-0 w-full h-full bg-white rounded-[1.4vw] z-0" />
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-full bg-[#101516] rounded-[1.4vw] z-0" />
      {/* Welcome SVG */}
      <div className="absolute left-0 top-0 w-[30vw] max-w-[606px] h-[60%] z-10 pointer-events-none">
        <img
          className="w-full h-full object-contain"
          src={heroWelcomePic}
          alt="Welcome"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-[33%] top-[18%] w-[36.8%] max-w-[530px] h-[63.5%] max-h-[442px] z-20">
        <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        />
      </div>
      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col justify-center items-center z-30 pt-[10%] pb-[3%] px-[12%]">
        <div className="text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,6vw,5rem)] mb-[4vw]">
          Experience the Soul of Music
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-[2vw] mb-[5%]">
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1.2rem,2vw,2rem)] font-medium font-['Roboto'] transition-all">
            Explore Music
          </button>
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#fffced]/10 rounded-[0.7vw] shadow-md outline outline-1 outline-[#fffced]/20 text-[#fffced] text-[clamp(1.2rem,2vw,2rem)] font-medium font-['Roboto'] transition-all">
            Join Now
          </button>
        </div>
        <div className="absolute bottom-[13%] w-full flex flex-row justify-center items-center gap-[1vw]">
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[16px] min-h-[16px] bg-[#aa2a46] rounded-full" />
        </div>
      </div>
    </div>
  );
};

const DemoBannerDesktop = () => {
  return (
    <div
      data-layer="Hero section desktop"
      className="HeroSectionDesktop w-full  aspect-[1920/928]  rounded-none flex flex-col justify-center items-center overflow-hidden relative bg-[#101516] mx-auto"
    >
      {/* White background frame */}
      <div className="absolute inset-0 w-full h-full bg-white rounded-[1.4vw] z-0" />
      {/* Inner dark frame */}
      <div className="absolute inset-0 w-full h-full bg-[#101516] rounded-[1.4vw] z-0" />
      {/* Welcome SVG */}
      <div className="absolute left-[-6.3vw] top-[-13%] w-[50vw] max-w-[808px] h-[87%] z-10 pointer-events-none">
        <img
          className="w-full h-full object-none"
          src={heroWelcomePic}
          alt="Welcome"
        />
      </div>
      {/* Hero Image */}
      <div className="absolute left-none top-[20%] w-[36.8%] max-w-[706px] h-[63.5%] max-h-[589px] z-20">
        <img
          className="w-full h-full object-cover rounded-[1vw] shadow-lg border border-black"
          src={heroPic1}
          alt="Hero"
        />
      </div>
      {/* Main Content */}
      <div className="relative w-full text-nowrap h-full flex flex-col justify-center items-center z-30 pt-[8%] pb-[3%] px-[12%]">
        <div className="text-center text-[#fffced] font-bold font-['Roboto'] leading-[1.1] text-[clamp(2.5rem,7vw,6.6rem)] mb-[3vw]">
          Experience the Soul of Music
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-[2vw] mb-[2vw]">
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#aa2a46] rounded-[0.7vw] shadow-md text-[#fffced] text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all">
            Explore Music
          </button>
          <button className="flex-0 px-[2vw] py-[1vw] bg-[#fffced]/10 rounded-[0.7vw] shadow-md outline outline-1 outline-[#fffced]/20 text-[#fffced] text-[clamp(1.2rem,2vw,2.2rem)] font-medium font-['Roboto'] transition-all">
            Join Now
          </button>
        </div>
        <div className="w-full flex pt-[30%] flex-row absolute justify-center items-center gap-[1vw]">
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#fffced]/30 rounded-full" />
          <div className="w-[1.5vw] h-[1.5vw] min-w-[24px] min-h-[24px] bg-[#aa2a46] rounded-full" />
        </div>
      </div>
    </div>
  );
};

const HomeBanner = () => {
  

  return (
    <>
    {/* Mobile only */}
  <div className="block sm:flex md:hidden lg:hidden xl:hidden ">
    <DemoBannerMobile />
  </div>
  {/* Tablet only */}
  <div className="hidden md:block lg:hidden xl:hidden sm:hidden">

    <DemoBannerTablet />
  </div>
  {/* Desktop only */}
  <div className="hidden sm:hidden md:hidden lg:block xl:hidden ">
    <DemoBannerLaptop />
  </div>
  <div className="hidden  sm:hidden md:hidden lg:hidden xl:flex">
    <DemoBannerDesktop />
  </div>
    </>
  );
};

export default HomeBanner;