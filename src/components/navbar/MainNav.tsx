import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils";
interface MainNavProps {
    className?: string
}
const MainNav: React.FC<MainNavProps> = ({ className }) => {
    const dataNav = [{
        label: 'Buy',
        href: '/buy'
    }, {
        label: 'Rent',
        href: '/rent'
    }]
    return (
        <div className={cn('w-full', className)}>
            {dataNav.map((data, i) => {
                return <Link key={i} to={data.href}><Button className="font-semibold lg:font-normal" variant='nav'>{data.label}</Button></Link>
            })}
        </div >
    )
}

export default MainNav
