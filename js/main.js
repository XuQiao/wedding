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