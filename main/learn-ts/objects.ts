// 对象类型

type Person1 = {
    id: bigint;
}

interface Person2 {
    id: bigint;
}

// 也可以是匿名的
const user3: { id: bigint } = {id: 0n}
const user1: Person1 = user3
const user2: Person2 = user3

// 可选（进行 Person2 扩展）
interface Person2 {

    age?: number // 后续使用这个值都应该进行空判断才能确保类型不为空
}

user2.age = 10

// 如果没有解构默认值 返回类型应该是 number | undefined
function f1({age = 0}: Person2): number {
    return age
}

// readonly
interface Book {
    name: string
}

interface Person4 {
    readonly id: bigint;

    readonly books: Book[]
}

const user4: Person4 = {id: 1n, books: [{name: "JS书籍1"}, {name: "JS书籍2"}]}
user4.books.push({name: "JS书籍3"}) // 只是 books 不能重新被赋值其它值，但是本身引用的对象是可以进行变更的


// 索引签名
interface StringArray {
    [index: number]: undefined | string;
}

const str_arr1: StringArray = ["hello", "world"]
const str_arr1_first = str_arr1[0]

interface NumberArray {
    [key: string]: undefined | number | string;

    [index: number]: number; // 本质上 index 找不到会转 string 去寻找 所以 [0] 返回值 需要兼容 ['0'] 返回值

    length: number
}

const number_arr1: NumberArray = {
    0: 0,
    1: 1,
    "test": "hello world!"
} as unknown as NumberArray;

const n1 = number_arr1[0] // n1 是 number 这里还是比较奇怪的是，估计只是 0 是数字 默认上返回 number 即可
const n2 = number_arr1["test"] // n2 是 undefined | number | string
const n3 = number_arr1["100"]; // 字符串的数字还是返回了 number 类型

console.log('number_arr1: ', number_arr1)

// 扩展类型
interface Person {
    id: bigint
    name: string
}

// 企业员工
enum CompanyOffice {
    STAFF, // 员工
    MANAGER, // 经理
    Director, // 总监
    CEO, // CEO
    CHAIRMAN // 董事长
}

interface CompanyStaff1 extends Person {
    company_name: string
    salary: number
    company_office: CompanyOffice
}

// 交叉类型
type CompanyStaff2 = Person & {
    company_name: string
    salary: number
    company_office: CompanyOffice
}

const c1: CompanyStaff1 = {
    id: 1n,
    name: "lai",
    company_name: "南天门",
    salary: 0,
    company_office: CompanyOffice.STAFF
}
const c2: CompanyStaff2 = c1

// 通用类型
interface Box1<Type> {
    content: Type;
}

// 不能像数组一样进行推断，只能手动补上 <string>
const box1: Box1<string> = {content: "1000"}
const box2: Box1<Person> = {content: {id: 1n, name: "jie"}}
console.log('box1, box2: ', box1, box2)

function f2<Type>(box: Box1<Type>, content: Type): Box1<Type> {
    box.content = content
    return box
}
function f3(box: Box1<any>, content: any): Box1<any> {
    box.content = content
    return box
}

const box3 = f2(box2, {id: 2n, name: "wen"})
console.log('box3: ', box3)

// 使用 f3 一样可以工作
// 只是后续如果有一些返回值的事情 会比较麻烦 因为现在已经类型丢失了
const box4 = f3(box2, {id: 3n, name: "test"})

console.log('box4: ', box4)

// 通用类型 类型别名
type Box2<Type> = {
    content: Type
}
type OrNull<Type> = Type | null // 给类型增加为 null
type OneOrMany<Type> = Type | Type[]; // 类型或者类型数组
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

const t1: OrNull<string> = null
const t2: OrNull<string> = "hello world"

const t3: OneOrMany<string> = "hello world"
const t4: OneOrMany<string> = ["hello","world"]

const t5: OneOrManyOrNull<string> = [ "hello", "world" ]
const t6: OneOrManyOrNull<string> = "hello world!"
const t7: OneOrManyOrNull<string> = null

// Array 类型
// Map 类型
// Set 类型
// 这些类型都提供泛型支持 使也是每一个类型系统应该都具备的基础泛型功能
// 我们也可以自定义实现，不过这些内置类型 一般都有不少黑盒的东西 来增加性能
// 本文例子使用到不少上述刚学到的类型 如 OrNull StringIndex
interface MyArrayInterface<Type> {
    length: number
    push(...t: Type[]): number
    pop(): OrNull<Type>
}
// 索引签名
interface StringIndex<Type> {
    [index: string]: OrNull<Type>
}

class MyArray<Type> implements MyArrayInterface<Type> {
    length: number


    // 使用索引签名
    obj: StringIndex<Type>

    constructor() {
        this.length = 0
        this.obj = {}
    }

    push(...t: Type[]): number {
        let i = 0
        for (; i < t.length; i++) {
            this.obj[i] = t[i]
        }
        this.length += i

        return i
    }
    pop(): OrNull<Type> {
        if (this.length === 0)
            return null


        let value = this.obj[this.length - 1]
        delete this.obj[ this.length - 1 ]
        return value
    }
}

const myArr: MyArray<string> = new MyArray<string>()
console.log('myArr: ', myArr)
console.log(myArr.push("hello","world"))
console.log(myArr.pop())
console.log('myArr: ',myArr)



// ReadonlyArray
// 描述不应更改的数组
const arr1: ReadonlyArray<string> = ["red", "green", "blue"];
// arr1 不具备任何 push pop splice 影响自身的方法 length 也只有 get
// arr1[0] = "hello world!" // 也不能修改子元素

const arr2: readonly string[] = []
// 同上

// 这些特性跟 type TypeName = { readonly prop_name: Type  } 是不一样的，类型上只是属性不能变更值，但值是引用值又是可以修改自身
// 但是 ReadonlyArray 是引用自身也不能再次变更 更像是 只读元组类型

type ReadonlyTest = {
    readonly user: readonly string[]
}
const r1: ReadonlyTest = {
    user: ["hello world"]
}
// 这里使用两次 readonly 描述

// 前置 readonly
// r1.user = [] // 限制对象直接变更值

// 后置 readonly
// r1.user.length = 10 // 限制引用可变对象再变更自身

// 元组类型

export {}