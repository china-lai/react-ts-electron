/// more function
/// 关于更多的函数细节

// 参数是 函数
// 箭头函数 name: (...) => return_type
const func1 = (name: string): string => "hello " + name + "!"

const func2 = ( fn: (name: string) => string ) : string => {
    return fn("func2." + fn.name)
}
function func3( fn: (name: string) => string ): string {
    return  fn("func3." + fn.name)
}
console.log(
    func2( func1 ),
    func3( func1 )
)

// 函数调用 签名
// 类似jquery $("") 是个函数，同时他也有一堆其它的属性
type Jquery = {
    version: number;
    (selector: string): string
}
const $: Jquery = function $(selector: string): string {
    return selector
}
$.version = 0.01

const func4 = ( fn: Jquery ): void => {
    console.log(fn.version, fn("app"))
}

func4( $ )

// 构造 签名
type SwiperFunction = {
    version: number;
    new (selector: string): SwiperFunction;
}
const func5 = (fn: SwiperFunction): void => {
    const swiper = new fn("swiper")
    console.log('swiper: ',swiper.version,swiper)
}

class Swiper {
    version: number = 0.01
    constructor(selector: string) {

    }
}

func5(
    (Swiper as SwiperFunction)
)

// 泛型

// 第一个元素
function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}

const f1 = firstElement([]) // undefined
const f2 = firstElement(["h","e","l","l","o"])  // string | undefined
const f3 = firstElement(["h","e","l","l","o"]) as string // string

// T V 都待定某类型
// 函数第一个参数 T[] 表示 传入什么数组类型 string[] T 就代指 string
// 函数第二个参数 (T) => V 表示 传入函数的返回值是什么，如函数返回 number V 就代指 number V[] 就代指 number[] 是整个返回的类型
function map<T,V>(arr: T[], func: (arg: T) => V): V[] {
    return arr.map(func)
}
const arr1 = map( ["h","l"], function(value) {
    return 1
} )




export {}