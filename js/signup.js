const formE1 = document.querySelector("#signupForm");
const idEl = document.querySelector("#signupId");
const passwordEl = document.querySelector("#signupPassword");

const isUserExist = (newUserId) => {
    const users = localStorage.getItem('userList');
    //로컬스토리지는 key value로 이루어짐

    if (!users) return false;

    const convertedUsers = JSON.parse(users);

    //로컬스토리지로 받아온걸 JSON으로
    // {
    //     id,
    //     password
    // }
    const getExistUsers = convertedUsers.find(user => user.id === newUserId);


    return getExistUsers ? true : false;

}

const registerUser = (userInfo) => {
    const currentUsers = JSON.parse(localStorage.getItem('userList'));

    if (!currentUsers) { // 아무것도 등록 X
        const newUserList = [];
        newUserList.push({ //객체를 push
            id: userInfo.id,
            password: userInfo.password,
        });
        localStorage.setItem('userList', JSON.stringify(newUserList)) //newUserList가 string형태로 파싱됨
    } else {
        const updatedUsers = currentUsers.concat({
            /*
                // concat: 푸쉬하고나서 새로운 객체가 반환됨 원본변형 X
                //
                // origin = [1,2,3], 4
                //
                // 푸쉬하면
                // origin = [1,2,3,4]
                //
                // concat하면
                // origin = [1,2,3] / newArray = [1,2,3,4]
                id: userInfo.id,
                password: userInfo.password,
            */
            id: userInfo.id,
            password: userInfo.password,
        }) ;

        localStorage.setItem('userList', JSON.stringify(updatedUsers));
    }
}

const init = () => {
    // 일급객체
    formE1.addEventListener('submit', (e) => {
        e.preventDefault();

        const idValue = idEl.value;
        const passwordValue = passwordEl.value;

        if (isUserExist(idValue)) {
            alert(`${idValue} 유저는 이미 존재합니다!`)
            idEl.value = '';
            passwordEl.value = '';
            return; //리턴으로 아래 코드 실행 막음
        }

        //회원가입이 가능 하다면 이후 코드 실행 (불가능하면 위 return에서 막힘)

        registerUser({id: idValue, password: passwordValue})
        alert('회원가입 완료!');
        location.href = '../signin.html'

    })
};

document.addEventListener('DOMContentLoaded', init)


















