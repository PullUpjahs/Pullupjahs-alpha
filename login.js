async function login(event) {
    event.preventDefault(); // 폼 제출 방지

    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    const resultDiv = document.getElementById("result");

    if (!userId || !password) {
        resultDiv.innerHTML = "아이디와 비밀번호를 입력하세요.";
        return;
    }

    try {
        const response = await fetch('students.json'); // students.json 파일을 불러옵니다.
        const data = await response.json(); // JSON 데이터를 파싱합니다.

        const student = data.find(row => row.id === userId && row.password === password); // 아이디와 비밀번호 확인

        if (student) {
            resultDiv.innerHTML = `
                <p>성적: <strong>${student.score}</strong></p>
                <p><a href="${student.downloadLink}" target="_blank">파일 다운로드</a></p>
            `;
        } else {
            resultDiv.innerHTML = "로그인 실패! 아이디 또는 비밀번호를 확인하세요.";
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = "서버에 접속할 수 없습니다. 잠시 후 다시 시도해주세요.";
    }
}

// 로그인 폼의 이벤트 리스너 추가
document.getElementById("loginForm").addEventListener("submit", login);
