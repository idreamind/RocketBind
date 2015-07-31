/**
 * Created by VoitsehovskyKA on 31.07.2015.
 */

// Connect module:
require('../RocketBind');

console.log("\nEmbedding:");
function Start(rocket) {
    console.log("Start the", rocket);
}

BIND('rocket', Start);
EMIT({rocket: 'Rocket'});