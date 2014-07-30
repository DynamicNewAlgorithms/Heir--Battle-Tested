// game.js for Perlenspiel 3.1

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-14 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.
*/

// The following comment lines are for JSLint. Don't remove them!

/*jslint nomen: true, white: true */
/*global PS */

// This is a template for creating new Perlenspiel games

// All of the functions below MUST exist, or the engine will complain!

// PS.init( system, options )
// Initializes the game
// This function should normally begin with a call to PS.gridSize( x, y )
// where x and y are the desired initial dimensions of the grid
// [system] = an object containing engine and platform information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

var RED = {r:231,g:93,b:58};
var BLUE = {r:93,g:52,b:231};
var GREEN = {r:52,g:231,b:93};
var BROWN = {r:84,g:76,b:23};

var modes = {redTurn:'Red Turn',blueTurn:'Blue Turn',redPickHeir:'Red Pick Heir',bluePickHeir:'BLue Pick Heir'};
var mode = modes.redPickHeir;
var hand = {red: {
                a: 5,
                p:5,
                s:5,
                h:{v:2,x:7,y:0}
                },
             blue: {
                 a: 5,
                 p:5,
                 s:5,
                 h:{v:2,x:7,y:7}
             }
            };

function statusLine(x,y) {
    var s = PS.data(x,y);

    PS.statusText(s);
    s = 'Heir: ' + s.isHeir + ', Team : '+ s.team + ', s: '+ s.s;
    s = (mode + ' | ' + x + ', ' + y + ' | ' + s);
    PS.debug(s+'\n');
    PS.statusText(s);
}
PS.init = function( system, options ) {
	"use strict";


	PS.gridSize( 8, 8 );

    for(var x =0; x < 8;x++){
        PS.radius(x,0,50);
        PS.radius(x,7,50);

        for (var y = 1; y < 7; y++) {
            if((x+y)%2 == 1){
                PS.color(x,y,GREEN);
            }
            PS.data(x,y,{isHeir:false,blank:true,team: 'none',s:''});
        }
    }

    PS.glyph(0,0,hand.red.a + '');
    PS.glyph(1,0,'A');
    PS.glyph(2,0,hand.red.s + '');
    PS.glyph(3,0,'S');
    PS.glyph(4,0,hand.red.p + '');
    PS.glyph(5,0,'P');
    PS.glyph(6,0,'H');
    PS.glyph(7,0,hand.red.h.v + '');

    PS.glyph(0,7,hand.blue.a + '');
    PS.glyph(1,7,'A');
    PS.glyph(2,7,hand.blue.s + '');
    PS.glyph(3,7,'S');
    PS.glyph(4,7,hand.blue.p + '');
    PS.glyph(5,7,'P');
    PS.glyph(6,7,'H');
    PS.glyph(7,7,hand.blue.h.v + '');
	// Add any other initialization code you need here
};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.touch = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead
};

// PS.release ( x, y, data, options )
// Called when the mouse button is released over a bead, or when a touch is lifted off a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.release = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead
};

// PS.enter ( x, y, button, data, options )
// Called when the mouse/touch enters a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.enter = function( x, y, data, options ) {
	"use strict";
    statusLine(x,y)
	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.exit = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead
};

// PS.exitGrid ( options )
// Called when the mouse cursor/touch exits the grid perimeter
// It doesn't have to do anything
// [options] = an object with optional parameters; see documentation for details

PS.exitGrid = function( options ) {
	"use strict";

	// Uncomment the following line to verify operation
	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid
};

// PS.keyDown ( key, shift, ctrl, options )
// Called when a key on the keyboard is pressed
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F1
// [shift] = true if shift key is held down, else false
// [ctrl] = true if control key is held down, else false
// [options] = an object with optional parameters; see documentation for details

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	//	PS.debug( "DOWN: key = " + key + ", shift = " + shift + "\n" );

	// Add code here for when a key is pressed
};

// PS.keyUp ( key, shift, ctrl, options )
// Called when a key on the keyboard is released
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F12
// [shift] = true if shift key is held down, false otherwise
// [ctrl] = true if control key is held down, false otherwise
// [options] = an object with optional parameters; see documentation for details

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is released
};

// PS.input ( sensors, options )
// Called when an input device event (other than mouse/touch/keyboard) is detected
// It doesn't have to do anything
// [sensors] = an object with sensor information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.input = function( sensors, options ) {
	"use strict";

	// Uncomment the following block to inspect parameters
	/*
	PS.debug( "PS.input() called\n" );
	var device = sensors.wheel; // check for scroll wheel
	if ( device )
	{
		PS.debug( "sensors.wheel = " + device + "\n" );
	}
	*/
	
	// Add code here for when an input event is detected
};

function c(a,d) {

    while (a.length > 0 && d.length > 0){
        var r = cc(a,d);
        a = r[0];
        d = r[1];
    }
    return [a,d];
}

function cc(a,d){


    var aa = a[0];
    var dd = d[0];
    if (aa == 'a') {
        if ( dd == 'a'){
            return [a,d];
        } else if(dd == 's') {
            d = d.substr(1);
            a = a + dd;
            return [a,d];
        } else if(dd == 'p') {
            a = a.substr(1);
            d = d + aa;
            return [a,d];
        }
    } else if (aa == 's') {
        if ( dd == 'a'){
            a = a.substr(1);
            d = d + aa;
            return [a,d];
        } else if(dd == 's') {
            return [a,d];
        } else if(dd == 'p') {
            d = d.substr(1);
            a = a + dd;
            return [a,d];
        }
    } else if (aa == 'p') {
        if ( dd == 'a'){
            d = d.substr(1);
            a = a + dd;
            return [a,d];
        } else if(dd == 's') {
            a = a.substr(1);
            d = d + aa;
            return [a,d];
        } else if(dd == 'p') {
            return [a,d];
        }
    }
}

