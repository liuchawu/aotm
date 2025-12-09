// 导航栏核心交互
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-bar a');
    const sections = document.querySelectorAll('section[id]'); // 页面锚点区块

    // 1. 点击导航 - 切换激活态 + 平滑滚动到对应区块
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 禁用重复点击（已激活则不处理）
            if (this.classList.contains('active')) return;

            // 移除所有激活态
            navLinks.forEach(item => item.classList.remove('active'));
            // 给当前点击的链接添加激活态
            this.classList.add('active');

            // 平滑滚动到对应区块（如果有锚点）
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // 平滑滚动
                    block: 'start'
                });
            }
        });
    });

    // 2. 滚动页面 - 自动高亮对应导航
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // 偏移量（适配吸顶导航）
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // 更新导航激活态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. 刷新页面 - 保持当前区块的导航激活态
    const currentScroll = window.pageYOffset;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        const sectionHeight = section.offsetHeight;
        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ========== 原有头像放大效果保留 ==========
    const avatar = document.querySelector('.avatar-box img');
    if (avatar) {
        avatar.addEventListener('click', function() {
            // 创建遮罩层
            const mask = document.createElement('div');
            mask.style.position = 'fixed';
            mask.style.top = 0;
            mask.style.left = 0;
            mask.style.width = '100%';
            mask.style.height = '100%';
            mask.style.backgroundColor = 'rgba(0,0,0,0.8)';
            mask.style.zIndex = 999;
            mask.style.display = 'flex';
            mask.style.alignItems = 'center';
            mask.style.justifyContent = 'center';
            mask.style.cursor = 'zoom-out';

            // 创建放大后的图片
            const bigImg = document.createElement('img');
            bigImg.src = this.src;
            bigImg.style.maxWidth = '80%';
            bigImg.style.maxHeight = '80%';
            bigImg.style.border = '5px solid #fff';
            bigImg.style.borderRadius = '4px';
            bigImg.style.transition = 'transform 0.3s ease';

            // 图片hover轻微放大
            bigImg.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.02)';
            });
            bigImg.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
            });

            // 添加到遮罩层
            mask.appendChild(bigImg);
            document.body.appendChild(mask);

            // 点击遮罩层关闭
            mask.addEventListener('click', function() {
                mask.style.opacity = '0';
                mask.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(mask);
                }, 300);
            });

            // 按ESC键关闭
            window.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    mask.click();
                }
            }, { once: true });
        });
    }
});