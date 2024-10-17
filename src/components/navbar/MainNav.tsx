import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
interface MainNavProps {
    className?: string
}
const MainNav: React.FC<MainNavProps> = ({ className }) => {
    const navigate = useNavigate()
    const dataNav = [{
        label: 'Buy',
        href: '/search?formType=Sell'
    }, {
        label: 'Rent',
        href: '/search?formType=Rent'
    }]
    return (
        <div className={cn('w-full', className)}>
            {dataNav.map((data, i) => {
                return <div key={i} onClick={() => {
                    navigate(data.href)
                }}><Button className="font-semibold lg:font-normal" variant='nav'>{data.label}</Button></div>
            })}
        </div >
    )
}

export default MainNav
