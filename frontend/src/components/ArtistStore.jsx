// Demo merch products
const demoMerchProducts = [
  {
    type: "Digital Album",
    title: "Neon Dreams - Digital Album",
    price: "$12.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Vinyl Record",
    title: "Synthwave Nights Vinyl",
    price: "$29.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Apparel",
    title: "Luna Starlight T-Shirt",
    price: "$24.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Apparel",
    title: "Retro Wave Hoodie",
    price: "$49.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Limited Edition",
    title: "Cosmic Journey - Limited Edition",
    price: "$19.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Posters & Art",
    title: "Synthwave Poster Set",
    price: "$15.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Digital Album",
    title: "Midnight Frequencies EP",
    price: "$8.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Accessories",
    title: "Neon Keychain",
    price: "$9.99",
    img: "https://placehold.co/265x265",
  },
];

function ArtistStoreNav({
  storeName = "Luna Starlight Store",
  cartLabel = "Cart",
  tabs = ["All Products", "Music", "Merchandise"],
}) {
  return (
    <nav className="w-full bg-[#21212b] outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 flex flex-col pb-[0.04rem]">
      <div className="flex justify-between items-center w-full py-[1rem] px-[6%]">
        <span className="text-white text-[1.2rem] md:text[1.5rem] lg:text-[2rem] xl:text-[2rem] font-bold font-['Roboto'] ">
          {storeName}
        </span>
        <div className="px-[0.7rem] py-[0.5rem] bg-[#1d1e26] rounded-xs outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 flex items-center">
          <span className="text-[#fffced] text-[0.7rem] lg:text-[1rem] xl:text-[2rem] font-medium font-['Roboto']">
            {cartLabel}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 px-[6%] pb-[0.7rem]">
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            className={`px-[0.7rem] py-[0.35rem] rounded-xs flex flex-col items-center ${
              tab === "All Products"
                ? "bg-[#aa2a46] text-white"
                : "bg-[#1d1e26] text-[#fffced] outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20"
            }`}
          >
            <span className="text-[0.6rem] sm:text-[1rem] lg:text-[2rem] xl:text-[2rem] font-normal font-['Roboto'] leading-[0.85rem]">
              {tab}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}

function ArtistStoreHeader({
  title = "Official Music & Merchandise",
  description = "Support Luna Starlight directly by purchasing official music releases and exclusive merchandise. All proceeds help fund future creative projects.",
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 px-[5%] pt-[0.5rem] pb-[0.2rem]">
      <div className="w-full text-center text-white text-[1.35rem] lg:text-[1.5rem] xl:text-[2rem] font-bold font-['Roboto'] leading-[1.7rem]">
        {title}
      </div>
      <div className="w-full text-center text-white/60 text-[1rem lg:text-[1.5rem] xl:text-[2rem] font-[900] font-['Roboto'] leading-[1.5]">
        {description}
      </div>
    </div>
  );
}

function ArtistMerchCard({
  type,
  title,
  price,
  img,
  buttonLabel = "Add to Cart",
}) {
  return (
    <div
      className="flex flex-col w-full max-w-[17rem] h-[23rem] bg-[#21212b] rounded-md outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 overflow-hidden flex-grow"
      style={{ minWidth: "220px", minHeight: "320px" }}
    >
      <div className="flex-shrink-0 w-full h-[65%] flex items-center justify-center relative">
        <img
          className="w-[95%] h-[95%] object-cover rounded-t-md"
          src={img}
          alt={title}
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full h-[35%] px-[6%] pt-[5%] pb-[6%]">
        <div className="text-[#aa2a46] text-[0.5rem] font-medium font-['Roboto'] uppercase leading-3 tracking-tight">
          {type}
        </div>
        <div className="text-white text-[1rem] xl:text-[1.2rem] font-medium font-['Roboto'] leading-none">
          {title}
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="text-white text-sm xl:text-[1.2rem]  font-bold font-['Roboto'] leading-tight">
            {price}
          </div>
          <button className="px-[0.7rem] py-[0.35rem] bg-[#aa2a46] rounded-xs flex flex-col justify-center items-center">
            <span className="text-center text-white text-[0.8rem] xl:text-[1.2rem] font-medium font-['Roboto'] leading-[0.9rem]">
              {buttonLabel}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}


const ArtistStore = () => {
     // Helper function to determine grid columns for lg/xl
            const getMerchCardGridClass = () => {
              if (demoMerchProducts.length <= 1) {
                return "MerchCardDiv w-full flex flex-wrap justify-center ";
              }
              return "MerchCardDiv w-full flex flex-wrap justify-center items-stretch gap-8 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 ";
            }
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start gap-8">
      <div className="w-full bg-[#1a1b22] flex flex-col items-center">
        <ArtistStoreNav />
        <div className="w-full max-w-6xl px-[6%] py-[2.5rem] flex flex-col items-center gap-10">
          <ArtistStoreHeader />
          <div className={`${getMerchCardGridClass()}`}>
            {demoMerchProducts.map((item, idx) => (
              <ArtistMerchCard key={idx} {...item} />
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistStore;
