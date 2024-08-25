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
         <img width="400px" src="https://github.com/user-attachments/assets/1095d8ba-da67-4931-9d12-98c0a241f826"/>
       </p>

<br> 

### 아키텍쳐
#### 디렉터리 구조
```
- BackEnd -
📦src
 ┣ 📂image
 ┃ ┗ 📜not_select_image.jpg
 ┣ 📂main
 ┃ ┣ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂example
 ┃ ┃ ┃ ┃ ┗ 📂TravelCourseApplication
 ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SecurityConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SecurityUtil.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DayComponentController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MovieController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RouteController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TravelPlanController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserController.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂converter
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜StringListConverter.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Authority.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DayComponent.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DayComponentNote.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DayComponentPlace.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FavoritePlace.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜GoogleReview.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Location.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Member.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Movie.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Place.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RefreshToken.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Token.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TravelPlan.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserReview.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAccessDeniedHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationEntryPoint.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtSecurityConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TokenProvider.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DayComponentNoteRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DayComponentPlaceRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DayComponentRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FavoritePlaceRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MovieRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PlaceRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RefreshTokenRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TravelPlanRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserReviewRepository.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomUserDetailsService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DayComponentService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MailService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MovieService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PlaceDetailService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PlaceImageService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ReviewService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RouteService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TravelPlanService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserService.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜TravelCourseApplication.java
 ┃ ┗ 📂resources
 ┃ ┃ ┗ 📜application.properties
 ┣ 📂reviewImage
 ┃ ┣ 📜2f84637a-d2d8-4746-b12b-12f042692fdc.png
            ...

- FrontEnd -
📦src
 ┣ 📂api
 ┃ ┣ 📜CategoryApiService.js
 ┃ ┣ 📜DayComponentApiService.js
 ┃ ┣ 📜FavoritePlaceApiService.js
 ┃ ┣ 📜LocationApiService.js
 ┃ ┣ 📜ReviewApiService.js
 ┃ ┣ 📜RouteApiService.js
 ┃ ┣ 📜TravelPlanApiService.js
 ┃ ┗ 📜UserApiService.js
 ┣ 📂components
 ┃ ┣ 📂BaseComponents
 ┃ ┃ ┣ 📜DetailPageAddress.jsx
 ┃ ┃ ┣ 📜DetailPageAddress.module.css
 ┃ ┃ ┣ 📜DetailPageHeader.jsx
 ┃ ┃ ┣ 📜DetailPageHeader.module.css
 ┃ ┃ ┣ 📜DetailPageSummary.jsx
 ┃ ┃ ┗ 📜DetailPageSummary.module.css
 ┃ ┣ 📂CafePageComponents
 ┃ ┃ ┣ 📜CafeCategory.jsx
 ┃ ┃ ┣ 📜CafeCategory.module.css
 ┃ ┃ ┣ 📜CafeCategoryCard.jsx
 ┃ ┃ ┣ 📜CafeCategoryCard.module.css
 ┃ ┃ ┣ 📜CafeIcon.jsx
 ┃ ┃ ┣ 📜CafeIcon.module.css
 ┃ ┃ ┣ 📜CafeSelect.jsx
 ┃ ┃ ┣ 📜CafeSelect.module.css
 ┃ ┃ ┣ 📜FirstType.jsx
 ┃ ┃ ┣ 📜FirstType.module.css
 ┃ ┃ ┣ 📜SecondType.jsx
 ┃ ┃ ┣ 📜SecondType.module.css
 ┃ ┃ ┣ 📜ThirdType.jsx
 ┃ ┃ ┗ 📜ThirdType.module.css
 ┃ ┣ 📂FoodStorePageComponents
 ┃ ┃ ┣ 📜FoodCategory.jsx
 ┃ ┃ ┣ 📜FoodCategory.module.css
 ┃ ┃ ┣ 📜FoodInput.jsx
 ┃ ┃ ┗ 📜FoodInput.module.css
 ┃ ┣ 📂HotelPageComponents
 ┃ ┃ ┣ 📜HotelCategory.jsx
 ┃ ┃ ┣ 📜HotelCategory.module.css
 ┃ ┃ ┣ 📜HotelIcon.jsx
 ┃ ┃ ┣ 📜HotelIcon.module.css
 ┃ ┃ ┣ 📜HotelSelect.jsx
 ┃ ┃ ┗ 📜HotelSelect.module.css
 ┃ ┣ 📂MainPageComponents
 ┃ ┃ ┣ 📜Address.jsx
 ┃ ┃ ┣ 📜Address.module.css
 ┃ ┃ ┣ 📜Category.jsx
 ┃ ┃ ┣ 📜Category.module.css
 ┃ ┃ ┣ 📜Icon.jsx
 ┃ ┃ ┣ 📜Icon.module.css
 ┃ ┃ ┣ 📜NotSelectTypeModal.jsx
 ┃ ┃ ┣ 📜NotSelectTypeModal.module.css
 ┃ ┃ ┣ 📜PlaceDetail.jsx
 ┃ ┃ ┣ 📜PlaceDetail.module.css
 ┃ ┃ ┣ 📜PlaceInformation.jsx
 ┃ ┃ ┣ 📜PlaceInformation.module.css
 ┃ ┃ ┣ 📜PlaceItemCard.jsx
 ┃ ┃ ┣ 📜PlaceItemCard.module.css
 ┃ ┃ ┣ 📜PlaceItemCarousel.jsx
 ┃ ┃ ┣ 📜PlaceItemCarousel.module.css
 ┃ ┃ ┣ 📜PlaceReview.jsx
 ┃ ┃ ┣ 📜PlaceReview.module.css
 ┃ ┃ ┣ 📜ReviewImage.jsx
 ┃ ┃ ┣ 📜ReviewImage.module.css
 ┃ ┃ ┣ 📜ReviewSummary.jsx
 ┃ ┃ ┣ 📜ReviewSummary.module.css
 ┃ ┃ ┣ 📜WriteReview.jsx
 ┃ ┃ ┗ 📜WriteReview.module.css
 ┃ ┣ 📂MoviePageComponents
 ┃ ┃ ┣ 📜Movie.jsx
 ┃ ┃ ┣ 📜Movie.module.css
 ┃ ┃ ┣ 📜MovieList.jsx
 ┃ ┃ ┗ 📜MovieList.module.css
 ┃ ┣ 📂MyPageComponents
 ┃ ┃ ┣ 📜DeleteUser.jsx
 ┃ ┃ ┣ 📜DeleteUser.module.css
 ┃ ┃ ┣ 📜EditEmail.jsx
 ┃ ┃ ┣ 📜EditEmail.module.css
 ┃ ┃ ┣ 📜EditName.jsx
 ┃ ┃ ┣ 📜EditName.module.css
 ┃ ┃ ┣ 📜EditPassword.jsx
 ┃ ┃ ┣ 📜EditPassword.module.css
 ┃ ┃ ┣ 📜EditReview.jsx
 ┃ ┃ ┣ 📜EditReview.module.css
 ┃ ┃ ┣ 📜FavoriteList.jsx
 ┃ ┃ ┣ 📜FavoriteList.module.css
 ┃ ┃ ┣ 📜MyInformation.jsx
 ┃ ┃ ┣ 📜MyInformation.module.css
 ┃ ┃ ┣ 📜MyReview.jsx
 ┃ ┃ ┣ 📜MyReview.module.css
 ┃ ┃ ┣ 📜MyTravelList.jsx
 ┃ ┃ ┣ 📜MyTravelList.module.css
 ┃ ┃ ┣ 📜UserDetail.jsx
 ┃ ┃ ┗ 📜UserDetail.module.css
 ┃ ┣ 📂NewPlanPageComponents
 ┃ ┃ ┣ 📜DayComponent.jsx
 ┃ ┃ ┣ 📜DayComponent.module.css
 ┃ ┃ ┣ 📜EditNote.jsx
 ┃ ┃ ┣ 📜EditNote.module.css
 ┃ ┃ ┣ 📜KakaoMap.jsx
 ┃ ┃ ┣ 📜Note.jsx
 ┃ ┃ ┣ 📜Note.module.css
 ┃ ┃ ┣ 📜NoteCard.jsx
 ┃ ┃ ┣ 📜NoteCard.module.css
 ┃ ┃ ┣ 📜PlaceCard.jsx
 ┃ ┃ ┣ 📜PlaceCard.module.css
 ┃ ┃ ┣ 📜SearchPlace.jsx
 ┃ ┃ ┣ 📜SearchPlace.module.css
 ┃ ┃ ┣ 📜SelectPlaceIcon.jsx
 ┃ ┃ ┣ 📜SelectPlaceIcon.module.css
 ┃ ┃ ┣ 📜Time.jsx
 ┃ ┃ ┗ 📜Time.module.css
 ┃ ┣ 📂ParkPageComponents
 ┃ ┃ ┣ 📜ParkCategory.jsx
 ┃ ┃ ┣ 📜ParkCategory.module.css
 ┃ ┃ ┣ 📜ParkIcon.jsx
 ┃ ┃ ┣ 📜ParkIcon.module.css
 ┃ ┃ ┣ 📜ParkSelect.jsx
 ┃ ┃ ┗ 📜ParkSelect.module.css
 ┃ ┣ 📂PlayPageComponents
 ┃ ┃ ┣ 📜PlaceIcon.jsx
 ┃ ┃ ┣ 📜PlaceIcon.module.css
 ┃ ┃ ┣ 📜PlayCategory.jsx
 ┃ ┃ ┣ 📜PlayCategory.module.css
 ┃ ┃ ┣ 📜PlayCategoryCard.jsx
 ┃ ┃ ┣ 📜PlayCategoryCard.module.css
 ┃ ┃ ┣ 📜PlayFirstType.jsx
 ┃ ┃ ┣ 📜PlayFirstType.module.css
 ┃ ┃ ┣ 📜PlaySecondType.jsx
 ┃ ┃ ┣ 📜PlaySecondType.module.css
 ┃ ┃ ┣ 📜PlaySelect.jsx
 ┃ ┃ ┣ 📜PlaySelect.module.css
 ┃ ┃ ┣ 📜PlayThirdType.jsx
 ┃ ┃ ┗ 📜PlayThirdType.module.css
 ┃ ┣ 📂TravelCourseComponents
 ┃ ┃ ┣ 📜Date.css
 ┃ ┃ ┣ 📜Date.jsx
 ┃ ┃ ┣ 📜DateComponent.module.css
 ┃ ┃ ┣ 📜EditDateModal.jsx
 ┃ ┃ ┣ 📜EditDateModal.module.css
 ┃ ┃ ┣ 📜FirstStep.jsx
 ┃ ┃ ┣ 📜FirstStep.module.css
 ┃ ┃ ┣ 📜KoreaPlaceIcon.jsx
 ┃ ┃ ┣ 📜KoreaPlaceIcon.module.css
 ┃ ┃ ┣ 📜MyPlan.jsx
 ┃ ┃ ┣ 📜MyPlan.module.css
 ┃ ┃ ┣ 📜NewPlan.jsx
 ┃ ┃ ┣ 📜NewPlan.module.css
 ┃ ┃ ┣ 📜SecondStep.jsx
 ┃ ┃ ┣ 📜SecondStep.module.css
 ┃ ┃ ┣ 📜SelectDate.jsx
 ┃ ┃ ┗ 📜SelectDate.module.css
 ┃ ┣ 📂UserComponents
 ┃ ┃ ┣ 📜FindId.jsx
 ┃ ┃ ┣ 📜FindId.module.css
 ┃ ┃ ┣ 📜FindPass.jsx
 ┃ ┃ ┣ 📜FindPass.module.css
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┣ 📜Login.module.css
 ┃ ┃ ┣ 📜Signup.jsx
 ┃ ┃ ┣ 📜Signup.module.css
 ┃ ┃ ┣ 📜UserModal.jsx
 ┃ ┃ ┗ 📜UserModal.module.css
 ┃ ┣ 📜Footer.jsx
 ┃ ┣ 📜Footer.module.css
 ┃ ┣ 📜Header.jsx
 ┃ ┣ 📜Header.module.css
 ┃ ┣ 📜Loading.jsx
 ┃ ┣ 📜Loading.module.css
 ┃ ┣ 📜MainNavigation.jsx
 ┃ ┣ 📜MainNavigation.module.css
 ┃ ┣ 📜Route.jsx
 ┃ ┣ 📜Route.module.css
 ┃ ┣ 📜SearchPlaceLoading.jsx
 ┃ ┣ 📜SearchPlaceLoading.module.css
 ┃ ┣ 📜SetTimeOutModal.jsx
 ┃ ┗ 📜SetTimeOutModal.module.css
 ┣ 📂hooks
 ┃ ┣ 📜useAuthFunction.js
 ┃ ┗ 📜useFetchPlaceItem.js
 ┣ 📂image
 ┃ ┣ 📜art-gallery.png
 ┃ ┣ 📜bar.png
 ┃ ┣ 📜busan.jpg
 ┃ ┣ 📜calendar.png
 ┃ ┣ 📜column.png
 ┃ ┣ 📜ediya_coffee.png
 ┃ ┣ 📜endLocation.png
 ┃ ┣ 📜escape.png
 ┃ ┣ 📜header_bg.png
 ┃ ┣ 📜historic-site.png
 ┃ ┣ 📜homeImg.jpg
 ┃ ┣ 📜hotel.png
 ┃ ┣ 📜jeju.jpg
 ┃ ┣ 📜main_page_movie_img.jpg
 ┃ ┣ 📜main_page_section_img.jpg
 ┃ ┣ 📜mega_coffee.png
 ┃ ┣ 📜microphone.png
 ┃ ┣ 📜midLocation.png
 ┃ ┣ 📜monitor.png
 ┃ ┣ 📜motel.png
 ┃ ┣ 📜mountain.jpg
 ┃ ┣ 📜movie-ticket.png
 ┃ ┣ 📜museum.png
 ┃ ┣ 📜no_image.jpg
 ┃ ┣ 📜park.png
 ┃ ┣ 📜pc_room.png
 ┃ ┣ 📜place.png
 ┃ ┣ 📜popcorn.png
 ┃ ┣ 📜resort.png
 ┃ ┣ 📜route.png
 ┃ ┣ 📜sauna.png
 ┃ ┣ 📜seoul.jpg
 ┃ ┣ 📜shopping.png
 ┃ ┣ 📜sokcho.jpg
 ┃ ┣ 📜Spinner.gif
 ┃ ┣ 📜starbucks.png
 ┃ ┣ 📜startLocation.png
 ┃ ┣ 📜twosome_coffee.jpg
 ┃ ┣ 📜wooden-house.png
 ┃ ┗ 📜zoo.png
 ┣ 📂layout
 ┃ ┣ 📜Modal.js
 ┃ ┣ 📜Modal.module.css
 ┃ ┣ 📜PlaceDetailModal.js
 ┃ ┗ 📜PlaceDetailModal.module.css
 ┣ 📂loader
 ┃ ┗ 📜DateFetch.js
 ┣ 📂page
 ┃ ┣ 📂detailPage
 ┃ ┃ ┣ 📜CafePage.jsx
 ┃ ┃ ┣ 📜CafePage.module.css
 ┃ ┃ ┣ 📜DayComponentPage.jsx
 ┃ ┃ ┣ 📜DayComponentPage.module.css
 ┃ ┃ ┣ 📜FoodStorePage.jsx
 ┃ ┃ ┣ 📜FoodStorePage.module.css
 ┃ ┃ ┣ 📜HotelPage.jsx
 ┃ ┃ ┣ 📜HotelPage.module.css
 ┃ ┃ ┣ 📜MoviePage.jsx
 ┃ ┃ ┣ 📜MoviePage.module.css
 ┃ ┃ ┣ 📜Mypage.jsx
 ┃ ┃ ┣ 📜MyPage.module.css
 ┃ ┃ ┣ 📜ParkPage.jsx
 ┃ ┃ ┣ 📜ParkPage.module.css
 ┃ ┃ ┣ 📜PlayPage.jsx
 ┃ ┃ ┣ 📜PlayPage.module.css
 ┃ ┃ ┣ 📜TravelCourse.module.css
 ┃ ┃ ┗ 📜TravelCoursePage.jsx
 ┃ ┣ 📜FindIdPage.jsx
 ┃ ┣ 📜FindIdPage.module.css
 ┃ ┣ 📜FindPassPage.jsx
 ┃ ┣ 📜FindPassPage.module.css
 ┃ ┣ 📜HomePage.jsx
 ┃ ┣ 📜Homepage.module.css
 ┃ ┣ 📜MainPage.jsx
 ┃ ┣ 📜Mainpage.module.css
 ┃ ┣ 📜Root.jsx
 ┃ ┣ 📜SignupPage.jsx
 ┃ ┗ 📜SignupPage.module.css
 ┣ 📂store
 ┃ ┣ 📜auth-context.js
 ┃ ┣ 📜AuthProvider.js
 ┃ ┣ 📜login-context.js
 ┃ ┗ 📜LoginProvider.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```
