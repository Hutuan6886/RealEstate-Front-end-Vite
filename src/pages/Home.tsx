import Carousel from "@/components/carousel/Carousel"
import ExploreHome from "@/components/explore/ExploreHome"
import NewlyHome from "@/components/newly/NewlyHome"

function Home() {
  return (
    <div className='w-full'>
      <Carousel />
      <ExploreHome />
      <NewlyHome />
    </div>
  )
}

export default Home
