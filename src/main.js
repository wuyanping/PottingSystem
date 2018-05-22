/*
    主入口： 根据process.env.NODE_MP，process.env.NODE_ENV来判断到底进入哪个次入口
    process.env.NODE_MP：移动端还是pc端（mobile/pc）
    process.env.NODE_ENV：开发环境还是生产环境（development/production）
 */
console.log('process.env.NODE_MP:' + process.env.NODE_MP)
console.log('process.env.NODE_ENV:' + process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production' && process.env.NODE_MP === 'mobile') {
    console.log(11)
    require('./mobile.js')
} else if (process.env.NODE_ENV === 'production' && process.env.NODE_MP === 'pc') {
    console.log(22)
    require('./pc.js')
} else {
    console.log(33)
    require('./dev_main.js')
}
