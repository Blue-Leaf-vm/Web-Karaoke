let inanime = false;
let isshowed = false;
let iscentershowed = false;
let lanimg = 1;
let hidetime = -1;
let rollbackimg;
let rollbackview;
let songtext;
let reservetext;
let lasthap = 0;
let centernum = 0;

//상단바 생성
const topbar = document.createElement("div");
const topimgbox = document.createElement("div");
const topimgimg = document.createElement("img");
const topimgtext = document.createElement("p");
const topblackbar = document.createElement("div");
const toptext = document.createElement("p");
const toptimebox = document.createElement("div");
const toptimeimg = document.createElement("img");
const toptimetext = document.createElement("p");
toptimeimg.appendChild(toptimetext);
topimgbox.appendChild(topimgimg);
topimgbox.appendChild(topimgtext);
topbar.appendChild(topimgbox);
topblackbar.appendChild(toptext);
topbar.appendChild(topblackbar);
toptimebox.appendChild(toptimeimg);
toptimebox.appendChild(toptimetext);
topbar.appendChild(toptimebox);

topimgbox.style.visibility = "hidden";
topblackbar.style.visibility = "hidden";

topbar.id = "topbar";
topimgbox.id = "topimgbox";
topimgimg.id = "topimgimg";
topimgtext.id = "topimgtext";
topblackbar.id = "topblackbar";
toptext.id = "toptext";
toptimebox.id = "toptimebox";
toptimeimg.id = "toptimeimg";
toptimetext.id = "toptimetext";

topimgimg.src = "./skin/2series/assets/ui/info.png";
toptimeimg.src = "./skin/2series/assets/ui/time/time.png";
toptimetext.innerText = "000분";
toptimebox.style.visibility = "hidden";

wrapper.appendChild(topbar);

//네트워크 생성
const networkbox = document.createElement("div");
const networklanimg = document.createElement("img");
const networkwifiimg = document.createElement("img");
networkbox.id = "networkbox";
networklanimg.id = "networklanimg";
networkwifiimg.id = "networkwifiimg";
networkbox.appendChild(networkwifiimg);
networkbox.appendChild(networklanimg);
wrapper.appendChild(networkbox);

//측면 이미지 생성
const sideimage = document.createElement("img");
const noscoreimage = document.createElement("img");
const nochorusimage = document.createElement("img");
const firstphaseimage = document.createElement("img");
sideimage.id = "sideimage";
noscoreimage.id = "noscoreimage";
nochorusimage.id = "nochorusimage";
firstphaseimage.id = "firstphaseimage";
wrapper.appendChild(sideimage);
wrapper.appendChild(noscoreimage);
wrapper.appendChild(nochorusimage);
wrapper.appendChild(firstphaseimage);

//카운터 생성
const timerimage = document.createElement("img");
timerimage.id = "timerimage";
wrapper.appendChild(timerimage);

//안내 이미지 표시
document.addEventListener("DOMContentLoaded", async function() {
	try{
		while(true){
			if (isplaying && hidetime==-1) { topimgimg.src = "./skin/2series/assets/song/playing/nowsong2.png"; toptext.innerHTML = songtext; topimgtext.innerHTML = ''; rollbacktxt = reservetext; rollbackimg = topimgimg.src; rollbackview = 'visible'; await wait(3000); }
			if (isplaying && hidetime==-1) { topimgimg.src = "./skin/2series/assets/song/playing/nowsong.png"; toptext.innerHTML = songtext; topimgtext.innerHTML = ''; rollbacktxt = reservetext; rollbackimg = topimgimg.src; rollbackview = 'visible'; await wait(3000); }
			if (reservedsong.length>0 && hidetime==-1) { topimgimg.src = "./skin/2series/assets/song/playing/nextsong2.png"; toptext.innerHTML = reservetext; topimgtext.innerHTML = ''; rollbacktxt = reservetext; rollbackimg = topimgimg.src; rollbackview = 'visible'; await wait(3000); }
			if (reservedsong.length>0 && hidetime==-1) { topimgimg.src = "./skin/2series/assets/song/playing/nextsong.png"; toptext.innerHTML = reservetext; topimgtext.innerHTML = ''; rollbacktxt = reservetext; rollbackimg = topimgimg.src; rollbackview = 'visible'; await wait(3000); }
			if (reservedsong.length>1 && hidetime==-1) { topimgimg.src = "./skin/2series/assets/song/playing/reserve.png"; toptext.innerHTML = `<span style="color: #fff">${safeJoin(reservedsong, 100, '&nbsp;&nbsp')}</span>`; topimgtext.innerHTML = `<span style="color: #FFFF7F">${String(reservedsong.length).padStart(2, "0")}</span>`; await wait(3000); }
			if (reservedsong.length==0 && !isplaying && hidetime==-1) {	topimgbox.style.visibility = "hidden"; topblackbar.style.visibility = "hidden";}
			await wait(100);
		}
	} catch (e) {
    	console.error("infoimage error:", e);
	}
});

