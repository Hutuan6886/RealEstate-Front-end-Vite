import SearchField from "../ui/search-field"

const Carousel = () => {
  return (
    <div className="w-full h-[450px] rounded-[0.375rem] bg-fixed bg-cover bg-no-repeat bg-center bg-[url('/img/analog-landscape-city-with-buildings.jpg')] relative">
      <div className="w-[90%] lg:w-[60%] flex flex-col gap-5 absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-white text-center font-semibold text-4xl">Title Carousel</h1>
        <SearchField/>
      </div>
    </div>
  )
}

export default Carousel
