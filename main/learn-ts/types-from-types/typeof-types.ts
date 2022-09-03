// typeof 获取上下文类型

console.log(typeof "hello world!")
console.log(typeof 1)
console.log(typeof 1n)

type IsOdd = (x: number) => boolean

// 类型之间传入都是 类型
// 而不能是一个值

// 官方实现 获取 函数返回值类型
type IsOddReturnType = ReturnType<IsOdd> // boolean isOdd 是一个类型

// 这里使用到一个 infer 延迟推断 如果 推断 R 就返回 r 否则 any
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any; // 阅读源码

// 推断 第一个参数 类型
type FirstParams< T extends (x: any,...y: any) => any > = T extends ( x: infer P, ...y: any) => any ? P : never;
type FirstParamsType1 = FirstParams<IsOdd>
const tmp_fn =  ( a: Array<string>, b: string, c: boolean ) => {}

// 切记 tmp_fn 是函数是值
// 类型转换的逻辑是需要传入类型 而不是 值
// 那么值是有类型是，我们只需要 typeof 值 获取值的类型推断 并传入。这就是一个临时类型
type FirstParamsType2 = FirstParams< typeof tmp_fn >

// 推断第二个参数
type TwoParams< T extends (x: any,z: any,...y: any) => any > = T extends ( x:any, z: infer P, ...y: any) => any ? P : never;
type FirstParamsType3 = TwoParams< IsOdd >
type FirstParamsType4 = TwoParams< typeof tmp_fn > // string

// 推断第一个参数之后的参数类型数组
type JumpFirstParams< T extends (x: any, ...y: any) => any > = T extends ( x:any, ...y: infer P ) => any ? P : never;
type FirstParamsType5 = JumpFirstParams< IsOdd >
type FirstParamsType6 = JumpFirstParams< typeof tmp_fn > // string

// 官方实现 获取 函数参数类型
type ParamsType1 = Parameters<typeof tmp_fn>
// type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never; // 阅读源码


export {}