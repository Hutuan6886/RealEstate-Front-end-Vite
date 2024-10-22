import { useNavigate } from 'react-router-dom';

import { cn } from "@/lib/utils";

import { Button } from '@/components/ui/button'

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
                }}><Button className="font-bold md:font-semibold lg:font-normal" variant='nav'>{data.label}</Button></div>
            })}
        </div >
    )
}

export default MainNav
