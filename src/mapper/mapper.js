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
    createTime:'创建时间',
    id: '预约单号',
    state:'状态',
    username: '用户名',
    phone: '手机号',
}
export const orderMapper = {}
