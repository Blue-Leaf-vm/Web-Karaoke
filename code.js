//음악 파일 분석
//mv.mp4 (존재할 경우 mv 재생)
//mr.mp3 (존재할 경우 mr곡 판정)
//live.mp3 (존재할 경우 라이브 곡 / midi와 mr 모두 공존 가능 / live.mp3만 존재할 경우 효과음과 배경음 모두 포함으로 판정 / 다른 파일도 존재할 경우 효과음으로 판정)
//song.midi (전곡, song.mp3가 존재할 경우 멜로디 (melody.mp3가 존재할 경우 미사용됨 / melody.mp3는 테스트용으로 사용 추천), mr곡이 존재할 경우 미사용됨)
//chorus.mp3 (곡 코러스 / mr곡에서도 재생하나, 같이 존재시키는 것은 비추)
//song.midi (song.mp3) / mr.mp3 필수
let isup = true;
let inpnum = "";
let delnum = 0;
let isplaying = false;
let isinscore = false;
let playnum = 0;
let remotemode = false;
let sangsong = [];
let sangsongscore = [];
let reservedsong = [];
let nowplaying;
let playingphase;
let playingline;
let isusing = false;
let autoplay = true;
let songdir = null;
let ininterlude = false;

let ifmv = false;
let ifmr = false;
let iflive = false;

let hasmv = false;
let hasmusic = false;
let hasmelody = false;
let haschorus = false;
let haslive = false;

let starttime;

//설정
let iscoin = false;
let timecoin = 0;
let freeplay = false;
let remcointime = 5;
let renderpron = true;

async function songstart(number, num=playnum, phase=0, line=0, skipinter=false){
    //곡 정보 파싱 후 startsong에 전달
    //startwait의 절반만큼 기다린 후 hidestartbox() 실행
    //그와 동시에 가사 렌더링
    //1절의 startwait에서 ((1000/bpm)*4)를 뺀 만큼 기다린 후 timer(bpm) 실행

    if(!freeplay&&timecoin==0&&phase==0){
        info(0, "시간/코인을 입력하세요.");
        return;
    }
    try{
        const js = await getsongdata(number);
        const banner = await getbannerdata(number);
        if(phase==0&&line==0&&!isplaying&&!skipinter){
            ininterlude = true;
            starttime = performance.now();
            startsong(number, js.title, js.description||null, js.group||js.sing, js.sing, js.gender, js.interval, js.interval, js.lyrics, js.compos, js.original || null, banner || null, js.lang);
            isplaying = true;
            autoplay = true;
            nowplaying = number;
            playingphase = 0;
            await loadsongandvideo(number, 0, true);
            const context = new (window.AudioContext || window.webkitAudioContext)();
            context.resume();
            await loadsongandvideo(number);

            if (!freeplay&&iscoin){
                setTimeout(() => {
                    if(!isplaying||num!=playnum){return;}
                    timecoin--;
                    setlimit();
                    if(timecoin==2){info(0, "2곡 남았습니다.");}
                }, remcointime*1000);
            }
            setTimeout(() => {
                hidestartbox();
            }, js.lyricsd[0].startwait/4);
        } else if (phase>=js.lyricsd.length) {
            songend();
            autoplay = false;
            isplaying = false;
        } else if (phase!=0||isplaying){
            if(!skipinter) hidestartbox(false);
            else hidestartbox(false, true);
            hidelyric(true);
            hidelyric(false);     
            //내 앞까지 있는 모든 절들의 모든 가사의 합을 구함
            let sum = 0;
            for (let k=0;k<phase;k++) {
                const item = js.lyricsd[k];
                sum+=item.startwait || 0;
                for (let i = 0; i < item.lines.length; i++) {
                    const line = item.lines[i];
                    for (let j = 0; j < line.lyrics.length; j++) {
                        sum+=line.timing[j] || 0;
                        sum+=line.wait[j] || 0;
                        sum+=7;
                    }
                }
            }
            console.log(sum);
            if(skipinter){sum+=js.lyricsd[phase].startwait - ((60000 / js.bpm) * 6);}
            await loadsongandvideo(number, sum);
        }

        for (let k=phase;k<js.lyricsd.length;k++) {
            console.log(performance.now()-starttime);
            playingphase = k;
            ininterlude = true;
            const item = js.lyricsd[k];
            if(!isplaying||num!=playnum){return;}
            if(!skipinter){await wait(item.startwait - ((60000 / js.bpm) * 5));}
            else {await wait(60000 / js.bpm);}
            if(!isplaying||num!=playnum){return;}
            hidesideimage();
            if (item.lines.length >= 2) {
                renderlyric(renderpron, item.lines[0], true, js.lang);
                setTimeout(()=>{renderlyric(renderpron, item.lines[1], false, js.lang);}, 30);
            } else if (item.lines.length == 1) {
                renderlyric(renderpron, item.lines[0], true, js.lang);
            }

            let isup = true;
            await wait(60000 / js.bpm);
            timer(js.bpm, isup);

            if(!isplaying||num!=playnum){return;}

            await wait((60000 / js.bpm) * 4);

            if(!isplaying||num!=playnum){return;}
            ininterlude = false;
            for (let i = 0; i < item.lines.length; i++) {
                if(!isplaying||num!=playnum){return;}
                const line = item.lines[i];
                const isLastLine = (i === item.lines.length - 1);
                const isNextLastLine = (i + 1 === item.lines.length - 1);
                playingline = i;

                draglyric(line, isup, js.lang);

                for (let j = 0; j < line.lyrics.length; j++) {
                    if(!isplaying||num!=playnum){return;}
                    await wait(line.timing[j]);
                    if(!isplaying||num!=playnum){return;}
                    await wait(line.wait[j]);
                }
                if(!isplaying||num!=playnum){return;}
                if (isLastLine) {
                    hidelyric(true);
                    hidelyric(false);
                } else if (!isNextLastLine) {
                    hidelyric(isup);
                }
                
                const next = item.lines[i + 2];
                if(!isplaying||num!=playnum){return;}
                if (next) renderlyric(renderpron, next, isup, js.lang);

                isup = !isup;
            }
        }
        await wait(js.endwait);
        if(!isplaying||num!=playnum){return;}
        songend();
        isplaying = false;
    } catch (err) {
        info(0, `카운터에 문의하세요(${err.name})`);
        console.error(err);
    }
}

