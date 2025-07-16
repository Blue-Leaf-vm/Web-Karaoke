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

const imagePaths = [
	"./skin/2series/assets/ui/evacuation.png",
	"./skin/2series/assets/ui/tjstart.png",
	"./skin/2series/assets/ui/info.png",
	"./skin/2series/assets/ui/einfo.png",
	"./skin/2series/assets/ui/time/time.png",
	"./skin/2series/assets/ui/time/coin.png",
	"./skin/2series/assets/ui/time/remote.png",
	"./skin/2series/assets/ui/network/LAN/1.png",
	"./skin/2series/assets/ui/network/LAN/2.png",
	"./skin/2series/assets/ui/network/LAN/3.png",
	"./skin/2series/assets/ui/network/LAN/4.png",
	"./skin/2series/assets/ui/network/WIFI/1.png",
	"./skin/2series/assets/ui/network/WIFI/2.png",
	"./skin/2series/assets/ui/network/WIFI/3.png",
	"./skin/2series/assets/ui/network/WIFI/4.png",
	"./skin/2series/assets/ui/network/UPDATE/1.png",
	"./skin/2series/assets/ui/network/UPDATE/2.png",
	"./skin/2series/assets/ui/network/UPDATE/3.png",
	"./skin/2series/assets/ui/network/UPDATE/4.png",
	"./skin/2series/assets/ui/exit/todaysang.png",
	"./skin/2series/assets/song/select/man.png",
	"./skin/2series/assets/song/select/woman.png",
	"./skin/2series/assets/song/select/multi.png",
	"./skin/2series/assets/song/start/CI.png",
	"./skin/2series/assets/song/start/startbg.svg",
	"./skin/2series/assets/song/start/startborder/1.svg",
	"./skin/2series/assets/song/start/startborder/2.svg",
	"./skin/2series/assets/song/start/startborder/3.svg",
	"./skin/2series/assets/song/start/startborder/4.svg",
	"./skin/2series/assets/song/start/startborder/5.svg",
	"./skin/2series/assets/song/playing/nextsong.png",
	"./skin/2series/assets/song/playing/nextsong2.png",
	"./skin/2series/assets/song/playing/nowsong.png",
	"./skin/2series/assets/song/playing/nowsong2.png",
	"./skin/2series/assets/song/playing/reserve.png",
	"./skin/2series/assets/song/playing/timer/1.png",
	"./skin/2series/assets/song/playing/timer/2.png",
	"./skin/2series/assets/song/playing/timer/3.png",
	"./skin/2series/assets/song/playing/timer/4.png",
	"./skin/2series/assets/song/playing/changes/man.png",
	"./skin/2series/assets/song/playing/changes/woman.png",
	"./skin/2series/assets/song/playing/changes/multi.png",
	"./skin/2series/assets/song/playing/MV.webp",
	"./skin/2series/assets/song/playing/MR.webp",
	"./skin/2series/assets/song/playing/LIVE.webp",
	"./skin/2series/assets/song/score/background.png",
	"./skin/2series/assets/song/score/message/0man.png",
	"./skin/2series/assets/song/score/message/0woman.png",
	"./skin/2series/assets/song/score/message/70man.png",
	"./skin/2series/assets/song/score/message/70woman.png",
	"./skin/2series/assets/song/score/message/80man.png",
	"./skin/2series/assets/song/score/message/80woman.png",
	"./skin/2series/assets/song/score/message/90man.png",
	"./skin/2series/assets/song/score/message/90woman.png",
	"./skin/2series/assets/song/score/message/100man.png",
	"./skin/2series/assets/song/score/message/100woman.png",
	"./skin/2series/assets/song/score/number/0.png",
	"./skin/2series/assets/song/score/number/1.png",
	"./skin/2series/assets/song/score/number/2.png",
	"./skin/2series/assets/song/score/number/3.png",
	"./skin/2series/assets/song/score/number/4.png",
	"./skin/2series/assets/song/score/number/5.png",
	"./skin/2series/assets/song/score/number/6.png",
	"./skin/2series/assets/song/score/number/7.png",
	"./skin/2series/assets/song/score/number/8.png",
	"./skin/2series/assets/song/score/number/9.png",
	"./skin/2series/assets/song/select/woman.png",
	"./skin/2series/assets/song/select/multi.png",
	"./skin/2series/assets/ui/noscore.png",
	"./skin/2series/assets/ui/nochorus.png",
	"./skin/2series/assets/ui/firstphase.png",
	"./skin/2series/assets/ui/center/interludejump.webp",
	"./skin/2series/assets/ui/center/phasejump.webp",
	"./skin/2series/assets/ui/center/frontbarjump.webp",
	"./skin/2series/assets/ui/center/backbarjump.webp",
	"./skin/2series/assets/ui/center/scoreoff.webp",
	"./skin/2series/assets/ui/center/scoreon.webp",
	"./skin/2series/assets/ui/center/chorusoff.webp",
	"./skin/2series/assets/ui/center/choruson.webp",
	"./skin/2series/assets/ui/center/firstphaseoff.webp",
	"./skin/2series/assets/ui/center/firstphaseon.webp",
	"./skin/2series/assets/ui/center/services.webp",
	"./skin/2series/assets/ui/center/clap.webp",
	"./skin/2series/assets/ui/center/pause.webp",
];

const audioPaths = [
	"./skin/2series/sounds/evacuation.mp3",
	"./skin/2series/sounds/exit.mp3",
	"./skin/2series/sounds/explore.mp3",
	"./skin/2series/sounds/join.mp3",
	"./skin/2series/sounds/openmenu.mp3",
	"./skin/2series/sounds/forcestart.mp3",
	"./skin/2series/sounds/selsong/0.mp3",
	"./skin/2series/sounds/selsong/1.mp3",
	"./skin/2series/sounds/selsong/2.mp3",
	"./skin/2series/sounds/selsong/3.mp3",
	"./skin/2series/sounds/selsong/4.mp3",
	"./skin/2series/sounds/selsong/5.mp3",
	"./skin/2series/sounds/selsong/6.mp3",
	"./skin/2series/sounds/selsong/7.mp3",
	"./skin/2series/sounds/selsong/8.mp3",
	"./skin/2series/sounds/selsong/9.mp3",
	"./skin/2series/sounds/score/0man.mp3",
	"./skin/2series/sounds/score/0woman.mp3",
	"./skin/2series/sounds/score/70man.mp3",
	"./skin/2series/sounds/score/70woman.mp3",
	"./skin/2series/sounds/score/80man.mp3",
	"./skin/2series/sounds/score/80woman.mp3",
	"./skin/2series/sounds/score/90man.mp3",
	"./skin/2series/sounds/score/90woman.mp3",
	"./skin/2series/sounds/score/100man.mp3",
	"./skin/2series/sounds/score/100woman.mp3",
];

