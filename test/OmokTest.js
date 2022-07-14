const chai = require("chai");
const expect = chai.expect;
const Omok  = require("../index");
const assert = require("assert");

const game = new Omok.Omok();
describe("오목", function () {
    it("착수 확인", function () {
        game.reset();
        assert.strictEqual( game.putStone("H122") instanceof Omok.InvalidPosition ,true)
        assert.strictEqual( game.putStone("H10") instanceof Omok.PutComplete ,true)
        assert.strictEqual( game.putStone("가난다다난ㅁㅇㄹ") instanceof Omok.InvalidPosition ,true)
        assert.strictEqual( game.putStone("H10") instanceof Omok.Occupied ,true)
        console.log(game.getBoard())
        console.log(game.getTurn());
        console.log(game.getImage());
    });
    it("5가 만들어지는 경우 확인", function () {
        game.reset();
        game.putStone("H8");
        game.putStone("A1");
        game.putStone("G7");
        game.putStone("A2");
        game.putStone("I9");
        game.putStone("A3");
        game.putStone("J10");
        game.putStone("A4");

        assert.strictEqual( game.putStone("F6") instanceof Omok.BlackWins ,true)
        console.log(game.getTurn());
        console.log(game.getImage(false));
    });

    it("흑이 장목(6목이 만들어지는 경우  확인", function () {
        game.reset();
        game.putStone("H8");
        game.putStone("A1");
        game.putStone("G7");
        game.putStone("A2");
        game.putStone("I9");
        game.putStone("A3");
        game.putStone("J10");
        game.putStone("A4");
        game.putStone("E5");
        game.putStone("A9");

        assert.strictEqual( game.putStone("F6") instanceof Omok.BlackWins ,false)
        assert.strictEqual( game.putStone("F6") instanceof Omok.Forbid6 ,true)

        console.log(game.getTurn());
        console.log(game.getImage());
    });

    it("백이 장목(6목이 만들어지는 경우) 확인", function () {
        game.reset();
        game.putStone("H8");
        game.putStone("A1");
        game.putStone("G7");
        game.putStone("A2");
        game.putStone("I9");
        game.putStone("A3");
        game.putStone("J10");
        game.putStone("A4");
        game.putStone("E5");
        game.putStone("A6");
        game.putStone("k5");
        assert.strictEqual( game.putStone("A5") instanceof Omok.WhiteWins  ,true)
        console.log(game.getTurn());
        console.log(game.getImage());
    });

    it("흑 33 확인 -1 ", function () {
        game.reset();
        game.putStone("H8");
        game.putStone("A1");
        game.putStone("I8");
        game.putStone("A2");
        game.putStone("J7");
        game.putStone("A3");
        game.putStone("J6");
        game.putStone("A4");
        game.putStone("I5");
        game.putStone("A11");
        game.putStone("H5");
        game.putStone("A15");
        game.putStone("G6");
        game.putStone("K15");
        game.putStone("G7");
        game.putStone("K1");
        console.log(game.getTurn());
        console.log(game.getImage());
        //다음과 같은 경우는 33
        assert.strictEqual( game.isDoubleThree("G8")  ,true)
        assert.strictEqual( game.isDoubleThree("G9") ,true)
        assert.strictEqual( game.isDoubleThree("F8") ,true)

        assert.strictEqual( game.isDoubleThree("J8")  ,true)
        assert.strictEqual( game.isDoubleThree("J9")  ,true)
        assert.strictEqual( game.isDoubleThree("K8")  ,true)

        assert.strictEqual( game.isDoubleThree("J5")  ,true)
        assert.strictEqual( game.isDoubleThree("J4") ,true)
        assert.strictEqual( game.isDoubleThree("K5") ,true)

        assert.strictEqual( game.isDoubleThree("G5") ,true)
        assert.strictEqual( game.isDoubleThree("G4")  ,true)
        assert.strictEqual( game.isDoubleThree("F5")  ,true)

        //다음과 같은 경우 33이 아님(거짓금수)
        //H7에 두게 되면 H6은 금수가 되어 열린 3이 아니게 됨
        assert.strictEqual( game.isDoubleThree("H7")  ,false)
        assert.strictEqual( game.isDoubleThree("H6")  ,false)
        assert.strictEqual( game.isDoubleThree("J6")  ,false)
        assert.strictEqual( game.isDoubleThree("I7")  ,false)
    });


    it("흑 33 확인 -2 (거짓금수) ", function () {
        game.reset();
        game.putStone("H8");
        game.putStone("I8");
        game.putStone("I9");
        game.putStone("G8");
        game.putStone("J8");
        game.putStone("J9");
        game.putStone("H7");
        game.putStone("G9");
        game.putStone("H6");
        game.putStone("H9");
        game.putStone("J7");
        game.putStone("I6");
        game.putStone("k9");
        game.putStone("g10");
        game.putStone("g11");
        game.putStone("l10");
        console.log(game.getImage());
        //다음과 같은 경우 33이 아님(거짓금수)
        //G7이나  K7에 두면 I7이 44가 되어버림
        assert.strictEqual( game.isDoubleThree("G7")  ,false)
        assert.strictEqual( game.isDoubleThree("K7")  ,false)
    });

    it("백은 33가능 ", function () {
        game.reset();
        game.putStone("O15");
        game.putStone("H8");
        game.putStone("A1");
        game.putStone("I8");
        game.putStone("A2");
        game.putStone("J7");
        game.putStone("A3");
        game.putStone("J6");
        game.putStone("A4");
        game.putStone("I5");
        game.putStone("A11");
        game.putStone("H5");
        game.putStone("A15");
        game.putStone("G6");
        game.putStone("K15");
        game.putStone("G7");
        game.putStone("K1");
        console.log(game.getTurn());
        console.log(game.getImage());
        //다음과 같은 경우는 33
        assert.strictEqual( game.isDoubleThree("G8")  ,false)
        assert.strictEqual( game.isDoubleThree("G9") ,false)
        assert.strictEqual( game.isDoubleThree("F8") ,false)

        assert.strictEqual( game.isDoubleThree("J8")  ,false)
        assert.strictEqual( game.isDoubleThree("J9")  ,false)
        assert.strictEqual( game.isDoubleThree("K8")  ,false)

        assert.strictEqual( game.isDoubleThree("J5")  ,false)
        assert.strictEqual( game.isDoubleThree("J4") ,false)
        assert.strictEqual( game.isDoubleThree("K5") ,false)

        assert.strictEqual( game.isDoubleThree("G5") ,false)
        assert.strictEqual( game.isDoubleThree("G4")  ,false)
        assert.strictEqual( game.isDoubleThree("F5")  ,false)
    });

    it("흑 44 검사 ", function () {
        game.reset();
        game.putStone("J8");
        game.putStone("O15");
        game.putStone("J9");
        game.putStone("O14");
        game.putStone("J6");
        game.putStone("O13");
        game.putStone("I10");
        game.putStone("O12");
        game.putStone("G10");

        game.putStone("O10");
        game.putStone("K10");

        game.putStone("O9");
        game.putStone("E10");
        game.putStone("O8");
        console.log(game.getTurn());
        console.log(game.getImage());

        assert.strictEqual( game.isDoubleFour("J10")  ,true)
        assert.strictEqual( game.isDoubleFour("H10") ,true)
        //다음과 같은 경우는 33

    });
    it("되돌리기 확인 -1 ", function () {
        game.reset();
        const testUndo = game.undo();
        console.log(testUndo);
        assert.strictEqual( testUndo instanceof Omok.Undo  ,true)
    });
    it("되돌리기 확인 -1 ", function () {
        game.reset();
        const testUndo = game.undo();
        console.log(testUndo);
        assert.strictEqual( testUndo instanceof Omok.Undo  ,true)
    });

    it("되돌리기 확인 -2 ", function () {
        game.reset();
        game.putStone("H3");
        game.putStone("H5");
        game.putStone("H7");
        game.putStone("H9");
        console.log(game.getPeriod());
        console.log("before undo image" +game.getImage());
        console.log("before undo turn" +game.getTurn());
        const testUndo = game.undo();
        console.log(testUndo);
        console.log(game.getPeriod());
        console.log("after undo image" +game.getImage());
        console.log("after undo turn"+game.getTurn());
        assert.strictEqual( testUndo instanceof Omok.Undo  ,true)
    });

    it("5가 만들어지고 undo", function () {
        game.reset();
        game.putStone("H8");
        game.putStone("A1");
        game.putStone("G7");
        game.putStone("A2");
        game.putStone("I9");
        game.putStone("A3");
        game.putStone("J10");
        game.putStone("A4");
        game.putStone("F6");
        console.log(game.getPeriod());
        const testUndo = game.undo();
        console.log(testUndo);
        console.log(game.getPeriod());
        console.log(game.getTurn());
        console.log(game.getImage());
    });


});