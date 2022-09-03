// 条件类型

interface Animal {
    live(): void
}
interface Dog extends Animal {
    woof(): void
}

type Example1 = Dog extends Animal ? number : string // number
type Example2 = RegExp extends Animal ? number : string // string

// 重载使用条件表达式

interface IdLabel {
    id: number
}
interface NameLabel {
    name: string
}
// 三个重载
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel
function createLabel(id: number | string): IdLabel | NameLabel {
    throw "unimplemented"
}

// 直接实现一种
// 目前实现也是报错 不明所以
// --TODO--
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
function createLabelConditional<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
}

// 条件类型约束
type MessageOf1<T extends {message: unknown}> = T["message"]
type MessageOf2<T> = T extends {message: unknown} ? T["message"]: never;
interface Email {
    message: string;
}
type EmailMessageContents = MessageOf1<Email> // string
// type RegExpMessageContents1 = MessageOf1<RegExp> // error
type RegExpMessageContents2 = MessageOf2<RegExp> // never

// 扁平化
type Flatten1<T> = T extends any[] ? T[number] : T;

const tmp_arr1 = ["xxx",213]
type F1 = Flatten1< typeof tmp_arr1 > // string | number

// 这个也跟 infer 延迟 推断 有关
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never;
const tmp_fn1 = () => "hello world!"
type F2 = GetReturnType<typeof tmp_fn1> // string
type F3 = ReturnType<typeof tmp_fn1> // string
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any; // 官方的写法

type F4 = ReturnType<typeof createLabel> // IdLabel | NameLabe

// 分配条件类型
type ToArray1<Type> = Type extends any ? Type[] : never;
type T1 = ToArray1< string | number > // string[] | number[]

// 通常，分配性是期望的行为。extends为避免这种行为，您可以用方括号将关键字的每一侧括起来。
// [] 包裹
type ToArray2<Type> = [Type] extends [any] ? Type[] : never;
type T2 = ToArray2< string | number > // (string | number)[]


export {}