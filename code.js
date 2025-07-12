const version = '2';

let isup = true;
let inpnum = "";
let delnum = 0;
let playnum = 0;
let remotemode = false;
const sangsong = [];
let reservedsong = [];
let nowplaying;
let playingphase;
let playingtime;
let timecoin = 0;
let isusing = false;
let autoplay = true;
let songdir = null;
let ininterlude = false;
let localmode = true;
let prioritysong = null;

let noscore = false;
let nochorus = false;
let firstphase = false;

let isplaying = false;
let isinscore = false;
let isinevacuationenable = false;
let isinexit = false;
let settingstat = 0;
let loadingstat = 0;

let ifmv = false;
let ifmr = false;
let iflive = false;

let hasmv = false;
let hasmusic = false;
let hasmelody = false;
let haschorus = false;
let haslive = false;

let starttime;
let drift;
let ontime;

let forcestarttime = 0;

const cachedAssets = {};
const cachedSongs = {};

//설정
let setpw = '1111';
let netpw = '0000';
let iscoin = true;
let freeplay = false;
let remcointime = 5;
let remcoinamount = 1;
let coinwaitmessage = true;
let coinwaittime = 120;
let renderpron = false;
let evacuationenable = true;
let backgroundupdage = false;
let minscore = 0;
let random100 = 10;
let bonusscore = null;

const startediscoin = iscoin;

function getCachedURL(path) {
    return cachedAssets[path] || path;
}

let abortControllers = [];

async function preload(upd=false, songs=false) {
    if (!songs){
        for (let key in cachedAssets) {
            if (cachedAssets.hasOwnProperty(key)) {
                delete cachedAssets[key];
            }
        }
    } else {
        for (let key in cachedSongs) {
            if (cachedSongs.hasOwnProperty(key)) {
                delete cachedSongs[key];
            }
        }
    }

    let loadedCount = 0;
    let totalAssets = 0;

    const updateProgress = (filename) => {
        loadedCount++;
        if (upd) loading(2, filename, loadedCount, totalAssets, songs?2:1);
    };

    const getFileName = (path) => path.split('/').pop();

    if (!songs) {
        if (upd) loading(2, '파일을 확인하는 중입니다...', 0, 1);
        
        const allPaths = [
            ...imagePaths.map(p => ({ type: 'image', path: p })),
            ...audioPaths.map(p => ({ type: 'audio', path: p })),
            ...videoPaths.map(p => ({ type: 'video', path: p })),
        ];
        totalAssets = allPaths.length

        abortControllers.forEach(controller => controller.abort());
        abortControllers = [];

        const loadAsset = async (asset) => {
            const filename = getFileName(asset.path);
            const controller = new AbortController();
            abortControllers.push(controller);
            try {
                const response = await fetch(asset.path, { signal: controller.signal });
                const blob = await response.blob();
                const blobURL = URL.createObjectURL(blob);
                cachedAssets[asset.path] = blobURL;
                updateProgress(filename);
            } catch (e) {
                if (e.name === 'AbortError') {
                    console.log(`Loading aborted: ${filename}`);
                } else {
                    console.error(`Failed to load ${asset.path}:`, e);
                    updateProgress(filename);
                }
            }
        };

        await wait(1000);
        await Promise.all(allPaths.map(loadAsset));
    } else {
        if (upd) loading(2, '곡을 확인하는 중입니다...', 0, 1);
        for await (const [, handle] of songdir.entries()) {
            if (handle.kind === 'directory') {
                totalAssets++;
            }
        }
        await wait(100);
        for await (const [dirname, dirHandle] of songdir.entries()) {
            if (dirHandle.kind !== 'directory') continue;

            try {
                const fileHandle = await dirHandle.getFileHandle('song.json');
                const file = await fileHandle.getFile();
                const text = await file.text();
                const json = JSON.parse(text);

                cachedSongs[dirname] = json;
                updateProgress(`곡 번호　:　${dirname}.......[${loadedCount+1}/${totalAssets}]`);
            } catch (e) {
                console.warn(`'${dirname}' 곡을 불러오지 못했습니다.`, e);
                cachedSongs[dirname] = null;
            }
        }
    }
    
    if (upd&&songs||upd&&!localmode||upd&&abortControllers.length==0) {
        await wait(500);
        loading(0);
        await wait(3000);
        loading(3);
    } else if (upd&&!songs&&abortControllers.length>0) {
        await wait(100);
        preload(true, true);
    }
}

