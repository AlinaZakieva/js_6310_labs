'use strict';

// ------------------ весенние стили ------------------

function addSpringStyles() {
    if (document.getElementById('spring-styles')) return;

    const style = document.createElement('style');
    style.id = 'spring-styles';
    style.textContent = `
        /* общий фон и текст */
        body {
            background-color: #f1f7e9 !important;
            color: #2f3b2f !important;
            line-height: 1.5 !important;
            font-family: system-ui, sans-serif !important;
        }

        /* основной контейнер */
        .page_wrapper, #page_wrapper {
            background-color: #f1f7e9 !important;
        }

        /* блоки контента */
        .main_slider_holder,
        .news_box,
        .portlet-content,
        .tab_items,
        .slick-track,
        .events_nav {
            background-color: #fdfdf9 !important;
            border-radius: 16px !important;
            box-shadow: 0 0 30px rgba(191, 207, 166, 0.7) !important;
            padding: 8px 12px !important;
        }

        /* сложный селектор с несколькими классами */
        .institutes_slider_box.institutes_box.cf.disable-user-actions {
            background-color: #ffffff !important;
            border-radius: 24px !important;
            box-shadow: 0 0 45px rgba(201, 220, 172, 0.9) !important;
            padding: 20px !important;
            border: 1px solid #e1efcf !important;
        }

        /* шапка */
        header, .header, #header {
            background-color: #ffffff !important;
            border-bottom: 2px solid #ffc1e3 !important;
            box-shadow: 0 4px 20px rgba(255, 128, 171, 0.3) !important;
            margin-bottom: 24px !important;
        }

        /* меню навигации */
        nav, .navigation, .menu {
            background-color: rgba(241, 247, 233, 0.9) !important;
            border-radius: 999px !important;
            border: 1px solid #ffd1ec !important;
            padding: 6px 14px !important;
        }

        /* ссылки */
        a, a:visited {
            color: #ff80ab !important;
            font-weight: 600 !important;
            text-decoration-color: #ffb3c6 !important;
        }

        /* ссылки при наведении */
        a:hover {
            color: #ffffff !important;
            background-color: #ff80ab !important;
            border-radius: 20px !important;
            box-shadow: 0 0 10px rgba(255, 128, 171, 0.7) !important;
            text-decoration: none !important;
        }

        /* заголовки */
        h1, h2, h3, h4 {
            color: #e91e63 !important;
            text-shadow: 0 0 14px rgba(255, 128, 171, 0.8) !important;
            font-weight: 800 !important;
        }

        /* кнопки и стрелки */
        button,
        .button,
        input[type="submit"],
        .slick-prev,
        .slick-next,
        .kai-btn-block {
            background: linear-gradient(135deg, #ff80ab, #ffc1e3) !important;
            border-radius: 999px !important;
            border: 1px solid #ff80ab !important;
            color: #ffffff !important;
            padding: 6px 14px !important;
            box-shadow: 0 4px 12px rgba(255, 128, 171, 0.6) !important;
        }

        /* эффект при наведении на кнопки */
        button:hover,
        .button:hover,
        .kai-btn-block:hover {
            box-shadow: 0 0 20px rgba(255, 128, 171, 0.9) !important;
            transform: translateY(-1px) !important;
        }

        /* блоки входа и недели */
        .login_links,
        .week_parity {
            background-color: #ffffff !important;
            border-radius: 18px !important;
            box-shadow: 0 0 18px rgba(201, 213, 183, 0.8) !important;
            border: 1px solid #e1efcf !important;
            padding: 6px 10px !important;
            color: #e91e63 !important;
        }

        /* активные элементы */
        .active {
            background-color: #ff80ab !important;
            color: #ffffff !important;
            border-radius: 999px !important;
            text-shadow: 0 0 10px rgba(255, 128, 171, 0.8) !important;
        }

        /* футер */
        footer, .footer {
            background-color: #ffe6f0 !important;
            color: #2f3b2f !important;
            box-shadow: 0 -4px 18px rgba(186, 198, 164, 0.8) !important;
            margin-top: 30px !important;
        }

        footer a,
        .footer a {
            color: #ff80ab !important;
            text-shadow: 0 0 10px rgba(255, 179, 198, 0.8) !important;
            text-decoration: none !important;
        }

        footer a:hover,
        .footer a:hover {
            background-color: #ff80ab !important;
            color: #ffffff !important;
            border-radius: 14px !important;
        }
    `;
    document.head.appendChild(style);
}

function removeSpringStyles() {
    const style = document.getElementById('spring-styles');
    if (style) style.remove();
}

// ------------------ кнопка переключения ------------------

function createToggleButton() {
    if (document.getElementById('spring-toggle')) return;

    const button = document.createElement('button');
    button.id = 'spring-toggle';
    button.innerHTML = 'on';

    /* фиксированное положение */
    Object.assign(button.style, {
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: '10000',
        background: '#f1f7e9',
        color: '#ff80ab',
        border: '2px solid #ff80ab',
        borderRadius: '999px',
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        textShadow: '0 0 6px rgba(255,128,171,0.7)',
        transition: 'all 0.2s ease'
    });

    /* анимация кнопки */
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });

    /* логика нажатия */
    button.onclick = function () {
        const enabled = localStorage.getItem('springStyle') === 'true';

        if (enabled) {
            removeSpringStyles();
            localStorage.setItem('springStyle', 'false');
            button.innerHTML = 'on';
            button.style.background = '#f1f7e9';
            button.style.color = '#ff80ab';
        } else {
            addSpringStyles();
            localStorage.setItem('springStyle', 'true');
            button.innerHTML = 'off';
            button.style.background = '#ff80ab';
            button.style.color = '#ffffff';
        }
    };

    document.body.appendChild(button);
}

// ------------------ демонстрация dom методов ------------------

function demonstrateDomUsage() {
    console.log("dom test");

    /* getelementbyid */
    const page = document.getElementById('page_wrapper');
    if (page) console.log("getelementbyid работает");

    /* сложный селектор */
    const navMenu = document.querySelector('nav .menu');
    if (navMenu) {
        console.log("queryselector со сложным селектором работает");

        /* родительский элемент */
        const parent = navMenu.parentElement;
        if (parent) parent.style.paddingTop = '4px';

        /* дочерние элементы */
        const children = navMenu.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].style) children[i].style.padding = '0 10px';
        }
    }

    /* все ссылки */
    const links = document.querySelectorAll('a');
    links.forEach(a => {
        a.style.transition = 'all 0.2s ease';
    });
}

// ------------------ запуск расширения ------------------

function initSpringExtension() {
    createToggleButton();
    demonstrateDomUsage();

    const isEnabled = localStorage.getItem('springStyle') === 'true';

    if (isEnabled) {
        addSpringStyles();
        const btn = document.getElementById('spring-toggle');
        if (btn) {
            btn.innerHTML = 'off';
            btn.style.background = '#ff80ab';
            btn.style.color = '#ffffff';
        }
    }
}

/* ожидание загрузки */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpringExtension);
} else {
    initSpringExtension();
}