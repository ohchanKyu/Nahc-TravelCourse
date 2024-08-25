<h1 align="center">$\bf{\large{\color{aqua} Nahc \ TravelCourse }}$</h1>
<h3 align="center">
    Nahc 여행 플랫폼 사이트
</h3>
<p align="center">
   Spring boot / React Framework를 이용한 여행 플랫폼 사이트
</p>

<br>

<blockquote>
  <p dir="auto">
     <strong> Spring boot / React Framework를 이용한 여행 플랫폼 사이트 </strong> <br>
     <strong> 개발 기간 : 2024.01.03 ~ 2024.02.24 </strong> <br>
  </p>
</blockquote>

<br>

### 프로젝트 소개
해당 프로젝트는 여행 플랫폼 사이트로, <br>
Triple 어플을 응용한 웹 사이트이다. <br>
자신의 현재 위치 혹은 주소를 기반으로 장소를 카테고리 별로 검색할 수 있으며, <br>
여행 계획을 세울 수 있는 플래너를 작성할 수 있다. <br>
영화관 카테고리에서는 최근 인기인 박스오피스 영화 정보도 얻을 수 있다. <br>

<br> 

### 개발 환경
<p>$\bf{\large{\color{aqua} FrontEnd \ : HTML / css / JavaScript }}$</p>
<p>$\bf{\large{\color{aqua} BackEnd \ : Java / MySQL }}$</p>
<p>$\bf{\large{\color{aqua} Framework \ : Spring boot / React }}$</p>
<p>$\bf{\large{\color{aqua} Framework \ Main \  Dependency}}$</p>

- [x] Jpa
- [x] Maven
- [x] Spring Security
- [x] Jsonwebtoken
- [X] Axios
- [X] React Router  

<br>

### 데이터 및 API
- <p>$\bf{\large{\color{aqua} Kakao \ API  }}$</p>
  
  - Kakao API를 통해 위,경도 변환 및 근처 장소 검색
    
- <p>$\bf{\large{\color{aqua} Google \ API  }}$</p>
  
  - Google API를 통해 장소 상제 정보 및 장소 이미지 데이터 획득
  - 현재 Google Cloud 기간 만료로 사진 데이터 X (2024.03.24~)
    
- <p>$\bf{\large{\color{aqua} KmDB \ / Kobis \ API  }}$</p>
  
  - KmDB / Kobis API를 통해 박스오피스 영화 정보 및 영화 썸네일 포스트 획득

<br>

### 페이지 및 서비스 기능

- <p>$\bf{\large{\color{aqua} 메인화면 \ 및 \ 영화 카테고리 \ UI }}$</p>

   #### 기능
     * 웹 서비스에 대한 메인 화면
     * 대표 상품, 인기 상품, 평점 순으로 쇼핑 아이템 나열
     * 상품에 대한 검색 기능 제공
   #### 핵심 기술
     * JWT를 통한 사용자 인증
     * 사용자 즐겨찾기, 플래너, 리뷰 데이터 (DBMS)
     * 이메일 인증 알고리즘
     * KmDB / Kobis API
   #### 사용자 인터페이스
     * 카테고리 선택 UI
       <p align="left">
         <img src="https://github.com/user-attachments/assets/c3266479-177b-4aad-96e1-2a9e22a747a3"/>
       </p>

     * 메인화면 플랫폼 설명 UI
       <p align="left">
         <img src="https://github.com/user-attachments/assets/4b9bf45d-c44b-4ccc-9e2f-c5e0c7ec3043"/>
       </p>
       
     * 영화 카테고리 UI
       <p align="left">
         <img src="https://github.com/user-attachments/assets/479a584d-f8e6-4fde-9ee2-77a907dfecc5"/>
       </p>
       <p align="left">
         <img src="https://github.com/user-attachments/assets/9226e728-79c0-43a8-a49b-35475659a3f0"/>
       </p>
        <p align="left">
         <img src="https://github.com/user-attachments/assets/31bd9a20-b04f-4e0f-9bee-2125be04d829"/>
       </p>
       
<br>

- <p>$\bf{\large{\color{aqua} 주변 \ 장소 \ 검색 \ UI }}$</p>

   #### 기능
     * Kakao API를 이용한 주변 장소 검색
     * Google API를 이용한 장소 이미지 및 세부 정보 검색 (현재는 사용 X)
     * 현재 위치 혹은 검색 주소로부터의 실시간 교통정보
   #### 핵심 기술
     * Kakao API
     * Google API
     * Kakao Map / Daum PostCode
     * 장소 데이터 (DBMS)
   #### 사용자 UI
     * 장소 검색 UI <br>
       <p align="left">
         <img src="https://github.com/user-attachments/assets/b6a0ef48-61aa-496b-a417-ed668159710a"/>
       </p>
       
     * 장소 검색 결과 UI
       <p align="left">
         <img src="https://github.com/user-attachments/assets/a7f533bc-77fe-4942-8af8-4c699ccdb820"/>
       </p>
       <p align="left">
         <img src="https://github.com/user-attachments/assets/56577a10-50e1-4a8e-a9f8-b9eb15c044af"/>
       </p>

<br>

- <p>$\bf{\large{\color{aqua} 플래너 \ 및 \ 리뷰 \ 등록 \ 기능 }}$</p>

   #### 기능
     * 여행 계획을 세우기 위한 플래너 생성 기능
     * 파일업로드를 동반한 리뷰 등록 기능
     * 장소 검색을 위한 검색 기능
   #### 핵심 기술
     * Redux
     * Kakao API
     * 플래너 및 리뷰 데이터 (DBMS)
     * 검색 알고리즘
   #### 사용자 UI
     * 플래너 생성 UI
       <p align="left">
         <img width="800px" src="https://github.com/user-attachments/assets/24ced2f8-ca2c-46f7-b632-0a51a216d305"/>
       </p>
       <p align="left">
         <img width="800px" src="https://github.com/user-attachments/assets/d152af09-8dde-49f4-8244-2edff03f2bf9"/>
       </p>
       <p align="left">
         <img width="800px" src="https://github.com/user-attachments/assets/4a8aed39-f1a7-43ec-b92e-2cbdfcf91fae"/>
       </p>
       
     * 플래너 등록 UI
       <p align="left">
         <img width="800px" src="https://github.com/user-attachments/assets/45d679a4-0d6a-4118-8e67-0b2a99758b11"/>
         <img width="800px" src="https://github.com/user-attachments/assets/5dc0e0d0-4ff0-4096-a30f-02b072173fd3"/>
       </p>

     * 장소 / 메모 / 시간 추가 UI
       <p align="left">
         <img width="400px" src="https://github.com/user-attachments/assets/01cfc8c6-0fa3-4871-ab3f-b3d8e1602fc1"/>
       </p>
       <p align="left">
         <img width="400px" src="https://github.com/user-attachments/assets/9fa5749d-44f2-4cb4-ad60-da101695d906"/>
       </p>
       <p align="left">
         <img width="400px" src="https://github.com/user-attachments/assets/0cb6d4c8-8879-476e-ac3b-61467bbf501c"/>
       </p>

     * 리뷰 등록 UI
       <p align="left">
         <img src="https://github.com/user-attachments/assets/1095d8ba-da67-4931-9d12-98c0a241f826"/>
       </p>

<br> 

### 아키텍쳐
#### 디렉터리 구조
```

```
