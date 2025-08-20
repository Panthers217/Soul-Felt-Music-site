import react from 'react';

export const ArtistGallery = () => {
  return (
    <div
      data-layer="Artist Gallery"
      className="ArtistGallery w-full max-w-[100rem] mx-auto rounded-[50px] flex flex-col items-center py-6"
    >
      <div
        data-layer="Frame 19"
        className="Frame19 w-full bg-black px-5 flex flex-col items-center"
      >
        <div className="w-full grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <div className="Rectangle419 bg-[#d9d9d9] aspect-[3/2] rounded-lg" />
          <div className="Rectangle420 bg-[#d9d9d9] aspect-[3/2] rounded-lg" />
          <div className="Rectangle421 bg-[#d9d9d9] aspect-[3/2] rounded-lg" />
          <div className="Rectangle422 bg-[#d9d9d9] aspect-[3/2] rounded-lg" />
          <div className="Rectangle423 bg-[#d9d9d9] aspect-[3/2] rounded-lg" />
          <div className="Rectangle424 bg-[#d9d9d9] aspect-[3/2] rounded-lg" />
          <div className="Rectangle425 bg-[#d9d9d9] aspect-[3/2] rounded-lg" />
          <div className="Rectangle426 bg-[#d9d9d9] aspect-[3/2] rounded-lg" />
        </div>
      </div>
    </div>
  );
};