// 索引访问类型

type User1 = {
    id: bigint;
    name: string;
    age: number;
}

type UserId = User1["id"] // bigint

type T1 = keyof User1; // keyof User 也是一种类型 表示的是 User 的索引类型
type T2 = User1[ keyof User1 ] // 这种会直接列出 所有索引类型的值类型

type T3 = "id" | "name"

type T4 = User1[T3] // 返回值类型
type T5 = User1[T1] // 返回值类型

// 获取数组对象的类型进行推断
const user_arr = [
    { id: 1n, name: "Alice", age: 15 },
    { id: 2n, name: "Bob", age: 23 },
    { id: 3n, name: "Eve", age: 38 },
];

type User2 = typeof user_arr[number]; // 获取值类型，且上下文推断

// 请牢记 索引使用的是类型 而非使用变量
const key = "age"
// type UserAge = User1[key] // 类型[变量x] error
type AgeKey = typeof key; // 文字类型
type UserAge1 = User1[AgeKey] // 传入的是类型 而非值
type UserAge2 = User1[typeof key] // 对 key 做上下文推断获取类型 string


export {}