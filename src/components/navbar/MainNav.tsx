import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button'

const MainNav = () => {
    const dataNav = [{
        label: 'Buy',
        href: '/buy'
    }, {
        label: 'Rent',
        href: '/rent'
    }, {
        label: 'Mortgage',
        href: '/mortgage'
    }]
    return (
        <div className="w-full flex flex-row items-center justify-start gap-3">
            {dataNav.map((data, i) => {
                return <Button key={i} variant='nav'>
                    <Link to={data.href}>{data.label}</Link>
                </Button>

            })}
        </div >
    )
}

export default MainNav
