let inanime = false;

//number: 곡 번호, title: 곡 제목, dis: 곡 설명, sing: 가수, gender: 성별, songint: 원음정, curint: 현재음정, lyrics: 작사, compos: 작곡, original: 원작자, banner: 배너, lang: 곡 언어, type: [0: 오리지널, 1: MV, 2: MR, 3: LIVE, 4: 음악]
function startsong(number, title, dis, sing, gender, songint, curint, lyrics, compos, original, banner, lang="KR", type="ORI"){
	inanime = true;

	//곡 시작 화면 표출
	const wrapper = document.getElementById("wrapper");
	wrapper.innerHTML = '';

	//상단 박스 출력
	const upperbox = document.createElement("div");
	const border = document.createElement("img");
	const backimage = document.createElement("img");

	const titletxt = document.createElement("p");
	const desctxt = document.createElement("p");
	const singtxt = document.createElement("p");
	titletxt.innerText = title;
	singtxt.innerHTML = `<span style="color: #8B70FC">노래</span>&nbsp;&nbsp;&nbsp;<span style="color: #C2C2C2">${sing}</span>`;
	if(dis){
		desctxt.innerText = `(${dis})`;

		singtxt.style.bottom = "40px";

		upperbox.appendChild(desctxt);
		desctxt.id = "upperdesc";
	}

	border.src = `./skin/2series/assets/song/start/startborder/${Math.floor(Math.random() * 5)+1}.png`;
	backimage.src = "./skin/2series/assets/song/start/startbg.png";

	upperbox.appendChild(backimage);
	upperbox.appendChild(titletxt);
	upperbox.appendChild(singtxt);
	upperbox.appendChild(border);
	wrapper.appendChild(upperbox);

	backimage.id = "upbackimage";
	border.id = "upborder";
	upperbox.id = "upperbox";
	titletxt.id = "uppertitle";
	singtxt.id = "uppersing";

	const downbox = document.createElement("div");
	const downblackbox = document.createElement("div");
	const ad = document.createElement("img");
	const ci = document.createElement("img");
	const datatxt = document.createElement("p");

	datatxt.innerHTML = `
		<span style="color: #8B70FC">현재음정</span>&nbsp;<span style="color: #C2C2C2">${gender==0 ? "남성" : gender==1 ? "여성" : "혼성"}&nbsp;${curint}</span>&nbsp;&nbsp;&nbsp;<span style="color: #8B70FC">원음정</span>&nbsp;<span style="color: #C2C2C2">${gender==0 ? "남성" : gender==1 ? "여성" : "혼성"}&nbsp;${songint}</span>
		</br><span style="color: #8B70FC">작사</span>&nbsp;&nbsp;&nbsp;<span style="color: #C2C2C2">${lyrics}</span>
		</br><span style="color: #8B70FC">작곡</span>&nbsp;&nbsp;&nbsp;<span style="color: #C2C2C2">${compos}</span>
		${original ? `</br><span style="color: #8B70FC">원곡</span>&nbsp;&nbsp;&nbsp;<span style="color: #C2C2C2">${original}</span>` : ' '}
	`;
	ad.src = `./skin/2series/assets/song/start/ad/${Math.floor(Math.random() * 7)+1}.png`;
	ci.src = "./skin/2series/assets/song/start/CI.png";

	downblackbox.appendChild(datatxt);
	downbox.appendChild(downblackbox);
	downbox.appendChild(ad);
	downbox.appendChild(ci);
	wrapper.appendChild(downbox);

	downbox.id = "downbox";
	downblackbox.id = "downblackbox";
	ad.id = "ad";
	ci.id = "ci";
	datatxt.id = "datatext";

	setTimeout(() => {upperbox.style.top = "150px";}, 10);
	setTimeout(() => {downbox.style.bottom = "100px";}, 200);
	setTimeout(() => {inanime = false;}, 410);
}

function hidestartbox(){
	//곡 시작 화면 숨기기 (애니메이션이 모두 작동한 후 숨겨져야 함)
	const wrapper = document.getElementById("wrapper");
	if(!inanime) wrapper.innerHTML = '';
}

//bpm: 곡 BPM, startcount: [4, 3, 2, 1]
function timer(bpm, startcount=4){
	//4,3,2,1표출
	
}

//showpron: [boolean: 발음 표시 여부], firstdata: {hurigana: [일본곡 한정], lyric: [], pronunciation: []} 형태로 전달되는 첫번째 줄 데이터, seconddata: 같은 형태로 전달되는 두번째 줄 데이터, lang: 곡 언어
function renderlyric(showpron, firstdata, seconddata, lang){
	//가사 렌더링 및 드래깅
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