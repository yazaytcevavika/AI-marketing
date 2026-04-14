// Ваши данные Telegram (Токен бота и ваш личный ID)
const TG_TOKEN = '8714638517:AAHMPaWQbhVc1vEiPUclrO9-RjvootMfIvU';
const TG_CHAT_ID = '911797742';

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