// 从类型创建类型 - 泛型


function echo1<Type>(arg: Type): void {
    // 但是函数内使用 arg 上，基本上和 any 类型上无异
    console.log(arg)
}
echo1("hello world!")

function echo2<Type>(...arg: Type[]): void {
    // 这个时候可以使用数组的一些特性
    console.log(...arg,arg.length)
}

echo2(1,2,3,4)

interface GenericsEchoFn1 {
    <Type>(arg: Type): void
}
let myEcho1: GenericsEchoFn1 = echo1
let myEcho2: GenericsEchoFn1 = echo2

myEcho1(10)
myEcho2("string") // 只能传入一个参数 参数必须符合接口 而不是实际类型


interface GenericsEchoFn2<Type> {
    (arg: Type): void
}
let myEcho3: GenericsEchoFn2<string> = echo1
myEcho3("hello world") // 只能是字符串

// 泛型类
class MyArray<Type> {
    length: number
    #obj: {
        [index: number]: Type | undefined
    }

    constructor() {
        this.length = 0
        this.#obj = {}
    }

    push(v: Type): number{
        this.#obj[this.length++] = v
        return this.length
    }
    pop(): Type | undefined {
        let v = this.#obj[this.length - 1]
        if (typeof v !== "undefined") {
            delete this.#obj[this.length-- - 1]
            return v
        }

        return v
    }
}
let my_arr_1 = new MyArray<number>();
my_arr_1.push(10);
my_arr_1.push(20)
console.log(my_arr_1.pop(),my_arr_1)

// 当然也存在非泛型类却有泛型方法
class EchoMyArray {
    static echo<Type>(...args: Type[]){
        console.log(...args)
    }
}

EchoMyArray.echo<number>(10,20,30)

// 通用约束
function echo3<Type extends { format: string }>(...args: Type[]): void{

    args.forEach( (v) => {
        console.log(v.format)
    } )

}

// 传入的值必须符合 { format: string }
echo3(
    {
        format: "hello world!"
    },
    {
        format: "goods"
    }
)

// 在泛型约束中使用类型参数

// Key extends keyof Type = Key 类型 约束在 Type 类型的子键
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key): Type[Key]{
    return obj[key]
}
const obj1 = { a: 10 }
const value1 = getProperty( obj1, 'a' ) // value1 还是 number 类型
// const value2 = getProperty(obj1, 'b') // error 不能引入 obj1 不存在的键

// 在泛型中使用类类型

class BeeKeeper {
    hasMask: boolean = true;
}

class ZooKeeper {
    nametag: string = "Mikle";
}

class Animal {
    numLegs: number = 4;
}

class Bee extends Animal {
    keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}

function createAnimalInstance<A extends Animal>(c: new () => A): A {
    return new c()
}

console.log(createAnimalInstance(Bee).keeper)
console.log(createAnimalInstance(Lion).keeper)


// 似乎一样
function createInstance<Type>(c: { new (): Type }): Type {
    return new c();
}

console.log(createInstance( Bee ).keeper)
console.log(createInstance( Lion ).keeper)


export {}