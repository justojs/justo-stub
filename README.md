[![Build Status](https://travis-ci.org/justojs/justo-stub.svg)](https://travis-ci.org/JustoJS/justo-stub)

A test stub library.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Test doubles

A **test double** is an object that represents other, used to perform in unit testings.
There are several types of test doubles:

- **Test dummies**. Test double that responds to calls with no action.
- **Test stubs**. Test double that responds to calls with predefined responses.
- **Test spies**. Test double that monitors the calls to an object.

## Test stubs

A **test stub** is a test double that has prepared or predefined responses, that
is, it responds to calls with predefined responses.

## Install

```
npm install justo-stub
```

## stub()

The `stub()` function is used to create the stubs:

```
const stub = require("justo-stub");
```

## Function stub

A **function stub** represents a function with prepared responses.
When it is called, it returns the prepared and configured response.
The `stub()` overload to use is:

```
stub() : function
```

Example:

```
var sum = stub();
```

### API stub

The function returned by the `stub()` function contains a property, `stub`,
which is used to configure the stub.

### Configuring responses

The responses can be indexed or argued.

#### Configuring indexed responses

When we need a response or another, attending to the number of call, we configure the responses
with the `respond()` method:

```
respond(numberOfCall : number, call : object)
```

Example:

```
var sum = stub();
sum.stub.respond(0, {value: 123});
sum.stub.respond(1, {value: 321});
```

#### Configuring argued responses

If we want to set the response attending to the arguments passed to the function stub, we use the following overload:

```
respond(call : object)
```

Example:

```
var sum = stub();
sum.stub.respond({args: [], error: new Error("Arguments expected.")});
sum.stub.respond({args: [1], value: 1});
sum.stub.respond({args: [1, 2], value: 3});
```

#### Configuring default response

The function stub can have a default response. This is used when other response can't be used.
This response is configured skipping the `args` field.

Example:

```
var sum = stub();
sum.stub.respond({value: 0});               //default response
sum.stub.respond({args: [], value: 0});     //argued response
sum.stub.respond({args: [1, 2], value: 3}); //another argued response
sum.stub.respond(0, {value: 1});            //indexed response
sum.stub.respond(1, {value: 2});            //another indexed response
```

#### Config parameter

The calls can have the following fields:

- `args` (Object[]). Arguments associated to the call/response.
- `error` (Object). Error to throw.
- `value` (Object). Value to return.

When we configure an indexed response, the `args` field is unnecessary. However, if we configure a response
with arguments, we must set the arguments using `args`. We can configure the default response, non-indexed,
skipping the `args` field; this response is known as **default response**.

#### Call resolution

To find a response, the stub does the following:

1. If it has indexed responses, the stub finds into the indexed responses.
2. If the previous step returns none, the stub finds into the responses with arguments.
3. If the previous step returns none, the stub returns the default response.

Here are some examples:

```
const stub = require("justo-stub");

var sum = stub();

sum.stub.respond(0, {value: "one"});
sum.stub.respond(1, {value: "two"});
sum.stub.respond({value: "default"});
sum.stub.respond({args: [], value: 0});
sum.stub.respond({args: [1], value: 1});
sum.stub.respond({args: [1, 2], value: 3});
sum.stub.respond({args: [2, 1], error: new Error()});

sum([]);        //1st call: "one"
sum([]);        //2nd call: "two"
sum([]);        //3rd call, but no indexed response; use arguments: 0
sum([]);        //0
sum([1, 2]);    //3
sum([1, 2, 3]); //non-indexed and non-argued responses, then default response
sum([2, 1]);    //throw error
```

## Object stub

An **object stub** is an object whose responses are predefined, similarly to
the function stubs. We can configure responses to methods and attributes.

### Creating object stubs

To create an object stub, we have to use the `stub()` function:

```
stub(obj : object) : object
stub(obj : object, members : object) : object
```

Example:

```
var calcul = stub({});
var calcul = stub({}, {"sum()": {args: [1, 2], value: 3}});
```

When we only want to indicate the value, if it is not a direct instance of `Object`,
we can indicate the value directly. For example:

```
stub({}, {"@length": 123})
stub({}, {"@items": [0, 1, 2]});
stub({}, {"@state": State.OPEN});
```

is similar to:

```
stub({}, {"@length": {value: 123}});
stub({}, {"@items": {value: [0, 1, 2]}});
stub({}, {"@state": {value: State.OPEN}});
```

However, when the value is a direct instance of `Object`, we need to specify the
value into an object as follows:

```
//wrong
stub({}, {"@point": {x: 1, y: 2}});

//ok
stub({}, {"@point": {value: {x: 1, y: 2}}});
```

### API stub

The object returned by the `stub()` function contains a property,
`stub`, which is used to configure the object stub.

### Configuring responses

The object stubs can configure responses for attributes and methods. This configuration is
very similar to function stub. We must use the `stub` property of the object stub.

#### Configuring methods

To configure a method response, we will use the `respond()` method of the API object:

```
respond(name : string, config : config)
respond(name : string, i : number, config : config)
```

The method is similar to the `respond()` method of the function stubs, but
now we have to indicate the method name.

Example:

```
var calcul = stub({});

calcul.stub.respond("sum()", 0, {value: 1});
calcul.stub.respond("sum()", 2, {value: 2});
calcul.stub.respond("sum()", {args: [], value: 0});
calcul.stub.respond("sum()", {args: [1, 2], value: 3});
```

Once we have added a response, we will see the method in the object. It's **very important**
to use parentheses after the method name.

#### Configuring attributes

To configure an attribute response, we will use the following signature of the `respond()`
method:

```
respond(name : string, config : object)
respond(name : string, i : number, config : object)
```

Where the `name` parameter is the attribute name and this must be prefixed by an ` @`.
The `config` parameter is the configuration:

- `value` (object). The value to return.
- `error` (object). The error to throw.

If we want to configure several responses, attending to the number of access,
we have to indicate the `i` parameter.

Example:

```
var user = stub({});

user.stub.respond("@username", {value: "usr01"});
user.stub.respond("@password", {value: "pwd"});
user.stub.respond("@status", 0, {value: "open"});
user.stub.respond("@status", 3, {value: "locked"});

user.username;  //user01
user.password;  //pwd
user.status;    //1st call: open
user.status;    //2nd call: locked
```

To differentiate the response of a method from an attribute, with the methods
we add `()` after the method name; with the attributes, prefix the name
by `@`:

```
user.stub.respond("changePassword()", {args: ["newPwd"], value: true});
user.stub.respond("@status", 0, {value: "open"})
```
