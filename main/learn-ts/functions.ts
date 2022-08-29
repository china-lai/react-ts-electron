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

// 约束
function f4<Type extends {length: number}> (a: Type, b: Type) {
    return a.length ? a : b
}

console.log(
    f4( "log a", "log b" )
)

function f5<Type> (arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2)
}

const arr2 = f5<string | number>([1,2,3],["hello","world"]) // 声明类型 Type 为 string | number


// 可选参数
const f6 = (x?: number): number => Math.pow(x || 0,2)
console.log(f6(10))

// 在 JavaScript 中，如果你调用一个参数多于参数的函数，多余的参数将被忽略。TypeScript 的行为方式相同。具有较少参数（相同类型）的函数总是可以代替具有更多参数的函数。
function myForEach<T>(
    arr: T[],
    callback: (v: T, i: number, origin: T[]) => void
): void {
    arr.forEach(callback)
}

myForEach(
    ["hello","world"],
    (v) => {
        // 可以不带 i 当然 当你需要的时候 带 i 可以获取下标
    }
)

// 函数重载

// 首先函数支持几种重载方式，就编写几种类型 function name... (args): returnType;
// 然后根据参数类型 编写一个总实现函数

function fn(x: string): void;
function fn(): void;

function fn(x?: string) {
    if (typeof x === "undefined") {
        console.log("hello world!")
    }
    else {
        console.log('x: ',x)
    }
}

fn("hello world!")
fn()

// this 在函数中声明
type User = {
    id: number;
    admin: boolean;
    becomeAdmin: () => void
}
const user1: User = {
    id: 0,
    admin: false,
    becomeAdmin(this: User){
        this.admin = true
    }
}

const user2 = {
}
user1.becomeAdmin.call(
    user2,
)
user1.becomeAdmin.apply(
    user2,
    []
)
console.log('user: ',user1,user2)

// 其他需要了解的类型

// void 不返回值的函数返回值
// 注: void 不等于 undefined 就好比下面返回值是 undefined 必须强制 return，而不能进行忽略
const f8 = (): void => {}
const f9 = (): undefined => {  return undefined }

// object 指 任何不是原始值（string、number、bigint、boolean、symbol、null、undefined）的指
// 注: object 不是 Object
const f10 = (o: object): void => {

}
const f11 = (o: Object): void => {

}
// console.log(f10(10)) // 报错
// console.log(f11(10)) // 正确

// unknown 类型代表任何值
const f12 = (s: string): unknown => JSON.parse(s)
const user3 = f12( JSON.stringify(user1) ) as User
console.log('user3: ',user3)

// never 不可达
function fail(msg: string): never { throw  new Error(msg)}

try {
    fail("出错了")
} catch (e){}

const f13  = (x: string | number): void => {
    if (typeof x === "string")
        console.log('string: ',x)
    else if (typeof x === "number")
        console.log('number: ',x)
    else
        console.log('never: ',x)
}
f13( [] as unknown as string )


// Rest 参数
function multiply(n: number, ...m: number[]) {
    return m.map(v => v * n)
}

console.log(
    multiply(10, 0,1,2,3,4,5)
)

// 如果去掉 as const
const a1: [number,number] = [0,1]
console.log(Math.atan2(...a1))

const a2 = [1,2];
// const 只是表示 数组不可变，但实际数组还是可以插入元素
a2.push(3);
// a2 = [] // 只是不能重新赋值而已
// console.log(Math.atan2(...a2)) // 报错
console.log(Math.atan2( ...(a2 as [number,number]) ))

// 另外是直接使用 const 上下文 进行推断是一个 不可变类型
const a3 = [2,3] as const
// 这个时候 a3 已经不具备 push 一些能影响自身的方法了
console.log(Math.atan2( ...a3 ))

// 参数解构
type T1 = {
    a: number; b: number; c: number
}
function sum({ a, b, c }: T1) {
    console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });

// return void
// 函数的void返回类型可能会产生一些不寻常但预期的行为。
type voidFunc = () => void;

const f14: voidFunc = () => {
    return true;
};

// function 声明 :void 时 函数不得返回任何内容，跟上述存在差异
function f15(): void {
    // @ts-expect-error
    return true;
}


console.log(f14()) // 即使返回值是void 但实际还是 true

export {}