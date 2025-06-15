//number: 곡 번호, title: 곡 제목, dis: 곡 설명, sing: 가수, songint: 원음정, curint: 현재음정, lyrics: 작사, compos: 작곡, original: 원작자, banner: 배너, lang: 곡 언어, type: [0: 오리지널, 1: MV, 2: MR, 3: LIVE, 4: 음악]
function startsong(number, title, dis, sing, songint, curint, lyrics, compos, original, banner, lang="KR", type="ORI"){
	//곡 시작 화면 표출
}

//bpm: 곡 BPM, startcount: [4, 3, 2, 1]
function timer(bpm, startcount=4){
	//4,3,2,1표출
}

//type: [free, time, coin]
function limit(type="free"){
	//시간, 코인 처리
}

//number: 곡 번호, s: 성별, inter: 음정, title: 제목, dis: 곡 설명, sing: 가수
function searchsong(number, s, inter, title, dis, sing){
	//검색 처리
}

//type: [0: 일반 안내, 1: 오류 안내], message: 안내 메세지
function info(type=0, message){
	//안내 처리
}

//score: 점수
function endsong(score){
	//점수 화면 표시
}

//songs: 부른 곡 목록, scores: 부른 곡 점수 목록 (배열로 입력)
function endkar(songs, scores){
	//퇴장화면 표시
}