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


export {}
