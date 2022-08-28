/// 类型收窄

// 目前有很多种收窄的方式 毕竟遇到联合类型存在 undefined null 的 一个 if (value) 就可以排除掉 null undefined '' 0 默认上就收窄了 null 和 undefined
// typeof 进行类型收窄
const f1 = (padding: number | string, input: string) : string =>  {
    if (typeof padding === "number") {
        return " ".repeat(padding) + input
    }
    // 通过 typeof 这个时候类型 收窄 到 string

    return padding + input
}

console.log(
    f1( 10, "hello world!" )
)

// 函数、===、typeof 进行类型收窄
const f2 = (strs: string | string[] | null): void => {

    // if (Array.isArray(strs)) {
    //     // 数组类型
    //     console.log(strs)
    // }
    // else if (strs === null) {
    //     console.log(strs)
    // }
    // else {
    //     console.log(strs)
    // }

    if (typeof strs === "object") {
        // string[] | null
        // 因为 typeof null === "object"
        console.log(strs)
    }
    else {
        // 字符串
        console.log(strs)
    }

}
f2( null )

// === 运算符进行类型收窄
const f3 = (x: string | number, y: string | boolean): void => {
    if (x === y) {
        // 二者相同类型 只有 string 全等匹配可以将两个类型目前 收窄到 string
        console.log(
            x.trim(),
            y.trim()
        )
    }
    else {
        // 现在 x 还是 string | number
        // 现在 y 还是 string | boolean
        // 有时候字符串也不一定相等
    }
}
f3( "x", "y" )

// in 类型收窄
type Fish = { swim: () => void };
type Bird = { fly: () => void };

const f4 = (animal: Fish | Bird): void => {
    if ("swim" in animal) {
        console.log(animal) // Fish 类型
    }
    else {
        console.log(animal) // Birh 类型
    }
}

// instanceof 类型收窄
const f5 = (d: Date | string): boolean => {
    if (d instanceof Date)
        return Date.now() >= d.valueOf()
    else
        return Date.now() >= new Date(d).valueOf()
}

// is 类型收窄
// 返回值是 boolean 、 o is object 表示 为 true 则是 object 类型
function isNotNull(o: object | null): o is object {
    return o !== null
}

function f6(user: object|null): void {
    if (isNotNull(user)) {
        console.log(user) // object
    }
    else {
        console.log(user) // null
    }
}

// 文字类型收窄
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function f7(shape: Shape): void {
    if (shape.kind === "circle") {
        console.log(shape) // Circle
    }
    else if (shape.kind === "square") {
        console.log(shape) // Square
    }
    else {
        console.log('never: ',shape) // never 不可达类型
    }
}

f7( {kind: "circle", radius: 100} )
f7( {} as Shape ) // 不可达的情况一般是强制转化的结果


export {};
