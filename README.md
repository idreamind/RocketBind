# RocketBind
Signal/Slot technology, build on JavaScript and for JavaScript. (Like in Qt-framework, but in Node.js or io.js.) 

Do you know Qt? If not - Qt is an amazing C++ framework, which provides SIGNAL/SLOT techology. 
That techolology build on events, which called SIGNALs and handlers, called SLOTs.
You can create as many signals, with any available data-type, as you need. 
And, also, you can connect one signal with many-many slots (they must have same data-type).
I try to do something like that for JS.

RocketBind - SIGNAL/SLOT for Node.js and io.js. 

## Philosophy of use:

### General overview of BIND:
```
BIND( SIGNAL, CATCHER, SLOT );
```
SIGNAL - is a name of your signal. [ type of "string" or "function", which returns "string" ]

CATHER - is an object, in the context of which the SLOT is executed. [ type of "object" ] 

SLOT - is a function, which arguments are same whit signal data

### General overview of EMIT: 

```
EMIT( signal );
```

signal - is an object, with needed data. [type of "string", "object", "function", which returns "string" or "object"  ]

Step 1. Create slot. 

It can be any JS-function, with arguments, you whant (arguments are the daty-type for your futer signal).
```
    function Start( rocket ) {
        rocket = rocket || UFO;
        console.log("Start the", rocket);
    }
```
Step 2. Bind your signla and slot:
```
    BIND( 'rocket', Start );
```
Step 3: Emit a signal:
```
    EMIT( { rocket: 'Rocket' } );
    EMIT( { rocket: '' } );
    EMIT( { 'rocket' } );
```
Step 4: Get results:
```
    "Start the Rochet"
    "Start the UFO"
    "Start the UFO"
```

For more examples - see folder ['examples'](/examples)

## Injection:

You can inject the RocketBind in two ways:

1. As the object:
```
    var r = new require('../RocketBind');
```
Usage:
```
    r.BIND( 'rocket', Start );
    r.EMIT( { rocket: 'Rocket' } );
```
2. As a part of a scope:
```
require('../RocketBind');
```
Usage:
```
BIND('rocket', Start);
EMIT({rocket: 'Rocket'});
```

For more examples - see folder ['examples'](/examples)
