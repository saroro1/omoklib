#오목 모듈 

![image](https://user-images.githubusercontent.com/46727085/178782556-305c643e-6627-44cb-82ec-8d18e13330e2.png "ㅁㄴㅇㄹㄴㅇㅁㄴㄹㅇ")

![image](https://user-images.githubusercontent.com/46727085/178782821-5db5f5b1-515b-45ae-981c-500ea11f79cd.png "ㅁㄴㅇㄹㄴㄴㅇㄹ")


위와 같이 금수까지 계산해 준다.

## 사용법 및 메소드
1. 돌 착수
```js
    const {Omok,PutComplete,BlackWins,WhiteWins} = require("index");
    const omokGame = new Omok();
    const res =a.putStone("H8") // H8에 착수
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
    console.log(a.getImage()); //이미지 가져오기
```

민약 올바르지 않은 위치면 InvalidPosition 객체를 받습니다
```js
    const {Omok,InvalidPosition} = require("index");
    const omokGame = new Omok();
    const res = omokGame.putStone("H22") // H22는 존재하지 않음
    if(res instanceof InvalidPosition){
        console.log("올바르지 않은 좌표입니다");
    }
```
이미 돌이 있으면 Occupied 객체를 받습니다
```js
    const {Omok,Occupied} = require("index");
    const omokGame = new Omok();
    const res = omokGame.putStone("H22") // H22는 존재하지 않음
    if(res instanceof Occupied){
        console.log("올바르지 않은 좌표입니다");
    }
```

작성중.....