async function loadsongandvideo(number, time=0, fileload=false){
    const folderHandle = await songdir.getDirectoryHandle(number);
    if(fileload){
        try{
            hasmv = false;
            hasmusic = false;
            hasmelody = false;
            haschorus = false;
            haslive = false;

            const mvHandle = await folderHandle.getFileHandle('mv.mp4');
            if(mvHandle){
                //mv 존재 시 재생
                const bga = document.getElementById('bga');
                bga.src = URL.createObjectURL(await mvHandle.getFile());
                bga.muted = true;
                bga.load();
                hasmv = true;
            }
            const musicHandle = await folderHandle.getFileHandle('song.mp3');
            if(musicHandle){
                //음악 재생
                const music = document.getElementById('music');
                music.src = URL.createObjectURL(await musicHandle.getFile());
                music.load();
                hasmusic = true;
            }
            const melodyHandle = await folderHandle.getFileHandle('melody.mp3');
            if(melodyHandle){
                //멜로디 재생
                const melody = document.getElementById('melody');
                melody.src = URL.createObjectURL(await melodyHandle.getFile());
                melody.load();
                hasmelody = true;
            }
            const chorusHandle = await folderHandle.getFileHandle('chorus.mp3');
            if(chorusHandle){
                //코러스 재생
                const chorus = document.getElementById('chorus');
                chorus.src = URL.createObjectURL(await chorusHandle.getFile());
                chorus.load();
                haschorus = true;
            }
        } catch (err) {
            if(err.name!="NotFoundError") info(0, `카운터에 문의하세요(${err.name})`);
            console.log(err);
            return;
        }
    } else {
        const fileHandle = await folderHandle.getFileHandle('song.json');
        const file = await fileHandle.getFile();
        const content = await file.text();
        const js = JSON.parse(content);
        if(hasmv){
            //mv 존재 시 재생
            if(js.videosync+time<0){bga.currentTime = ((js.videosync*-1) / 1000) + (time / 1000); await bga.play();}
            else {setTimeout(async ()=>{bga.currentTime = (time / 1000); await bga.play();}, js.videosync);}
            ifmv = true;
        }
        if(hasmusic){
            //음악 재생
            if(js.musicsync+time<0){music.currentTime = ((js.musicsync*-1) / 1000) + (time / 1000); await music.play();}
            else {setTimeout(async ()=>{music.currentTime = (time / 1000); await music.play();}, js.musicsync);}
            ifmr = true;
        }
        if(hasmelody){
            //멜로디 재생
            if(js.melodysync+time<0){melody.currentTime = ((js.melodysync*-1) / 1000) + (time / 1000); await melody.play();}
            else {setTimeout(async ()=>{melody.currentTime = (time / 1000); await melody.play();}, js.melodysync);}
            ifmr = false;
        }
        if(haschorus){
            //코러스 재생
            if(js.chorussync+time<0){chorus.currentTime = ((js.chorussync*-1) / 1000) + (time / 1000); await chorus.play();}
            else {setTimeout(async ()=>{chorus.currentTime = (time / 1000); await chorus.play();}, js.chorussync);}
        }
    }
}

