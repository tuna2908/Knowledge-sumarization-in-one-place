
interface LabeledValue {
    label: string;
    size: number;
}

let testLabel: LabeledValue;

let myObj = { size: 10, label: "Size 10 Object", cc: "df" };

testLabel = myObj;
testLabel = { size: 10, label: "Size 10 Object", cc: "df" } as LabeledValue;  //err

interface SquareConfig {
    color?: string;
    width?: number;
    // [propName: string]: any;

}


function createSquare(config: SquareConfig) {
    console.log(config.color);
}

// let mySquare = createSquare({ colour: "red", width: 100 });

let temp = { color: "red", width: 100, colour: "red" }
let temp2 = { width: 100, colour: "red" }

let mySquare3 = createSquare(temp2);



// interface LabeledValue {
//   color: string;
//   width: number;
// }

// function printLabel(labeledObj: LabeledValue) {
//   console.log(labeledObj.color);
// }

// let myObj2 = { width: 10, color: "Size 10 Object", agi: "df" };
// printLabel(myObj2);


let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);