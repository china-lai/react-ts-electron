// 映射类型

// 当您不想重复自己时，有时一种类型需要基于另一种类型。
// 映射类型建立在索引签名的语法之上，用于声明未提前声明的属性类型

type IndexType = {
    [index: string]: any
}
const v1: IndexType = {
    name: "hello world!"
}

type MappedTypeBoolean1<Type> = {
    [ Property in keyof Type ]: boolean
}
type MappedTypeBoolean2<Type> = {
    -readonly [ Property in keyof Type ]: boolean
}
type MappedTypeBoolean3<Type> = {
    -readonly [ Property in keyof Type ]-?: boolean
}

type User = {
    readonly id: 1n;
    name: string;

    age?: number;

    goToWork: () => void;
};


type UserBoolean1 = MappedTypeBoolean1<User>
type UserBoolean2 = MappedTypeBoolean2<User> // readonly 去除
type UserBoolean3 = MappedTypeBoolean3<User> // readonly、可选 去除


// as 重命名
// 可以利用模板文字类型等功能从以前的属性名称中创建新的属性名称
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

type GettersUser = Getters<User>

// as 也可以过滤
type RemoveIdField<Type> = {
    [Property in keyof Type as Exclude<Property, "id">]: Type[Property]
};
type RemoveIdFieldUUser = RemoveIdField<User> // id 被去除了

// 映射联合
type EventConfig<Event extends {kind: string}> = {
    [ E in Event as E["kind"] ]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number }
type CircleEvent = { kind: "circle", radius: number }
type Config = EventConfig< SquareEvent | CircleEvent >

// 条件转换
type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends {pii: true} ? true : false
}
type DBFields = {
    id: { format: "incrementing" },
    name: {type: string, pii: true}
}
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>


export {}