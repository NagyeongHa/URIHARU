# ☁ URIHARU

#### 작은 구름들이 모여 뭉게구름이 되듯이 매일의 일기가 모여 한달을 채우는 교환일기

<br>

## 🌟서비스 소개

약 10명의 사람들이 모여 **교환일기를 쓸 수 있는 공간**이 필요해서 만든 웹 애플리케이션입니다.

매일 정해진 차례에 해당하는 사람이 그 날의 일기를 쓰고 자신이 쓴 글을 모아볼 수 있는 사이트입니다.

**7월부터 사용자들이 실제로 사용** 하고있으며 사용자들이 원하는 기능이 있다면 그 때마다 추가하고 있습니다.

현재도 사용자들이 조금 더 편하게 사용할 수 있도록 UI / UX , 기능을 계속 개발하고 있습니다.

<br>

## 🙋🏻‍♀️ 팀 구성

|   역할    |  이름  |                 Github                  |
| :-------: | :----: | :-------------------------------------: |
| Front-End | 하나경 | [Github](https://github.com/NagyeongHa) |
| Back-End  | 허지원 |   [Github](https://github.com/heocat)   |

<br>

## 🗓️ 개발 기간

2022.06.01 ~ 2022.07.05 (필요한 기능 계속 추가중)

<br>

## 🛠️ 사용 기술

**Front**

- React
- Recoil
- Style-Components
- AWS S3 + CloudFront

**Back**

- JAVA
- Spring Boot
- SPL
- JPA
- JWT
- PostgreSQL
- Heroku

<br>

## 📌 기능 구현

### 일기 조회

달력을 클릭하면 클릭한 날짜에 해달하는 일기를 조회할 수 있습니다.
![2022-08-28 18;23;28](https://user-images.githubusercontent.com/90600892/188437983-5f5b2f69-370b-4c20-90e3-cd7f1eeee5f9.gif)

<br>

### 일기 작성

![일기 작성](https://user-images.githubusercontent.com/90600892/188438648-986d52f2-374d-4374-83ee-3e91104ff744.gif)

<br>

### 일기 수정 / 삭제

로그인한 유저아이디와 일기를 작성한 아이디가 일치하면 수정 / 삭제 버튼을 보여줍니다.
![일기 수정_삭제](https://user-images.githubusercontent.com/90600892/188438951-f91f501e-55e4-449e-bfdf-57f8b1230823.gif)

<br>

### 댓글 수정 / 삭제

일기마다 댓글을 남길 수 있습니다. 말풍선 아이콘을 클릭하면 댓글창을 볼 수 있으며 댓글 수정 / 삭제가 가능합니다.
![댓글](https://user-images.githubusercontent.com/90600892/188439267-e55478fc-f418-40ca-a786-964c9ff02997.gif)

<br>

### 내가 쓴 일기 모아보기

마이페이지에서 내가 쓴 일기를 볼 수 있으며 아코디언 형식으로 구현하였습니다.
여기서도 마찬가지로 수정과 삭제를 할 수 있습니다.
![마이페이지](https://user-images.githubusercontent.com/90600892/188439277-1631614a-dcb6-41f7-8708-2dcc91ae408a.gif)
