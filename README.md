#오목 모듈 

![image](https://user-images.githubusercontent.com/46727085/178782556-305c643e-6627-44cb-82ec-8d18e13330e2.png "ㅁㄴㅇㄹㄴㅇㅁㄴㄹㅇ")

![image](https://user-images.githubusercontent.com/46727085/178782821-5db5f5b1-515b-45ae-981c-500ea11f79cd.png "ㅁㄴㅇㄹㄴㄴㅇㄹ")


위와 같이 금수까지 계산해 준다.

## 사용법 및 메소드
1. 돌 착수
```js
    let a = new Omok();
    const res =a.putStone("H8") // H8에 착수
    console.log(a.getImage()); //이미지 가져오기
```

민약 올바르지 않은 위치면 InvalidPosition 객체를 받습니다
```js
    let a = new Omok();
    const res = a.putStone("H22") // H22는 존재하지 않음
    if(res instanceof InvalidPosition){
        console.log("올바르지 않은 좌표입니다");
    }
```
이미 돌이 있으면 Occupied 객체를 받습니다
```js
    let a = new Omok();
    const res = a.putStone("H22") // H22는 존재하지 않음
    if(res instanceof Occupied){
        console.log("올바르지 않은 좌표입니다");
    }
```

작성중.....