//status: [0: 곡 없음,1: 곡 있음], number: 곡 번호, s: 성별, inter: 음정, title: 제목, dis: 곡 설명, sing: 가수
async function setnextreservesong(number, title, dis, group){
	reservetext = `<span style="color: #8B70FC; letter-spacing: -2px">${number}</span>&nbsp;&nbsp;<span style="color: #fff">${title}${dis?`(${dis})`:''}</span> <span style="color: #FFFF7F">- ${group}</span>`;
	rollbacktxt = reservetext;
	rollbackimg = `./skin/2series/assets/song/playing/nextsong.png`;
	rollbackview = 'visible';
	if(hidetime==-1&&!isplaying){rollbackupbar();}
}

//네트워크 표시
setInterval(()=>{
	networklanimg.src = `./skin/2series/assets/ui/network/LAN/${lanimg}.png`;
	networkwifiimg.src = `./skin/2series/assets/ui/network/WIFI/${lanimg}.png`;
	lanimg++;
	if(lanimg>4){lanimg=1;}
},2500);

//사이드바 렌더
setInterval(()=>{
	if(isplaying&&!isshowed) loadsideimage(false, true);
},9000);

setInterval(()=>{
	if(hidetime>0){
		hidetime--;
		if(hidetime<=0){rollbackupbar();}
	}
},1000);

