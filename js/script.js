document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');
    const infoItems = document.querySelectorAll('.info-item');
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

    // 信息项点击事件
    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            const id = this.id;
            alert(`您点击了${this.querySelector('.title').textContent}`);
            // 这里可以添加具体的功能实现
        });
    });

    // 初始化
    initPages();
    updateDots();

    // 禁止双指缩放
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
});