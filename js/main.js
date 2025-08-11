// 倒计时功能
function updateCountdown() {
    const weddingDate = new Date("2025-10-19T00:00:00");
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

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // 其他页面交互可以在这里添加
});

document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.getElementById('musicControl');
    let isMusicPlaying = false;

    // 音乐控制功能
    function setupMusicControl() {
        // 尝试自动播放音乐
        function tryPlayMusic() {
            if (!isMusicPlaying) {
                bgMusic.volume = 0.3;
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicControl.classList.add('playing');
                }).catch(error => {
                    console.log('自动播放被阻止:', error);
                    // 显示提示让用户知道需要点击播放
                    musicControl.style.display = 'flex';
                });
            }
        }
        
        // 点击音乐控制按钮
        musicControl.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isMusicPlaying) {
                bgMusic.pause();
                isMusicPlaying = false;
                this.classList.remove('playing');
            } else {
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    this.classList.add('playing');
                }).catch(error => {
                    alert('请点击页面任意处后，再点击音乐图标播放');
                });
            }
        });
        
        // 页面首次交互时尝试播放音乐
        document.addEventListener('click', function firstInteraction() {
            tryPlayMusic();
            document.removeEventListener('click', firstInteraction);
        }, { once: true });
    }

    // 初始化音乐控制
    setupMusicControl();
});

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
    
    /*
    document.getElementById("countdown-timer").innerHTML = `
        <div><span>天</span>${days}</div>
        <div><span>时</span>${hours}</div>
        <div><span>分</span>${minutes}</div>
        <div><span>秒</span>${seconds}</div>
    `;
    */
}