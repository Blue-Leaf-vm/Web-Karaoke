let inanime = false;
let isshowed = false;

//상단바 생성

//카운터 생성
const timerimage = document.createElement("img");
timerimage.id = "timerimage";
wrapper.appendChild(timerimage);

//number: 곡 번호, title: 곡 제목, dis: 곡 설명, sing: 가수, gender: 성별, songint: 원음정, curint: 현재음정, lyrics: 작사, compos: 작곡, original: 원작자, banner: 배너, lang: 곡 언어, type: [0: 오리지널, 1: MV, 2: MR, 3: LIVE, 4: 음악]
function startsong(number, title, dis, sing, gender, songint, curint, lyrics, compos, original, banner, lang="KR", type="ORI"){
	inanime = true;
	isshowed = true;
	//상단바 숨기기
	//시간, 네트워크 숨기기

	//곡 시작 화면 표출
	const infobox = document.getElementById("infobox") || document.createElement("div");
	infobox.id = "infobox";
	infobox.innerHTML = '';

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
	infobox.appendChild(upperbox);

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
	infobox.appendChild(downbox);
	document.getElementById("wrapper").appendChild(infobox);

	downbox.id = "downbox";
	downblackbox.id = "downblackbox";
	ad.id = "ad";
	ci.id = "ci";
	datatxt.id = "datatext";
	if(Math.floor(Math.random() * 2)==0){
		upperbox.style.top = "-400px";
		downbox.style.bottom = "-400px";
		setTimeout(() => {upperbox.style.top = "150px";}, 10);
		setTimeout(() => {downbox.style.bottom = "100px";}, 200);
	} else {
		upperbox.style.left = "150%";
		downbox.style.left = "-50%";
		setTimeout(() => {upperbox.style.left = "50%";}, 10);
		setTimeout(() => {downbox.style.left = "50%";}, 200);
	}
	setTimeout(() => {
		inanime = false;
		//시간, 네트워크 보이기
	}, 410);
}

function hidestartbox(){
	//곡 시작 화면 숨기기 (애니메이션이 모두 작동한 후 숨겨져야 함)
	const infobox = document.getElementById("infobox");
	if(!inanime) { 
		infobox.remove();
		isshowed = false;
		setTimeout(()=>{
			timerimage.style.display = "block";
		},500);
		/*1초 뒤 상단바 표시*/
	}
}

//bpm: 곡 BPM, isup: [true: 위, false: 아래], startcount: [4, 3, 2, 1]
async function timer(bpm, isup, startcount=4){
	//4,3,2,1표출
	if (!isshowed) timerimage.style.display = "block";
	//isup에 맞는 가사에서 현재 렌더링된 상태의 가사를 지정
	//그 가사의 왼쪽 끝을 타이머 이미지의 시작 x로 잡는다
	//그 가사의 위쪽을 y로 잡는다
	const lyricElem = document.getElementById(isup ? "upperlyrictext" : "lowerlyrictext");
	const pos = getScaledPositionToWrapper(lyricElem);

	let left = pos.x;
	let top = pos.y - 180;

	timerimage.style.left = left + "px";
	timerimage.style.top = top + "px";

	for (let i = startcount; i > 0; i--) {
		timerimage.src = `./skin/2series/assets/song/playing/timer/${i}.png`;
		timerimage.style.left = left + "px";
		timerimage.style.top = top + "px";
		await wait(60000 / bpm);
		left += 50;
	}

	timerimage.style.display = "none";
	timerimage.src = "#";
}

function getScaledPositionToWrapper(element) {
	const wrapper = document.getElementById("wrapper");
	const wrapperRect = wrapper.getBoundingClientRect();
	const elemRect = element.getBoundingClientRect();

	const scale = wrapperRect.width / 1920; // wrapper scaling 기준
	const relativeX = (elemRect.left - wrapperRect.left) / scale;
	const relativeY = (elemRect.top - wrapperRect.top) / scale;

	return { x: relativeX, y: relativeY };
}