const videoPaths = [
	"./skin/2series/videos/join.mp4",
];

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
const networkupdateimg = document.createElement("img");
networkbox.id = "networkbox";
networklanimg.id = "networklanimg";
networkwifiimg.id = "networkwifiimg";
networkupdateimg.id = "networkupdateimg";
networkbox.appendChild(networkupdateimg);
networkbox.appendChild(networkwifiimg);
networkbox.appendChild(networklanimg);
wrapper.appendChild(networkbox);

//측면 이미지 생성
const sideimage = document.createElement("img");
const noscoreimagebox = document.createElement("div");
const nochorusimagebox = document.createElement("div");
const firstphaseimagebox = document.createElement("div");
const noscoreimage = document.createElement("img");
const nochorusimage = document.createElement("img");
const firstphaseimage = document.createElement("img");
const noscoreimagetxt = document.createElement("img");
const nochorusimagetxt = document.createElement("img");
const firstphaseimagetxt = document.createElement("img");
sideimage.id = "sideimage";
noscoreimagebox.id = "noscoreimagebox";
nochorusimagebox.id = "nochorusimagebox";
firstphaseimagebox.id = "firstphaseimagebox";
noscoreimage.id = "noscoreimage";
nochorusimage.id = "nochorusimage";
firstphaseimage.id = "firstphaseimage";
noscoreimagetxt.id = "noscoreimagetxt";
nochorusimagetxt.id = "nochorusimagetxt";
firstphaseimagetxt.id = "firstphaseimagetxt";
wrapper.appendChild(sideimage);
noscoreimagebox.appendChild(noscoreimagetxt);
nochorusimagebox.appendChild(nochorusimagetxt);
firstphaseimagebox.appendChild(firstphaseimagetxt);
noscoreimagebox.appendChild(noscoreimage);
nochorusimagebox.appendChild(nochorusimage);
firstphaseimagebox.appendChild(firstphaseimage);
wrapper.appendChild(noscoreimagebox);
wrapper.appendChild(nochorusimagebox);
wrapper.appendChild(firstphaseimagebox);

noscoreimage.src = './skin/2series/assets/ui/center/scoreoff.webp';
noscoreimagetxt.src = './skin/2series/assets/ui/noscore.png';
nochorusimage.src = './skin/2series/assets/ui/center/chorusoff.webp';
nochorusimagetxt.src = './skin/2series/assets/ui/nochorus.png';
firstphaseimage.src = './skin/2series/assets/ui/center/firstphaseon.webp';
firstphaseimagetxt.src = './skin/2series/assets/ui/firstphase.png';

//카운터 생성
const timerimage = document.createElement("img");
timerimage.id = "timerimage";
wrapper.appendChild(timerimage);

//안내 이미지 표시
document.addEventListener("DOMContentLoaded", async function() {
	try{
		while(true){
			if (isplaying && hidetime==-1) { topimgimg.src = getCachedURL("./skin/2series/assets/song/playing/nowsong2.png"); toptext.innerHTML = songtext; topimgtext.innerHTML = ''; rollbacktxt = reservetext; rollbackimg = topimgimg.src; await wait(3000); }
			if (isplaying && hidetime==-1) { topimgimg.src = getCachedURL("./skin/2series/assets/song/playing/nowsong.png"); toptext.innerHTML = songtext; topimgtext.innerHTML = ''; rollbacktxt = reservetext; rollbackimg = topimgimg.src; rollbackview = 'visible'; await wait(3000); }
			if (reservedsong.length>0 && hidetime==-1) { topimgimg.src = getCachedURL("./skin/2series/assets/song/playing/nextsong2.png"); toptext.innerHTML = reservetext; topimgtext.innerHTML = ''; rollbacktxt = reservetext; rollbackimg = topimgimg.src; await wait(3000); }
			if (reservedsong.length>0 && hidetime==-1) { topimgimg.src = getCachedURL("./skin/2series/assets/song/playing/nextsong.png"); toptext.innerHTML = reservetext; topimgtext.innerHTML = ''; rollbacktxt = reservetext; rollbackimg = topimgimg.src; await wait(3000); }
			if (reservedsong.length>1 && hidetime==-1) { topimgimg.src = getCachedURL("./skin/2series/assets/song/playing/reserve.png"); toptext.innerHTML = `<span style="color: #fff">${safeJoin(reservedsong, 100, '&nbsp;&nbsp')}</span>`; topimgtext.innerHTML = `<span style="color: #FFFF7F">${String(reservedsong.length).padStart(2, "0")}</span>`; await wait(3000); }
			if (reservedsong.length==0 && !isplaying && hidetime==-1) {	topimgbox.style.visibility = "hidden"; topblackbar.style.visibility = "hidden";}

			if (isplaying) {rollbackview = 'visible';}
			await wait(100);
		}
	} catch (e) {
    	console.error("infoimage error:", e);
	}
});

setInterval(()=>{
	if (loadingstat == 3) {
		const updnotice = document.getElementById('updnotice');
		if (updnotice.style.color === 'rgb(0, 0, 0)') updnotice.style.color = 'rgb(255, 255, 255)';
		else updnotice.style.color = 'rgb(0, 0, 0)';
	}
}, 500);

async function forcestart(title, message, color) {
	const forcestartbox = document.createElement('div');
	const forcestarttextbox = document.createElement('div');
	const forcestarttitletext = document.createElement('p');
	const forcestarttext = document.createElement('div');
	const forcestartbottomtext = document.createElement('p');

	forcestarttitletext.innerHTML = title;
	forcestarttext.innerHTML = message;
	forcestartbottomtext.innerHTML = '<span style="color: #0ff; transform: unset; font-size: 33px">취소</span> 닫기';

	forcestartbox.id = 'forcestartbox';
	forcestarttextbox.id = 'forcestarttextbox';
	forcestarttitletext.id = 'forcestarttitletext';
	forcestarttext.id = 'forcestarttext';
	forcestartbottomtext.id = 'forcestartbottomtext';

	forcestartbox.style.backgroundColor = color;
	
	forcestarttextbox.appendChild(forcestarttext);
	forcestarttextbox.appendChild(forcestartbottomtext);
	forcestartbox.appendChild(forcestarttitletext);
	forcestartbox.appendChild(forcestarttextbox);
	wrapper.appendChild(forcestartbox);
}

