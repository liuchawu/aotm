// 元素获取
const topNavLinks = document.querySelectorAll('.top-nav a');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const sections = document.querySelectorAll('.section');
const cardBtns = document.querySelectorAll('.card-btn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const guestForm = document.getElementById('guestForm');
const messageList = document.getElementById('messageList');
const backToTopBtn = document.getElementById('backToTop');

// 卡片详情数据
const cardDetails = [
  {
    title: '奖励自己',
    desc: '完成一个小目标后，不妨给自己适当的奖励。奖励不需要多么贵重，可以是一顿喜欢的美食、一场电影、一次短途旅行，或者只是安静的独处时光。适当的奖励能让你感受到努力的价值，提升幸福感，也能为下一个目标积蓄动力。'
  },
  {
    title: '规律作息',
    desc: '规律作息能让生活更有活力，保持充足的活力。建议每天固定时间起床和睡觉，保证7-8小时的睡眠。规律的作息不仅能改善精神状态，还能提高工作和学习效率，增强身体免疫力，让你有更充沛的精力面对每一天的挑战。'
  },
  {
    title: '保持专注',
    desc: '尽量一次只专注一件事，一段时间内只做好一件事。在信息爆炸的时代，分心是效率的最大敌人。可以尝试番茄工作法，工作25分钟休息5分钟，减少外界干扰，专注于当前的任务，这样能显著提升完成质量和效率。'
  },
  {
    title: '拆解任务',
    desc: '将大任务分解成若干小目标的小任务，会更有节奏。大任务往往让人望而生畏，容易产生拖延心理。把大目标拆解成可执行的小步骤，每完成一步就标记进度，这样既能清晰看到自己的成果，也能逐步建立完成任务的信心。'
  },
  {
    title: '克服拖延',
    desc: '根据制定好的事情的计划，按更清晰的节奏完成。拖延的本质是对困难的逃避，克服拖延可以从5分钟法则开始：告诉自己只做5分钟，往往开始后就会自然地继续下去。同时，为每个任务设定明确的截止时间，增加执行的紧迫感。'
  },
  {
    title: '先易后难',
    desc: '不要想着一步到位，从小事做起，循序渐进。面对复杂的任务清单，先从最简单、最容易完成的事情开始，快速积累成就感。这种正向反馈会让你更有动力去面对更难的任务，避免因开局受挫而放弃。'
  }
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

// 模态框操作
cardBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = cardDetails[index].title;
    modalDesc.textContent = cardDetails[index].desc;
    modal.style.display = 'flex';
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