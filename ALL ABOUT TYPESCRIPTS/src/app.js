// interface User {
//     name: string;
//     id: number;
//     printConsole(ahi: MyTuples): void
// }
// interface ModifiedType<Type> {      //Interface with generic type (inside <>)
//     name: string;
//     id: number;
//     add: (obj: Type) => void;
//     get: () => Type;
// }
// class ModifiedClassObject {
//     name: string;
//     id: number;
//     add: (obj: string) => void;
//     get: () => string;
//     constructor(name: string, id: number) {
//         this.name = name;
//         this.id = id;
//     }
// }
// class UserAccount {
//     name: string;
//     id: number;
//     constructor(name: string, id: number) {
//         this.name = name;
//         this.id = id;
//     }
//     printConsole = (ahi: MyTuples): void => {
//         console.log("ahi", ahi);
//     }
// }
// function wrapInArray(obj: string | string[]): string | string[] {
//     if (typeof obj === "string") {
//         return [obj];
//     } else {
//         return obj;
//     }
// }
// type MyTuples = true | false | string | Number;
// type StringArray = Array<string>;
// type NumberArray = Array<number>;
// type ObjectWithNameArray = Array<{ name: string }>;     //object Arr
// const user: User = new UserAccount("Murphy", 1);
// const testUnion: MyTuples = "ahi";
// const testGenerics: ObjectWithNameArray = [{ name: "ahi" }];
// declare let testCustomizedGeneric: ModifiedType<string>;      //init without value
// const testCustomizedGeneric2: ModifiedType<string> = new ModifiedClassObject("Murphy", 1);      //init without value
// console.log(testCustomizedGeneric2);
// // user.printConsole(false)
// enum Color {
//     Red,
//     Green,
//     Blue,
// }
// let c: Color = Color.Green;
// let colorName: string = Color[2];
// // Displays 'Green'
// console.log(c, colorName);
// // declare const maybe: unknown;
// // // 'maybe' could be a string, object, boolean, undefined, or other types
// // if (maybe === true) {
// //     // TypeScript knows that maybe is a boolean now
// //     const aBoolean: boolean = maybe;
// //     // So, it cannot be a string
// //     //   const aString: string = maybe;
// // }
// //Any 
// // let looselyTyped: any = {};
// // let d = looselyTyped.a.b.c.d;
// //  ^ = let d: any
// //Void: Declaring variables of type void is not useful because you can only assign null (only if --strictNullChecks is not specified, see next section) or undefined to them
// /// Assign Undefied & Null
// //Null and Undefined: Only Assign Undefied || Null
// ///NOTE: By default null and undefined are subtypes of all other types, when using the --strictNullChecks flag, only assignable to unknown, any
// //Object: Object arbitrary
// //let someValue: unknown = "this is a string";
// // let strLength: number = (someValue as string).length;
// // let someValue: unknown = "this is a string";
// // let strLength: number = (<string>someValue).length;
// interface SquareConfig {
//     color?: string;
//     width?: number;
// }
// interface ExcessCheckPassingSquareConfig {
//     color?: string;
//     width?: number;
//     [propName: string]: any;            //index signature 
// }
// interface Point {
//     readonly x: number;
//     readonly y: number;
// }
// // let a: number[] = [1, 2, 3, 4];
// // let ro: readonly number[] = a;       ~ ReadonlyArray<number>
// function createSquare(config: SquareConfig): { color: string; area: number } {
//     return {
//         color: config.color || "red",
//         area: config.width ? config.width * config.width : 20,
//     };
// }
// // createSquare({ width: 100, clour: 0.5 }  );
// createSquare({ width: 100, clour: 0.5 } as SquareConfig);
// let intermediateObj = { width: 100, clour: 0.5 };
// createSquare(intermediateObj);
// //test indexing signature
// interface Test {
//     x: number;
//     y: number;
//     3: number
//     [str: number]: number;
// }
// let test: Object = { x: 10, y: 20, 3: 5 };
// console.log(test["x"])
var someValue = 34;
var strLength = someValue.length;
console.log(strLength);
