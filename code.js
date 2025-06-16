//음악 파일 분석
//mv.mp4 (존재할 경우 mv 재생)
//mr.mp3 (존재할 경우 mr곡 판정)
//live.mp3 (존재할 경우 라이브 곡 / midi와 mr 모두 공존 가능)
//song.midi (전곡, song.mp3가 존재할 경우 멜로디, mr곡과 공존 불가)
//chorus.mp3 (곡 코러스)
//song.midi (song.mp3) / mr.mp3 필수

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
        setTimeout(() => {hidestartbox();}, js.lyricsd[0].startwait/2);
        setTimeout(() => {timer(js.bpm);}, js.lyricsd[0].startwait-((1000/js.bpm)*4));
    } catch (err) {
        alert('곡 불러오기 실패:\n', err);
    }
}