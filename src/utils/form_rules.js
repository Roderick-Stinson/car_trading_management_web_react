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