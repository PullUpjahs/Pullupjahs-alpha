async function login(event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    const resultDiv = document.getElementById("result");

    if (!userId || !password) {
        resultDiv.innerHTML = "아이디와 비밀번호를 입력하세요.";
        return;
    }

    try {
        // GitHub Pages에서 students.json 파일을 가져오는 fetch 요청
        const response = await fetch("https://github.com/PullUpjahs/Pullupjahs-alpha/blob/main/students.json");

        if (!response.ok) throw new Error("서버 응답 오류");

        const data = await response.json();

        // 학생 정보 검색
        const student = data.find(row => row.ID === userId && row.Password === password);

        if (student) {
            // 로그인 성공
            resultDiv.innerHTML = `
                <p>성적: <strong>${student.Score}</strong></p>
                <p><a href="${student.DownloadLink}" target="_blank">파일 다운로드</a></p>
            `;
        } else {
            // 로그인 실패
            resultDiv.innerHTML = "아이디 또는 비밀번호가 잘못되었습니다.";
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = "서버에 접속할 수 없습니다. 잠시 후 다시 시도해주세요.";
    }
}

// 로그인 폼의 submit 이벤트 처리
document.getElementById("loginForm").addEventListener("submit", login);
