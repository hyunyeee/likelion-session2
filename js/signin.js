const formEl = document.querySelector('#loginForm');
const idEl = document.querySelector('#idInput');
const passwordEl = document.querySelector('#passwordInput');

const checkLogin = (id, password) => {
    const userList = localStorage.getItem('userList');

    if (!userList) return false;

    const convertToJson = JSON.parse(userList); // 문자열을 JSON형태로 파싱

    const coincedUser = convertToJson.find(user => user.id === id && user.password === password)

    return coincedUser ? true : false;


};

const isLogined = () => {
    return localStorage.getItem('login') ? true : false;
}

const init = () => {
    if (isLogined()) {
        alert('이미 로그인 되어있습니다!')
        location.href = "../html/index.html";
        return;
    }

    //로그인이 안되었을 때 로직
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();

        const isSuccess = checkLogin(idEl.value, passwordEl.value);

        if (isSuccess) {
            alert('로그인 성공!');
            //로그인이 됐으면 로컬스토리지에 로그인이 됐는지 string으로 저장
            localStorage.setItem('login', JSON.stringify(idEl.value))
            location.href = '../html/index.html';
        } else {
            alert('로그인 실패!');
            idEl.value = '';
            passwordEl.value = '';
        }


    })
}

document.addEventListener('DOMContentLoaded', init);





