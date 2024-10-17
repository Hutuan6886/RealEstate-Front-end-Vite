import SearchField from "@/components/search-field/search-field"

const Carousel = () => {
  return (
    <div style={{ backgroundImage: `url('/img/analog-landscape-city-with-buildings.jpg')` }} className={`w-full h-screen rounded-[0.375rem] bg-cover bg-no-repeat bg-center relative`}>
      <div className="w-[90%] lg:w-[60%] flex flex-col gap-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-white text-center font-semibold text-3xl md:text-5xl shadow-2xl">
          Discover a place you'll love to live
        </h1>
        <SearchField className="w-[90%] md:w-[70%]" placeholder="Search for Village's name or City in Vietnam" />
      </div>
    </div >
  )
}

export default Carousel
