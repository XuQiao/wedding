// 背景音乐控制
function toggleMusic() {
    const music = document.getElementById("bg-music");
    const musicControl = document.querySelector(".music-control");
    
    if (music.paused) {
        music.play();
        musicControl.innerHTML = "🔊";
    } else {
        music.pause();
        musicControl.innerHTML = "🎵";
    }
}

// 自动降低音乐音量
document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("bg-music");
    if (music) {
        music.volume = 0.3; // 设置为30%音量
    }
    
    // 倒计时功能（首页使用）
    if (document.getElementById("countdown-timer")) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});

function updateCountdown() {
    const weddingDate = new Date("2023-10-01T00:00:00");
    const now = new Date();
    const diff = weddingDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById("countdown-timer").innerHTML = `
        <div><span>天</span>${days}</div>
        <div><span>时</span>${hours}</div>
        <div><span>分</span>${minutes}</div>
        <div><span>秒</span>${seconds}</div>
    `;
}