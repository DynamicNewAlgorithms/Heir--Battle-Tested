//Dynamic New Algorithms

// P -> A -> S -> P

/*TODO:

  */

var S = {
    size: {x:8,y:5},
    infoID: {tile:'loc',
             isHeir: 'isHeir',
             team: 'team',
             strength: 's'},
    originTile:{active:false,x:undefined,y:undefined}
};
var R = {
    hand:{}
};
var B = {
    hand:{}
};

var RED = {r:231,g:93,b:58};
var BLUE = {r:93,g:52,b:231};
var GREEN = {r:52,g:231,b:93};
var BROWN = {r:84,g:76,b:23};
var YELLOW = {r:231,g:231,b:84};
var BLACK = {r:0,g:0,b:0}


var tileYAlias = ['Red Hand','A','B','C','D','E','Blue Hand'];
var tileHandAlias = ['Accuracy Remaining','Accuracy','Speed Remaining','Speed','Power Remaining','Power','Heir Bonus','Heir Bonus Remaining'];


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

    PS.statusText(s.s);
    var tile = ''
    if(y == 0 || y == S.size.y+1){
        tile = tileHandAlias[x] + ', ' + tileYAlias[y];
    } else {
        tile = (x+1) + ', ' + tileYAlias[y];
    }

    document.getElementById("loc").innerHTML = "Tile: "+ tile;
    document.getElementById("isHeir").innerHTML = "Heir: "+ s.isHeir;
    document.getElementById("team").innerHTML = "Team: "+ s.team;
    document.getElementById("s").innerHTML = "Combo: "+ s.s;


}
PS.init = function( system, options ) {
	"use strict";


	PS.gridSize(S.size.x, S.size.y+2 );

    for(var x =0; x < S.size.x;x++){
        PS.radius(x,0,50);
        PS.data(x,0,{isHeir:false,blank:false,team: 'Red',isHand:true,s:'',active:false});
        PS.radius(x, S.size.y+1,50);

        for (var y = 1; y < S.size.y+1; y++) {
            if((x+y)%2 == 1){
                PS.color(x,y,GREEN);
            }
            PS.data(x,y,{isHeir:false,blank:true,team: 'none',isHand:false,s:'',active:false});
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

    PS.glyph(0,S.size.y+1,hand.blue.a + '');
    PS.glyph(1,S.size.y+1,'A');
    PS.glyph(2,S.size.y+1,hand.blue.s + '');
    PS.glyph(3,S.size.y+1,'S');
    PS.glyph(4,S.size.y+1,hand.blue.p + '');
    PS.glyph(5,S.size.y+1,'P');
    PS.glyph(6,S.size.y+1,'H');
    PS.glyph(7,S.size.y+1,hand.blue.h.v + '');
	// Add any other initialization code you need here
};


PS.touch = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead
};


PS.release = function( x, y, data, options ) {
	"use strict";
    if(!data.isHand) {
        if (data.active) {
            PS.borderColor(x,y, BLACK);
            PS.border(x,y,1);
            data.active = !data.active;
            PS.data(x,y,data);
            S.originTile.active = true;
            S.originTile.x = x;
            S.originTile.y = y;
        } else {
            PS.borderColor(x,y, YELLOW);
            PS.border(x,y,10);
            data.active = !data.active;
            PS.data(x,y,data);
            S.originTile.active = false;
        }
    }
	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead
};


PS.enter = function( x, y, data, options ) {
	"use strict";
    statusLine(x,y);
	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};


PS.exit = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead
};


PS.exitGrid = function( options ) {
	"use strict";

	// Uncomment the following line to verify operation
	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid
};


PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	//	PS.debug( "DOWN: key = " + key + ", shift = " + shift + "\n" );

	// Add code here for when a key is pressed
};


PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is released
};


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
    var ag = '';
    var dg = '';
    var long = (a.length > 1 && d.length > 1);
    var oa = a.length;
    var od = d.length;
    while (a.length > 0 && d.length > 0){
        var r = cc(a,d,long);
        a = r[0];
        d = r[1];
        ag += r[2];
        dg += r[3];
    }
    if( a.length >= 0) {
        a = a + ag;
        ag = '';
    }
    if(d.length >= 0){
        d = d + dg;
        dg = '';
    }
    return [a,d,ag,dg];
}
// P -> A -> S -> P
function cc(a,d, long){
    if(long === undefined) { long=false;}

    var aa = a[0];
    var dd = d[0];
    var w = 't';
    if (aa === 'p'){
        if (dd === 'p'){

        } else if(dd === 'a') {
            w = 'a';
        } else if(dd === 's') {
            w = 'd';
        }
    } else if(aa === 'a') {
        if (dd === 'p'){
            w = 'd';
        } else if(dd === 'a') {

        } else if(dd === 's') {
            w = 'a';
        }
    } else if(aa === 's') {
        if (dd === 'p'){
            w = 'a';
        } else if(dd === 'a') {

        } else if(dd === 's') {
            w = 'd';
        }
    }

    if (w === 't' && long) {
        a = a.substr(1);
        d = d.substr(1);
        return [a,d,dd,aa];
    } else if(w === 'a'){
        d = d.substr(1);
        return [a,d,dd,''];
    } else if(w === 'd'){
        a = a.substr(1);
        return [a,d,'',aa];
    }
    return ['','',d,a];
}

function s(a){
    var s = '';

    var op = ['','a','p','s'];
    for (var i = 0; i < a.length; i++){
        s = s + op[a[i]];
    }
    return s;
}
function t(){

    var a = ['p','s','a',
        'pp','ps','sp','ss','sa','as','aa','ap','pa',
        'ppp','pps','psp','spp',
              'ppa','pap','app',
        'sss','ssp','sps','pss',
              'ssa','sas','ass',
        'aaa','aap','apa','app',
              'aas','asa','saa',
        'asp','sap','aps','spa','pas','psa'];
    var d = ['p','s','a',
        'pp','ps','sp','ss','sa','as','aa','ap','pa',
        'ppp','pps','psp','spp',
        'ppa','pap','app',
        'sss','ssp','sps','pss',
        'ssa','sas','ass',
        'aaa','aap','apa','app',
        'aas','asa','saa',
        'asp','sap','aps','spa','pas','psa'];

    for(var ai = 0; ai < a.length;ai++){

        for(var di = 0; di < d.length; di++){

            var r = c(a[ai],d[di]);
            console.log(a[ai] +' vs '+d[di] + ' -> ' + r[0] + ' vs ' + r[1]);
        }
    }
}
