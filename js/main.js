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
                const playPromise = bgMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isMusicPlaying = true;
                        musicControl.classList.add('playing');
                    }).catch(error => {
                        console.log('自动播放被阻止:', error);
                        // 显示提示让用户知道需要交互才能播放音乐
                        musicControl.style.display = 'flex';
                    });
                }
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
                bgMusic.play();
                isMusicPlaying = true;
                this.classList.add('playing');
            }
        });
        
        // 页面首次交互时尝试播放音乐
        document.addEventListener('click', function firstInteraction() {
            tryPlayMusic();
            document.removeEventListener('click', firstInteraction);
        }, { once: true });
    }

    // 初始化所有功能
    setupMusicControl();
    
    // 页面滑动功能
    function setupPageSwipe() {
        const container = document.querySelector('.container');
        const pages = document.querySelectorAll('.page');
        const dots = document.querySelectorAll('.dot');
        let currentPage = 0;
        let startY = 0;
        let isScrolling = false;

        // 初始化页面位置
        function initPages() {
            pages.forEach((page, index) => {
                page.style.transform = `translateX(${index * 100}%)`;
            });
        }

        // 更新导航点
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPage);
            });
        }

        // 滚动到指定页面
        function goToPage(index) {
            if (index < 0 || index >= pages.length || isScrolling) return;
            
            isScrolling = true;
            currentPage = index;
            
            pages.forEach(page => {
                page.style.transform = `translateX(${-currentPage * 100}%)`;
            });
            
            updateDots();
            
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        }

        // 触摸事件处理
        container.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        });

        container.addEventListener('touchmove', function(e) {
            if (isScrolling) return;
            
            const y = e.touches[0].clientY;
            const dy = y - startY;
            
            // 垂直滑动检测
            if (Math.abs(dy) > 10) {
                if (dy > 0) {
                    // 向下滑动 - 上一页
                    goToPage(currentPage - 1);
                } else {
                    // 向上滑动 - 下一页
                    goToPage(currentPage + 1);
                }
            }
        }, { passive: true });

        // 导航点点击事件
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                const targetIndex = Array.from(pages).findIndex(page => page.id === target);
                if (targetIndex !== -1) {
                    goToPage(targetIndex);
                }
            });
        });

        // 初始化
        initPages();
        updateDots();
    }

    // 初始化所有功能
    setupMusicControl();
    setupPageSwipe();

    // 禁止双指缩放
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
});
