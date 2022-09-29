// class this 的一些场景


// this 基于类型的守卫

class FileSystemObject {
    isFile(): this is FileRep {
        return this instanceof FileRep
    }

    isDirectory(): this is Directory {
        return this instanceof Directory;
    }
    isNetworked(): this is Networked & this {
        return this.networked;
    }

    constructor(public path: string, private networked: boolean) {
    }

}

class FileRep extends FileSystemObject {
    constructor(path: string, public content: string) {
        super(path, false);
    }
}
class Directory extends FileSystemObject {
    children: FileSystemObject[] = [];
}

interface Networked {
    host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
console.log(fso)

if (fso.isFile()) {
    console.log("FileReg: ",fso.content)
}
else if (fso.isDirectory()) {
    console.log("Directory: ", fso.children)
}
else if (fso.isNetworked()) {
    console.log("Networked: ", fso.host)
}

//

class Box1<T> {
    value?: T;

    hasValue(): this is {value: T} {
        return this.value !== undefined
    }
}

const box = new Box1<string>();
if (1 == 1) {
    box.value = "Gameboy";
}

console.log('box.value: ', box.value); // string undefined
if (box.hasValue()) {
    console.log('box.value: ', box.value) // string
}

// 特殊的初始化

class User1 {

    // 简单声明，无需手动赋值
    constructor(
        public readonly id: bigint,
        public name: string,
        private age?: number,
    ) {
    }
}

let user1 = new User1(1n, "lai")
let user2 = new User1(2n, "lai wenjie", 10)

console.log(user1,user2)


// abstract

abstract class User2 {
    abstract getName(): string;
}
class User3 extends User2 {

    constructor(public name: string) {
        super();
    }

    getName(): string {
        return this.name
    }
}


// 抽象构造签名
function greet_name(
    // ctor: typeof User2, // error 抽象类不能new
    ctor: new (name: string) => User2
) {
    const instance = new ctor("greet_name.name")
    console.log('greet_name: ',instance.getName())

}

greet_name( User3 )