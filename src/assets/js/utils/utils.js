const utils = {
    isString: function (StringToCheck) {
        return Object.prototype.toString.call(StringToCheck) === '[object String]'
    },
    isBoolean: function (BooleanToCheck) {
        return Object.prototype.toString.call(BooleanToCheck) === '[object Boolean]'
    },
    isNumber: function (NumberToCheck) {
        return Object.prototype.toString.call(NumberToCheck) === '[object Number]'
    },
    isObject: function (objectToCheck) {
        return Object.prototype.toString.call(objectToCheck) === '[object Object]'
    },
    isArray: function (ArrayToCheck) {
        return Object.prototype.toString.call(ArrayToCheck) === '[object Array]'
    },
    isFunction: function (FunctionToCheck) {
        return Object.prototype.toString.call(FunctionToCheck) === '[object Function]'
    },
    serializeData: function (data) {
        let params = {}
        data.forEach(v => {
            // 自定义序列化处理表单数据
            if (v.customSerializeFn) {
                params = Object.assign(params, v.customSerializeFn(v))
            } else {
                params[v.field] = v.value
            }
            // if (v.field == 'params') {
            // 	let paramsStr = v.val.join(',')
            // 	params[v.field] = paramsStr
            // } else if (v.field == 'location') { // 判断当前字段为location
            // 	if (v.val) {
            // 		let lat = v.val.split(',')[0],
            // 			lng = v.val.split(',')[1]
            // 		params['latitude'] = lat
            // 		params['longitude'] = lng
            // 		params[v.field] = v.val
            // 	}
            // } else if (v.pv && v['pv'].field == 'params_value') { // monitor adapter 的参数值
            // 	let obj = {}, str
            // 	v.pv.val.forEach(vl => {
            // 		if (vl.param === '') return false
            // 		obj[vl.param] = vl.val
            // 	})
            // 	params[v.pv.field] = JSON.stringify(obj)
            // 	params[v.field] = v.val
            // } else {
            // 	params[v.field] = v.val
            // }
        })
        return params
    },
    /**
     * [findPropertyInObject 在对象中查找属性]
     * @Author   szh
     * @DateTime 2018-03-01
     * @param    {String}   prop [属性]
     * @param    {Object}   obj  [查找属性的对象]
     * @return   {Boolean}       [是否存在对象中]
     */
    findPropertyInObject: function (prop, obj) {
        return Object.keys(obj).includes(prop)
    }
}

module.exports = utils
