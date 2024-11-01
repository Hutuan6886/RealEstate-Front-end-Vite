import SearchField from "@/components/search-field/search-field"

const Carousel = () => {
  return (
    <div style={{ backgroundImage: `url('/img/Carousel-2.jpg')` }} className={`relative w-full h-screen bg-cover bg-no-repeat bg-center rounded-[0.375rem] overflow-hidden `}>
      <div className="absolute z-0 top-0 left-0 w-full h-full bg-black opacity-20"></div>
      <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[60%] flex flex-col gap-10 ">
        <h1 className="text-white text-center font-semibold text-3xl md:text-5xl shadow-2xl">
          Discover a place you'll love to live
        </h1>
        <SearchField className="w-[90%] md:w-[70%]" placeholder="Search for Village's name or City in Vietnam" />
      </div>
    </div >
  )
}

export default Carousel
