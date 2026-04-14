// Безопасная ссылка на ваш Webhook в Make.com
const WEBHOOK_URL = 'https://hook.us2.make.com/zcc4djp7m0yiry2iy67lb7x4liu7tb4g';

async function sendToTelegram(text) {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // Отправляем данные в формате JSON, который легко прочитает Make.com
            body: JSON.stringify({ message: text })
        });
        return response.ok;
    } catch (error) {
        console.error('Ошибка отправки:', error);
        return false;
    }
}

// Универсальная функция отправки в Telegram
async function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });
        return response.ok;
    } catch (error) {
        console.error('Ошибка отправки:', error);
        return false;
    }
}

// Обработка формы Лид-магнита
async function getGuide() {
    const email = document.getElementById('guide-email').value;
    if (!email) {
        alert('Пожалуйста, введите Email');
        return;
    }
    
    const message = `📥 <b>Новый запрос на гайд!</b>\nEmail: ${email}`;
    const success = await sendToTelegram(message);
    
    if (success) {
        document.getElementById('guide-form-container').style.display = 'none';
        document.getElementById('guide-success').style.display = 'block';
    }
}

// Обработка контактной формы
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const niche = document.getElementById('contact-niche').value;
    const btn = this.querySelector('button');
    
    btn.textContent = 'Отправка...';
    btn.disabled = true;

    const message = `🔥 <b>Новая заявка (Консалт/ИИ-Актив)</b>\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🏢 Ниша: ${niche}`;
    const success = await sendToTelegram(message);

    if (success) {
        this.style.display = 'none';
        document.getElementById('contact-success').style.display = 'block';
    } else {
        alert('Произошла ошибка. Попробуйте позже.');
        btn.textContent = 'Отправить заявку';
        btn.disabled = false;
    }
});

// Загрузка Markdown для блога
async function loadBlogPost() {
    try {
        // Пытаемся загрузить файл post1.md из папки blog
        const response = await fetch('blog/post1.md');
        if (response.ok) {
            const markdownText = await response.text();
            // Превращаем Markdown в HTML с помощью библиотеки marked
            document.getElementById('blog-content').innerHTML = marked.parse(markdownText);
        } else {
            document.getElementById('blog-content').innerHTML = '<p>Статьи скоро появятся.</p>';
        }
    } catch (error) {
        console.log('Блог пока пуст.');
    }
}

// Запускаем подгрузку блога при загрузке страницы
document.addEventListener('DOMContentLoaded', loadBlogPost);
