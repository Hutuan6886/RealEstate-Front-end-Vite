export type LocationType = {
    name: string
    position: {
        latitude: number
        longitude: number
    }
    img?: string

}
export const provinceData: LocationType[] = [
    { name: 'Vĩnh Phúc', position: { latitude: 21.311356, longitude: 105.603294 } },
    { name: 'Quảng Ninh', position: { latitude: 21.171804, longitude: 107.201274 }, img: "https://media.truyenhinhdulich.vn/upload/news/88_quang_ninh.jpg" },
    { name: 'Hải Dương', position: { latitude: 20.944368, longitude: 106.3780373 } },
    { name: 'Hưng Yên', position: { latitude: 20.819336, longitude: 106.031450 } },
    { name: 'Thái Bình', position: { latitude: 20.529683, longitude: 106.387606 } },
    { name: 'Hà Nam', position: { latitude: 20.5269088, longitude: 105.954352 } },
    { name: 'Nam Định', position: { latitude: 20.271224, longitude: 106.162989 } },
    { name: 'Hoà Bình', position: { latitude: 20.660917, longitude: 105.392474 } },
    { name: 'Ninh Bình', position: { latitude: 20.1844832, longitude: 105.980252 } },
    { name: 'Bắc Ninh', position: { latitude: 21.121205, longitude: 106.088024 } },
    { name: 'Hà Giang', position: { latitude: 22.606890, longitude: 104.79948 }, img: "https://c0.wallpaperflare.com/preview/173/869/216/vietnam-thanh-ph%E1%BB%91-ha-giang-road-green.jpg" },
    { name: 'Cao Bằng', position: { latitude: 22.773086, longitude: 106.001722 }, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnqP4ErZN6A7moIUYDmZrfiHPrCzjIxLiiA&s" },
    { name: 'Bắc Kạn', position: { latitude: 22.257170, longitude: 105.858895 } },
    { name: 'Tuyên Quang', position: { latitude: 22.125675, longitude: 105.208972 } },
    { name: 'Lào Cai', position: { latitude: 22.2967657, longitude: 104.056616 } },
    { name: 'Lai Châu', position: { latitude: 22.304872, longitude: 102.962886 } },
    { name: 'Yên Bái', position: { latitude: 21.801368, longitude: 104.514806 } },
    { name: 'Thái Nguyên', position: { latitude: 21.649850, longitude: 105.835139 } },
    { name: 'Lạng Sơn', position: { latitude: 21.856701, longitude: 106.442435 } },
    { name: 'Sơn La', position: { latitude: 21.150850, longitude: 103.888429 } },
    { name: 'Bắc Giang', position: { latitude: 21.309286, longitude: 106.616512 } },
    { name: 'Phú Thọ', position: { latitude: 21.321224, longitude: 105.126720 } },
    { name: 'Điện Biên', position: { latitude: 21.721012, longitude: 103.041081 } },
    { name: 'Thanh Hoá', position: { latitude: 20.107169, longitude: 105.212445 } },
    { name: 'Nghệ An', position: { latitude: 19.3738868, longitude: 104.923346 } },
    { name: 'Hà Tĩnh', position: { latitude: 9.7633196, longitude: 105.637952 } },
    { name: 'Quảng Bình', position: { latitude: 17.546265, longitude: 106.257622 } },
    { name: 'Quảng Trị', position: { latitude: 16.858135, longitude: 106.858893 } },
    { name: 'Thừa Thiên Huế', position: { latitude: 16.337537, longitude: 107.556370 }, img: "https://image.kkday.com/v2/image/get/s1.kkday.com/product_166435/20240408054538_P2Bo9/jpg" },
    { name: 'Quảng Nam', position: { latitude: 15.597334, longitude: 107.975808 } },
    { name: 'Quảng Ngãi', position: { latitude: 14.963534, longitude: 108.664263 } },
    { name: 'Phú Yên', position: { latitude: 13.212655, longitude: 109.083422 }, img: "https://image.nhandan.vn/w800/Uploaded/2024/abhuohp/2023_04_01/1-phuyen-1-copy-7863.jpg.webp" },
    { name: 'Khánh Hoà', position: { latitude: 12.196080, longitude: 108.995038 }, img: "https://cdn.tgdd.vn/Files/2022/02/20/1416377/10-dia-diem-du-lich-noi-tieng-nhat-tai-tinh-khanh-hoa-202309261520584239.jpg" },
    { name: 'Ninh Thuận', position: { latitude: 11.7449714, longitude: 108.898340 } },
    { name: 'Bình Thuận', position: { latitude: 11.019271, longitude: 108.181724 }, img: "https://www.shutterstock.com/image-photo/ke-ga-beach-mui-ne-600nw-2198241043.jpg" },
    { name: 'Kon Tum', position: { latitude: 14.6995371, longitude: 107.932383 } },
    { name: 'Gia Lai', position: { latitude: 13.7964066, longitude: 108.260826 } },
    { name: 'Đắk Lắk', position: { latitude: 12.8399391, longitude: 108.2284946 } },
    { name: ' Đắk Nông', position: { latitude: 12.1288686, longitude: 107.5874260 } },
    { name: 'Lâm Đồng', position: { latitude: 11.693772, longitude: 108.152753 } },
    { name: 'Bình Phước', position: { latitude: 11.7332483, longitude: 106.906249 } },
    { name: 'Tây Ninh', position: { latitude: 11.404628, longitude: 106.003390 } },
    { name: 'Đồng Nai', position: { latitude: 11.006321, longitude: 107.1921806 }, img: "https://file1.dangcongsan.vn/data/0/images/2024/05/06/upload_2677/cao-toc.jpg" },
    { name: 'Bình Dương', position: { latitude: 11.2240686, longitude: 106.667468 }, img: "https://file4.batdongsan.com.vn/2021/10/11/PHJN6Zw0/20211011141504-3ca0.jpg" },
    { name: 'Bà Rịa - Vũng Tàu', position: { latitude: 10.581979, longitude: 107.289984 }, img: "https://ittpa.baria-vungtau.gov.vn/portal/editor/images/chua-giang-tay-1703489027.jpg" },
    { name: 'Long An', position: { latitude: 10.713105, longitude: 106.125246 } },
    { name: 'Tiền Giang', position: { latitude: 10.388514, longitude: 106.310377 } },
    { name: 'Bến Tre', position: { latitude: 10.1245253, longitude: 106.4690446 } },
    { name: 'Trà Vinh', position: { latitude: 9.770460, longitude: 106.356380 } },
    { name: 'Vĩnh Long', position: { latitude: 10.249850, longitude: 105.985470 } },
    { name: 'Đồng Tháp', position: { latitude: 10.626665, longitude: 10.626665 } },
    { name: 'An Giang', position: { latitude: 10.5149024, longitude: 105.113179 } },
    { name: 'Kiên Giang', position: { latitude: 9.9113944, longitude: 105.253387 } },
    { name: ' Hậu Giang', position: { latitude: 18.2879059, longitude: 105.784277 } },
    { name: 'Sóc Trăng', position: { latitude: 9.586778, longitude: 105.946845 } },
    { name: 'Bạc Liêu', position: { latitude: 9.3477316, longitude: 105.509706 } },
    { name: 'Cà Mau', position: { latitude: 9.0875428, longitude: 105.032046 } },

]

export const cityData: LocationType[] = [
    { name: 'Hồ Chí Minh', position: { latitude: 10.769444, longitude: 106.681944 }, img: "https://cdn.pixabay.com/photo/2021/09/12/08/52/tower-6617723_640.jpg" },
    { name: 'Hà Nội', position: { latitude: 21.022740, longitude: 105.836964 }, img: "https://media.istockphoto.com/id/646537466/photo/hanoi-city-skyline-view-by-twilight-period-pham-hung-street-cau-giay-district.jpg?s=612x612&w=0&k=20&c=YpC9_6cfOjbR4JMsCMYI558CDJkoxGyPUZkCbCn43GA=" },
    { name: 'Đà Nẵng', position: { latitude: 16.043358, longitude: 108.210846 }, img: "https://media.istockphoto.com/id/1407012843/vi/anh/ch%C3%B9a-linh-%E1%BB%A9ng-%E1%BB%9F-b%C3%A0-n%C3%A0-hills-l%C3%A0-%C4%91i%E1%BB%83m-%C4%91%E1%BA%BFn-y%C3%AAu-th%C3%ADch-c%E1%BB%A7a-du-kh%C3%A1ch.jpg?s=612x612&w=0&k=20&c=5pitIa3xtuoitqu8ypAuaY3Y1KgQ5CwEfP6DwaEg-vM=" },
    { name: 'Hải Phòng', position: { latitude: 20.865139, longitude: 106.683830 }, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsw7HozBSATO78yGxQo3VULWpJjJQg34Y2ow&s" },
    { name: 'Cần Thơ', position: { latitude: 10.045162, longitude: 105.746857 }, img: "https://media.vneconomy.vn/images/upload/2021/09/01/can-tho-3.jpeg" },
]


export const exploreProvinceData: LocationType[] = [...cityData, ...provinceData].filter((data) => data.img)