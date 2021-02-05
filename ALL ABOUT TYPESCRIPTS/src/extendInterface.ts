interface Shape {
    color: string;
}


interface PenStroke {
    penWidth: number;
}


interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;

enum color {
    blue,
    green, red
};
square.color = "dfdf";
square.sideLength = color["blue"];
square.color = "blue";
square.sideLength = 10;
square.penWidth = 20;