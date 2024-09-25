window.onload=initilizePlayer();
var count=1;
var foldercount=0;
var cursec,curmin,dursec,durmin;
var vid,curtime,durtime,vidtime,playbtn,form,vform,smin,ssec,lmin,lsec,loop,input_video;
function initilizePlayer(){
    vid=document.getElementById('vid');
    vidtime=document.getElementById('vidtime');
    durtime=document.getElementById('durtime');
    curtime=document.getElementById('curtime');
    smin=document.getElementById('smin');
    ssec=document.getElementById('ssec');
    lmin=document.getElementById('lmin');
    lsec=document.getElementById('lsec');
    loop=document.getElementById('loop');
    form=document.getElementById('form');
    input_video=document.getElementById('input_video');
    input_folder=document.getElementById('input_folder');
    input_folder.onchange=url_using_folder;
    input_video.onchange=inserting_url;
    playbtn=document.getElementById('playbtn');
    playbtn.addEventListener('click',loopingcode);
     //playbtn.addEventListener("click",playpause);//not required
     //vid.addEventListener("timeupdate",seektimeupdate);
     vid.addEventListener("timeupdate",seektimeupdate2);
     vid.addEventListener("ended",next_in_folder);
}
//for changing to next song in folder
function next_in_folder(){
    if(foldercount<input_folder.files.length){
        foldercount++;
        vid.src=URL.createObjectURL(input_folder.files[foldercount]);
        vid.play();
    }
}
function url_using_folder(){
    vid.src=URL.createObjectURL(input_folder.files[0]); 
}
function inserting_url(){
    vid.src=URL.createObjectURL(input_video.files[0]);
}
function loopingcode(){
    if(vid.paused)vid.play();
}
//looping time changing function
function seektimeupdate2(){
    curmin=Math.floor(vid.currentTime/60);
    cursec=Math.floor(vid.currentTime%60);
    durmin=Math.floor(vid.duration/60);
    dursec=Math.floor(vid.duration%60);
    curtime.innerText=curmin+":"+cursec;
    durtime.innerText=durmin+":"+dursec;
        if(curmin===parseInt(lmin.value)){
            if(cursec===parseInt(lsec.value))
            {
            if(count<=parseInt(loop.value))
            {
            let temp=(parseInt(smin.value)*60)+(parseInt(ssec.value));
            vid.currentTime=temp;
            count++;
            }
        }
        }
}
function checkform(){
    vform=document.forms['form'].elements;
    var fieldmustbefilled=true;
    for(let i=0;i<vform.length;i++)
    {
        if(vform[i].value.length===0){fieldmustbefilled=false;
            break;
        }
        else if(vform[i].value<0||vform[i].value>60)
        {
            fieldmustbefilled=false;
            break;
        }
    }
    if(fieldmustbefilled===true)
    {
        let flag=false;
        durmin=Math.floor(vid.duration/60);
        dursec=Math.floor(vid.duration%60);
        if(parseInt(smin.value)<parseInt(lmin.value)){flag=true;console.log("1");}
        else if(parseInt(smin.value)==parseInt(lmin.value)){
        if(parseInt(ssec.value)<parseInt(lsec.value))flag=true;
        }
        console.log(flag);
        if(flag==true && parseInt(lmin.value)<parseInt(durmin))playbtn.disabled=false;
        else if(flag==true && parseInt(lmin.value)==parseInt(durmin)&& parseInt(lsec.value)<=parseInt(dursec))playbtn.disabled=false;
        else playbtn.disabled=true;
    }
    else playbtn.disabled=true; 
}
function playpause(){
    if(vid.paused){
        vid.play();
        playbtn.innerText="pause";
    }
    else {
        vid.pause();
        playbtn.innerText="play";
    }
}
function seektimeupdate(){
    curmin=Math.floor(vid.currentTime/60);
    cursec=Math.floor(vid.currentTime%60);
    if(curmin<10)curmin="0"+curmin;
    if(cursec<10)cursec="0"+cursec;
    durmin=Math.floor(vid.duration/60);
    dursec=Math.floor(vid.duration%60);
    if(dursec<10)dursec="0"+dursec;
    if(durmin<10)durmin="0"+durmin;
    curtime.innerText=curmin+":"+cursec;
    durtime.innerText=durmin+":"+dursec;
    var time=curmin+":"+cursec;
}