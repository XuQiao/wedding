// 当前页面高亮
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        const link = item.getAttribute('href');
        if (link === currentPage) {
            item.classList.add('active');
        }
    });
});

const { GH_TOKEN } = window._githubConfig;
const repoOwner = "xuqiao"
const repoName = "wedding"
console.log(GH_TOKEN)

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('messageForm');
    const messagesContainer = document.getElementById('messages');

    async function loadMessages() {
        try {
            const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues?sort=created&direction=desc`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const issues = await response.json();
            //messagesContainer.innerHTML = '';
            
            /*if (issues.length === 0) {
                messagesContainer.innerHTML = '<p style="text-align:center;color:#999;">暂无留言，快来写下你的祝福吧~</p>';
                return;
            }*/
            
            issues.forEach(function(issue) {
                // 从issue标题提取作者名
                const authorMatch = issue.title.match(/来自(.+)的祝福/);
                const author = authorMatch ? authorMatch[1] : '匿名';
                
                // 从issue body提取内容和时间
                const contentMatch = issue.body.match(/^(.+)\n\n提交时间:/s);
                const content = contentMatch ? contentMatch[1].trim() : issue.body;
                const timeMatch = issue.body.match(/提交时间: (.+)$/);
                const time = timeMatch ? timeMatch[1] : new Date(issue.created_at).toLocaleString('zh-CN');
                
                const messageItem = document.createElement('div');
                messageItem.className = 'message';
                messageItem.innerHTML = `
                    <h4>${author}</h4>
                    <p>${content}</p>
                    <small>${time}</small>
                `;
                messagesContainer.appendChild(messageItem);
            });
        } catch (error) {
            console.error('加载留言失败:', error);
            messagesContainer.innerHTML = '<p style="text-align:center;color:#ff0000;">加载留言失败，请刷新重试</p>';
        }
    }

    // 发布留言到GitHub Issues
    async function postMessage(newMessage) {
        const { name, message, timestamp } = newMessage;

        const title = `来自${name}的祝福`;
        const body = `${message}\n\n提交时间: ${new Date(timestamp).toLocaleString('zh-CN')}`;
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${GH_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                labels: ['wedding-message']
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
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
        postMessage(newMessage)
        
        // 刷新显示
        loadMessages();
        
        // 清空表单
        form.reset();
        
        // 显示成功提示
        alert('感谢您的祝福！');
    });
    
    // 初始加载留言
    loadMessages();
});