//showpron: [boolean: 발음 표시 여부], data: {hurigana: [일본곡 한정], lyric: [], pronunciation: []} 형태로 전달되는 줄 데이터, isup: [true: 위, false: 아래], lang: 곡 언어
function renderlyric(showpron, data, isup, lang){
	const lyricbox = document.createElement("div");
	const lyrictextbox = document.createElement("div");
	const lyrictext = document.createElement("p");
	const lyrichuri = document.createElement("p");

	const lyrictextboxdrag = document.createElement("div");
	const lyrictextdrag = document.createElement("p");
	const lyrichuridrag = document.createElement("p");

	const lyricpron = document.createElement("p");

	lyricbox.id = isup ? "upperlyricbox" : "lowerlyricbox";
	lyrictextbox.id = isup ? "upperlyrictextbox" : "lowerlyrictextbox";
	lyrictext.id = isup ? "upperlyrictext" : "lowerlyrictext";
	lyrichuri.id = isup ? "upperlyrichuri" : "lowerlyrichuri";
	lyrictextboxdrag.id = isup ? "upperlyrictextboxdrag" : "lowerlyrictextboxdrag";
	lyrictextdrag.id = isup ? "upperlyrictextdrag" : "lowerlyrictextdrag";
	lyrichuridrag.id = isup ? "upperlyrichuridrag" : "lowerlyrichuridrag";
	lyricpron.id = isup ? "upperlyricpron" : "lowerlyricpron";
	
	lyrichuri.classList.add("lyrichuri");
	lyrictext.classList.add("lyrictext");
	lyricpron.classList.add("lyricpron");

	lyrichuridrag.classList.add("lyrichuri");
	lyrictextdrag.classList.add("lyrictext");

	lyrictext.innerText = data.lyrics.join('');
	lyrichuri.innerText = lang === "JP" ? (data.hurigana?.join('') || '') : "";
	lyrictextdrag.innerText = "";
	lyrichuridrag.innerText = "";
	lyricpron.innerText = showpron ? data.pronunciation.join(' ') : "";

	if(showpron&&isup){
		lyricbox.style.top = "680px";
	}

	lyrictextbox.appendChild(lyrictext);
	lyrictextbox.appendChild(lyrichuri);
	lyrictextboxdrag.appendChild(lyrictextdrag);
	lyrictextboxdrag.appendChild(lyrichuridrag);

	lyricbox.appendChild(lyrictextbox);
	lyricbox.appendChild(lyrictextboxdrag);
	lyricbox.appendChild(lyricpron);

	document.getElementById("wrapper").appendChild(lyricbox);

	requestAnimationFrame(() => {
		const textElem = lyrictext;
		const pronElem = lyricpron;

		const halfWidth = textElem.offsetWidth / 2;
		pronElem.style.position = "absolute";
		pronElem.style.left = `${textElem.offsetLeft + halfWidth}px`;
		pronElem.style.transform = "translateX(-50%)";
	});
}


//data: {hurigana: [일본곡 한정], lyric: [], pronunciation: []} 형태로 전달되는 줄 데이터, isup: [true: 위, false: 아래], lang: 곡 언어
async function draglyric(data, isup, lang) {
	const lyrictextboxdrag = document.getElementById(isup ? "upperlyrictextboxdrag" : "lowerlyrictextboxdrag");
	const lyrictextdrag = document.getElementById(isup ? "upperlyrictextdrag" : "lowerlyrictextdrag");
	const lyrichuridrag = document.getElementById(isup ? "upperlyrichuridrag" : "lowerlyrichuridrag");

	lyrichuridrag.innerText = lang === "JP" ? (data.hurigana?.join('') || '') : "";

	lyrictextdrag.innerText = "";
	lyrictextboxdrag.style.width = "0px";

	for (let j = 0; j < data.lyrics.length; j++) {
		lyrictextdrag.innerText += data.lyrics[j];

		await new Promise(requestAnimationFrame);

		lyrictextboxdrag.style.transition = `width ${data.timing[j]}ms linear`;
		const targetWidth = lyrictextdrag.scrollWidth;
		lyrictextboxdrag.style.width = `${targetWidth}px`;

		await wait(data.timing[j]);
		await wait(data.wait[j]);
	}
}

function hidelyric(isup){
	//가사 숨기기
	const lyricbox = document.getElementById(isup ? "upperlyricbox" : "lowerlyricbox");
	lyricbox.remove();
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