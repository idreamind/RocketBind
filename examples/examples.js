/**
 * Created by VoitsehovskyKA on 30.07.2015.
 */

// Connect module:
var r = new require('../RocketBind');

{
    console.log( "\nSimple BIND: SIGNAL - 'string', SLOT - An independent 'function':" );
    function Start(rocket) {
        console.log("Start the", rocket);
    }

    r.BIND('rocket', Start);
    r.EMIT({rocket: 'Rocket'});
}

{
    console.log( "\nSimple BIND: SIGNAL - 'string', SLOT - An independent function:" );
    function Far() {
        console.log("In a far far Galaxy, many-many time ago...");
    }

    r.BIND('galaxy', Far);
    r.EMIT('galaxy');
}

{
    console.log( "\nSimple BIND: SIGNAL - 'function', which returns 'object', SLOT - An independent 'function':" );
    function Fly(ufo) {
        console.log("Flying of the", ufo);
    }

    function UFO() {
        return {ufo: 'UFO'};
    }

    r.BIND('ufo', Fly);
    r.EMIT(UFO);
}

{
    console.log( "\nSimple BIND: SIGNAL - 'function', which returns 'string', SLOT - An independent 'function':" );
    function Star() {
        console.log("Flying to a star on warp");
    }

    function Warp() {
        return 'warp';
    }

    r.BIND('warp', Star);
    r.EMIT(Warp);
}

{
    console.log( "\nMultiple Signals:" );
    function JustDoIt(arg) {
        arg = arg || arg;
        console.log("Just do it", arg);
    }

    r.BIND('just', JustDoIt);
    r.EMIT('just');
    r.EMIT({just: ''});
    r.EMIT({just: 'Take to the Moon'});
    r.EMIT({just: 'Take to the Sun'});
    r.EMIT({just: 'Take to the Dantuine'});
}

{
    console.log( "\nBIND: SLOT - A 'function' in a context of an object:" );
    var ship = 'Millennium Falcon';

    function SpaceShip( title ) {
        var s = this.ship || ship;
        title = title || s;
        console.log( "The Spaceship called", title );
    }

    var context = Object.create(null);
    context.ship = 'Enterprise';

    r.BIND('ship', context, SpaceShip);
    r.EMIT('ship');

    r.BIND('ship', SpaceShip);
    r.EMIT('ship');
}