async function songreserve(number){
    if(!freeplay&&timecoin==0){
        info(0, "시간/코인을 입력하세요.");
        return;
    }
    if (!reservedsong.includes(number)) info(0, `${number} 예약되었습니다.`);
    else info(0, `${number} 중복예약되었습니다.`);
    try{
        const js = await getsongdata(number);
        reservedsong.push(number);
        if(reservedsong.length==1) setnextreservesong(number, js.title, js.description||null, js.group||js.sing);
    } catch (err) {
        info(0, `카운터에 문의하세요(${err.name})`)
    }
}

async function getsongdata(number){
    if (!songdir) {
        info(0, "곡 폴더를 선택해주세요.")
        songdir = await window.showDirectoryPicker();
        return 1;
    }
    try{
        const folderHandle = await songdir.getDirectoryHandle(number);
        const fileHandle = await folderHandle.getFileHandle('song.json');

        if (fileHandle) {
            const file = await fileHandle.getFile();
            const content = await file.text();
            const js = JSON.parse(content);
            return js;
        }
    } catch (err) {
        return 1;
    }
}

async function getbannerdata(number){
    try{
        const folderHandle = await songdir.getDirectoryHandle(number);
        const bannerHandle = await folderHandle.getFileHandle('banner.png');
        if(bannerHandle){
            return URL.createObjectURL(await bannerHandle.getFile());
        }
    } catch (err) {
        return null;
    }
}

function songend(){
    const bga = document.getElementById('bga');
    const music = document.getElementById('music');
    const melody = document.getElementById('melody');
    const chorus = document.getElementById('chorus');
    music.pause();
    melody.pause();
    chorus.pause();
    music.removeAttribute("src");
    melody.removeAttribute("src");
    isplaying = false;
    ininterlude = false;
    ifmv = false;
    ifmr = false;
    iflive = false;
    endsong();
    score(100);
}

async function endscore(){
    setlimit();
    if(reservedsong.length>0&&timecoin>0&&autoplay){
        songstart(reservedsong[0], ++playnum);
        reservedsong.shift();
    }
    if(reservedsong.length>0&&timecoin>0){
        const js = await getsongdata(reservedsong[0]);
        setnextreservesong(reservedsong[0], js.title, js.description, js.group||js.sing);
    }
}

async function input(n) {
    if(!remotemode){
        if(inpnum.length==0 && n==0){return;}
        else if (inpnum.length==6 && n==0){return;}
        delnum++;
        inpnum += n;
        if(inpnum.length>6){inpnum = '' + n;}
        setTimeout(() => {
            delnum--;
            if (delnum<1) {inpnum = '';}
        }, 10000);
        const js = await getsongdata(inpnum);
        if(js==1){searchsong(1, inpnum); return;}
        searchsong(0, inpnum, js.gender, js.interval, js.title, js.description, js.group||js.sing);
    } else {
        inpnum += n;
        if(inpnum.length>6){inpnum = '' + n;}
        limit("remote", inpnum);
    }
}

function setlimit(chkend=true) {
    if (timecoin>999){timecoin=999;}
    else if (timecoin<0){timecoin=0;}
    if (freeplay) {limit("free", timecoin);}
    else if (iscoin) {limit("coin", timecoin);}
    else {limit("time", timecoin);}
    if (!isplaying&&timecoin==0&&!isinscore&&chkend&&isusing) {endkar(sangsong, sangsongscore);isusing=false;reservedsong = [];}
}

function addtimecoin(type, amount) {
    isusing = true;
    info(0, `${amount}${type=="coin"?"개":"분"} ${timecoin==0?"입력":"추가"}하였습니다.`);
    timecoin+=amount;
    iscoin=type=="coin"?true:false;
    setlimit();
}

