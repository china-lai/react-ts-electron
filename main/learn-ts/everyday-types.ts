/// 日常类型

const str1: string = "hello world!";
const number1: number = Math.PI;
const b1: boolean = Math.random() > 0.5;

const any1: any = {} // 即使是个空对象
try {
    any1.user.age.split(""); // 也不会类型出错 相当于放弃类型系统 回到 JS
} catch (e) {
}


// 推断基本是每个类型系统都自带的功能
const str2 = "hello ts!";

// 函数声明
function f1(name: string): void {
    console.log('name: ', name);
    return
}

const f2 = (name: string): void => f1(name)

type DateNullUndefined = Date | undefined | null; // 类型别名
type Point = { // 类型别名也可以声明一个类型
    x: number;
    y: number;
    z?: number;
}

// 接口类型
interface User {
    id: bigint;
    name: string;
    phone: string;

    age?: number;
    // birthday?: Date; // 由于 ?: 表示可选 所以 Date | undefined 类型
    birthday?: DateNullUndefined; // 联合类型 增加为 null 类型
}

const f3 = (user: User) => {
    return `
        User[${Object.keys(user).map(key => {
        const value = user[key as keyof typeof user];
        return `${key}=${value}`

    }).join(", ")}]
    `.trim()
}

const user1: User = {
    id: 1n,
    name: "hello",
    phone: "phone",
    age: undefined,
    birthday: null
}
console.log(f3(user1))

// type 和 interface 一个不同点在于 “接口总是可以扩展的”
interface User {
    money?: number // 进行扩展
}

user1.money = Math.PI;
console.log(f3(user1))

any1.user = user1
// 类型断言
const user2 = any1.user as User // 如果不进行这样
console.log(f3(user2))
// user2 因为 as 了类型，所以 类型系统 认为他就是这个类型
// 但是如果还是继续 any1.user.x 这个时候是没办法进行代码提示的，因为类型系统还是认为它是 any
console.log('any1.user.id: ',any1.user.id)

// 文字类型 一般使用在 文字联合 类型
const f4 = (str: string,dir: "left" | "right", max_length: number, fill?: string) => {
    return dir === "left" ? str.padStart(max_length, fill) : str.padEnd(max_length, fill)
}
console.log(f4("177","right", 11, "*"));

// 数字类型
type CompareResult = 0 | 1 | -1;

function compare(a: string, b: string): CompareResult {
    return a === b ? 0 : a > b ? 1 : -1;
}

// ! 运算符: 用于在不进行任何显式检查的情况下从类型中删除null
function isNull(o: any | null): boolean {
    return o !== null
}

function f5(user: User|null): bigint {
    // return user !==  null ? user.id : 0n;
    // return user!.id; // 这种情况 传入 null 还是会报错
    // return isNull(user) ? user.id : 0n; // 利用函数 检查 null 却存在问题、这可能还是 类型系统的缺陷
    return isNull(user) ? user!.id : 0n; // 所以需要用运算符
}

console.log('user.id: ',f5(null))

// 枚举
enum Colors {
    Red,
    Blue,
    Green
}

let r: Colors = Colors.Red
console.log('r === Colors.Red: ',r === Colors.Red)
r = 0;
console.log('r === Colors.Red: ',r === Colors.Red)

// Symbol
const s1 = Symbol.for("str1")
const s2 = Symbol.for("str1")

// 一些时候会显示一些 ts 错误提示 所以需要忽略警告: This condition will always return 'false' since the types 'typeof s1' and 'typeof s2' have no overlap.
// @ts-ignore
console.log('s1 === s2: ',s1 === s2)

export {};