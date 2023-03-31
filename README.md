# BugCity - DistributeBot_v2

## Github

[https://github.com/natreeum/bugcity_distributeBot_v2](https://github.com/natreeum/bugcity_distributeBot_v2)

## ⭐️ 설명서 ⭐️

[근로벅지공단 설명서](https://crystalline-jodhpur-c0e.notion.site/2c7086f4ac934e5c8f25b467b82c7efc) 

## Description

약 3500명이 있는 웹3 디스코드 커뮤니티인 BugCity ([Link](https://discord.gg/bugcity))에는 ‘BTC’라는 커뮤니티 포인트가 있고, 이 포인트를 사용해 개인 사업체를 운영할 수 있습니다. 사업체를 운영하면 매 주 BTC포인트를 받게 되는데 사업체 주급을 직원들에게 분배해주는 봇입니다.

V1 : [BugCity - Distribute Bot](https://www.notion.so/BugCity-Distribute-Bot-6d228aa0f55a435f99b6f3370cc02ca3) 

V2 

- 매주 월요일 “사업체 급여요청”채널에 사업체 정보 출력
    - 사업체 이름
    - 직원명단
    - 총급여
- 사장이 직접 직원관리
- 급여분배 일괄처리

## Details

### 개발기간

> 2023.03.24 ~ 진행중
> 

### 서비스 기간

> ?
> 

### 기술스택

- JavaScript
- node.js
- discord.js
- Axios
- AWS-EC2
- forever
- PrismaORM
- SQLite

## 기능

- **사업체 등록 (근벅단 직원만 가능) : 사업체를 등록합니다.**
    - /근벅단 등록 [사업체 이름] [사업체 채널]
- **사업체 수정 (해당 사업체 사장만 가능) : 사업체 이름을 수정합니다.**
    - /근벅단 수정 [사업체 이름] [수정된 사업체 이름]
- **사업체 이사 (해당 사업체 사장만 가능) : 사업체 채널을 변경합니다.**
    - /근벅단 이사 [사업체 이름] [새로운 채널]
- **사업체 삭제 (해당 사업체 사장만 가능, 비활성화 상태에서만 가능) : 사업체를 삭제합니다.**
    - /근벅단 삭제 [사업체 이름]
- **직원관리 (해당 사업체 사장만 가능) : 직원을 등록 / 직급 변경 / 해고 할 수 있습니다.**
    - /근벅단 직원 [사업체 이름] [직원] [직급]
- **사업체 조회 : 내가 사업체로 있는 사업체의 명단을 확인합니다.**
    - /근벅단 사업체
- **직원 조회 : 해당 사업체의 직원 명단을 확인합니다.**
    - /근벅단 직원조회 [사업체 이름]
- **사업체 비활성화 (해당 사업체 사장만 가능) : 사업체를 비활성화합니다.**
    - /근벅단 비활성화 [사업체 이름]
- **사업체 활성화 (관리자만 가능) : 사업체를 활성화 합니다.**
    - /근벅단 활성화 [사업체 이름]
- **주급 분배 (관리자만 가능) : 주급을 일괄 분배합니다.**
    - /근벅단 분배
- **전체 사업체 명단 확인(근벅단 직원만 가능) : 전체 사업체 명단을 확인합니다.**
    - /근벅단 전체보기

## DB구성

![Untitled](https://crystalline-jodhpur-c0e.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F095ca338-4367-4fd9-be29-78c9cf06cfd7%2FUntitled.png?id=99dc84b9-74a3-4cd2-8862-b450fdf588bb&table=block&spaceId=4c2d6e53-4cd8-42ae-ba89-9fc47aaf5d76&width=910&userId=&cache=v2)

## 고정 값 지정

관리자 userID 등록 : `/utils/wageVal` 4번 줄

근벅단 userID 등록 : `/utils/wageVal` 5번 줄

주급 최대치 설정 : `/utils/wageVal` 2번 줄