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
let isusing = false;
let autoplay = true;

//설정
let iscoin = false;
let timecoin = 0;
let freeplay = false;
let remcointime = 5;
let renderpron = false;

async function songstart(number, num=playnum){
    //곡 정보 파싱 후 startsong에 전달
    //startwait의 절반만큼 기다린 후 hidestartbox() 실행
    //그와 동시에 가사 렌더링
    //1절의 startwait에서 ((1000/bpm)*4)를 뺀 만큼 기다린 후 timer(bpm) 실행

    if(!freeplay&&timecoin==0){
        info(0, "시간/코인을 입력하세요.");
        return;
    }
    try{
        autoplay = true;
        const res = await fetch(`./songs/${number}/song.json`);
        const data = await res.text();
        const js = JSON.parse(data);
        startsong(number, js.title, js.description||null, js.sing, js.gender, js.interval, js.interval, js.lyrics, js.compos, js.original || null, null, js.lang, "ORI");
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
        for (const item of js.lyricsd) {
            if(!isplaying||num!=playnum){return;}
            await wait(item.startwait - ((60000 / js.bpm) * 5));
            if(!isplaying||num!=playnum){return;}
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

            for (let i = 0; i < item.lines.length; i++) {
                if(!isplaying||num!=playnum){return;}
                const line = item.lines[i];
                const isLastLine = (i === item.lines.length - 1);
                const isNextLastLine = (i + 1 === item.lines.length - 1);

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
        songend();
        isplaying = false;
    } catch (err) {
        info(0, `카운터에 문의하세요(${err.name})`)
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
        const res = await fetch(`./songs/${number}/song.json`);
        const data = await res.text();
        const js = JSON.parse(data);
        reservedsong.push(number);
        if(reservedsong.length==1) setnextreservesong(number, js.title, js.description||null, js.sing);
    } catch (err) {
        info(0, `카운터에 문의하세요(${err.name})`)
    }
}

async function getsongdata(number){
    try{
        const res = await fetch(`./songs/${number}/song.json`);
        const data = await res.text();
        const js = JSON.parse(data);
        return js;
    } catch (err) {
        info(0, `카운터에 문의하세요(${err.name})`)
    }
}

function songend(){
    isplaying = false;
    endsong();
    score(100);
}

async function endscore(){
    setlimit();
    if(reservedsong.length>0&&timecoin>0&&autoplay){
        songstart(reservedsong[0], ++playnum);
        reservedsong.shift();
    }
    else if(reservedsong.length>0&&timecoin>0&&!autoplay){
        const js = await getsongdata(reservedsong[0]);
        setnextreservesong(reservedsong[0], js.title, js.description, js.sing);
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
        try{
            const res = await fetch(`./songs/${inpnum}/song.json`);
            const data = await res.text();
            const js = JSON.parse(data);
            searchsong(0, inpnum, js.gender, js.interval, js.title, js.description, js.sing);
        } catch {searchsong(1, inpnum);}
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
    info(0, `${amount}${type=="coin"?"곡":"분"} ${timecoin==0?"입력":"추가"}하였습니다.`);
    timecoin+=amount;
    iscoin=type=="coin"?true:false;
    setlimit();
}

function addservice(amount){
    isusing = true;
    loadimage("service");
    info(0, `${amount}${iscoin?"곡":"분"} 서비스하였습니다.`);
    timecoin+=amount;
    setlimit();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
                        await setnextreservesong(reservedsong[0], js.title, js.description, js.sing);
                    }
                } else {
                    const res = await fetch(`./songs/${inpnum}/song.json`);
                    const data = await res.text();
                    const js = JSON.parse(data);
                    songstart(inpnum, ++playnum);
                    inpnum = '';
                }
            } catch {}
        }
    } else if (event.key === 'q' || event.key === 'Q') {
        if (!remotemode) {
            try{
                const res = await fetch(`./songs/${inpnum}/song.json`);
                const data = await res.text();
                const js = JSON.parse(data);
                songreserve(inpnum);
                inpnum = '';
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
    } else if (event.key === 't' || event.key === 'T') {
        if(remotemode && (!iscoin || timecoin==0)) {
            const toupcoin = inpnum==''?30:Number(inpnum);
            freeplay=false;
            addtimecoin("time", toupcoin);
            remotemode=false;
            inpnum = '';
        }
    } else if (event.key === 'c' || event.key === 'C') {
        if(remotemode && (iscoin || timecoin==0)) {
            const toupcoin = inpnum==''?1:Number(inpnum);
            freeplay=false;
            addtimecoin("coin", toupcoin);
            remotemode=false;
            inpnum = '';
        }
    } else if (event.key === 's' || event.key === 'S') {
        if(!freeplay&&remotemode) {
            const toupcoin = inpnum==''?(iscoin?1:30):Number(inpnum);
            addservice(toupcoin);
            remotemode=false;
            inpnum = '';
        }
    } else if (event.key === 'd' || event.key === 'D') {
        if(!freeplay&&remotemode) {
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