export const require_rule = {
    required: true, message: '该字段不得为空'
}

export const number_rule = {
    type: 'number',
    min: 0,
    transform(value) {
        return Number(value);
    },
    message: '请输入数字或者数字格式'

}
export const patten_rule =
    {
        required: true,
        message: '行驶里程不能为空且为正整数',
        pattern: /^(0|[1-9][0-9]*)(\.\d+)?$/
}
export const tel_rule={
    type: 'number',
    len:11,
    transform(value) {
        return Number(value);
    },
    message:'请输入正确手机号'
}