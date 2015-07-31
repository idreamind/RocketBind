function R() {
    var r = this,                   // Public
        p = Object.create( null ),  // Private
        A = Object.create( null ),  // SIGNAL / SLOT array
        E = Object.create( null );  // ERROR object

    E.wrongSignal = function( arg ) {
        throw Error('ERROR! BIND( SIGNAL, ... ); Signal - wrong type. [Have to be: "function", "string" ]');
    };
    E.catcher = function( arg ) {
        throw Error('ERROR! BIND( ..., CATCHER, ... ); CATCHER - wrong type. [Have to be: "function", "object" ]');
    };
    E.slot = function( arg ) {
        throw Error('ERROR! BIND( ..., SLOT ); SLOT - wrong type. [Have to be: "function" ]');
    };
    E.noSlot = function( arg ) {
        console.log( 'WARNING! BIND( ..., SLOT ); No SLOT for signal <' + arg + '>' );
    };

    // Set public methods:
    r.BIND = BIND;
    r.EMIT = EMIT;
    // Set private methods:
    p.register = register;
    p.resolve  = resolve;

    function BIND( signal, catcher, slot ) {    // MAIN BINDER:
        slot = slot || null;
        var _signal = null;
        switch ( typeof signal ) {              // Check a Signal Type:
            case "string":
                _signal = signal;
                break;
            case "function":
                var str = signal();
                if( typeof str === "string" ) _signal = str;
                else E.wrongSignal();
                break;
            default:
                E.wrongSignal();
        }
        if( catcher ) { // Check a Catcher Type:
            if( typeof catcher !== "function" && typeof catcher !== "object" ) E.catcher();
        }
        if( !slot ) {   // Check a Slot:
            p.register( _signal, null, catcher );
        } else {
            if( typeof slot !== "function" ) E.slot();
            p.register( _signal, catcher, slot );
        }
    }

    function register( signal, catcher, slot ) {    // Register event:
        A[signal] = {
            catcher: catcher || null,
            slot: slot
        };
    }

    function EMIT( signal ) {   // MAIN EMIT:
        var _signal = null;
        switch ( typeof signal ) {
            case "object":
                _signal = signal;
                break;
            case "string":
                var obj = Object.create(null);
                obj[signal] = "";
                _signal = obj;
                break;
            case "function":
                r.EMIT( signal() );
                return;
            default:
                E.wrongSignal();
        }
        p.resolve( _signal );
    }

    function resolve( signal ) {     // Resolve object's emission:
        var name = null,
            data = null;
        for( var p in signal ) {
            name = p;
            data = signal[p];
            if( data ) break;
        }
        if( !name ) E.noSlot( signal );
        var obj = A[name];
        if( obj.catcher ) obj.slot.call( obj.catcher, data );
        else obj.slot( data );
    }

    return r;
}
module.exports = R();