// База данных вопросов и ответов
const database = {
  // Базовые приветствия
  "привет": "Здравствуйте! Как я могу вам помочь?",
  "здравствуйте": "Добрый день! Чем могу помочь?",
  "доброе утро": "Доброе утро! Как ваши дела?",
  "добрый день": "Добрый день! Рад вас видеть!",
  "добрый вечер": "Добрый вечер! Чем могу быть полезен?",
  "хай": "Привет! Чем могу помочь?",
  "хеллоу": "Здравствуйте! Готов помочь вам.",
  "прив": "Приветствую! Чем могу быть полезен?",

  // Общие вопросы о боте
  "как тебя зовут": "Меня зовут Pae AI. Я ваш виртуальный помощник!",
  "кто ты": "Я Pae-ассистент, созданный чтобы помогать людям и отвечать на их вопросы.",
  "что ты умеешь": "Я могу отвечать на вопросы, поддерживать беседу и помогать с поиском информации. У меня есть база знаний по разным темам.",
  "как дела": "Спасибо, у меня всё хорошо! Я всегда готов помогать. Как я могу быть полезен вам?",

  // Согласие
  "да": "Отлично! Чем могу помочь дальше?",
  "конечно": "Замечательно! Что бы вы хотели обсудить?",
  "хорошо": "Прекрасно! Продолжим наш диалог.",
  "ага": "Отлично! Что дальше?",
  "угу": "Хорошо! Продолжаем.",
  "ок": "Замечательно! Двигаемся дальше?",
  "окей": "Отлично! Чем могу помочь?",
  
  // Отрицание
  "нет": "Понятно. Может быть, что-то другое?",
  "не надо": "Хорошо, давайте поговорим о чем-то другом.",
  "не хочу": "Без проблем. Чем еще могу помочь?",
  "неа": "Ясно. Может быть что-то другое?",
  "нету": "Понятно. Чем еще могу помочь?",

  // Благодарность
  "спасибо": "Пожалуйста! Рад был помочь! 😊",
  "благодарю": "Не за что! Обращайтесь ещё! 🌟",
  "спс": "Всегда пожалуйста! Рад помочь! 😊",
  "сенкс": "Не за что! Обращайтесь! 🌟",
  
  // Прощание
  "пока": "До свидания! Было приятно пообщаться! 👋",
  "до свидания": "Всего доброго! Возвращайтесь, если будут вопросы! 😊",
  "бай": "До встречи! Рад был пообщаться! 👋",
  "гудбай": "Всего хорошего! Приходите ещё! 😊",
  
  // Помощь
  "помоги": "Конечно! В чем именно нужна помощь?",
  "помощь": "Я готов помочь! Что вас интересует?",
  "подскажи": "С удовольствием подскажу. Что именно вас интересует?",
  "не понимаю": "Давайте разберемся. Что именно вызывает затруднения?",
  
  // Технические темы
  "что такое искусственный интеллект": "Искусственный интеллект - это технология, позволяющая компьютерам имитировать человеческий интеллект. Это включает в себя способность учиться, рассуждать и принимать решения.",
  "как работает нейронная сеть": "Нейронная сеть работает по принципу человеческого мозга. Она состоит из множества связанных узлов (нейронов), которые обрабатывают информацию и учатся на основе данных.",
  "что такое машинное обучение": "Машинное обучение - это способность компьютерных систем улучшать свою работу на основе опыта без явного программирования. Это ключевая технология искусственного интеллекта.",

  // Программирование
  "как научиться программировать": "Начните с изучения основ (HTML, CSS, JavaScript). Используйте онлайн-ресурсы, практикуйтесь каждый день и работайте над собственными проектами.",
  "какой язык программирования учить": "JavaScript отлично подходит для начала. Он широко используется, имеет простой синтаксис и позволяет создавать как веб-сайты, так и приложения.",
  "что такое код": "Код - это набор инструкций для компьютера, написанных на языке программирования. Это как рецепт, который говорит компьютеру, что делать."
};

// Функция для обработки сообщений
function processMessage(text) {
  // Нормализация текста
  const normalizedText = text.toLowerCase().trim()
    .replace(/[.,!?]/g, '')
    .replace(/\s+/g, ' ');

  // Поиск точного совпадения
  if (database[normalizedText]) {
    return database[normalizedText];
  }

  // Поиск похожих фраз
  const words = normalizedText.split(' ');
  let bestMatch = {
    response: '',
    confidence: 0
  };

  for (const key of Object.keys(database)) {
    const keyWords = key.split(' ');
    let matchCount = 0;

    for (const word of words) {
      if (keyWords.includes(word)) {
        matchCount++;
      }
    }

    const confidence = matchCount / Math.max(words.length, keyWords.length);

    if (confidence > bestMatch.confidence && confidence > 0.3) {
      bestMatch = {
        response: database[key],
        confidence: confidence
      };
    }
  }

  return bestMatch.confidence > 0
    ? bestMatch.response
    : "Извините, я не совсем понял ваш вопрос. Можете переформулировать?";
}

// Делаем функцию доступной глобально
window.processMessage = processMessage;
