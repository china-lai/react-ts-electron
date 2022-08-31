// Keyof Type 获取指定类型的索引类型

type Point = {
    x: number;
    y: number;
}

type PointKey = keyof Point //

// 意思指这个类型是 Point 的键名 而非键值
const p_k_1: PointKey = 'x'
const p_k_2: PointKey = 'y'
console.log('p_k: ',p_k_1,p_k_2)

type NumberIndex = {
    [n: number]: unknown
}
type NumberIndexKey = keyof NumberIndex // number

type StringIndex = {
    [n: string]: unknown
}
// 一定要清楚获取索引的使用方式
// obj[0] 一般 [] 是数组的方式 所以类型可能需要兼容 number
type StringIndexKey = keyof StringIndex // string | number


