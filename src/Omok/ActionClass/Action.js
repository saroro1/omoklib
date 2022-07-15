(function(){
    "use strict";
    class PutComplete{
        status = "ok";
        code = 0;
        period = 0;
        currentTurn = 0;
        lastPut = "";
        boardStack = [];
        rule = {
            "rule" : {},
            "ruleName" : "",
        }
    }

    class BlackWins extends PutComplete{
        status = "bWins";
        code = 5;
        rule = {
            "rule" : {},
            "ruleName" : "",
        }
    }

    class WhiteWins extends PutComplete{
        status = "wWins";
        code = 5;
        rule = {
            "rule" : {},
            "ruleName" : "",
        }
    }


    class Forbid{
        status = "error";
        code = 0;
        reason = "";
        currentTurn = "";
        period = 0;
        boardStack = [];
        rule ={
            "ruleName" : "",
            "rule" : {}
        }
    }
    class Forbid33 extends Forbid{
        code = 3;
        reason = "33";
        rule ={
            "ruleName" : "",
            "rule" : {}
        }
    }

    class Forbid44 extends Forbid{
        code = 4;
        reason = "44";
        rule ={
            "ruleName" : "",
            "rule" : {}
        }
    }
    class Forbid6 extends Forbid{
        code = 6;
        reason = "overline";
        rule ={
            "ruleName" : "",
            "rule" : {}
        }
    }



    class PutError{
        status = "error";
        code = 0;
        reason = "";
    }

    class InvalidPosition{
        code = -2;
        reason = "Coordinate is not valid";
    }
    class Occupied{
        code = -3;
        reason = "Coordinate is not valid";
    }




    class Undo{
        status = "UNDO";
        code = -1;
        currentTurn = "";
        boardStack = [];
        period = 0;
        rule = {
            "ruleName" : "",
            "rule" : {},
        }
        removePos = "";
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

