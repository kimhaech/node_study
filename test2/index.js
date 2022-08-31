const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 임시 데이터
const users = [
  {id: 1, name: "유저1"},
  {id: 2, name: "유저2"},
  {id: 3, name: "유저3"},
  {id: 4, name: "유저4"},
]

/*
  req : request 요청
  res : response 응답
  get : 조회
  post : 생성
  put : 전체 수정
  delete : 삭제
  patch : 수정
 */

// get localhost:3000/
// 요청 데이터 값이 없고 반환 값이 있는 get
app.get("/",(req, res) =>{
  // 해당 데이터 반환
  res.send("Hello World");
})

// get localhost:3000/api/users
// 요청 데이터 값이 없고 반환 값이 있는 get
app.get("/api/users",(req, res) =>{
  // 유저 정보 반환
  res.json({ok: true, users: users});
})

// get localhost:3000/api/users/user
// Query Params 방식 -> 요청 데이터 값이 있고 반환 값이 있는 get
// user 뒤 user_id 변수를 통해 값을 찾아올 수 있음(/user?user_id=1&name="유저1")
app.get("/api/users/user",(req, res) =>{
  const user_id = req.query.user_id

  const user = users.filter(data => data.id == user_id);

  res.json({ok: false, user: user})
})

// get localhost:3000/api/users/userBody
// Body 요청 방식 -> 요청 데이터 값이 있고 반환 값이 있는 get
app.get("/api/users/userBody",(req, res) =>{
  const user_id = req.body.user_id

  const user = users.filter(data => data.id == user_id);

  res.json({ok: false, user: user})
})

// get localhost:3000/api/users/:user_id
// Path Variables 요청 방식 -> 요청 데이터 값이 있고 반환 값이 있는 get
// :user_id는 서버에서 설정한 주소 키 값
// 값을 찾을 때는 req.params.user_id로 찾는다
// 주의 -> 경로가 /users/1 혹은 /users/2 같은 경우 둘 다 라우터를 거치게 된다. 때문에 다른 라우터보다 아래에 있어야한다.
app.get("/api/users/:user_id",(req, res) =>{
  const user_id = req.params.user_id

  const user = users.filter(data => data.id == user_id);

  res.json({ok: false, user: user})
})

// post localhost:3000/api/users/add
// 데이터를 생성할 때 사용
// 보통 req.body에 데이터를 담아서 보낸다.
app.post("/api/users/add",(req, res) =>{
  // 구조분해를 통해 id, name 추출
  const {id, name} = req.body

  const user = users.concat({id,name});

  res.json({ok: true, uesrs: user})
})

// put localhost:3000/api/users/update
// 전체 데이터를 수정할 때 사용
app.put("/api/users/update",(req, res) =>{
  const {id, name} = req.body
  
  const user = users.map(data => {
    if (data.id == id) data.name = name
    return {
      id: data.id,
      naem: data.name
    }
  })

  res.json({ok: true, users: user})
})

// patch localhost:3000/api/user/update/:user_id
// 단일 데이터를 수정할 때 사용
app.patch("/api/user/update/:user_id",(req, res) =>{
  const {user_id} = req.params
  const {name} = req.body

  const user = users.map(data =>{
    if(data.id == user_id) data.name = name
    return {
      id: data.id,
      name: data.name
    }
  })

  res.json({ok: true, users: user})
})

// delete localhost:3000/api/user/delete
// 데이터 삭제
app.delete("/api/user/delete",(req, res)=>{
  const user_id = req.query.user_id
  const user = users.filter(data => data.id != user_id);

  res.json({ok: true, users: user})
})

app.listen(3000, () => console.log("Listening on port 3000"));