async function hideforcestart() {
	const forcestartbox = document.getElementById('forcestartbox');
	if (forcestartbox) {
		forcestartbox.remove();
		const systemsound = document.getElementById('system');
		systemsound.pause();
	}
}

async function setting(status=0, tap=0, std) {
	const bga = document.getElementById('bga');
	if (status==-1) {
		settingstat=0;
		bga.style.visibility = 'visible';
		toptimebox.style.visibility = 'visible';
		networkbox.style.visibility = 'visible';
		wrapper.style.backgroundColor = '#000';
		const settingbox = document.getElementById('settingbox');
		if (settingbox) settingbox.remove();
	} else if (status==0) {
		hidecenterimage();
		hidesideimage();
		const forcebox = document.getElementById('forcebox');
		if (forcebox) forcebox.remove();
		toptimeimg.style.opacity = "0.67";
		toptimebox.style.zIndex = '1';
		const systemsound = document.getElementById('system');
		systemsound.pause();
		isinevacuationenable = false;

		if (settingstat!=1){
			settingstat=1;
			bga.style.visibility = 'hidden';
			toptimebox.style.visibility = 'hidden';
			networkbox.style.visibility = 'hidden';
			toptimebox.style.zIndex = '1';
			wrapper.style.backgroundColor = '#275369';
			const settingbox = document.createElement('div');
			const settingtop = document.createElement('div');
			const settingtoptxt = document.createElement('p');
			const settingtoptitle = document.createElement('p');
			const settingmidpw = document.createElement('div');
			const settingmidtxtpw = document.createElement('p');
			const settingmiderrortxtpw = document.createElement('p');
			const settingtxtpw = document.createElement('p');
			const settingbottom = document.createElement('div');
			const settingbottomtxt = document.createElement('p');

			const settingmidinbox = document.createElement('div');
			const settingmidinboxbox = document.createElement('div');

			settingtoptxt.innerText = '환경설정';
			settingmidtxtpw.innerText = '비밀번호를 입력하세요';
			settingtxtpw.innerHTML = `<span class="settingpwname">모 델 명</span> : ziller P2 (BOOT VER:2.1)<br><span class="settingpwname">제조번호</span> : P1ACEH01DER<br><span class="settingpwname">프로그램</span> : ${String(version||1).padStart(4, '0')}`;
			settingbottomtxt.innerHTML = '<span class="settingbottombtn">0~9</span>비밀번호 입력　　　<span class="settingbottombtn">취소</span>닫기';
			if (tap!=0) settingmiderrortxtpw.innerText = `비밀번호가 틀립니다\n다시 입력하세요 (${tap}회)`;

			settingbox.id = 'settingbox';
			settingtop.id = 'settingtop';
			settingtoptxt.id = 'settingtoptxt';
			settingtoptitle.id = 'settingtoptitle';
			settingmidpw.id = 'settingmidpw';
			settingmidtxtpw.id = 'settingmidtxtpw';
			settingmiderrortxtpw.id = 'settingmiderrortxtpw';
			settingtxtpw.id = 'settingtxtpw';
			settingbottom.id = 'settingbottom';
			settingbottomtxt.id = 'settingbottomtxt';

			settingmidinbox.id = 'settingmidinbox';
			settingmidinboxbox.classList.add('settingmidinboxbox');

			settingtop.appendChild(settingtoptxt);
			settingtop.appendChild(settingtoptitle);
			settingmidpw.appendChild(settingmidtxtpw);
			for(let i=0;i<4;i++){const clonenode = settingmidinboxbox.cloneNode(true); settingmidinbox.appendChild(clonenode);}
			settingmidpw.appendChild(settingmidinbox);
			settingmidpw.appendChild(settingmiderrortxtpw);
			settingbottom.appendChild(settingbottomtxt);
			settingbox.appendChild(settingtop);
			settingbox.appendChild(settingtxtpw);
			settingbox.appendChild(settingmidpw);
			settingbox.appendChild(settingmiderrortxtpw);
			settingbox.appendChild(settingbottom);
			wrapper.appendChild(settingbox);
		}

		requestAnimationFrame(() => { for (let i=0;i<std?std:0;i++) {document.getElementsByClassName('settingmidinboxbox')[i].classList.add('selected');}});
	} else if (status==1) {
		if (settingstat!=2){
			settingstat=2;
			const settingmidpw = document.getElementById('settingmidpw');
			const settingmidtxtpw = document.getElementById('settingmidtxtpw');
			const settingmiderrortxtpw = document.getElementById('settingmiderrortxtpw');
			const settingtxtpw = document.getElementById('settingtxtpw');
			if (settingmidpw) settingmidpw.remove();
			if (settingmidtxtpw) settingmidpw.remove();
			if (settingmiderrortxtpw) settingmiderrortxtpw.remove();
			if (settingtxtpw) settingtxtpw.remove();

			const settingbottomtxt = document.getElementById('settingbottomtxt');
			settingbottomtxt.innerHTML = '<span class="settingbottombtn">✥</span>항목 이동　　　<span class="settingbottombtn">선택</span>선택　　　<span class="settingbottombtn">취소</span>닫기';
		}
	}
}

