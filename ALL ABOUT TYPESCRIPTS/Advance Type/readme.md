## ❯ Advanced Types

This page lists some of the more **Advanced Ways** that you can use to model **your types**, it would works beautifully if you **combined** with the **Utility Types doc** which includes types which are included in TypeScript and available globally.

Try it!! We are happy to hear your feedback or any kind of new features.

## ❯ Table of Contents

1. [Type Guards and Differentiating Types](#typeGuardsAndDifferentiaingTypes)<br>
1.1. [User-Defined Type Guards](#-user-defined-type-guards)<br>
1.1.1. [Using type predicates]()<br>
1.1.2. [Using the in operator]()<br>
1.2. [typeof type guards](#-debugger-in-vscode)<br>
1.3. [instanceof type guards](#-api-routes)<br>
2. [Nullable types](#-project-structure)<br>
2.1. [Optional parameters and properties]()<br>
2.2. [Type guards and type assertions]()<br>
3. [Type Aliases](#-logging)
4. [Interfaces vs. Type Aliases](#-event-dispatching)
5. [Enum Member Types](#-seeding)
6. [Polymorphic **this** types](#-graph-q-l)
7. [Index types](#-docker)<br>
7.1 [Index types and index signatures](#-further-documentations)<br>
8. [Mapped types](#-related-projects)<br>
8.1 [Inference from mapped types](#-license)<br>



## 1. Type Guards and Differentiating Types

Problem 1:
**An Union type** contains **a number of types** can be mixed in just one type. Giving the union of type **Pet** of **Fish** and **Bird** 
=> Check if an arbitrary Variable having type **Pet** is a **Fish** or **Bird**.

**Hint:** you would need to **check for the presence of a member (props or methods)** inside **these types**

You should **normally** have these code to solve the above problem using:
- **'in' operator expression**: "swim" in pet
- **property access syntax**: pet.fly
```bash
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();

if ("swim" in pet) { // You can use the 'in operator expression' to check
  pet.swim();
}
// However, you cannot use 'property access syntax', cause havent known the exact type yet
if (pet.fly) {  // err => Property 'fly' does not exist on type 'Fish | Bird'.
  pet.fly();
}
```
To get the same code working via **property access syntax** we’ll need to use a **type assertion syntax**
```bash
let fishPet = pet as Fish;
let birdPet = pet as Bird;

if (fishPet.swim) {
  fishPet.swim();
} else if (birdPet.fly) {
  birdPet.fly();
}
```
Okay, still!! There exists **a more reliable way** to solve the problem using **User-Defined Type Guards**. Let's jump right into it.
### 1.1. User-Defined Type Guards

It would be much better if once we performed the check, we could know the type of pet within each branch.
TypeScript has something called **a type guard**, which:
- is **some expression** that performs **a runtime check** that guarantees the type in some scope.
- these "**some expression**", can be defined using **Type predicates**, **Using the in operator** one of syntax in **User-Defined Type Guards** 
- or **typeof type guards** as well as **instanceof type guards**


#### 1.1.1. Using type predicates
To define a type guard => Define a function returning type is **a type predicate syntax**:
```bash
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```
In our example ``pet is Fish`` is our **type predicate**. 
A predicate is declared as ``parameterName is Type``, where ``parameterName`` must be in **one of the function parameters' name**.

More example:
Giving an **array zoo** of union Fish | Bird. Using **type guards isFish** to filter an array of Fish | Bird and obtain an array of Fish.

```bash
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Pet = Fish | Bird  //union Pet

const bitchFish = { swim: () => { } };
const bitchBird = { fly: () => { } };

function getSmallPet(): Pet {
    return (Math.floor((Math.random() * 10) + 1) % 2) ? bitchFish : bitchBird;
};
function isFish(pet: Pet): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
// ---cut---
const zoo: (Pet)[] = [getSmallPet(), getSmallPet(), getSmallPet()];

const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter<Fish>(isFish);
//or
const underWater3: Fish[] = zoo.filter<Fish>((pet):pet is Fish => isFish(pet));

//not
const underWater4: Fish[] = zoo.filter<Fish>((pet) => isFish(pet));
//=> err: Argument of type '(pet: Fish | Bird) => boolean' is not assignable to parameter of type '(value: Fish | Bird, index: number, array: (Fish | Bird)[]) => value is Fish'.
//Signature '(pet: Fish | Bird): boolean' must be a type predicate.
```

#### 1.1.2. Using the in operator
The **in** operator also acts as a **narrowing expression** for types.

For a ***n*** **in** ***x*** expression, where ***n*** is a string literal or string literal type and ***x*** is a union type: 
- “true” => narrows to types in union ***x*** which have an **optional** or **required** property ***n***. 
- “false” branch narrows to types in union ***x*** which have an **optional** or **missing** property ***n***.


```bash
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}
```

### 1.2. typeof type guards
Having to define a **type-predicate type guard** to figure out if a type is a primitive is **kind of a pain**.
```bash
function isNumber(x: any): x is number {
  return typeof x === "number";
}
function isString(x: any): x is string {
  return typeof x === "string";
}
```
**Luckily**, TypeScript allows you to check inline the premitive types using ***typeof*** and will recognize this expression as a **type guard** on its own.
```bash
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {   // mean padding is number
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") { // mean padding is number
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```
- *typeof type guards* are recognized in two different forms: 
  **typeof v === "typename" and typeof v !== "typename",**
where "typename" can be one of typeof operator’s return predifined values **("undefined", "number", "string", "boolean", "bigint", "symbol", "object", or "function")**. 
- TypeScript **won’t stop you** from comparing to **other strings**, the language **won’t recognize those expressions as type guards.**

### 1.3. instanceof type guards
instanceof type guards are a way of narrowing types using their **constructor function**:
Declearation: **instanceof type guards** = **n** ***instanceof*** **AClassContructorFunction**
```bash
class SpaceRepeatingPadder {
  constructor(private numSpaces: number) { }
  getPaddingStringBySpace() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder {
  constructor(private value: string) { }
  getPaddingString() {
    return this.value;
  }
}

type Padder = SpaceRepeatingPadder | StringPadder;

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder("  ");
}

let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder.getPaddingStringBySpace();
}
if (padder instanceof StringPadder) {
  padder.getPaddingString();
}
```

## 2. Nullable types
By default, the **type checker** considers null and undefined assignable to anythin => null and undefined are valid values of every type. 
The `--strictNullChecks` flag fixes this: when you declare a variable, it doesn’t automatically include null or undefined. You can include them **explicitly using a union type**:

```bash
let exampleString = "foo";
exampleString = null;
//Type 'null' is not assignable to type 'string'.

let stringOrNull: string | null = "bar";
stringOrNull = null;

stringOrNull = undefined;
//Type 'undefined' is not assignable to type 'string | null'.
```

### 2.1. Optional parameters and properties
With --strictNullChecks, an ``optional`` parameter automatically adds | undefined:

```bash
function f(x: number, y?: number) {
  return x + (y ?? 0);
}

f(1, 2);
f(1);
f(1, undefined);
f(1, null);
//Argument of type 'null' is not assignable to parameter of type 'number | undefined'.
```
The same is true for optional properties:
```bash
class C {
  a: number;
  b?: number;
}

let c = new C();

c.a = 12;
c.a = undefined;
//Type 'undefined' is not assignable to type 'number'.
c.b = 13;
c.b = undefined;
c.b = null;
//Type 'null' is not assignable to type 'number | undefined'.
```

### 2.2. Type guards and type assertions
**get rid of the nullable types** in union using a **type guard**:
```bash
function f(stringOrNull: string | null): string {
  if (stringOrNull === null) {
    return "default";
  } else {
    return stringOrNull;
  }
}
```
**get rid of the nullable types** in union using **terser operators ``??``**:
```bash
function f(stringOrNull: string | null): string {
  return stringOrNull ?? "default";
}
```
**get rid of the nullable types** in union using **type assertion ``as`` and postfix ``!`` in  ``identifier!``**:
```bash
function getUser(id: string): UserAccount | undefined {
  return {} as any;
}

interface UserAccount {
  id: number;
  email?: string;
}
const user = getUser("admin");

user.id;  //type checker will check this as undefined indentifier

// Instead if you are sure that these objects or fields exist (not undefined or null), the
// postfix ! lets you short circuit the nullability
user!.email!.length;
```
## 3. Type Aliases
- Aliasing **create a new name for a type**. 
- Aliasing are sometimes **similar to interfaces**, but **can name primitives**, unions, tuples, and any other types.
- Aliasing **doesn’t actually create a new type** - it creates a new referenced name to that type. 
- Aliasing a primitive **isn't so terribly to use**
```bash
type Second = number;

let timeInSecond: number = 10;
let time: Second = 10;
```

- Aliasing can also be **generic**:
```bash
type Container<T> = { value: T };
```

- Aliasing can **refer to itself** in a property:
```bash
type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};
```

- And, aliasing can create some pretty mind-blending type =)):
```bash
declare function getDriversLicenseQueue(): LinkedList<Person>;
//   ^? Person & {next: LinkedList<Person>}
//   ^? {name:string} & {next: LinkedList<{name:string}>}
//   ^? {name:string} & {next: {name:string} & {next: LinkedList<{name:string}>}}
//   v..v..

type LinkedList<Type> = Type & { next: LinkedList<Type> };

interface Person {
  name: string;
}

let people = getDriversLicenseQueue();
people.name;
people.next.name;
people.next.next.name;
people.next.next.next.name;
//                  ^?
```

## 4. Interfaces vs. Type Aliases
 Almost all features of an interface are available in type, **the key distinction** is that: 
 - a type or type aliases **cannot** be re-opened to **add new properties**.
 - but an interface which is **always** extendable.
 
 Route          | Description |
| -------------- | ----------- |
|   Extending an interface     | Extending a type via intersections|
|  interface Animal {<br>name: string<br>}<br>interface Bear extends Animal {<br>honey: boolean<br>}<br>const bear = getBear() <br>bear.name<br>bear.honey|type Animal = {<br>name: string<br>}<br>type Bear = Animal & { <br>honey: Boolean<br>}<br>const bear = getBear();<br>bear.name;<br>bear.honey;  |
||||

**ding new fields to an existing interface**
```bash
interface Window {
  title: string
}

interface Window {
  ts: import("typescript")
}

const src = 'const a = "Hello World"';


window.ts.transpileModule(src, {});
```

**type cannot be changed after being created**

```bash
type Window = {
  title: string
}

type Window = {
  ts: import("typescript")
}

// Error: Duplicate identifier 'Window'.
```
**Note**: 
- It is recommended using an interface over a type alias when possible for the extendabilities.

-  the other hand, if you **can’t express some shape with an interface** and you need to use a union or tuple type, type aliases are usually the way to go.


## 5. Enum Member Types
Enum can be used as a type:
```bash
// @errors: 2322
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;  // ~ kind: number?
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Circle,
  radius: 100,
};
```

## 6. Polymorphic this types
A polymorphic this type represents a type that is the subtype of the containing class or interface. This is called F-bounded polymorphism, a lot of people know it as the fluent API pattern. This makes hierarchical fluent interfaces much easier to express, for example. Take a simple calculator that returns this after each operation:
```bash
class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... other operations go here ...
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue();
```
Since the class uses this types, you can extend it and the new class can use the old methods with no changes.
```bash
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... other operations go here ...
}

let v = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
```

## 7. Index types
