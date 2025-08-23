// Demo merch products
import React, { useState } from "react";
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

function ArtistStoreNav({ storeName, cartCount, tabs, activeTab, setActiveTab }) {
  return (
    <nav className="w-full bg-[#21212b] outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 flex flex-col pb-[0.04rem]">
      <div className="flex justify-between items-center w-full py-[1rem] px-[6%]">
        <span className="text-white text-[1.2rem] md:text[1.5rem] lg:text-[2rem] xl:text-[2rem] font-bold font-['Roboto'] ">{storeName}</span>
        <div className="px-[0.7rem] py-[0.5rem] bg-[#1d1e26] rounded-xs outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 flex items-center">
          <span className="text-[#fffced] text-[0.7rem] lg:text-[1rem] xl:text-[2rem] font-medium font-['Roboto']">Cart ({cartCount})</span>
        </div>
      </div>
      <div className="flex sm:flex-col justify-center items-center gap-3 px-[6%] pb-[0.7rem]">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-bold text-base transition-all duration-200 shadow-sm border-2 border-[#aa2a46] focus:outline-none
              ${activeTab === tab
                ? 'bg-gradient-to-r from-[#aa2a46] to-[#ff6b81] text-white scale-105 shadow-lg'
                : 'bg-[#1d1e26] text-[#fffced] hover:bg-[#aa2a46] hover:text-white'}
            `}
            style={{ minWidth: '120px' }}
          >
            <span className="text-[0.9rem] sm:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] font-normal font-['Roboto'] leading-tight tracking-wide">
              {tab}
            </span>
          </button>
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
      <div className="w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-[#aa2a46] via-[#ff6b81] to-[#fffced] text-[1.7rem] lg:text-[2.2rem] xl:text-[2.7rem] font-extrabold font-['Roboto'] leading-[2.2rem] drop-shadow-lg">
        {title}
      </div>
      <div className="w-full text-center text-[#fffced] text-opacity-80 text-[1.1rem] lg:text-[1.3rem] xl:text-[1.5rem] font-semibold font-['Roboto'] leading-[1.7] px-2 py-2 rounded-lg bg-[#21212b]/60 shadow-md">
        {description}
      </div>
    </div>
  );
}

function ArtistMerchCard({ type, title, price, img, buttonLabel = "Add to Cart", onAddToCart }) {
  return (
    <div className="flex flex-col w-full max-w-[17rem] h-[23rem] bg-[#21212b] rounded-md outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 overflow-hidden flex-grow" style={{ minWidth: "220px", minHeight: "320px" }}>
      <div className="flex-shrink-0 w-full h-[65%] flex items-center justify-center relative">
        <img className="w-[95%] h-[95%] object-cover rounded-t-md" src={img} alt={title} />
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full h-[35%] px-[6%] pt-[5%] pb-[6%]">
        <div className="text-[#aa2a46] text-[0.5rem] font-medium font-['Roboto'] uppercase leading-3 tracking-tight">{type}</div>
        <div className="text-white text-[1rem] xl:text-[1.2rem] font-medium font-['Roboto'] leading-none">{title}</div>
        <div className="flex justify-between items-center w-full">
          <div className="text-white text-sm xl:text-[1.2rem]  font-bold font-['Roboto'] leading-tight">{price}</div>
          <button className="px-[0.7rem] py-[0.35rem] bg-[#aa2a46] rounded-xs flex flex-col justify-center items-center" onClick={onAddToCart}>
            <span className="text-center text-white text-[0.8rem] xl:text-[1.2rem] font-medium font-['Roboto'] leading-[0.9rem]">{buttonLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}


const ArtistStore = () => {
  const tabs = ["All Products", "Music", "Merchandise"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [cart, setCart] = useState([]);

  // Filter products by tab
  const filteredProducts = demoMerchProducts.filter(product => {
    if (activeTab === "All Products") return true;
    if (activeTab === "Music") return product.type === "Digital Album" || product.type === "Vinyl Record" || product.type === "Limited Edition";
    if (activeTab === "Merchandise") return product.type === "Apparel" || product.type === "Accessories" || product.type === "Posters & Art";
    return true;
  });

  // Add to cart
  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  // Remove from cart
  const handleRemoveFromCart = (idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  // Helper function to determine grid columns for lg/xl
  const getMerchCardGridClass = () => {
    if (filteredProducts.length <= 1) {
      return "MerchCardDiv w-full flex flex-wrap justify-center ";
    }
    return "MerchCardDiv w-full flex flex-wrap justify-center items-stretch gap-8 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 ";
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-start gap-8">
      <div className="w-full bg-[#1a1b22] flex flex-col items-center">
        <ArtistStoreNav
          storeName="Luna Starlight Store"
          cartCount={cart.length}
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="w-full max-w-6xl px-[6%] py-[2.5rem] flex flex-col items-center gap-10">
          <ArtistStoreHeader />
          {/* Cart display */}
          {cart.length > 0 && (
            <div className="w-full max-w-lg bg-[#21212b] rounded-md shadow-md p-4 mb-6">
              <h3 className="text-[#aa2a46] text-lg font-bold mb-2">Your Cart</h3>
              <ul className="mb-2">
                {cart.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center py-1 border-b border-[#aa2a46]/20">
                    <span className="text-white text-sm">{item.title}</span>
                    <span className="text-white text-sm">{item.price}</span>
                    <button className="ml-2 px-2 py-1 bg-[#aa2a46] text-white rounded text-xs" onClick={() => handleRemoveFromCart(idx)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div className="text-white font-bold">Total: {cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$','')), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            </div>
          )}
          <div className={`${getMerchCardGridClass()}`}>
            {filteredProducts.map((item, idx) => (
              <ArtistMerchCard key={idx} {...item} onAddToCart={() => handleAddToCart(item)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistStore;