async function loading(status=0, file='', cursize=0, filesize=1, stat=null) {
	//로딩화면 표시
	if (status!=2||(status==2&&stat==null)){
		const forceimg = document.getElementById('forcebox');
		if (forceimg) forceimg.remove();
		const modalbox = document.getElementById('modalbox');
		if (modalbox) modalbox.remove();
	}
	if (status!=2){
		const updbox = document.getElementById('updbox');
		if (updbox) updbox.remove();
		wrapper.style.background = '#000000';
	}
	if (status!=0) await wait(200);
	if (status==0) {
		loadingstat=1;
		toptimebox.style.visibility = 'hidden';
		networkbox.style.visibility = 'hidden';
		const forceimg = document.createElement("img");
		forceimg.id = 'forcebox';
		wrapper.appendChild(forceimg);
		forceimg.src = getCachedURL('./skin/2series/assets/ui/tjstart.png');
		forceimg.style.display = 'block';
	} else if (status==1) {
		loadingstat=2;
		const forceimg = document.getElementById('forcebox');
		if (forceimg) forceimg.remove();
		//모달화면
		const modalbox = document.createElement('div');
		const modaltitlebox = document.createElement('div');
		const modaltitletext = document.createElement('p');
		const modaltext = document.createElement('div');
		const modalbottombox = document.createElement('div');
		const modalbottombtn = document.createElement('div');
		const modalbottombtntext = document.createElement('p');
		const modalbottomtext = document.createElement('p');

		modaltitletext.innerHTML = '주&nbsp;&nbsp;의';
		modaltext.innerHTML = file;
		modalbottombtntext.innerText = '확인';
		modalbottomtext.innerText = '다음';

		modalbox.id = 'modalbox';
		modaltitlebox.id = 'modaltitlebox';
		modaltitletext.id = 'modaltitletext';
		modaltext.id = 'modaltext';
		modalbottombox.id = 'modalbottombox';
		modalbottombtn.id = 'modalbuttombtn';
		modalbottombtntext.id = 'modalbuttombtntext';
		modalbottomtext.id = 'modalbottomtext';
		
		modaltitlebox.appendChild(modaltitletext);
		modalbottombtn.appendChild(modalbottombtntext);
		modalbottombox.appendChild(modalbottombtn);
		modalbottombox.appendChild(modalbottomtext);
		modalbox.appendChild(modaltitlebox);
		modalbox.appendChild(modaltext);
		modalbox.appendChild(modalbottombox);
		wrapper.appendChild(modalbox);
	} else if (status==2) {
		const forceimg = document.getElementById('forcebox');
		if (forceimg) forceimg.remove();
		const modalbox = document.getElementById('modalbox');
		if (modalbox) modalbox.remove();
		loadingstat=3;
		//업뎃화면
		wrapper.style.background = '#38424A';
		let updbox = document.getElementById('updbox');
		if (!updbox) {
			updbox = document.createElement('div');
			updbox.id = 'updbox';
			wrapper.appendChild(updbox);
		}
		updbox.innerHTML = `
<div id="updtextbox">
	<p id="updtext">업데이트</p>
	<p id="updtexts">버전 확인 및 업데이트 중...</p>
</div>
<div id="updnoticebox">
	<p id="updnotice" style="color: ${document.getElementById('updnotice') ? document.getElementById('updnotice').style.color : 'rgb(255, 255, 255)'}">절대 전원을 끄지 마십시오!</p>
	<p id="updbotices">업데이트 진행 중 전원을 끄면 HDD 등<br>반주기에 치명적인 불량이 발생할 수 있습니다.</p>
</div>
<div id="updversionbox">
	<p id="updversionver">최종버전 : <span style="color: #fff">${String(version||1).padStart(4, '0')}</p>
	<p id="updversiondate">날　　짜 : <span style="color: #fff">${String(version||1).padStart(4, '0')}</p>
</div>
<div id="updpcbox">
	<p id="updprogram" class="updpc" ${stat==1 ? 'selected':''}>프로그램</p>
	<p id="updcontents" class="updpc" ${stat==2 ? 'selected':''}>콘 텐 츠</p>
</div>
<div id="updskipbox">
	<p id="updskipbtn">취소</p>
	<p id="updskiptext">업데이트 건너뛰기</p>
</div>
<p id="updmessage">${file}</p>
<div id="updupdprgbox">
	<p id="updupdcur">현　재</p>
	<div id="updupdbox"></div>
	<div id="updupddragbox" style="width: ${((cursize/filesize)) * 900}px"></div>
	<p id="updupdsize">${cursize} / ${filesize}</p>
	<p id="updupdper">${Math.round((cursize/filesize)*100)}%</p>
</div>
<p id="updcanceltext">취소 버튼을 누르면 현재 다운로드 진행중인 콘텐츠까지 완료 후 건너 뜁니다.</p>
		`
	} else if (status==3) {
		loadingstat=4;
		const systemsound = document.getElementById('system');
		const bga = document.getElementById('bga');
		systemsound.src = getCachedURL('./skin/2series/sounds/join.mp3');
		bga.src = getCachedURL('./skin/2series/videos/join.mp4');
		systemsound.play();
		bga.play();

		systemsound.addEventListener('ended', function(){
			if (loadingstat==4) loading(4);
			systemsound.removeEventListener('ended', arguments.callee);
		});
	} else {
		loadingstat=0;
		toptimebox.style.visibility = 'visible';
		networkbox.style.visibility = 'visible';
	}
}

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
	networklanimg.src = getCachedURL(`./skin/2series/assets/ui/network/LAN/${lanimg}.png`);
	networkwifiimg.src = getCachedURL(`./skin/2series/assets/ui/network/WIFI/${lanimg}.png`);
	networkupdateimg.src = getCachedURL(`./skin/2series/assets/ui/network/UPDATE/${lanimg}.png`);
	if(bpreload) networkupdateimg.style.display = 'block';
	else networkupdateimg.style.display = 'none';
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
	hidecenterimage();
	hidesideimage();
	//상단바 숨기기
	topimgbox.style.visibility = "hidden";
	topblackbar.style.visibility = "hidden";
	toptimebox.style.visibility = "hidden";
	networkbox.style.visibility = "hidden";
	topimgimg.src = getCachedURL('./skin/2series/assets/song/playing/nowsong.png');
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

	border.src = getCachedURL(`./skin/2series/assets/song/start/startborder/${Math.floor(Math.random() * 5)+1}.svg`);
	backimage.src = getCachedURL('./skin/2series/assets/song/start/startbg.svg');

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
		const maxWidth = banner ? 900 : 1150;
		const actualWidth = titletxt.clientWidth;
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
		</br>${lang=="KR" ? '<span style="color: #8B70FC">작사</span>&nbsp;&nbsp;&nbsp;' : '<span style="color: #CCCCCC">詞_</span>'}<span style="color: #CCCCCC">${lyrics}</span>
		</br>${lang=="KR" ? '<span style="color: #8B70FC">작곡</span>&nbsp;&nbsp;&nbsp;' : '<span style="color: #CCCCCC">曲_</span>'}<span style="color: #CCCCCC">${compos}</span>
		${original ? `</br>${'<span style="color: #8B70FC">원곡</span>&nbsp;&nbsp;&nbsp;'}<span style="color: #CCCCCC">${original}</span>` : ' '}
	`;
	ad.id = 'ad';
	ad.src = getCachedURL(`./skin/2series/assets/song/start/ad/${Math.floor(Math.random() * 7)+1}.png`);
	ci.src = getCachedURL('./skin/2series/assets/song/start/CI.png');

	ad.onerror = () => {
		ad.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="614" height="371"></svg>';
	};

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
		downbox.style.bottom = "-200px";
		setTimeout(() => {upperbox.style.top = "150px";}, 20);
		setTimeout(() => {downbox.style.bottom = "298px";}, 200);
	} else {
		upperbox.style.left = "150%";
		downbox.style.left = "-50%";
		downbox.style.bottom = "298px";
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
			if (!noloadside && !renderpron[playlang]) {loadsideimage();}
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
		timerimage.src = getCachedURL(`./skin/2series/assets/song/playing/timer/${i}.png`);
		timerimage.style.left = left + "px";
		left += 50;
		await wait(60000 / bpm);
		if(!isplaying){return;}
	}

	timerimage.style.display = "none";
	timerimage.removeAttribute("src");
	if (!renderpron[playlang]) loadsideimage(true);
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
	const lyrictextunder = document.createElement("p");

	const lyrictextboxdrag = document.createElement("div");
	const lyrictextdrag = document.createElement("p");
	const lyrictextdragunder = document.createElement("p");

	const lyricpron = document.createElement("p");

	lyricbox.id = isup ? "upperlyricbox" : "lowerlyricbox";

	lyrictextbox.id = isup ? "upperlyrictextbox" : "lowerlyrictextbox";
	lyrictext.id = isup ? "upperlyrictext" : "lowerlyrictext";
	lyrictextunder.id = isup ? "upperlyrictextunder" : "lowerlyrictextunder";

	lyrictextboxdrag.id = isup ? "upperlyrictextboxdrag" : "lowerlyrictextboxdrag";
	lyrictextdrag.id = isup ? "upperlyrictextdrag" : "lowerlyrictextdrag";
	lyrictextdragunder.id = isup ? "upperlyrictextdragunder" : "lowerlyrictextdragunder";

	lyricpron.id = isup ? "upperlyricpron" : "lowerlyricpron";
	
	lyrictext.classList.add("lyrictext");
	lyrictextdrag.classList.add("lyrictext");
	
	lyrictextunder.classList.add(`lyrictext`);
	lyrictextdragunder.classList.add(`lyrictext`);
	lyrictextunder.classList.add(`underlyric`);
	lyrictextdragunder.classList.add(`underlyric`);

	lyricpron.classList.add("lyricpron");

	lyrictext.classList.add(`color${data.type}`);
	lyrictextdrag.classList.add(`color${data.type}drag`);
	lyrictextunder.classList.add(`color${data.type}`);
	lyrictextdragunder.classList.add(`color${data.type}drag`);

	if(lang!='JP'){
		lyrictext.classList.add("tjsinglyric");
		lyrictextdrag.classList.add("tjsinglyric");
		lyrictextunder.classList.add(`tjsinglyric`);
		lyrictextdragunder.classList.add(`tjsinglyric`);
	}

	let datahtml = data.lyrics.join('');
	if (lang == "JP"){
		datahtml = "<ruby>";
		for(let i=0;i<data.lyrics.length;i++){
			datahtml+=`${data.lyrics[i]}<rt>${data.huri[i] || " "}</rt>`;
		}
		datahtml += "</ruby>";
	}

	lyrictext.innerHTML = datahtml;
	lyrictextunder.innerHTML = datahtml;
	lyrictextdrag.innerText = "";
	lyrictextdragunder.innerText = "";
	lyricpron.innerText = showpron ? data.pronunciation.join('') : "";
	lyricpron.setAttribute("data-content", showpron ? data.pronunciation.join('') : "");

	if (showpron&&isup){
		lyricbox.style.top = lang=="JP" ? "335px" : "400px";
	} else if (showpron&&!isup){
		lyricbox.style.top = lang=="JP" ? "605px" : "625px";
	} else if (isup){
		lyricbox.style.top = lang=="JP" ? "460px" : "545px";
	} else if (!isup){
		lyricbox.style.top = lang=="JP" ? "670px" : "700px";
	}

	if (lang=="JP"){
		lyricpron.style.top = "150px";
		lyricpron.style.fontSize = "58px";
		lyricpron.style.fontWeight = "400";
	}

	lyrictextbox.appendChild(lyrictext);
	lyrictextbox.appendChild(lyrictextunder);
	lyrictextboxdrag.appendChild(lyrictextdrag);
	lyrictextboxdrag.appendChild(lyrictextdragunder);

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
	const lyrictextdragunder = document.getElementById(isup ? "upperlyrictextdragunder" : "lowerlyrictextdragunder");

	let datahtml = "";
	let endhtml = "";
	if (lang == "JP") { datahtml = "<ruby>"; endhtml = "</ruby>"; }

	lyrictextdrag.innerText = datahtml + endhtml;
	lyrictextdragunder.innerText = datahtml + endhtml;
	lyrictextboxdrag.style.width = "0px";

	let sstarttime;
	let sdrift = 0;

	for (let j = 0; j < data.lyrics.length; j++) {
		sstarttime = Date.now();
		datahtml += lang=="JP" ? `${data.lyrics[j]}<rt>${data.huri[j] || " "}</rt>` : data.lyrics[j];
		lyrictextdrag.innerHTML = datahtml + endhtml;
		lyrictextdragunder.innerHTML = datahtml + endhtml;
		await new Promise(requestAnimationFrame);

		if(data.timing[j]+data.wait[j]!=0){
			if (j == data.lyrics.length-1) lyrictextboxdrag.style.transition = `width ${data.timing[j]-sdrift-100}ms linear`;
			else lyrictextboxdrag.style.transition = `width ${data.timing[j]-sdrift}ms linear`;
			const targetWidth = lyrictextdrag.scrollWidth;
			lyrictextboxdrag.style.width = `${targetWidth}px`;
			await wait(Math.max(0, data.timing[j]+data.wait[j] - sdrift));
		} else {
			lyrictextboxdrag.style.transition = `width 0ms linear`;
			const targetWidth = lyrictextdrag.scrollWidth;
			lyrictextboxdrag.style.width = `${targetWidth}px`;
		}
		sdrift = Date.now() - sstarttime - (data.timing[j]+data.wait[j]);
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

async function endsong(){
	topimgbox.style.visibility = "hidden";
	topblackbar.style.visibility = "hidden";
	timerimage.style.display = "none";
	hidesideimage();
	timerimage.removeAttribute("src")
	hidelyric(true);
	hidelyric(false);
	hidestartbox(true);
	rollbackview = "hidden";
	await wait(35);
	hidecenterimage();
}

//type: [free, time, coin, remote]
function limit(type="free", number){
	//시간, 코인 처리
	if (loadingstat!=0||isinevacuationenable||isinscore||isinexit||loadingstat!=0) return;
	if (type=="free"){toptimebox.style.visibility = "hidden";}
	else if (type=="time"){
		toptimebox.style.visibility = "visible";
		toptimeimg.src = getCachedURL('./skin/2series/assets/ui/time/time.png');
		toptimetext.innerText = `${String(number).padStart(3, '0')}분`;
	}
	else if (type=="coin"){
		toptimebox.style.visibility = "visible";
		toptimeimg.src = getCachedURL('./skin/2series/assets/ui/time/coin.png');
		toptimetext.innerText = `${String(number).padStart(3, '0')}곡`;
	}
	else if (type=="remote"){
		toptimebox.style.visibility = "visible";
		toptimeimg.src = getCachedURL('./skin/2series/assets/ui/time/remote.png');
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
		if(s==0){topimgimg.src = getCachedURL('./skin/2series/assets/song/select/man.png');}
		else if(s==1){topimgimg.src = getCachedURL('./skin/2series/assets/song/select/woman.png');}
		else if(s==2){topimgimg.src = getCachedURL('/skin/2series/assets/song/select/multi.png');}
		toptext.innerHTML = `<span style="color: #8B70FC; letter-spacing: -2px">${number}</span>&nbsp;&nbsp;<span style="color: #fff">${title}${dis?`(${dis})`:''}</span> <span style="color: #FFFF7F">- ${group}</span>`;
		topimgtext.innerText = inter;
	} else if (status==1){
		topimgimg.src = getCachedURL('./skin/2series/assets/ui/einfo.png');
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
	if(type==0){topimgimg.src = getCachedURL('./skin/2series/assets/ui/info.png');}
	else if(type==1){topimgimg.src = getCachedURL('./skin/2series/assets/ui/einfo.png');}
	toptext.innerHTML = message;
	topimgtext.innerText = '';
	topimgbox.style.visibility = 'visible';
	topblackbar.style.visibility = 'visible';
	hidetime = time;
}

//img: [service, scoreon/off, choruson/off, firstphaseon/off, clap, pause, frontbarjump, backbarjump, phasejump, interludejump]
async function loadimage(img, time=2, num=centernum+1){
	//중간이미지 렌더링
	if(isshowed || isinscore || isinexit || isinevacuationenable || (isplaying && renderpron[playlang]) || playlang == "JP") return;
	if(timerimage.src&&!iscentershowed) return;
	const centerimage = document.getElementById("centerimage") || document.createElement("img");	
	await wait(30);
	centernum++;
	if(img=='scoreoff'||img=='firstphaseon'||img=='chorusoff') loadsideimage();
	else loadsideimage(true);
	iscentershowed = true;
	timerimage.style.display = "none";
	centerimage.id = "centerimage";
	wrapper.appendChild(centerimage);

	let newUrl;
	const url = getCachedURL(`./skin/2series/assets/ui/center/${img}.webp`);
	if (typeof url === 'string') {
		const response = await fetch(url);
		const blob = await response.blob();
		newUrl = URL.createObjectURL(blob);
	} else {
		newUrl = URL.createObjectURL(url);
	}
	if (centerimage.dataset.prevUrl) {
		URL.revokeObjectURL(centerimage.dataset.prevUrl);
	}
	centerimage.src = newUrl;
	centerimage.dataset.prevUrl = newUrl;

	await wait(1000*time);
	if (num!=centernum) return;
	timerimage.style.display = "block";
	centerimage.remove();
	iscentershowed = false;
}

function hidesideimage(){
	sideimage.style.visibility = "hidden";
	noscoreimagebox.style.visibility = "hidden";
	nochorusimagebox.style.visibility = "hidden";
	firstphaseimagebox.style.visibility = "hidden";
}

function hidecenterimage(){
	const centerimage = document.getElementById("centerimage");
	if(centerimage) centerimage.remove();
	iscentershowed = false;
}

async function loadsideimage(onlyshow=false, noshow=false) {
	if (isshowed || playlang == "JP") return;
	if (ifmv==false&&ifmr==false&&iflive==false){
		if (!noshow) sideimage.style.visibility = "hidden";
	} else if (ifmv==true&&ifmr==false&&iflive==false){
		if (!noshow) sideimage.style.visibility = "visible";
		sideimage.style.top = "467px";
		if (!onlyshow) sideimage.src = getCachedURL(`./skin/2series/assets/song/playing/MV.webp`);
	} else if (ifmr==true){
		if (!noshow) sideimage.style.visibility = "visible";
		sideimage.style.top = "300px";
		if (!onlyshow) sideimage.src = getCachedURL(`./skin/2series/assets/song/playing/MR.webp`);
	}
 	else if (iflive==true){
		if (!noshow) sideimage.style.visibility = "visible";
		sideimage.style.top = "450px";
		if (!onlyshow) sideimage.src = getCachedURL(`./skin/2series/assets/song/playing/LIVE.webp`);
	}
	if (nochorus) {
		if (!noshow) nochorusimagebox.style.visibility = "visible";
		if (!onlyshow) nochorusimage.src = getCachedURL(`./skin/2series/assets/ui/center/chorusoff.webp`);
	} else nochorusimagebox.style.visibility = "hidden";
	if (noscore) {
		if (!noshow) noscoreimagebox.style.visibility = "visible";
		if (!onlyshow) noscoreimage.src = getCachedURL(`./skin/2series/assets/ui/center/scoreoff.webp`);
	} else noscoreimagebox.style.visibility = "hidden";
	if (firstphase) {
		if (!noshow) firstphaseimagebox.style.visibility = "visible";
		if (!onlyshow) firstphaseimage.src = getCachedURL(`./skin/2series/assets/ui/center/firstphaseon.webp`);
	} else firstphaseimagebox.style.visibility = "hidden";
}

async function hidescore() {
	const forceimg = document.getElementById('forcebox');
	const scorescr = document.getElementById('scorescr');
	const systemsound = document.getElementById('system');
	if (forceimg) forceimg.remove();
	if (scorescr) scorescr.remove();
	if (systemsound) systemsound.pause();
	isinscore = false;
	
}

async function score(score=0){
	//점수 화면 표시
	isinscore = true;
	let gender;
	
	const systemsound = document.getElementById('system');

	const forceimg = document.createElement("img");
	forceimg.src = getCachedURL('./skin/2series/assets/song/score/background.png');
	forceimg.style.display = 'block';
	forceimg.id = 'forcebox';
	wrapper.appendChild(forceimg);

	const scorescr = document.createElement('div');
	const scorebox = document.createElement('div');
	const score1img = document.createElement('img');
	const score2img = document.createElement('img');
	const score3img = document.createElement('img');
	const scoremessage = document.createElement('img');
	
	scorescr.id = 'scorescr';
	scorebox.id = 'scorebox';
	scoremessage.id = 'scoremessage';

	scorebox.appendChild(score1img);
	scorebox.appendChild(score2img);
	scorebox.appendChild(score3img);
	scorescr.appendChild(scoremessage);
	scorescr.appendChild(scorebox);
	wrapper.appendChild(scorescr);

	await wait(50);
	score1img.src = getCachedURL('./skin/2series/assets/song/score/number/0.png');
	score2img.src = getCachedURL('./skin/2series/assets/song/score/number/0.png');
	for(let i=0; i<15; i++){
		await wait(50);
		score1img.src = getCachedURL(`./skin/2series/assets/song/score/number/${Math.floor(Math.random()*10)}.png`);
		score2img.src = getCachedURL(`./skin/2series/assets/song/score/number/${Math.floor(Math.random()*10)}.png`);
	}
	gender = Math.floor(Math.random()*2) ? 'man' : 'woman';
	if (score == 100){
		score1img.src = getCachedURL(`./skin/2series/assets/song/score/number/1.png`);
		score2img.src = getCachedURL(`./skin/2series/assets/song/score/number/0.png`);
		score3img.src = getCachedURL(`./skin/2series/assets/song/score/number/0.png`);
	} else {
		score1img.src = getCachedURL(`./skin/2series/assets/song/score/number/${Math.floor(score/10)%10}.png`);
		score2img.src = getCachedURL(`./skin/2series/assets/song/score/number/${score%10}.png`);
	}
	await wait(50);
	if (!isinscore) return;
	if (score == 100) {
		systemsound.src = getCachedURL(`./skin/2series/sounds/score/100${gender}.mp3`);
		scoremessage.src = getCachedURL(`./skin/2series/assets/song/score/message/100${gender}.png`);
	} else if (score >= 90) {
		systemsound.src = getCachedURL(`./skin/2series/sounds/score/90${gender}.mp3`);
		scoremessage.src = getCachedURL(`./skin/2series/assets/song/score/message/90${gender}.png`);
	} else if (score >= 80) {
		systemsound.src = getCachedURL(`./skin/2series/sounds/score/80${gender}.mp3`);
		scoremessage.src = getCachedURL(`./skin/2series/assets/song/score/message/80${gender}.png`);
	} else if (score >= 70) {
		systemsound.src = getCachedURL(`./skin/2series/sounds/score/70${gender}.mp3`);
		scoremessage.src = getCachedURL(`./skin/2series/assets/song/score/message/70${gender}.png`);
	} else {
		systemsound.src = getCachedURL(`./skin/2series/sounds/score/0${gender}.mp3`);
		scoremessage.src = getCachedURL(`./skin/2series/assets/song/score/message/0${gender}.png`);
	}
	systemsound.play();
	await wait(8000);
	if (!isinscore) return;
	hidescore();
	endscore();
}

function systemsound(type, sound){
	const systemsound = document.getElementById('system');
	if(type==0){
		systemsound.src = getCachedURL(`./skin/2series/sounds/selsong/${sound}.mp3`);
	} else if (type==1){
		systemsound.src = getCachedURL(`./skin/2series/sounds/${sound}.mp3`);
	}
	systemsound.play();
}

function startkar(evacuation=false){
	//입실화면 표시
	sangsong.length = 0;
	if(evacuation){
		const forceimg = document.getElementById('forcebox') || document.createElement("img");
		const systemsound = document.getElementById('system');
		if (isinevacuationenable) systemsound.src = getCachedURL('./skin/2series/sounds/join.mp3');
		else systemsound.src = getCachedURL('./skin/2series/sounds/evacuation.mp3');
		systemsound.play();
		isinevacuationenable = true;
		toptimeimg.style.opacity = '1';
		toptimebox.style.zIndex = '101';
		networkbox.style.visibility = 'hidden';
		forceimg.id = 'forcebox';
		wrapper.appendChild(forceimg);
		forceimg.src = getCachedURL('./skin/2series/assets/ui/evacuation.png');
		forceimg.style.display = 'block';

		systemsound.addEventListener('ended', function(){
			if (!isinevacuationenable) { systemsound.removeEventListener('ended', arguments.callee); return; }
			forceimg.remove();
			startkar(false);
			isinevacuationenable = false;
			systemsound.removeEventListener('ended', arguments.callee);
		});
	} else {
		const forcebox = document.getElementById('forcebox');
		if (forcebox) forcebox.remove();
		toptimeimg.style.opacity = "0.67";
		toptimebox.style.zIndex = '1';
		networkbox.style.visibility = "visible";
		const systemsound = document.getElementById('system');
		const bga = document.getElementById('bga');
		systemsound.src = getCachedURL('./skin/2series/sounds/join.mp3');
		bga.src = getCachedURL('./skin/2series/videos/join.mp4');
		systemsound.play();
		bga.play();

		bga.addEventListener('ended', function(){
			loadbga();
			bga.removeEventListener('ended', arguments.callee);
		});
	}
}

async function hideexitscr(){
	if(isinexit){
		const forceimg = document.getElementById('forcebox');
		const systemsound = document.getElementById('system');
		forceimg.remove();
		isinexit = false;
		systemsound.pause();
		toptimebox.style.visibility = 'visible';
		networkbox.style.visibility = 'visible';

		document.getElementById('sangcount').remove();
		document.getElementById('highscorebox').remove();
		document.getElementById('score1box').remove();
		document.getElementById('score2box').remove();

		await wait(500);
		if (startediscoin && !iscoin) {iscoin = true; info(0, '관리방식: 코인 모드 변경하였습니다.'); setlimit();}
		else if (!startediscoin && iscoin) {iscoin = false; info(0, '관리방식: 시간 모드 변경하였습니다'); setlimit();}
	}
}

//songs: 부른 곡 목록, scores: 부른 곡 점수 목록 (배열로 입력)
async function endkar(songs){
	//퇴장화면 표시
	await wait(500);
	if (!isinevacuationenable){
		const systemsound = document.getElementById('system');
		systemsound.src = getCachedURL('./skin/2series/sounds/exit.mp3');
		systemsound.play();
	}
	
	if(songs.length >= 10){
		toptimebox.style.visibility = 'hidden';
		networkbox.style.visibility = 'hidden';

		isinexit = true;
		networkbox.style.visibility = 'hidden';
		const forceimg = document.createElement("img");
		forceimg.id = 'forcebox';
		wrapper.appendChild(forceimg);
		forceimg.src = getCachedURL('./skin/2series/assets/ui/exit/todaysang.png');
		forceimg.style.display = 'block';
		setTimeout(()=>{
			hideexitscr();
		},38500);
		songs.sort((a, b) => b.score - a.score);

		const titleList = [];
		const cache = {};

		for (const item of songs) {
			const songNum = item.song;

			if (cache[songNum]) {
			titleList.push(cache[songNum]);
			continue;
			}

			try {
				const data = await getsongdata(songNum);
				const title = data?.title || null;
				cache[songNum] = title;
				titleList.push(title);
			} catch (err) {
				console.error(`곡 ${songNum} 정보 가져오기 실패`, err);
				cache[songNum] = null;
				titleList.push(null);
			}
		}

		const sangcount = document.createElement('p');
		const highscorebox = document.createElement('div');
		const highscorename = document.createElement('p');
		const highscorescore = document.createElement('p');
		const score1box = document.createElement('div');
		const score1num = document.createElement('p');
		const score1name = document.createElement('p');
		const score1score = document.createElement('p');
		const score2box = document.createElement('div');
		const score2num = document.createElement('p');
		const score2name = document.createElement('p');
		const score2score = document.createElement('p');
		sangcount.innerText = songs.length;
		sangcount.setAttribute("data-content", songs.length);
		highscorename.innerText = `${titleList[0]}\n${titleList[1]}\n${titleList[2]}`;
		highscorename.style.setProperty('--highscorename', `"${titleList[0]} \\A ${titleList[1]} \\A ${titleList[2]}"`);
		highscorescore.innerText = `${songs[0].score}점\n${songs[1].score}점\n${songs[2].score}점`;
		highscorescore.style.setProperty('--highscorescore', `"${songs[0].score}점 \\A ${songs[1].score}점 \\A ${songs[2].score}점"`);

		sangcount.id = 'sangcount';
		highscorebox.id = 'highscorebox';
		highscorename.id = 'highscorename';
		highscorescore.id = 'highscorescore';

		score1box.id = 'score1box';
		score1num.id = 'score1num';
		score1name.id = 'score1name';
		score1score.id = 'score1score';
		score2box.id = 'score2box';
		score2num.id = 'score2num';
		score2name.id = 'score2name';
		score2score.id = 'score2score';

		wrapper.appendChild(sangcount);
		highscorebox.appendChild(highscorename);
		highscorebox.appendChild(highscorescore);
		wrapper.appendChild(highscorebox);

		score1box.appendChild(score1num);
		score1box.appendChild(score1name);
		score1box.appendChild(score1score);
		wrapper.appendChild(score1box);
		score2box.appendChild(score2num);
		score2box.appendChild(score2name);
		score2box.appendChild(score2score);
		wrapper.appendChild(score2box);
		//한줄당 8개씩
		//4초동안 한줄 렌더링
		//2초 뒤 다음 줄 렌더링
		let start = 3;
		let isfirst = true;
		while(start<songs.length){
			await wait(2000);
			let songdata = "";
			let scoredata = "";
			let scorenum = "";
			for(let i=0;i<8;i++){
				if(start+i>=songs.length) break;
				songdata+=`${titleList[start+i]}\n`;
				scoredata+=`${songs[start+i].score}점\n`;
				scorenum+=`${i+start+1}위\n`;
			}
			if(isfirst){
				score1box.style.transition = 'none';
				score1box.style.height = '0';
				score2box.style.height = '0';

				score2num.innerText = '';
				score2num.style.setProperty('--score2num', `""`);
				score2name.innerText = '';
				score2name.style.setProperty('--score2name', `""`);
				score2score.innerText = '';
				score2score.style.setProperty('--score2score', `""`);

				score1num.innerText = scorenum;
				score1num.style.setProperty('--score1num', `"${scorenum.replace(/\n/g, " \\A ")}"`);
				score1name.innerText = songdata;
				score1name.style.setProperty('--score1name', `"${songdata.replace(/\n/g, " \\A ")}"`);
				score1score.innerText = scoredata;
				score1score.style.setProperty('--score1score', `"${scoredata.replace(/\n/g, " \\A ")}"`);
				
				requestAnimationFrame(() => {
					score1box.style.transition = '';
					requestAnimationFrame(() => {
						score1box.style.height = '500px';
					});
				});
			} else {
				score2box.style.height = '0';

				score2num.innerText = scorenum;
				score2num.style.setProperty('--score2num', `"${scorenum.replace(/\n/g, " \\A ")}"`);
				score2name.innerText = songdata;
				score2name.style.setProperty('--score2name', `"${songdata.replace(/\n/g, " \\A ")}"`);
				score2score.innerText = scoredata;
				score2score.style.setProperty('--score2score', `"${scoredata.replace(/\n/g, " \\A ")}"`);

				requestAnimationFrame(() => {score2box.style.height = '500px';});
			}
			isfirst=!isfirst;
			start+=8;
			await wait(4000);
		}
	} else {
		await wait(500);
		if (startediscoin && !iscoin) {iscoin = true; info(0, '관리방식: 코인 모드 변경하였습니다.'); setlimit();}
		else if (!startediscoin && iscoin) {iscoin = false; info(0, '관리방식: 시간 모드 변경하였습니다.'); setlimit();}
	}
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