<h1 align="center">omoklib</h1>


![image](https://user-images.githubusercontent.com/46727085/178782556-305c643e-6627-44cb-82ec-8d18e13330e2.png "ㅁㄴㅇㄹㄴㅇㅁㄴㄹㅇ")

![image](https://user-images.githubusercontent.com/46727085/178782821-5db5f5b1-515b-45ae-981c-500ea11f79cd.png "ㅁㄴㅇㄹㄴㄴㅇㄹ")


위와 같이 금수까지 계산해 준다.

https://www.renju.se/renlib/opensrc/

금수 알고리즘은 여기 소스를 보고 참고하였습니다



# 사용법 및 메소드
## reset: `function() : void`
게임을 초기화합니다. 룰은 그대로 놔둡니다

## setRenjuRule: `function() : void`
렌주룰로 설정합니다. 게임을 시작하기 전에 설정해야 합니다.

흑 : 33 ,44 육목 불가

백 : 다 가능

## setNormalRule: `function() : void`
일반룰로 설정합니다. 게임을 시작하기 전에 설정해야 합니다.

흑,백 : 33 ,44 불가, 육목은 완성해도 승리하지 않음

## setGomokuRule: `function() : void`
고모쿠룰로 설정합니다. 게임을 시작하기 전에 설정해야 합니다

흑 백 모두 금수 없음

## setCustomRule: `function(rule : object) : void`
커스텀룰로 설정합니다. 게임을 시작하기 전에 설정해야 합니다

rule 구조는 다음과 같습니다

```js
const rule ={
    "sixWin": [false, true], //흑 백 순서대로, true면 육목 만들면 승리 
    "allow6": [false, true] , //흑 백 순서대로, true면 육목 가능 false면 불가
    "allow44": [false, true] , //흑 백 순서대로, true면 44 가능 false면 불가
    "allow33": [false, true] , //흑 백 순서대로, true면 33 가능 false면 불가
};
game.setCustomRule(rule);
```
## isFive: `function(string cord): boolean`
해당하는 좌표가 오목이 되는지 검사합니다.

## isOverLine: `function(string cord): boolean`
해당하는 좌표가 장목이 되는지 검사합니다.

## isDoubleFour: `function(string cord): boolean`
해당하는 좌표가 44가 되는지 검사합니다.

## isOverLine: `function(string cord): boolean`
해당하는 좌표가 33이 되는지 검사합니다.

## putStone: `function(string cord): InvalidPosition|Occupied|Forbid33|Forbid44|Forbid6|PutComplete|WhiteWins|BlackWins`
해당하는 좌표에 돌을 넣습니다.

## 아래는 PutError를 상속받는 클래스입니다
1. 잘못된 좌표일 때 ("H22" 같은 경우) : InvalidPosition 
2. 이미 돌이 있을 때 : Occupied


## 아래는 Forbid를 상속받는 클래스입니다
1. 33 금수자리 일 때 : Forbid33
2. 44 금수자리 일 때 : Forbid44
3. 장목(6목) 금수자리 일 때 : Forbid6

## 아래는 PutComplete를 상속받는 클래스입니다
1. 흑 승리 : BlackWins
2. 백 승리 : WhiteWins



```js
    
    const err = game.putStone("H555") //InvalidPosition
    const res =game.putStone("H8") ;// H8에 착수
    if(res instanceof PutComplete){ //정상적으로 착수 될 때
        if(res instanceof BlackWins){
            //흑이 승리한 경우
        }
        else if(res instanceof WhiteWins){
            //백이 승리한 경우
        }
        else{
            //계속 경기가 진행 될 때
        }
    }
    else if(res instanceof  PutError){
        if(res instanceof InvalidPosition){
            //잘못된 좌표일 때
        }
        else if(res instanceof Occupied){
            //이미 돌이 있을 때
        }
    }
    else if(res instanceof Forbid){
        if(res instanceof Forbid33){
            //33 금수일 때
        }
        else if(res instanceof Forbid44){
            //44 금수일 때
        }
        else if(res instanceof Forbid66){
            //장목 금수 일 때
        }
    }
    console.log(a.getImage()); //이미지 가져오기
```
### 각 클래스 구조는 아래를 참고해주세요

## undo: `function(): Undo`
되돌리기


