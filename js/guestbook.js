document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('messageForm');
    const messagesContainer = document.getElementById('messages');
    
    // 模拟从本地存储获取留言
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('weddingMessages')) || [];
        displayMessages(messages);
    }
    
    // 显示留言
    function displayMessages(messages) {
        messagesContainer.innerHTML = '';
        messages.forEach(msg => {
            const messageEl = document.createElement('div');
            messageEl.className = 'message';
            messageEl.innerHTML = `
                <h4>${msg.name}</h4>
                <p>${msg.message}</p>
                <small>${new Date(msg.timestamp).toLocaleDateString()}</small>
            `;
            messagesContainer.prepend(messageEl);
        });
    }
    
    // 提交留言
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !message) return;
        
        const newMessage = {
            name,
            message,
            timestamp: Date.now()
        };
        
        // 获取现有留言并添加新留言
        const messages = JSON.parse(localStorage.getItem('weddingMessages')) || [];
        messages.push(newMessage);
        localStorage.setItem('weddingMessages', JSON.stringify(messages));
        
        // 刷新显示
        displayMessages(messages);
        
        // 清空表单
        form.reset();
        
        // 显示成功提示
        alert('感谢您的祝福！');
    });
    
    // 初始加载留言
    loadMessages();
});