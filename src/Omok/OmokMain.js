/**
 * 쉽고 빠르게 오목을 만들자
 * 버그 있으면 hbhj4633@naver.com로 메일좀 보내주세요
 * @author saroro<hbhj4633@naver.com>
 */

(function (){
    "use strict";
    const PutResult = require("./ActionClass/Action");
    const {Occupied, InvalidPosition, PutError, Forbid33, Forbid44, Forbid6, Forbid, BlackWins, WhiteWins, PutComplete,Undo} = PutResult;
    function Omok(){
        let isWin = false;
        const EMPTYSTONE = 0;
        const BLACKSTONE = 1;
        const WHITESTONE = 2;
        const BOARDSIZE = 15;
        const CODE = "ABCDEFGHIJKLMNOP";
        let turn = 1;
        let board = [];
        let boardStack = [];
        let rule = {
            "sixWin" : [false,true],
            "allow6" : [false,true],
            "allow44" : [false,true],
            "allow33" : [false,true]
        }
        let ruleName = "renju";
        let isBlackTurn = true;


        function getStone(x,y){
            try{
                return board[x][y];
            }
            catch(e){
                return -1;
            }

        }
        /**
         * 보드 초기화 할때 사용
         * @return void
         */
        function resetBoard(){
            turn = 1;
            board = [];
            boardStack = [];
            isBlackTurn = true;
            isWin = false;
            for(let i = 0; i<15;i++){
                board.push(Array(15).fill(0,0,15));
            }
        }
        resetBoard();
        /**
         * 돌 위치에다가 착수
         * @param {number}x
         * @param {number}y
         * @param {0,1,2}stone
         */
        function setStone(x,y,stone){
            if(( x <0 || y <0 )|| ( x>=BOARDSIZE || y>=BOARDSIZE) ){
                return false;
            }
            board[x][y]=stone;
            return true;
        }

        /**
         * 33 인지 검사
         * @param {number} x
         * @param {number} y
         * @param {1,2}stone
         * @return {boolean}
         */
        function isDoubleThree(x,y,stone){
            if( getStone(x,y) !== EMPTYSTONE){
                return false;
            }
            else if(isFive(x,y,stone,15)){
                return false;
            }
            else if(isOverLine(x,y,stone,15)){
                return false;
            }
            else if(rule.allow33[stone-1]){
                return false;
            }
            let countThree = 0;

            for(let  i = 1 ; i<=4;i++){
                if(isOpenThree(x,y,stone,i)){
                    countThree +=1;
                }
            }
            return countThree >=2;

        }
        /**
         * 44 인지 검사
         * @param {number} x
         * @param {number} y
         * @param {1,2}stone
         * @return {boolean}
         */
        function isDoubleFour(x,y,stone){
            if(getStone(x,y) !== EMPTYSTONE){
                return false;
            }
            else if(isFive(x,y,stone,15)){
                return false;
            }
            else if(isOverLine(x,y,stone,15)){
                return false;
            }
            else if(rule.allow44[stone-1]){
                return false;
            }
            let countFour = 0;
            for(let i = 1; i<=4 ; i++){
                if(isOpenFour(x,y,stone,i) ===2){
                    countFour +=2;
                }

                else if(isFour(x,y,stone,i)){
                    countFour +=1;
                }
            }

            return countFour>=2;
        }
        /**
         * 열린 3인지 검사 열린 3 정의는 꺼무위키 참고
         * @param {number} x
         * @param {number} y
         * @param {1,2}stone
         * @param {1,2,3,4}dir
         * @return {boolean}
         */
        function isOpenThree(x,y,stone,dir){
            if(isFive(x,y,stone,15)){
                return false;
            }
            else if(isOverLine(x,y,stone,15)){
                return false;
            }
            setStone(x,y,stone);
            if(dir ===1){
                let i = x-1;
                while(i >=0){
                    if(getStone(i,y)=== stone){
                        i--;
                    }
                    else if(getStone(i,y) === EMPTYSTONE){
                        if(checkFakeThree(i,y,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }

                i = x+1;
                while(i < BOARDSIZE){
                    if(getStone(i,y) === stone){
                        i++;
                    }
                    else if(getStone(i,y) === EMPTYSTONE){
                        if(checkFakeThree(i,y,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
                }
            }

            else if(dir ===2){
                let j = y-1;
                while(j >=0){
                    if(getStone(x,j)=== stone){
                        j--;
                    }
                    else if(getStone(x,j) === EMPTYSTONE){
                        if(checkFakeThree(x,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }

                j = y+1;
                while(j < BOARDSIZE){
                    if(getStone(x,j) === stone){
                        j++;
                    }
                    else if(getStone(x,j) === EMPTYSTONE){
                        if(checkFakeThree(x,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
                }
            }

            else if(dir ===3){
                let i = x-1;
                let j = y-1;

                while(i>=0 &&j >=0){
                    if(getStone(i,j)=== stone){
                        i--;
                        j--;
                    }
                    else if(getStone(i,j)=== EMPTYSTONE){
                        if(checkFakeThree(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                i = x+1;
                j = y+1;
                while(i< BOARDSIZE &&j < BOARDSIZE){
                    if(getStone(i,j) === stone){
                        i++;
                        j++;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(checkFakeThree(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
                }
            }

            else if(dir ===4){
                let i = x-1;
                let j = y+1;
                while(i>=0 && j <BOARDSIZE){
                    if(getStone(i,j)=== stone){
                        i--;
                        j++;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(checkFakeThree(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                i = x+1;
                j = y-1;
                while(i< BOARDSIZE &&j >=0){
                    if(getStone(i,j) === stone){
                        i++;
                        j--;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(checkFakeThree(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
                }
            }

            setStone(x,y,EMPTYSTONE);
            return false;
        }

        /**
         * 거짓금수 체크용
         * @param {number}x
         * @param {number}y
         * @param {1,2}stone
         * @param {1,2,3,4}dir
         * @return {boolean}
         */
        function checkFakeThree(x,y,stone,dir){
            return (isOpenFour(x,y,stone,dir) ===1 )&& !isDoubleFour(x,y,stone) && !isDoubleThree(x,y,stone);
        }

        /**
         * 4인지 검사 (닫힌거든 열린거든 상관 무)
         * @param {number} x
         * @param {number}y
         * @param {1,2}stone
         * @param {1,2,3,4}dir
         * @return {boolean}
         */
        function isFour(x,y,stone,dir){
            if(getStone(x,y) !== EMPTYSTONE){
                return false;
            }
            else if(isFive(x,y,stone,15)){
                return false;
            }
            else if(isOverLine(x,y,stone,15)){
                return false;
            }
            setStone(x,y,stone);
            if(dir ===1){
                let i = x-1;
                while(i>=0){
                    if(getStone(i,y) ===stone){
                        i--;
                    }
                    else if(getStone(i,y) === EMPTYSTONE){
                        if(isFive(i,y,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                i = x+1;
                while(i < BOARDSIZE){
                    if(getStone(i,y) ===stone){
                        i++;
                    }
                    else if(getStone(i,y) === EMPTYSTONE){
                        if(isFive(i,y,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                setStone(x,y,EMPTYSTONE);
                return false;
            }
            else if(dir ===2){
                let j = y-1;
                while(j>=0){
                    if(getStone(x,j) ===stone){
                        j--;
                    }
                    else if(getStone(x,j)=== EMPTYSTONE){
                        if(isFive(x,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                j = y+1;
                while(j < BOARDSIZE){
                    if(getStone(x,j) ===stone){
                        j++;
                    }
                    else if(getStone(x,j) === EMPTYSTONE){
                        if(isFive(x,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                setStone(x,y,EMPTYSTONE);
                return false;
            }

            else if(dir ===3){
                let i = x-1;
                let j = y-1;
                while(i>=0 &&j>=0){
                    if(getStone(i,j) ===stone){
                        i--;
                        j--;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(isFive(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                i = x+1;
                j = y+1;
                while(i<BOARDSIZE &&j < BOARDSIZE){
                    if(getStone(i,j) ===stone){
                        i++;
                        j++;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(isFive(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                setStone(x,y,EMPTYSTONE);
                return false;
            }
            else if(dir ===4){
                let i = x-1;
                let j = y+1;
                while(i>=0 &&j<BOARDSIZE){
                    if(getStone(i,j) ===stone){
                        i--;
                        j++;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(isFive(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                i = x+1;
                j = y-1;
                while(i<BOARDSIZE &&j >=0){
                    if(getStone(i,j) ===stone){
                        i++;
                        j--;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(isFive(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return true;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }

                }
                setStone(x,y,EMPTYSTONE);
                return false;
            }
            setStone(x,y,EMPTYSTONE);
            return false;
        }
        /**
         *열린 4 검사, 2일 때 44임  (O,X,O,ㅁ,X,O ㅁ 자리를 검사하기 위해서)  1인 경우는 열린 3을 검사하기 위해 사용
         * @param {number}x
         * @param {number}y
         * @param {1,2}stone
         * @param {1,2,3,4}dir
         * @return {0,1,2}
         */
        function isOpenFour(x,y,stone,dir){
            if(getStone(x,y) !== EMPTYSTONE){
                return 0;
            }
            else if(isFive(x,y,stone,15)){
                return 0;
            }
            else if(isOverLine(x,y,stone,15)){
                return 0;
            }
            setStone(x,y,stone);
            let nLine = 1;
            if(dir ===1){
                let i = x-1;
                while(i>= -1){
                    if(getStone(i,y) === stone){
                        i--;
                        nLine++;
                    }
                    else if(getStone(i,y) === EMPTYSTONE){
                        if(!isFive(i,y,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return 0;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        setStone(x,y,EMPTYSTONE);
                        return 0;
                    }

                }

                i = x+1;
                while(i<BOARDSIZE){
                    if(getStone(i,y) === stone){
                        i++;
                        nLine++;
                    }
                    else if(getStone(i,y) === EMPTYSTONE){
                        if(isFive(i,y,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return nLine===4 ? 1:2;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
                }
                setStone(x,y,EMPTYSTONE);
                return 0;
            }

            else if(dir ===2){
                let j = y-1;
                while(j>= -1){
                    if(getStone(x,j) === stone){
                        j--;
                        nLine++;
                    }
                    else if(getStone(x,j) === EMPTYSTONE){
                        if(!isFive(x,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return 0;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        setStone(x,y,EMPTYSTONE);
                        return 0;
                    }

                }

                j = y+1;
                while(j<BOARDSIZE){
                    if(getStone(x,j) === stone){
                        j++;
                        nLine++;
                    }
                    else if(getStone(x,j) === EMPTYSTONE){
                        if(isFive(x,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return nLine===4 ? 1:2;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
                }
                setStone(x,y,EMPTYSTONE);
                return 0;
            }

            else if(dir ===3){
                let i = x-1;
                let j = y-1;
                while( i >= -1 && j>= -1){
                    if(getStone(i,j) === stone){
                        i--;
                        j--;
                        nLine++;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(!isFive(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return 0;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        setStone(x,y,EMPTYSTONE);
                        return 0;
                    }

                }
                i = x+1;
                j = y+1;
                while(i<BOARDSIZE && j<BOARDSIZE){
                    if(getStone(i,j) === stone){
                        i++;
                        j++;
                        nLine++;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(isFive(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return nLine===4 ? 1:2;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
                }
                setStone(x,y,EMPTYSTONE);
                return 0;
            }

            else if(dir ===4){
                let i = x-1;
                let j = y+1;
                while( i >= -1 && j<BOARDSIZE){
                    if(getStone(i,j) === stone){
                        i--;
                        j++;
                        nLine++;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(!isFive(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return 0;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        setStone(x,y,EMPTYSTONE);
                        return 0;
                    }

                }
                i = x+1;
                j = y-1;
                while(i<BOARDSIZE && j>=-1){
                    if(getStone(i,j) === stone){
                        i++;
                        j--;
                        nLine++;
                    }
                    else if(getStone(i,j) === EMPTYSTONE){
                        if(isFive(i,j,stone,dir)){
                            setStone(x,y,EMPTYSTONE);
                            return nLine===4 ? 1:2;
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        break;
                    }
                }
                setStone(x,y,EMPTYSTONE);
                return 0;
            }
            setStone(x,y,EMPTYSTONE);
            return 0;
        }
        /**
         * 오목인지 아닌지 검사
         * @param {number} x x좌표
         * @param {number}y y좌표
         * @param {1,2}stone
         * @param {undefined|number}dir
         * @return {boolean}
         */
        function isFive(x,y,stone,dir){
            if(dir ===undefined){
                dir = 15;
            }
            return checkFiveOrOverLine(x,y,stone,dir) ===1;
        }
        /**
         * 장목인지 아닌지 검사
         * @param {number} x x좌표
         * @param {number }y y좌표
         * @param {1,2}stone
         * @param {undefined|number}dir
         * @return {boolean}
         */
        function isOverLine(x,y,stone,dir ){
            if(dir ===undefined){
                dir = 15;
            }
            return checkFiveOrOverLine(x,y,stone,dir) ===2;
        }
        /**
         * 오목 장목 여부 검사
         * @param {number} x x좌표
         * @param {number }y y좌표
         * @param {1,2}stone
         * @param {undefined|number}dir
         * @return {0,1,2}
         */
        function checkFiveOrOverLine(x,y,stone,dir ){
            let findDir = 0;
            let isOverLine = false;
            if(getStone(x,y)  !== EMPTYSTONE){
                return 0;
            }
            if(dir ===undefined || dir === 15){
                findDir = 15;
            }
            else{
                findDir = 1<< (dir-1);
            }
            setStone(x,y,stone);
            let checkFive;
            let nLine = 1;
            if(findDir & 1){
                nLine = 1;
                let i = x-1;
                while(i >= 0){
                    if(getStone(i--,y)=== stone){
                        nLine++;
                    }
                    else{
                        break;
                    }
                }
                i = x+1;
                while(i <BOARDSIZE){
                    if(getStone(i++,y)=== stone){
                        nLine++;
                    }
                    else{
                        break;
                    }
                }
                checkFive = checkIsFive(stone,nLine);
                if(  checkFive ===1 ){
                    setStone(x,y,EMPTYSTONE);
                    return 1;
                }
                else if(checkFive ===2){
                    isOverLine = true;
                }
            }
            if(findDir & 2){
                nLine = 1;
                let j = y-1;
                while(j >= 0){
                    if(getStone(x,j--)=== stone){
                        nLine++;
                    }
                    else{
                        break;
                    }
                }
                j = y+1;
                while(j <BOARDSIZE){
                    if(getStone(x,j++) === stone){
                        nLine++;
                    }
                    else{
                        break;
                    }
                }
                checkFive = checkIsFive(stone,nLine);
                if(  checkFive ===1 ){
                    setStone(x,y,EMPTYSTONE);
                    return 1;
                }
                else if(checkFive ===2){
                    isOverLine = true;
                }
            }

            if(findDir &4){
                nLine = 1;
                let i = x-1;
                let j = y-1;
                while( i>=0&&j >= 0){
                    if(getStone(i--,j--)=== stone){
                        nLine++;
                    }
                    else{
                        break;
                    }
                }
                i = x+1;
                j = y+1;
                while(i < BOARDSIZE &&j <BOARDSIZE){
                    if(getStone(i++,j++)=== stone){
                        nLine++;
                    }
                    else{
                        break;
                    }
                }
                checkFive = checkIsFive(stone,nLine);
                if(  checkFive ===1 ){
                    setStone(x,y,EMPTYSTONE);
                    return 1;
                }
                else if(checkFive ===2){
                    isOverLine = true;
                }
            }
            if(findDir &8){
                nLine = 1;
                let i = x-1;
                let j = y+1;
                while( i>=0 &&j <BOARDSIZE){
                    if(getStone(i--,j++) === stone){
                        nLine++;
                    }
                    else{
                        break;
                    }
                }
                i = x+1;
                j = y-1;
                while(i< BOARDSIZE &&j >= 0){
                    if(getStone(i++,j--)=== stone){
                        nLine++;
                    }
                    else{
                        break;
                    }
                }
                checkFive = checkIsFive(stone,nLine);
                if(  checkFive ===1 ){
                    setStone(x,y,EMPTYSTONE);
                    return 1;
                }
                else if(checkFive ===2){
                    isOverLine = true;
                }
            }
            setStone(x,y,EMPTYSTONE);
            return isOverLine ? 2:0;
        }


        /**
         *장목인지 오목인지 검사
         * @param stone 현재 돌 색
         * @param nLine 연결된 개수
         * @return {0,1,2}  0아무것도 아님 1 오목 2 장목(육목 이상)
         */
        function checkIsFive(stone,nLine){
            if(nLine >=5){
                if(nLine ===5 || rule.sixWin[stone-1] ){
                    return 1;
                }
                else{
                    return 2;
                }
            }
            return 0;

        }

        function makeImage(showForbid  ){
            if(isWin){
                showForbid =false;
            }
            let url = "https://saroro.dev/omok/image/";
            for(let j = 0; j<BOARDSIZE; j++){
                for(let i = 0; i<BOARDSIZE; i++){
                    if(board[i][j] ===BLACKSTONE){
                        url +="b";
                        continue;
                    }
                    else if(board[i][j] ===WHITESTONE){
                        url += "w";
                        continue;
                    }

                    if(showForbid){
                        const currentStone = isBlackTurn ? BLACKSTONE : WHITESTONE;
                        if(isDoubleFour(i,j, currentStone)){
                            url += "4"
                        }
                        else if(isDoubleThree(i,j,currentStone)){
                            url += "3"
                        }
                        else if(isOverLine(i,j,currentStone,15)){
                            url += "6"
                        }
                        else{
                            url += "_";
                        }
                    }
                    else{
                        url += "_";
                    }
                }
            }
            return url;
        }
        function getImageWithMove(showForbid){
            return makeImage(showForbid)+"/"+boardStack.join(",");
        }

        function changeCordToXY(cord){
            cord = cord.toUpperCase();
            if(!cord.match(/[A-Z]\d{1,2}/)){
                throw new Error("Invalid Coordinate");
            }
            const y = CODE.indexOf(cord[0]);
            const x = +cord.slice(1)-1;
            return [y,x];
        }
        /**
         * 좌표("H8")으로 돌 놓기
         * @param {string} cord
         * @return {InvalidPosition|Occupied|Forbid33|Forbid44|Forbid6|BlackWins|WhiteWins|PutComplete}
         */
        function putStoneByCord(cord){
            cord = cord.toUpperCase();
            if(!cord.match(/[A-Z]\d{1,2}/)){
                return new InvalidPosition();
            }
            const j = CODE.indexOf(cord[0]);
            const i = +cord.slice(1)-1;

            return putStone(j,i);
        }

        /**
         *
         * @param {number}x
         * @param {number}y
         * @return {Forbid6|PutComplete|BlackWins|WhiteWins|Forbid33|InvalidPosition|Occupied|Forbid44}
         */
        function putStone(x,y){
            const currentStone = isBlackTurn ? BLACKSTONE : WHITESTONE;
            if(( x <0 || y <0 )|| ( x>=BOARDSIZE || y>=BOARDSIZE) ){
                return  new InvalidPosition();
            }
            else if(board[x][y] !== EMPTYSTONE){
                return new Occupied();
            }
            if(isDoubleThree(x,y,currentStone)){
                let error = new Forbid33();
                error.period = turn;
                error.currentTurn = BLACKSTONE ? "b" : "w";
                error.boardStack = boardStack;
                error.rule.rule = rule;
                error.rule.ruleName = ruleName;
                return error;
            }
            if(isDoubleFour(x,y,currentStone)){
                let  error = new Forbid44();
                error.period = turn;
                error.currentTurn = BLACKSTONE ? "b" : "w";
                error.boardStack = boardStack;
                error.rule.rule = rule;
                error.rule.ruleName = ruleName;
                return error;
            }
            if(isOverLine(x,y,currentStone,15)){
                let error = new Forbid6();
                error.period = turn;
                error.currentTurn = BLACKSTONE ? "b" : "w";
                error.boardStack = boardStack;
                error.rule.rule = rule;
                error.rule.ruleName = ruleName;
                return error;
            }

            if(isFive(x,y,currentStone,15)){
                isWin = true;
                setStone(x,y,currentStone);
                let cords = CODE[x]+ (+y+1);
                boardStack.push(cords);
                const winMove = currentStone === BLACKSTONE ? new BlackWins() : new WhiteWins();
                winMove.lastPut = cords
                winMove.period = turn;
                winMove.currentTurn = currentStone === BLACKSTONE ? "b" : "w";
                winMove.boardStack = boardStack;
                winMove.rule.ruleName = ruleName;
                winMove.rule.rule = rule;
                return winMove;
            }
            let cords = CODE[x]+ (+y+1);
            boardStack.push(cords);
            setStone(x,y,currentStone);
            turn++;
            isBlackTurn = !isBlackTurn;
            const completeMove = new PutComplete();
            completeMove.period =turn;
            completeMove.lastPut = cords
            completeMove.currentTurn = currentStone === BLACKSTONE ? "w" : "b";
            completeMove.boardStack = boardStack;
            completeMove.rule.ruleName = ruleName;
            completeMove.rule.rule = rule;
            return completeMove;
        }
        return {
            /**
             * 커스텀 룰을 설정합니다
             * 반드시 sixWin, allow6, allow44 allow33이 포함되어야 합니다
             * @param rules
             */
            "setCustomRule" : (rules)=> {
                if(turn !==1){
                    throw new Error("After first move, you can't change the rule");
                }
                if(!Object.hasOwnProperty("sixWin")){
                    throw new Error("Rule must include sixWin")
                }
                if(!Object.hasOwnProperty("allow6")){
                    throw new Error("Rule must include allow6")
                }
                if(!Object.hasOwnProperty("allow44")){
                    throw new Error("Rule must include allow44")
                }
                if(!Object.hasOwnProperty("allow33")){
                    throw new Error("Rule must include allow33")
                }
                rule = rules;
            },
            /**
             * 렌주룰로 설정합니다
             */
            "setRenjuRule" : ()=>{
                if(turn !==1){
                    throw new Error("After first move, you can't change the rule");
                }
                rule = {
                    "sixWin" : [false,true],
                    "allow6" : [false,true],
                    "allow44" : [false,true],
                    "allow33" : [false,true]
                };
                ruleName = "renju"
            },
            /**
             * 일반로 설정합니다
             */
            "setNormalRule" : ()=>{
                if(turn !==1){
                    throw new Error("After first move, you can't change the rule");
                }
                rule = {
                    "sixWin" : [false,false],
                    "allow6" : [true,true],
                    "allow44" : [true,true],
                    "allow33" : [false,false]
                };
                ruleName = "normal"
            },
            /**
             * 고모쿠룰로 설정합니다
             */
            "setGomokuRule" : ()=>{
                if(turn !==1){
                    throw new Error("After first move, you can't change the rule");
                }
                rule = {
                    "sixWin" : [true,true],
                    "allow6" : [true,true],
                    "allow44" : [true,true],
                    "allow33" : [true,true]
                };
                ruleName = "gomoku"
            },
            /**
             * 돌을 배치합니다
             * @param {string} cord
             * @return {InvalidPosition|Occupied|Forbid33|Forbid44|Forbid6|BlackWins|WhiteWins|PutComplete}
             */
            "putStone" : (cord)=> putStoneByCord(cord),
            /**
             * 해당 장소가 오목이 되는지 검사합니다
             * @param {string} cord
             * @return {boolean}
             */
            "isFive" : (cord)=>{
                const res = changeCordToXY(cord);
                return isFive(res[0], res[1],isBlackTurn ? BLACKSTONE : WHITESTONE,15);
            },
            /**
             * 해당 장소가 장목(육목)이 되는지 검사합니다
             * @param {string} cord
             * @return {boolean}
             */
            "isOverLine" : (cord)=>{
                const res = changeCordToXY(cord);
                return isOverLine(res[0], res[1],isBlackTurn ? BLACKSTONE : WHITESTONE,15);
            },
            /**
             * 해당 장소가 44가 되는지 확인합니다
             * @param {string} cord
             * @return {boolean}
             */
            "isDoubleFour" : (cord)=>{
                const res = changeCordToXY(cord);
                return isDoubleFour(res[0], res[1],isBlackTurn ? BLACKSTONE : WHITESTONE);
            },
            /**
             * 해당 장소가 33이 되는지 확인합니다.
             * @param {string} cord
             * @return {boolean}
             */
            "isDoubleThree" : (cord)=>{
                const res = changeCordToXY(cord);

                return isDoubleThree(res[0], res[1],isBlackTurn ? BLACKSTONE : WHITESTONE);
            },
            /**
             * 보드를 초기화합니다
             * @return void
             */
            "reset" : ()=>resetBoard(),

            /**
             * 되돌리기
             * @return {Undo}
             */
            "undo" : ()=>{
                if(boardStack.length ===0 ){
                    let undo =  new Undo();
                    undo.currentTurn = "b";
                    undo.boardStack = [];
                    undo.period = turn;
                    undo.rule.ruleName = ruleName;
                    undo.rule.rule = rule;
                    undo.removePos = null;
                    return undo;
                }
                else{
                    const last = boardStack.pop();
                    const j = CODE.indexOf(last[0]);
                    const i = +last.slice(1) -1;
                    setStone(j,i,EMPTYSTONE);
                    if(isWin){
                        isWin = false;

                    }
                    else{
                        turn --;
                        isBlackTurn = !isBlackTurn;
                    }
                    let undo =  new Undo();
                    undo.currentTurn = isBlackTurn ? "b" : "w";
                    undo.boardStack = boardStack;
                    undo.period = turn;
                    undo.rule.ruleName = ruleName;
                    undo.rule.rule = rule;
                    undo.removePos = last;
                    return undo;
                }
            },
            /**
             * 현재 오목판 이미지를 가져옵니다
             * showForbid가 true라면 금수까지 표시해줍니다
             * @param {boolean} showForbid
             * @return {string}
             */
            "getImage" : (showForbid )=>{
                if(showForbid === undefined){
                    showForbid = true;
                }
                return makeImage(showForbid);
            },

            "getImageWithMove" : (showForbid )=>{
                if(showForbid === undefined){
                    showForbid = true;
                }
                return getImageWithMove(showForbid);
            },

            /**
             * 현재 오목 기보를 확인합니다.
             * @return {*[]}
             */
            "getHistory" : ()=>boardStack,

            /**
             * 현재 누구 차례인지 가져옵니다
             * b : 흑 w : 백
             * @return {"b","w"}
             */

            "getTurn" : ()=> isBlackTurn ? "b": "w",
            /**
             *착수가 몇번째인지 구합니다.
             * @return {number}
             */
            "getPeriod" : ()=>turn,
            /**
             * 돌을 강제로 배치합니다(오프닝 룰)
             * b는 흑 w는 백
             * @param {string}cord
             * @param {"b", "w"}stone
             */
            "setStoneByForce" : (cord,stone) =>{
                const j = CODE.indexOf(cord[0]);
                const i = +cord.slice(1)-1;
                if(getStone(j,i) !==EMPTYSTONE){
                    return;
                }
                if(stone === "b"){
                    setStone(j,i,BLACKSTONE);
                }
                else if(stone === "w"){
                    setStone(j,i,WHITESTONE);
                }
            },
            /**
             * 돌을 강제로 지웁니다(오프닝 룰)
             * b는 흑 w는 백
             * @param {string}cord
             */
            "clearStoneByForce" : (cord)=>{
                const j = CODE.indexOf(cord[0]);
                const i = +cord.slice(1)-1;
                setStone(j,i,EMPTYSTONE);
            }
        }
    }
    module.exports = {
        Omok: Omok
    }
})();



