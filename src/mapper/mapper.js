//添加字段和中文名称的映射
export const carMapper = {
    id: '车辆ID',
    mileage: '里程数（万公里）',
    brand: '品牌',
    model: '款式',
    year: '型号',
    version: '版本',
    price: '售价（万元）',
    sellPhone: '卖家联系方式',
    sellUser: '卖家',
    title: '标题'
}

export const userMapper = {
    id: '用户ID',
    username: '用户名',
    regDate: '注册时间',
    //仅用于显示的注册时间
    regDateStr: '注册时间',
    phone: '手机号',
}

export const BookingSellMapper = {
    createTime: '创建时间',
    id: '预约单号',
    state: '状态',
    username: '用户名',
    phone: '手机号',
}
export const orderMapper = {
    id: '订单ID',
    buyerId: '买家ID',
    sellerId: '卖家ID',
    carId: '车辆ID',
    tradeDateStr: '订单日期',
    price: '买家报价'
}

export const sellCarMapper = (status) => {
    switch (status) {
        case 0:
            return '待上传'
        case 1:
            return '进行中'
        case 2:
            return '已完成'
        case 3:
            return '已取消'
        default:
            return '未知'
    }
}