async function songstart(number, num=playnum, phase=0, time=0, skipinter1=false){
    //곡 정보 파싱 후 startsong에 전달
    //startwait의 절반만큼 기다린 후 hidestartbox() 실행
    //그와 동시에 가사 렌더링
    //1절의 startwait에서 ((1000/bpm)*4)를 뺀 만큼 기다린 후 timer(bpm) 실행
    let skipinter = skipinter1;
    if(!freeplay&&timecoin==0&&phase==0&&!isplaying){
        info(0, "시간/코인을 입력하세요.");
        return;
    }
    try{
        const js = await getsongdata(number);
        if(js==1){info(0, `카운터에 문의하세요(CODE:01)`); return;}
        const banner = await getbannerdata(number);
        if(phase==0&&time==0&&!isplaying&&!skipinter){
            ininterlude = true;
            ontime = Date.now();
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
                    if(!isplaying||nowplaying!=number){return;}
                    timecoin-=remcoinamount;
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
            else hidestartbox(false, true, true);
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
                        //sum+=1.2;
                    }
                }
            }
            console.log(sum);
            if(skipinter){sum+=js.lyricsd[phase].startwait - ((60000 / js.bpm) * 6);}
            await loadsongandvideo(number, sum);
        }

        for (let k=phase;k<js.lyricsd.length;k++) {
            if(k==1&&firstphase){
                songend();
                isplaying = false;
            }
            console.log(Date.now()-ontime);
            playingphase = k;
            ininterlude = true;
            const item = js.lyricsd[k];
            if(!isplaying||num!=playnum){return;}
            starttime = Date.now();
            if (!skipinter) {
                const expected = item.startwait - ((60000 / js.bpm) * 5);
                await wait(expected);
                drift = Date.now() - starttime - expected;
            } else {
                ininterlude = false;
                const expected = 60000 / js.bpm;
                await wait(expected);
                drift = Date.now() - starttime - expected;
                skipinter = false;
            }
            if(!isplaying||num!=playnum){return;}
            hidesideimage();
            ininterlude = false;
            if (item.lines.length >= 2) {
                renderlyric(renderpron, item.lines[0], true, js.lang);
                setTimeout(()=>{
                    if(!isplaying||num!=playnum){return;}
                    renderlyric(renderpron, item.lines[1], false, js.lang);
                }, 30);
            } else if (item.lines.length == 1) {
                renderlyric(renderpron, item.lines[0], true, js.lang);
            }

            let isup = true;
            starttime = Date.now();
            await wait(Math.max(0, (60000 / js.bpm) - drift));
            timer(js.bpm, isup);

            await wait((60000 / js.bpm) * 4);

            drift = Date.now() - starttime - ((60000 / js.bpm) * 5);

            if(!isplaying||num!=playnum){return;}
            for (let i = 0; i < item.lines.length; i++) {
                if(!isplaying||num!=playnum){return;}
                const line = item.lines[i];
                const isLastLine = (i === item.lines.length - 1);
                const isNextLastLine = (i + 1 === item.lines.length - 1);

                draglyric(line, isup, js.lang);
                starttime = Date.now();
                let sum = 0;
                for (let j = 0; j < line.lyrics.length; j++) {
                    sum += line.timing[j] + line.wait[j];
                }
                if(sum!=0){
                    await wait(Math.max(0, sum - drift));

                    drift = Date.now() - starttime - sum;
                    if (drift < 0) drift = 0;
                }
                playingtime = sum;

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
    if(fileload){
        try {
            const status = {
                hasmv: false,
                hasmusic: false,
                hasmelody: false,
                haschorus: false,
                haslive: false,
            };

            const elements = [
                { id: 'bga', name: 'mv.mp4', type: 'video', key: 'hasmv' },
                { id: 'music', name: 'song.mp3', type: 'audio', key: 'hasmusic' },
                { id: 'melody', name: 'melody.mp3', type: 'audio', key: 'hasmelody' },
                { id: 'chorus', name: 'chorus.mp3', type: 'audio', key: 'haschorus' },
            ];

            for (const { id, name, type, key } of elements) {
                let fileUrl = null;

                if (localmode) {
                    try {
                        const folderHandle = await songdir.getDirectoryHandle(number);
                        const fileHandle = await folderHandle.getFileHandle(name);
                        const file = await fileHandle.getFile();
                        fileUrl = URL.createObjectURL(file);
                    } catch {
                        continue;
                    }
                } else {
                    const exists = await fileExists(`./songs/${number}/${name}`);
                    if (exists) {
                        fileUrl = `./songs/${number}/${name}`;
                    } else {
                        continue;
                    }
                }

                const element = document.getElementById(id);
                element.src = fileUrl;
                element.load();
                if (id === 'bga') element.volume = 0;
                status[key] = true;
            }

            hasmv = status.hasmv;
            hasmusic = status.hasmusic;
            hasmelody = status.hasmelody;
            haschorus = status.haschorus;
            haslive = status.haslive;

        } catch (err) {
            if (err.name !== "NotFoundError") info(0, `카운터에 문의하세요(${err.name})`);
            console.log(err);
            return;
        }
    } else {
        const js = await getsongdata(number);
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

async function songreserve(number, priority=false){
    if(!freeplay&&timecoin==0){
        info(0, "시간/코인을 입력하세요.");
        return;
    }
    if(prioritysong!=null){priority = false;}
    if (!reservedsong.includes(number) || priority) {
        if(priority) info(0, `${number} 우선예약되었습니다.`);
        else info(0, `${number} 예약되었습니다.`);
    }
    else info(0, `${number} 곡이 중복 예약되었습니다.`);
    try{
        const js = await getsongdata(number);
        if(priority) {reservedsong.unshift(number); prioritysong = number;}
        else reservedsong.push(number);
        if(reservedsong.length==1 || priority) setnextreservesong(number, js.title, js.description||null, js.group||js.sing);
    } catch (err) {
        info(0, `카운터에 문의하세요(${err.name})`)
    }
}

async function getsongdata(number){
    if (!songdir&&localmode) {
        if (loadingstat != 2) info(0, "곡 폴더를 선택해주세요.")
        songdir = await window.showDirectoryPicker();
        if (loadingstat == 2) preload(true);
        else preload(false, true);
        return 1;
    }
    try{
        if(localmode){
            if(cachedSongs[number]) return cachedSongs[number];
            else {
                const folderHandle = await songdir.getDirectoryHandle(number);
                const fileHandle = await folderHandle.getFileHandle('song.json');

                if (fileHandle) {
                    const file = await fileHandle.getFile();
                    const content = await file.text();
                    const js = JSON.parse(content);
                    return js;
                } else return 1;
            };
        } else {
            const res = await fetch(`./songs/${number}/song.json`);
            const data = await res.text();
            const js = JSON.parse(data);
            return js;
        }
    } catch (err) {
        return 1;
    }
}

async function getbannerdata(number){
    try{
        if (localmode){
            const folderHandle = await songdir.getDirectoryHandle(number);
            const bannerHandle = await folderHandle.getFileHandle('banner.png');
            if(bannerHandle){
                return URL.createObjectURL(await bannerHandle.getFile());
            }
        } else {
            const exists = await fileExists(`./songs/${number}/banner.png`);
            if (exists) {
                return `./songs/${number}/banner.png`;
            }
        }
    } catch (err) {
        return null;
    }
}

async function songend(){
    const bga = document.getElementById('bga');
    const music = document.getElementById('music');
    const melody = document.getElementById('melody');
    const chorus = document.getElementById('chorus');
    fadeOutAndPause(music);
    fadeOutAndPause(melody);
    fadeOutAndPause(chorus);
    isplaying = false;
    ininterlude = false;
    nochorus = false;
    ifmv = false;
    ifmr = false;
    iflive = false;
    await wait(300);
    endsong();
    if (!noscore){
        let sc;
        if(Math.floor(Math.random() * random100) == 0) sc=100;
        else sc=Math.floor(Math.random() * (100 - minscore + 1)) + minscore;
        if(score!=0) sangsong.push({song: nowplaying, score: sc});
        score(nowplaying, sc);
        await wait(100);
        if (!isinscore) endscore();
    } else {
        isinscore = true;
        await wait(500);
        isinscore = false;
        endscore();
    }
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
        if (prioritysong!=null) { prioritysong=null; }
    }
    loadsideimage(true);
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
        if(!isplaying) systemsound(0, n);
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
    if (!isplaying&&timecoin==0&&!isinscore&&chkend&&isusing) {
        noscore = false;
        nochorus = false;
        firstphase = false;
        nowplaying = null;
        hidesideimage();
        endkar(sangsong);
        isusing = false;
        reservedsong = [];
    }
}

function addtimecoin(type, amount) {
    let first = false;
    if(timecoin==0&&!isusing){first = true;}
    isusing = true;
    info(0, `${amount}${type=="coin"?"개":"분"} ${timecoin==0?"입력":"추가"}하였습니다.`);
    timecoin+=amount;
    iscoin=type=="coin"?true:false;
    setlimit();
    setTimeout(()=>{if(first){startkar(evacuationenable);}},500);
}

function addservice(amount){
    isusing = true;
    loadimage("services", 9);
    info(0, `${amount}${iscoin?"개":"분"} 서비스하였습니다.`, 10);
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
    if (loadingstat > 0 && !(event.key === 'Enter' || event.key === 'Escape')) return;
    else if ((isinscore || isinexit || isinevacuationenable) && !(event.key === 'r' || event.key === 'R') && !(event.key === 'Escape') && !remotemode) return;
    hideforcestart();
    forcestarttime = 0;
	if (event.key === 'Enter') {
        if (loadingstat == 2 && localmode) {
            getsongdata(0);
            return;
        } else if (loadingstat == 2 && !localmode) {
            preload(true);
        } else if (loadingstat > 0 || isinscore || isinexit || isinevacuationenable) return;

        if (!isplaying && !remotemode) {
            try{
                if(inpnum==''&&reservedsong.length>0){
                    songstart(reservedsong[0], ++playnum);
                    reservedsong.shift();
                    if (prioritysong!=null) { prioritysong=null; }
                    if (reservedsong.length>0){
                        const js = await getsongdata(reservedsong[0]);
                        await setnextreservesong(reservedsong[0], js.title, js.description, js.group||js.sing);
                    }
                } else if (inpnum==''&&nowplaying) {
                    songstart(nowplaying, ++playnum);
                } else {
                    if (typeof await getsongdata(inpnum)=="object"){
                        songstart(inpnum, ++playnum);
                        inpnum = '';
                    }
                }
            } catch {}
        }
    } else if (event.key === 'u' || event.key === 'U') {
        if (!remotemode){
            try{
                if(inpnum == ''){
                    if(reservedsong.length>0){
                        const last = reservedsong.pop();
                        info(0, `${last} 예약취소되었습니다.`);
                        if(last==prioritysong && reservedsong.length==0) prioritysong = null;
                        if(reservedsong.length>0){
                            const js = await getsongdata(reservedsong[reservedsong.length - 1]);
                            await setnextreservesong(reservedsong[reservedsong.length - 1], js.title, js.description, js.group||js.sing);
                        }
                    }
                } else {
                    if(reservedsong.includes(inpnum||-1)){
                        info(0, `${inpnum} 예약취소되었습니다.`);
                        const index = reservedsong.lastIndexOf(inpnum);
                        if(inpnum==prioritysong && index==0) prioritysong = null;
                        if (index !== -1) {
                            reservedsong.splice(index, 1);
                        }
                        if(reservedsong.length>0){
                            const js = await getsongdata(reservedsong[0]);
                            await setnextreservesong(reservedsong[0], js.title, js.description, js.group||js.sing);
                        }
                    } else {
                        info(0, `해당 곡이 예약되지 않았습니다.`);
                    }
                }
                inpnum = '';
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
    } else if (event.key === 'p' || event.key === 'P') {
        if (!remotemode) {
            try{
                if(typeof await getsongdata(inpnum)=="object"){
                    songreserve(inpnum, true);
                    inpnum = '';
                }
            } catch {}
        }
    } else if (event.key === 'l' || event.key === 'L') {
        if(remotemode) {
            localmode=!localmode;
            remotemode=false;
            setlimit();
            inpnum = '';
        }
    } else if (event.key === 'Escape') {
        if (loadingstat == 2 && localmode) {
            localmode = false;
            loading(1, '<span class="modaltexthighlight">취소</span> 버튼을 누르셨습니다.<br>이에 따라 일부 기능이 제한된 상태로<br> 서버에서 곡을 불러옵니다.<br>계속하려면 확인 버튼을 누르십시오.');
            return;
        } else if (loadingstat==3) {
            abortControllers.forEach(controller => controller.abort());
            abortControllers = [];
        }
        if (isinevacuationenable || loadingstat==4) return;
        if (isinexit) hideexitscr();
        else if (isinscore) hidesocre();
        document.getElementById('system').pause();
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
        } else if (!remotemode) {
            if (firstphase){
                info(0, '1절 연주를 해제합니다.');
                firstphase = false;
                loadimage('firstphaseoff');
            } else {
                info(0, '1절만 연주합니다.');
                firstphase = true;
                loadimage('firstphaseon');
            }
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
        } else if (!remotemode) {
            if (isplaying){
                const chorus = document.getElementById('chorus');
                const music = document.getElementById('music');
                if (nochorus){
                    chorus.volume = 1;
                    info(0, '육성/코러스가 동작됩니다.');
                    nochorus = false;
                    loadimage('choruson');
                } else {
                    chorus.volume = 0.1;
                    info(0, '육성/코러스 동작을 중지합니다.');
                    nochorus = true;
                    loadimage('chorusoff');
                }
            } else {
                info(0, '연주 중에만 동작됩니다');
            }
        }
    } else if (event.key === 's' || event.key === 'S') {
        if(!freeplay&&remotemode&&!freeplay) {
            const toupcoin = inpnum==''?(iscoin?1:5):Number(inpnum);
            addservice(toupcoin);
            remotemode=false;
            inpnum = '';
        } else if (!remotemode) {
            if (noscore){
                info(0, '점수를 표시합니다.');
                noscore = false;
                loadimage('scoreon');
            } else {
                info(0, '점수를 표시하지 않습니다.');
                noscore = true;
                loadimage('scoreoff');
            }
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
        if(isplaying&&(freeplay||timecoin!=0&&!iscoin)) {
            songstart(nowplaying, ++playnum, playingphase-1>=0?playingphase-1:0, 0);
            info(0, "절을 점프합니다."); //마디점프 개발 끝나면 삭제
        }
    } else if (event.key === 'ArrowDown') {
        if(isplaying&&(freeplay||!iscoin)) {
            songstart(nowplaying, ++playnum, playingphase+1, 0);
            info(0, "절을 점프합니다.");
            loadimage('phasejump');
        }
    } else if (event.key === 'j' || event.key === 'J') {
        if(isplaying&&ininterlude) {
            songstart(nowplaying, ++playnum, playingphase, 0, true);
            info(0, "간주를 점프합니다.");
            loadimage('interludejump');
        }
	} else if (Number(event.key) >= 0 && Number(event.key) < 10){
		input(Number(event.key));
	}
});

async function fileExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (e) {
        return false;
    }
}

function fadeOutAndPause(audio, duration = 300, step = 0.05) {
  if (!audio || audio.paused) return;

  const interval = duration * step;
  const originalVolume = audio.volume;

  const fade = setInterval(() => {
    if (audio.volume > step) {
      audio.volume -= step;
    } else {
      audio.volume = 0;
      audio.pause();
      clearInterval(fade);
      audio.volume = originalVolume;
      audio.removeAttribute("src");
    }
  }, interval);
}

setInterval(() => {
    if(timecoin>0&&!freeplay&&!iscoin){
        timecoin--;
        setlimit();
        if(timecoin==5){info(0, "5분 남았습니다.");}
    }
}, 60000);

setlimit(false);

skiploading=false;
loading(0);

addEventListener("DOMContentLoaded", async (event) => {
    await wait(1000);
    loading(1, '<span class="modaltexthighlight">곡 폴더</span>가 선택되지 않았습니다.</br>곡 재생 등 기능 사용을 위해서는<br>곡이 있는 폴더를 선택해야 합니다.<br>확인 버튼을 눌러 곡을 선택해주세요.');
});

setInterval(async () => {
    if(iscoin&&timecoin>0&&!freeplay&&!isplaying&&!isinevacuationenable&&!isinscore&&!isinexit&&coinwaitmessage){
        forcestarttime++;
        if (forcestarttime==Math.floor(coinwaittime/2)){
            hideforcestart();
            systemsound(1, 'forcestart');
            forcestart('강제시작 안내', '잠시후 곡이 랜덤으로 연주됩니다', 'rgb(255, 107, 103)');
        } else if (forcestarttime==coinwaittime){
            hideforcestart();
            setlimit();
            forcestarttime = 0;
            if(reservedsong.length>0){
                songstart(reservedsong[0], ++playnum);
                reservedsong.shift();
            } else if (nowplaying) {
                songstart(nowplaying);
            } else {
                const keys = Object.keys(cachedSongs);
                const randomKey = keys[Math.floor(Math.random() * keys.length)];
                songstart(randomKey, ++playnum);
            }
        }
    }
}, 1000);