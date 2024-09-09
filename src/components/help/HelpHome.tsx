import { useNavigate } from "react-router-dom"
import TitleComponent from "../ui/title-component"
import HelpItem from "./HelpItem"

const HelpHome = () => {
    const navigate = useNavigate()
    return (
        <TitleComponent title="See how HuuTuan can help">
            <div className="w-[80%] sm:w-[50%] flex flex-col md:flex-row m-auto  items-center justify-center gap-7">
                <HelpItem title="Buy a home" description="With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home." imgUrl="https://www.trulia.com/images/icons/txl3/illustrations/BuyAHome.svg" buttonTitle="Find a home" onClick={() => { navigate(`search?formType=Sell`) }} />
                <HelpItem title="Rent a home" description="With 35+ filters and custom keyword search, Trulia can help you easily find a home or apartment for rent that you'll love." imgUrl="https://www.trulia.com/images/icons/txl3/illustrations/RentAHome.svg" buttonTitle="Find a rental" onClick={() => { navigate(`search?formType=Rent`) }} />
            </div>
        </TitleComponent>
    )
}

export default HelpHome
