(function(){
    function PutComplete(){
        this.status = "ok";
        this.code = 0;
        this.period = 0;
        this.currentTurn = 0;
        this.boardStack = [];
        this.lastPut = "";
        this.rule ={
            "ruleName" : "",
            "rule" : {}
        }
    }

    function BlackWins(){
        this.status = "bWins";
        this.code = 5;
        this.period = 0;
        this.currentTurn = 0;
        this.boardStack = [];
        this.lastPut = "";
        this.rule ={
            "ruleName" : "",
            "rule" : {}
        }
    }
    function WhiteWins(){
        this.status = "wWins"
        this.code = 5;
        this.period = 0;
        this.currentTurn = 0;
        this.boardStack = [];
        this.lastPut = "";
        this.rule ={
            "ruleName" : "",
            "rule" : {}
        }
    }

    BlackWins.prototype = Object.create(PutComplete.prototype);
    BlackWins.prototype.constructor = BlackWins;

    WhiteWins.prototype = Object.create(PutComplete.prototype);
    WhiteWins.prototype.constructor = WhiteWins;


    function Forbid(){
        this.status = "error";
        this.code = 0;
        this.reason = "";
        this.period = 0;
        this.currentTurn = "";
        this.boardStack = [];
        this.rule ={
            "ruleName" : "",
            "rule" : {}
        }

    }

    function Forbid33(){
        this.status = "error";
        this.code = 3;
        this.reason = "33";
        this.period = 0;
        this.currentTurn = "";
        this.boardStack = [];
        this.rule ={
            "ruleName" : "",
            "rule" : {}
        }

    }
    function Forbid44(){
        this.status = "error";
        this.code = 4;
        this.reason = "44";
        this.period = 0;
        this.currentTurn = "";
        this.boardStack = [];
        this.rule ={
            "ruleName" : "",
            "rule" : {}
        }


    }
    function Forbid6(){
        this.status = "error";
        this.code = 6;
        this.reason = "6";
        this.period = 0;
        this.currentTurn = "";
        this.boardStack = [];
        this.rule ={
            "ruleName" : "",
            "rule" : {}
        }

    }


    Forbid33.prototype = Object.create(Forbid.prototype);
    Forbid33.prototype.constructor = Forbid33;
    Forbid44.prototype = Object.create(Forbid.prototype);
    Forbid44.prototype.constructor = Forbid44;
    Forbid6.prototype = Object.create(Forbid.prototype);
    Forbid6.prototype.constructor = Forbid6;

    function PutError(){
        this.status = "error";
        this.code = 0;
        this.reason = "";
    }

    function InvalidPosition(){
        this.status = "error";
        this.code = -2
        this.reason = "Coordinate is not valid"

    }

    function Occupied(){
        this.status = "error";
        this.code = -3
        this.reason = "Stone is already existed"

    }

    InvalidPosition.prototype = Object.create(PutError.prototype);
    InvalidPosition.prototype.constructor = InvalidPosition;
    Occupied.prototype = Object.create(PutError.prototype);
    Occupied.prototype.constructor = Occupied;

    function Undo(){
        this.status = "UNDO";
        this.code = -1;
        this.currentTurn = "";
        this.boardStack = [];
        this.period = 0;
        this.rule = {
            "ruleName" : "",
            "rule" : {},
        }
        this.removePos = "";

    }
    module.exports = {
        PutComplete: PutComplete,
        BlackWins : BlackWins,
        WhiteWins : WhiteWins,
        Forbid : Forbid,
        Forbid33 : Forbid33,
        Forbid44: Forbid44,
        Forbid6 : Forbid6,
        PutError : PutError,
        InvalidPosition : InvalidPosition,
        Occupied : Occupied,
        Undo : Undo,
    }





})();

