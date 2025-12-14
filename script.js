// 元素获取
const topNavLinks = document.querySelectorAll('.top-nav a');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const sections = document.querySelectorAll('.section');
const cardBtns = document.querySelectorAll('.card-btn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
// 新增：获取模态框图片容器
const modalImage = document.getElementById('modalImage');
const guestForm = document.getElementById('guestForm');
const messageList = document.getElementById('messageList');
const backToTopBtn = document.getElementById('backToTop');

// 卡片详情数据 - 修改为图片版本
const cardDetails = [
  {
    title: '战斗场景',
    imageUrl: '1.jpg',
  },
  {
    title: '战斗场景',
    imageUrl: '2.jpg',
  },
  {
    title: '战斗场景',
    imageUrl: '4.jpg',
  },
  {
    title: '战斗场景',
    imageUrl: '5.jpg',
  },
];

// 导航切换逻辑
function switchSection(sectionId) {
  // 隐藏所有板块
  sections.forEach(section => {
    section.style.display = 'none';
  });
  
  // 显示目标板块
  document.getElementById(sectionId).style.display = 'block';
  
  // 更新导航激活状态
  topNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    }
  });
  
  sidebarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    }
  });
  
  // 平滑滚动到顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 导航点击事件
topNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href').slice(1);
    switchSection(sectionId);
  });
});

sidebarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href').slice(1);
    switchSection(sectionId);
  });
});

// 模态框操作 - 修改为展示图片
cardBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    // 设置标题
    modalTitle.textContent = cardDetails[index].title;
    // 设置图片
    modalImage.src = cardDetails[index].imageUrl;
    modalImage.alt = cardDetails[index].title;
    // 设置图片说明
    modalDesc.textContent = cardDetails[index].desc;
    // 显示模态框
    modal.style.display = 'flex';
    
    // 图片加载失败处理
    modalImage.onerror = function() {
      // 加载失败时显示默认图片
      this.src = 'images/default.jpg';
      this.alt = '默认图片';
    };
  });
});

// 关闭模态框
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// 留言功能
function renderMessages() {
  // 从本地存储获取留言
  const messages = JSON.parse(localStorage.getItem('guestMessages')) || [];
  
  // 清空列表
  messageList.innerHTML = '';
  
  // 渲染留言
  messages.forEach((msg, index) => {
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.innerHTML = `
      <div class="message-name">${msg.name}</div>
      <div class="message-text">${msg.message}</div>
      <div class="message-time">${msg.time}</div>
    `;
    messageList.appendChild(messageItem);
  });
}

// 表单提交事件
guestForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  
  // 验证输入
  if (!name.trim() || !message.trim()) {
    alert('请填写姓名和留言内容！');
    return;
  }
  
  // 获取当前时间
  const now = new Date();
  const time = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  // 构建留言对象
  const newMessage = { name, message, time };
  
  // 从本地存储获取现有留言
  const messages = JSON.parse(localStorage.getItem('guestMessages')) || [];
  
  // 添加新留言
  messages.unshift(newMessage);
  
  // 保存到本地存储
  localStorage.setItem('guestMessages', JSON.stringify(messages));
  
  // 重置表单
  guestForm.reset();
  
  // 重新渲染留言列表
  renderMessages();
  
  // 提示成功
  alert('留言提交成功！');
});

// 返回顶部按钮
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 页面初始化
window.addEventListener('DOMContentLoaded', () => {
  // 默认显示战斗记录板块
  switchSection('plan');
  
  // 渲染留言列表
  renderMessages();
});