//number: 곡 번호, title: 곡 제목, dis: 곡 설명, sing: 가수, gender: 성별, songint: 원음정, curint: 현재음정, lyrics: 작사, compos: 작곡, original: 원작자, banner: 배너, lang: 곡 언어, type: [0: 오리지널, 1: MV, 2: MR, 3: LIVE, 4: 음악]
function startsong(number, title, dis, group, sing, gender, songint, curint, lyrics, compos, original, banner, lang="KR"){
	inanime = true;
	isshowed = true;
	//상단바 숨기기
	topimgbox.style.visibility = "hidden";
	topblackbar.style.visibility = "hidden";
	toptimebox.style.visibility = "hidden";
	networkbox.style.visibility = "hidden";
	topimgimg.src = "./skin/2series/assets/song/playing/nowsong.png";
	songtext = `<span style="color: #8B70FC; letter-spacing: -2px">${number}</span>&nbsp;&nbsp;<span style="color: #fff">${title}${dis?`(${dis})`:''}</span> <span style="color: #FFFF7F">- ${group}</span>`;
	toptext.innerHTML = songtext;
	topimgtext.innerText = '';
	rollbacktxt = songtext;
	rollbackimg = `./skin/2series/assets/song/playing/nowsong.png`;
	hidetime = -1;
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
	singtxt.innerHTML = `<span style="color: #8B70FC">노래</span>&nbsp;&nbsp;&nbsp;<span style="color: #CCCCCC">${sing}</span>`;
	if(dis){
		desctxt.innerText = `(${dis})`;

		singtxt.style.bottom = "40px";

		upperbox.appendChild(desctxt);
		desctxt.id = "upperdesc";
	}

	border.src = `./skin/2series/assets/song/start/startborder/${Math.floor(Math.random() * 5)+1}.png`;
	backimage.src = "./skin/2series/assets/song/start/startbg.png";

	backimage.id = "upbackimage";
	border.id = "upborder";
	upperbox.id = "upperbox";
	titletxt.id = "uppertitle";
	singtxt.id = "uppersing";

	upperbox.appendChild(backimage);
	upperbox.appendChild(titletxt);
	upperbox.appendChild(singtxt);
	upperbox.appendChild(border);
	infobox.appendChild(upperbox);

	requestAnimationFrame(() => {
		const maxWidth = 1150;
		const actualWidth = titletxt.clientWidth;
		console.log(actualWidth);
		if (actualWidth > maxWidth) {
			const scaleX = maxWidth / actualWidth;
			titletxt.style.transform = `translateX(-50%) scaleX(${scaleX})`;
		}
	});

	if(banner){
		const bannerimage = document.createElement("img");
		bannerimage.id = "bannerimage";
		bannerimage.src = banner;
		upperbox.appendChild(bannerimage);

		titletxt.style.left = "55%";
		desctxt.style.left = "55%";
		singtxt.style.left = "55%";
	}

	const downbox = document.createElement("div");
	const downblackbox = document.createElement("div");
	const ad = document.createElement("img");
	const ci = document.createElement("img");
	const datatxt = document.createElement("p");

	datatxt.innerHTML = `
		<span style="color: #8B70FC">현재음정</span>&nbsp;<span style="color: #CCCCCC">${gender==0 ? "남성" : gender==1 ? "여성" : "혼성"}&nbsp;${curint}</span>&nbsp;&nbsp;&nbsp;<span style="color: #8B70FC">원음정</span>&nbsp;<span style="color: #CCCCCC">${gender==0 ? "남성" : gender==1 ? "여성" : "혼성"}&nbsp;${songint}</span>
		</br><span style="color: #8B70FC">작사</span>&nbsp;&nbsp;&nbsp;<span style="color: #CCCCCC">${lyrics}</span>
		</br><span style="color: #8B70FC">작곡</span>&nbsp;&nbsp;&nbsp;<span style="color: #CCCCCC">${compos}</span>
		${original ? `</br><span style="color: #8B70FC">원곡</span>&nbsp;&nbsp;&nbsp;<span style="color: #CCCCCC">${original}</span>` : ' '}
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
		setTimeout(() => {upperbox.style.top = "150px";}, 20);
		setTimeout(() => {downbox.style.bottom = "100px";}, 200);
	} else {
		upperbox.style.left = "150%";
		downbox.style.left = "-50%";
		setTimeout(() => {upperbox.style.left = "50%";}, 20);
		setTimeout(() => {downbox.style.left = "50%";}, 200);
	}
	setTimeout(() => {
		inanime = false;
		networkbox.style.visibility = "visible";
		if(!freeplay) {toptimebox.style.visibility = "visible";}
	}, 410);
}

async function hidestartbox(isstop=false, noloadside=false, forcehide=false){
	//곡 시작 화면 숨기기 (애니메이션이 모두 작동한 후 숨겨져야 함)
	const infobox = document.getElementById("infobox");
	if(!inanime || isstop || forcehide) { 
		infobox.remove();
		isshowed = false;
		setTimeout(()=>{
			timerimage.style.display = "block";
		},500);
		rollbackview = 'visible';
		await wait(1000);
		if (!isstop&&isplaying){
			topimgbox.style.visibility = "visible";
			topblackbar.style.visibility = "visible";
			if (!noloadside && !renderpron) {loadsideimage();}
		}
	}
}

//bpm: 곡 BPM, isup: [true: 위, false: 아래], startcount: [4, 3, 2, 1]
async function timer(bpm, isup, startcount=4){
	//4,3,2,1표출
	if (!isshowed && !iscentershowed) timerimage.style.display = "block";
	else timerimage.style.display = "none";
	const lyricElem = document.getElementById(isup ? "upperlyrictext" : "lowerlyrictext");
	const pos = getScaledPositionToWrapper(lyricElem);

	let left = pos.x;
	let top = pos.y - 220;

	timerimage.style.left = left + "px";
	timerimage.style.top = top + "px";

	for (let i = startcount; i > 0; i--) {
		timerimage.src = `./skin/2series/assets/song/playing/timer/${i}.png`;
		timerimage.style.left = left + "px";
		left += 50;
		await wait(60000 / bpm);
		if(!isplaying){return;}
	}

	timerimage.style.display = "none";
	timerimage.removeAttribute("src");
	if (!renderpron) loadsideimage(true);
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
async function renderlyric(showpron, data, isup, lang){
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

	lyrictext.classList.add(`color${data.type}`);
	lyrichuri.classList.add(`color${data.type}`);
	lyrictextdrag.classList.add(`color${data.type}drag`);
	lyrichuridrag.classList.add(`color${data.type}drag`);

	lyrictext.innerText = data.lyrics.join('');
	lyrictext.setAttribute("data-content", data.lyrics.join(''));
	lyrichuri.innerText = lang === "JP" ? (data.hurigana?.join('') || '') : "";
	lyrictextdrag.innerText = "";
	lyrichuridrag.innerText = "";
	lyricpron.innerText = showpron ? data.pronunciation.join('') : "";
	lyricpron.setAttribute("data-content", showpron ? data.pronunciation.join('') : "");

	if(showpron&&isup){
		lyricbox.style.top = "400px";
	} else if (showpron&&!isup){
		lyricbox.style.top = "625px";
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
		if(!isup){
			const textWidth = lyrictext.clientWidth;
			const wrapperWidth = wrapper.offsetWidth;
			const left = 1920 - 160 - textWidth;
			lyricbox.style.left = `${left}px`;
		}

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

	let sstarttime;
	let sdrift = 0;

	for (let j = 0; j < data.lyrics.length; j++) {
		sstarttime = Date.now();
		lyrictextdrag.innerText += data.lyrics[j];
		lyrictextdrag.setAttribute("data-content", lyrictextdrag.innerText);
		await new Promise(requestAnimationFrame);

		if(data.timing[j]+data.wait[j]!=0){
			if (j == data.lyrics.length-1) lyrictextboxdrag.style.transition = `width ${data.timing[j]-sdrift-100}ms linear`;
			else lyrictextboxdrag.style.transition = `width ${data.timing[j]-sdrift}ms linear`;
			const targetWidth = lyrictextdrag.scrollWidth;
			lyrictextboxdrag.style.width = `${targetWidth}px`;

			await wait(Math.max(0, data.timing[j]+data.wait[j] - sdrift) - 10);
		} else {
			lyrictextboxdrag.style.transition = `width 0ms linear`;
			const targetWidth = lyrictextdrag.scrollWidth;
			lyrictextboxdrag.style.width = `${targetWidth}px`;
		}
		sdrift = Date.now() - sstarttime - data.timing[j]+data.wait[j];
		if (sdrift < 0) sdrift = 0;
	}
}

function hidelyric(isup){
	//가사 숨기기
	try{
		const lyricbox = document.getElementById(isup ? "upperlyricbox" : "lowerlyricbox");
		lyricbox.remove();
		timerimage.style.display = "none";
	} catch {};
}

function endsong(){
	topimgbox.style.visibility = "hidden";
	topblackbar.style.visibility = "hidden";
	timerimage.style.display = "none";
	hidesideimage();
	const centerimage = document.getElementById("centerimage");
	if(centerimage) centerimage.remove();
	timerimage.removeAttribute("src")
	hidelyric(true);
	hidelyric(false);
	hidestartbox(true);
	rollbackview = "hidden";
}

//type: [free, time, coin, remote]
function limit(type="free", number){
	//시간, 코인 처리
	if (type=="free"){toptimebox.style.visibility = "hidden";}
	else if (type=="time"){
		toptimebox.style.visibility = "visible";
		toptimeimg.src = "./skin/2series/assets/ui/time/time.png";
		toptimetext.innerText = `${String(number).padStart(3, '0')}분`;
	}
	else if (type=="coin"){
		toptimebox.style.visibility = "visible";
		toptimeimg.src = "./skin/2series/assets/ui/time/coin.png";
		toptimetext.innerText = `${String(number).padStart(3, '0')}곡`;
	}
	else if (type=="remote"){
		toptimebox.style.visibility = "visible";
		toptimeimg.src = "./skin/2series/assets/ui/time/remote.png";
		toptimetext.innerText = `${String(number).padStart(5, '0')}`;
	}
}

//상단바 롤백
function rollbackupbar(){
	topimgimg.src = rollbackimg;
	toptext.innerHTML = rollbacktxt;
	topimgbox.style.visibility = rollbackview;
	topblackbar.style.visibility = rollbackview;
	topimgtext.innerText = '';
	hidetime=-1;
}

//status: [0: 곡 없음,1: 곡 있음], number: 곡 번호, s: 성별, inter: 음정, title: 제목, dis: 곡 설명, sing: 가수
async function searchsong(status = 1, number, s, inter, title, dis, group){ 
	//검색 처리
	if (hidetime==-1){
		rollbackimg = topimgimg.src;
		rollbacktxt = toptext.innerHTML;
		rollbackview = topblackbar.style.visibility;
	}
	if(status==0){
		if(s==0){topimgimg.src = "./skin/2series/assets/song/select/man.png";}
		else if(s==1){topimgimg.src = "./skin/2series/assets/song/select/woman.png";}
		else if(s==2){topimgimg.src = "./skin/2series/assets/song/select/multi.png";}
		toptext.innerHTML = `<span style="color: #8B70FC; letter-spacing: -2px">${number}</span>&nbsp;&nbsp;<span style="color: #fff">${title}${dis?`(${dis})`:''}</span> <span style="color: #FFFF7F">- ${group}</span>`;
		topimgtext.innerText = inter;
	} else if (status==1){
		topimgimg.src = "./skin/2series/assets/ui/einfo.png";
		toptext.innerHTML = `<span style="color: #8B70FC; letter-spacing: -2px">${number}</span>&nbsp;&nbsp;<span style="color: #fff">곡이 없습니다.</span>`;
		topimgtext.innerText = '';
	}
	topimgbox.style.visibility = 'visible';
	topblackbar.style.visibility = 'visible';
	hidetime = 10;
}

//type: [0: 일반 안내, 1: 오류 안내], message: 안내 메세지
async function info(type=0, message="카운터에 문의하세요(CODE:00)", time=3){
	//안내 처리
	if (hidetime==-1){
		rollbackimg = topimgimg.src;
		rollbacktxt = toptext.innerHTML;
		rollbackview = topblackbar.style.visibility;
	}
	if(type==0){topimgimg.src = "./skin/2series/assets/ui/info.png";}
	else if(type==1){topimgimg.src = "./skin/2series/assets/ui/einfo.png";}
	toptext.innerHTML = message;
	topimgtext.innerText = '';
	topimgbox.style.visibility = 'visible';
	topblackbar.style.visibility = 'visible';
	hidetime = time;
}

//img: [service, noscore, nochorus, firstphase, clap, pause, frontbarjump, backbarjump, phasejump, interludejump]
async function loadimage(img, num=centernum+1){
	//중간이미지 렌더링
	await wait(100);
	if(isshowed) return;
	centernum++;
	loadsideimage(false, true);
	iscentershowed = true;
	timerimage.style.display = "none";
	const centerimage = document.getElementById("centerimage") || document.createElement("img");
	centerimage.id = "centerimage";
	wrapper.appendChild(centerimage);
	for(let i=0;i<22;i++){
		if (num!=centernum) return;
		centerimage.src = `./skin/2series/assets/song/center/${img}/${i+1}.png`;
		await wait(1000/22);
	}
	await wait(1000);
	if (num!=centernum) return;
	timerimage.style.display = "block";
	centerimage.remove();
	iscentershowed = false;
}

function hidesideimage(){
	sideimage.style.visibility = "hidden";
}

async function loadsideimage(onlyshow=false, noshow=false) {
	if (ifmv==false&&ifmr==false&&iflive==false){
		if (!noshow) sideimage.style.visibility = "hidden";
	} else if (ifmv==true&&ifmr==false&&iflive==false){
		if (!noshow) sideimage.style.visibility = "visible";
		sideimage.style.top = "467px";
		if(!onlyshow){
			for(let i=0;i<22;i++){
				sideimage.src = `./skin/2series/assets/song/playing/MV/${i+1}.png`;
				await wait(1000/22);
			}
		}
	} else if (ifmr==true){
		if (!noshow) sideimage.style.visibility = "visible";
		sideimage.style.top = "300px";
			if(!onlyshow){
			for(let i=0;i<19;i++){
				sideimage.src = `./skin/2series/assets/song/playing/MR/${i+1}.png`;
				await wait(1000/19);
			}
		}
	}
 	else if (iflive==true){
		if (!noshow) sideimage.style.visibility = "visible";
		sideimage.style.top = "450px";
		if(!onlyshow){
			for(let i=0;i<22;i++){
				sideimage.src = `./skin/2series/assets/song/playing/LIVE/${i+1}.png`;
				await wait(1000/22);
			}
		}
	}
}

//score: 점수
async function score(score){
	//점수 화면 표시
	isinscore = true;
	isinscore = false;
	await wait(500);
	endscore();
}

function loadbga(rep=false){

}

function systemsound(type, sound){
	const systemsound = document.getElementById('system');
	if(type==0){
		systemsound.src = `./skin/2series/sounds/selsong/${sound}.mp3`;
	}
	systemsound.play();
}

function startkar(evacuation=false){
	//입실화면 표시
	if(evacuation){
		isinscore = true;
		toptimeimg.style.opacity = '1';
		toptimebox.style.zIndex = '101';
		networkbox.style.visibility = 'hidden';
		const forceimg = document.createElement("img");
		forceimg.id = 'forcebox';
		wrapper.appendChild(forceimg);
		forceimg.src = './skin/2series/assets/ui/evacuation.png';
		forceimg.style.display = 'block';

		const systemsound = document.getElementById('system');
		const bga = document.getElementById('bga');
		systemsound.src = './skin/2series/sounds/evacuation.mp3';
		systemsound.play();
		bga.play();

		systemsound.addEventListener('ended', function(){
			forceimg.remove();
			startkar(false);
			isinscore = false;
			systemsound.removeEventListener('ended', arguments.callee);
		});
	} else {
		toptimeimg.style.opacity = "0.67";
		networkbox.style.visibility = "visible";
		const systemsound = document.getElementById('system');
		const bga = document.getElementById('bga');
		systemsound.src = './skin/2series/sounds/join.mp3';
		bga.src = './skin/2series/videos/join.mp4';
		systemsound.play();
		bga.play();

		bga.addEventListener('ended', function(){
			loadbga();
			bga.removeEventListener('ended', arguments.callee);
		});
	}
}

//songs: 부른 곡 목록, scores: 부른 곡 점수 목록 (배열로 입력)
function endkar(songs, scores){
	//퇴장화면 표시
	const systemsound = document.getElementById('system');
	systemsound.src = './skin/2series/sounds/exit.mp3';
	systemsound.play();
}

function safeJoin(arr, maxLength, sep) {
	let result = '';
	for (let i = 0; i < arr.length; i++) {
	  const word = arr[i];
	  const next = result.length > 0 ? result + sep + word : word;
	  if (next.length > maxLength) break;
	  result = next;
	}
	return result;
}