function addservice(amount){
    isusing = true;
    loadimage("service");
    info(0, `${amount}${iscoin?"개":"분"} 서비스하였습니다.`);
    timecoin+=amount;
    setlimit();
}

function wait(ms) {
    const start = performance.now();
    return new Promise(resolve => {
        function check() {
            const now = performance.now();
            if (now - start >= ms) {
                resolve();
            } else {
                requestAnimationFrame(check);
            }
        }
        check();
    });
}

document.addEventListener('keydown', async function(event) {
	if (event.key === 'Enter') {
        if (!isplaying && !remotemode) {
            try{
                if(inpnum==''&&reservedsong.length>0){
                    songstart(reservedsong[0], ++playnum);
                    reservedsong.shift();
                    if(reservedsong.length>0){
                        const js = await getsongdata(reservedsong[0]);
                        await setnextreservesong(reservedsong[0], js.title, js.description, js.group||js.sing);
                    }
                } else {
                    if (typeof await getsongdata(inpnum)=="object"){
                        songstart(inpnum, ++playnum);
                        inpnum = '';
                    }
                }
            } catch {}
        }
    } else if (event.key === 'q' || event.key === 'Q') {
        if (!remotemode) {
            try{
                if(typeof await getsongdata(inpnum)=="object"){
                    songreserve(inpnum);
                    inpnum = '';
                }
            } catch {}
        }
    } else if (event.key === 'Escape') {
        if (inpnum.length != 0){
            inpnum = '';
            rollbackupbar();
        } else if (isplaying){
            songend();
            autoplay = false;
            isplaying = false;
        }
    } else if (event.key === 'r' || event.key === 'R') {
        if(!remotemode) {remotemode=true; limit("remote", 0);}
        else {remotemode=false; setlimit();}
        inpnum = '';
    } else if (event.key === 'f' || event.key === 'F') {
        if(remotemode) {
            freeplay=!freeplay;
            remotemode=false;
            setlimit();
            inpnum = '';
        }
    } else if (event.key === 't' || event.key === 'T') {
        if(remotemode && (!iscoin || timecoin==0) && !freeplay) {
            const toupcoin = inpnum==''?30:Number(inpnum);
            addtimecoin("time", toupcoin);
            remotemode=false;
            inpnum = '';
        }
    } else if (event.key === 'c' || event.key === 'C') {
        if(remotemode && (iscoin || timecoin==0) && !freeplay) {
            const toupcoin = inpnum==''?1:Number(inpnum);
            addtimecoin("coin", toupcoin);
            remotemode=false;
            inpnum = '';
        }
    } else if (event.key === 's' || event.key === 'S') {
        if(!freeplay&&remotemode&&!freeplay) {
            const toupcoin = inpnum==''?(iscoin?1:5):Number(inpnum);
            addservice(toupcoin);
            remotemode=false;
            inpnum = '';
        }
    } else if (event.key === 'd' || event.key === 'D') {
        if(!freeplay&&remotemode&&!freeplay) {
            const toupcoin = inpnum==''?(iscoin?1:5):Number(inpnum);
            timecoin-=toupcoin;
            setlimit();
            remotemode=false;
            inpnum = '';
        }
    } else if (event.key === 'e' || event.key === 'E') {
        if(remotemode) {
            if(freeplay){isusing=true;}
            timecoin=0;
            setlimit();
            remotemode=false;
            inpnum = '';
        }
    } else if (event.key === 'ArrowUp') {
        if(isplaying&&(freeplay||timecoin!=0)) {
            songstart(nowplaying, ++playnum, playingphase-1>=0?playingphase-1:0, 0);
            info(0, "절을 점프합니다.");
        }
    } else if (event.key === 'ArrowDown') {
        if(isplaying) {
            songstart(nowplaying, ++playnum, playingphase+1, 0);
            info(0, "절을 점프합니다.");
        }
    } else if (event.key === 'j' || event.key === 'J') {
        if(isplaying&&ininterlude) {
            songstart(nowplaying, ++playnum, playingphase, 0, true);
            info(0, "간주를 점프합니다.");
        }
	} else if (Number(event.key) >= 0 && Number(event.key) < 10){
		input(Number(event.key));
	}
});

setInterval(() => {
    if(timecoin>0&&!freeplay&&!iscoin){
        timecoin--;
        setlimit();
        if(timecoin==5){info(0, "5분 남았습니다.");}
    }
}, 60000);

setlimit(false);