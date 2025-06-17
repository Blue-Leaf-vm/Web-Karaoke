//음악 파일 분석
//mv.mp4 (존재할 경우 mv 재생)
//mr.mp3 (존재할 경우 mr곡 판정)
//live.mp3 (존재할 경우 라이브 곡 / midi와 mr 모두 공존 가능 / live.mp3만 존재할 경우 효과음과 배경음 모두 포함으로 판정 / 다른 파일도 존재할 경우 효과음으로 판정)
//song.midi (전곡, song.mp3가 존재할 경우 멜로디 (melody.mp3가 존재할 경우 미사용됨), mr곡이 존재할 경우 미사용됨)
//chorus.mp3 (곡 코러스 / mr곡에서도 재생하나, 같이 존재시키는 것은 비추)
//song.midi (song.mp3) / mr.mp3 필수
let isup = true;

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
        startsong(number, js.title, js.description||null, js.sing, js.gender, js.interval, js.interval, js.lyrics, js.compos, null, null, js.lang, "ORI");
        setTimeout(() => {
            hidestartbox();
        }, js.lyricsd[0].startwait/4);
        for (const item of js.lyricsd) {
            await wait(item.startwait - ((60000 / js.bpm) * 5));

            if (item.lines.length >= 2) {
                renderlyric(false, item.lines[0], true, js.lang);
                renderlyric(false, item.lines[1], false, js.lang);
            } else if (item.lines.length == 1) {
                renderlyric(false, item.lines[0], true, js.lang);
            }

            let isup = true;
            await wait(60000 / js.bpm);
            timer(js.bpm, isup);
            await wait((60000 / js.bpm) * 4);

            for (let i = 0; i < item.lines.length; i++) {
                const line = item.lines[i];
                const isLastLine = (i === item.lines.length - 1);
                const isNextLastLine = (i + 1 === item.lines.length - 1);

                draglyric(line, isup, js.lang);

                for (let j = 0; j < line.lyrics.length; j++) {
                    await wait(line.timing[j]);
                    await wait(line.wait[j]);
                }

                if (isLastLine) {
                    hidelyric(true);
                    hidelyric(false);
                } else if (!isNextLastLine) {
                    hidelyric(isup);
                }
                
                const next = item.lines[i + 2];
                if (next) renderlyric(false, next, isup, js.lang);

                isup = !isup;
            }
        }
    } catch (err) {
        alert('곡 재생 중 오류 발생:\n', err);
    }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}