const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress'); 
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method](); 
}

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    console.log(percent);  // To check the progress
    progressBar.style.width = `${percent}%`;
    // Check if the color and width are being applied
    console.log(progressBar.style.background);  // Should log the color being applied
}




function scrub(e) {
    if (mousedown) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }
}

video.addEventListener('click', togglePlay); 
toggle.addEventListener('click', togglePlay); 
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));  
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); 

video.addEventListener('timeUpdate', handleProgress);


// Mouse down event to start scrubbing
let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true); 
progress.addEventListener('mouseup', () => mousedown = false); 

// Scrub the video when mouse is moved
progressBar.addEventListener('click', scrub); 
progress.addEventListener('mousemove', scrub);
