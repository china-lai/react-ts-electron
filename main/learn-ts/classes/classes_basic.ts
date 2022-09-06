// class 基础

// 一个简单的 类
class User1 {
    readonly id: bigint; // 初始化后不会变更
    name: string;


    // 构造函数支持重载
    constructor(id: bigint);
    constructor(id: bigint, name: string);
    constructor(id: bigint, name?: string) {
        this.id = id;
        this.name = name || '';
    }

    // 类可以有方法
    toString(){
        return `User1[id=${this.id}, name=${this.name}]`
    }


    // 类可以有 访问器

    // TypeScript 对访问器有一些特殊的推理规则：
    //
    // 如果get存在但不存在set，则属性自动readonly
    // 如果不指定setter参数的类型，则从getter的返回类型推断
    // Getter 和 setter 必须具有相同的成员可见性

    // 'get' 访问器不能有参数。
    get nl(): number{
        return this.name.length
    }

    // 'set' 访问器不能有返回类型注释。
    set nl(length: number){
        this.name = this.name.slice(0,length)
    }

}

const u1 = new User1( 1n, "Lai" );
console.log(u1.toString())

// 类可以实现接口
interface Compare<Type>{
    compare(a: Type,b: Type): 0 | -1 | 1;
}
class User2 implements Compare<User2> {

    readonly id: bigint;
    constructor(id: bigint) {
        this.id = id
    }

    compare(a: User2, b: User2): 0 | -1 | 1 {
        return a.id > b.id ? 1 : a.id < b.id ? -1 : 0
    }
}

interface Test1{
    x?: number; // 接口可以不实现可选（这样类无法直接 .x）

    check_empty(s: string): boolean; // 类型参数可以不匹配，但是不能是其不兼容的类型
}

class Test2 implements Test1 {

    // any unknown 类型都兼容
    check_empty(s: any): boolean {
        return s.length > 0
    }
}

// 继承
class User3 extends User1 {

    constructor(id: bigint, name: string) {
        super(id,name);
    }

    // 覆盖方法
    toString(): string{
        return super.toString().replace('User1','User3')
    }
}
const u3 = new User3(2n, "LaiWenJie");
console.log(u3.toString())

// 可见性

// default 素有类可见
// public 所有类可见
// protected 仅子类可见
// private 仅当前类可见
// 牢记 良好的规范总是从
// public 修饰 方法
// protected 修饰内置通用方法
// private 修饰字段 修饰内置方法
// private 修饰内置方法
class User4 {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    // 类似 java 的封装 getter 和 setter
    set name(name: string) {
        this._name = name
    }
    get name(){
        return this._name
    }

}

const u4 = new User4("Lai");
// u4 不能直接访问 name 需要修改需要调用 set_name 需要取值需要返回 get_name
u4.name = "hello world!"
console.log(u4)
// getter setter 优势就是在于包裹一层
// 1. 可以在包裹的函数内做通用的事情，如 统一的 脱敏 加解密
// 2. 如果类后续需要改实现（同时保持兼容性），比如 _first_name _last_name 替换 实现，可以直接替换，而不影响


export {}
