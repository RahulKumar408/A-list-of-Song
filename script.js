
let songs = [
    {songName: "Hare Ram Tilte Track Bhul Bhulaiya 2", filePath: "songs/1.mp3", coverPaht: "covers/1.jpg"},
    {songName: "Let Me Love You ", filePath: "songs/2.mp3", coverPaht: "covers/2.jpg"},
    {songName: "Sultan KGF Chapter 2", filePath: "songs/3.mp3", coverPaht: "covers/3.jpg"},
    {songName: "De Tali Bhul Bhulaiya 2", filePath: "songs/4.mp3", coverPaht: "covers/4.jpg"},
    {songName: "Doobey Gahraiyan ", filePath: "songs/5.mp3", coverPaht: "covers/5.jpg"},
    {songName: "celio The music", filePath: "songs/6.mp3", coverPaht: "covers/6.jpg"},
    {songName: "best music tone", filePath: "songs/7.mp3", coverPaht: "covers/7.jpg"},
    {songName: "The paeace music", filePath: "songs/8.mp3", coverPaht: "covers/8.jpg"},
    {songName: "Title Track Motivation", filePath: "songs/9.mp3", coverPaht: "covers/9.jpg"},
    {songName: "Harry up song", filePath: "songs/10.mp3", coverPaht: "covers/10.jpg"},
]
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let Songitem = Array.from(document.getElementsByClassName('Songitems'));


//  Time and name of song updating variable
let playSongName = document.getElementById('bottomPlaySongName');
let currminutes = document.getElementById('currminutes');
let currsecndsFirst = document.getElementById('currsecndsFirst');
let currsecndsSecond = document.getElementById('currsecndsSecond');
let totalminutes = document.getElementById('totalminutes');
let totalsecndsFirst = document.getElementById('totalsecndsFirst');
let totalsecndsSecond = document.getElementById('totalsecndsSecond');

// Next and previous button 
let preIcon = document.getElementById('preIcon');
let nextIcon = document.getElementById('nextIcon');


//  Updating all song name and cover page
Songitem.forEach((element, i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverPaht;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;

});

// Handle play and pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
          
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }

    
})
audioElement.addEventListener('timeupdate', ()=>{
    // update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

    // Updation the playing time of song 
    contiMinutes = parseInt(audioElement.currentTime/60);
    contiSeconds = parseInt(audioElement.currentTime%60);
    currminutes.innerText = contiMinutes;
    currsecndsSecond.innerText = parseInt(contiSeconds%10);
    currsecndsFirst.innerText = parseInt(contiSeconds/10);

    // Updation duration of song
    totalMin = parseInt(audioElement.duration/60);
    totalseconds = parseInt(audioElement.duration%60);
    totalminutes.innerText = totalMin;
    totalsecndsSecond.innerText = parseInt(totalseconds%10);
    totalsecndsFirst.innerText = parseInt(totalseconds/10);
    
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100; 
})


const makeAllPlays = (e)=>{
    Array.from(document.getElementsByClassName('smPlayer')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}



Array.from(document.getElementsByClassName('smPlayer')).forEach((element)=>{
    makeAllPlays();
    element.addEventListener('click', (e)=>{
        
        songIndex = parseInt(e.target.id);
        playSongName.innerText = songs[songIndex].songName;
        if(e.target.classList.contains('fa-circle-pause')){
           
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            audioElement.currentTime = 0;
            audioElement.pause();
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
        }
        else{
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    })
})
if(masterPlay.classList.contains('fa-circle-play')){
    Array.from(document.getElementsByClassName('smPlayer')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

preIcon.addEventListener('click', ()=>{
    if(songIndex < 0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    playSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

nextIcon.addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    playSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})