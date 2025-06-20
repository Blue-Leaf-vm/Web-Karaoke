//음악 파일 분석
//mv.mp4 (존재할 경우 mv 재생)
//mr.mp3 (존재할 경우 mr곡 판정)
//live.mp3 (존재할 경우 라이브 곡 / midi와 mr 모두 공존 가능 / live.mp3만 존재할 경우 효과음과 배경음 모두 포함으로 판정 / 다른 파일도 존재할 경우 효과음으로 판정)
//song.midi (전곡, song.mp3가 존재할 경우 멜로디 (melody.mp3가 존재할 경우 미사용됨), mr곡이 존재할 경우 미사용됨)
//chorus.mp3 (곡 코러스 / mr곡에서도 재생하나, 같이 존재시키는 것은 비추)
//song.midi (song.mp3) / mr.mp3 필수
let isup = true;
let inpnum = "";
let delnum = 0;
let isplaying = false;

async function songstart(number){
    //곡 정보 파싱 후 startsong에 전달
    //startwait의 절반만큼 기다린 후 hidestartbox() 실행
    //그와 동시에 가사 렌더링
    //1절의 startwait에서 ((1000/bpm)*4)를 뺀 만큼 기다린 후 timer(bpm) 실행
    //
    try{
        const res = await fetch(`./songs/${number}/song.json`);
        const data = await res.text();
        const js = JSON.parse(data);
        const renderpron = false;
        startsong(number, js.title, js.description||null, js.sing, js.gender, js.interval, js.interval, js.lyrics, js.compos, js.original || null, null, js.lang, "ORI");
        setTimeout(() => {
            hidestartbox();
        }, js.lyricsd[0].startwait/4);
        for (const item of js.lyricsd) {
            if(!isplaying){return;}
            await wait(item.startwait - ((60000 / js.bpm) * 5));
            if(!isplaying){return;}
            if (item.lines.length >= 2) {
                renderlyric(renderpron, item.lines[0], true, js.lang);
                setTimeout(()=>{renderlyric(renderpron, item.lines[1], false, js.lang);}, 30);
            } else if (item.lines.length == 1) {
                renderlyric(renderpron, item.lines[0], true, js.lang);
            }

            let isup = true;
            await wait(60000 / js.bpm);
            timer(js.bpm, isup);

            if(!isplaying){return;}

            await wait((60000 / js.bpm) * 4);

            if(!isplaying){return;}

            for (let i = 0; i < item.lines.length; i++) {
                if(!isplaying){return;}
                const line = item.lines[i];
                const isLastLine = (i === item.lines.length - 1);
                const isNextLastLine = (i + 1 === item.lines.length - 1);

                draglyric(line, isup, js.lang);

                for (let j = 0; j < line.lyrics.length; j++) {
                    await wait(line.timing[j]);
                    await wait(line.wait[j]);
                }
                if(!isplaying){return;}
                if (isLastLine) {
                    hidelyric(true);
                    hidelyric(false);
                } else if (!isNextLastLine) {
                    hidelyric(isup);
                }
                
                const next = item.lines[i + 2];
                if (next) renderlyric(renderpron, next, isup, js.lang);

                isup = !isup;
            }
        }
        await wait(js.endwait);
        endsong();
        isplaying = false;
    } catch (err) {
        info(0, `카운터에 문의하세요(${err.name})`)
    }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function input(n) {
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
}

document.addEventListener('keydown', async function(event) {
	if (event.key === 'Enter') {
        if (!isplaying) {
            try{
                const res = await fetch(`./songs/${inpnum}/song.json`);
                const data = await res.text();
                const js = JSON.parse(data);
                console.log(inpnum);
                songstart(inpnum);
                inpnum = '';
            } catch {}
        }
    } else if (event.key === 'Escape') {
        if (inpnum.length != 0){
            inpnum = '';
            rollbackupbar();
        } else {
            endsong();
            isplaying = false;
        }
	} else if (Number(event.key) >= 0 && Number(event.key) < 10){
		input(Number(event.key));
	}
});