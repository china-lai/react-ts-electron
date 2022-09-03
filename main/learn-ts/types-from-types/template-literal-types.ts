// 模板文字

// 模板文字类型建立在字符串文字类型之上，并且能够通过联合扩展成许多字符串
import * as stream from "stream";
import {Logger} from "sass";

type World = "world"
type HelloWorld = `hello ${World}`

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`; // 四个字符串文字类型 且后缀 + _id
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`; // 4 * 3 = 12 类型

type User = {
    id: bigint;
    name: string
}
// 这种 可以确定实现的 on 里的 事件名 正确类型，但是 callback 的参数类型就存在瑕疵
type PropEventSource1<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: Type[keyof Type]) => void): void;
};

// 缺陷
type UserEvent1 = PropEventSource1<User>
type UserChange1 = User & UserEvent1
const u1: UserChange1 = {
    id: 1n,
    name: "hello world",

    on(){}
} as UserChange1
u1.on("idChanged", (newValue) => {
    // 类型是 string | bigint
    if (typeof newValue === "bigint")
        return

    newValue.trim() // 才合理
})



// 这种 可以确定实现的 on 里的 事件名 callback的参数类型 都可以拿到正确的类型
type PropEventSource2<Type> = {
    on<Key extends string & keyof Type>(eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

type UserEvent2 = PropEventSource2<User>
type UserChange2 = User & UserEvent2

const u2: UserChange2 = {
    id: 1n,
    name: "hello world",

    on(){}
} as UserChange2

// 拿到的都是正确类型
u2.on('idChanged', (newValue) => {
    console.log('bigint: ',newValue) // bigint
})
u2.on('nameChanged', (newValue) => {
    console.log('string: ',newValue) // string
})



// 内在字符串操作类型
// 它在 mapped-types 也经常使用到
type Greeting = "Hello, world"
type UppercaseGreeting = Uppercase<Greeting> // 转大写

type IDUppercase<Str extends string> = `ID_${Uppercase<Str>}`
type IDUppercaseMyApp = IDUppercase<"my_app"> // ID_MY_APP

// Lowercase 小写转化
// Capitalize 将字符串中的第一个字符转换为等效的大写字母。
// Uncapitalize 将字符串中的第一个字符转换为等效的小写字母。
type IDCapitalize<Str extends string> = `ID_${Capitalize<Str>}`
type IDCapitalizeMyApp = IDCapitalize<"my_app"> // ID_My_app


export {}