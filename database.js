// База данных вопросов и ответов
const database = {
  // Общие ответы
  "привет": "Здравствуйте! Чем могу помочь?",
  "здравствуйте": "Добрый день! Как я могу вам помочь?",
  "пока": "До свидания! Буду рад помочь вам снова.",
  "до свидания": "Всего доброго! Обращайтесь, если понадобится помощь.",
  "спасибо": "Пожалуйста! Рад был помочь.",
  "благодарю": "Не за что! Обращайтесь, если будут ещё вопросы.",
  "да": "Хорошо, продолжим.",
  "нет": "Понятно, может быть, я могу предложить что-то другое?",
  "хорошо": "Отлично! Что дальше?",
  "плохо": "Сожалею об этом. Как я могу помочь исправить ситуацию?",
  "ок": "Хорошо, продолжаем.",
  "не знаю": "Давайте разберем этот вопрос подробнее. Что именно вас интересует?",
  "может быть": "Хорошо, дайте знать, когда определитесь.",
  "конечно": "Отлично! Продолжим.",
  "точно": "Да, я тоже так думаю.",
  "согласен": "Рад, что мы пришли к общему мнению.",
  "не согласен": "Понимаю вашу точку зрения. Может быть, стоит рассмотреть альтернативы?",
  "не то": "Извините, давайте попробуем сформулировать вопрос иначе.",
  "не это": "Прошу прощения за недопонимание. Можете уточнить, что именно вы имеете в виду?",
  "никак": "Возможно, есть другие способы решения. Хотите обсудить альтернативы?",
  
  // Приветствия в разных формах
  "доброе утро": "Доброе утро! Как я могу помочь вам сегодня?",
  "добрый день": "Добрый день! Чем могу быть полезен?",
  "добрый вечер": "Добрый вечер! Готов помочь вам.",
  "как дела": "Спасибо, что спросили! У меня всё хорошо, готов помогать вам. Как ваши дела?",
  
  // Тема: Погода
  "какая погода": "Я не могу сказать точно, какая сейчас погода, но могу предложить посмотреть прогноз погоды на специализированных сайтах.",
  "холодно": "Да, в холодную погоду лучше тепло одеваться. Хотите обсудить что-то конкретное?",
  "жарко": "В жаркую погоду важно пить больше воды и по возможности находиться в тени. Могу рассказать подробнее о том, как справляться с жарой.",
  
  // Тема: Время
  "который час": "Я не могу показать текущее время, но вы можете посмотреть его на своем устройстве.",
  "сколько времени": "К сожалению, я не могу показать текущее время. Посмотрите, пожалуйста, на часы своего устройства.",
  
  // Тема: Помощь
  "помоги": "Конечно, я постараюсь помочь. Расскажите подробнее, что вас интересует?",
  "помогите": "Я готов помочь. Опишите, пожалуйста, вашу проблему или вопрос.",
  "что ты умеешь": "Я могу отвечать на вопросы, поддерживать диалог и помогать с различными темами. Что именно вас интересует?",
  "что ты можешь": "Я могу общаться на разные темы, отвечать на вопросы и помогать решать проблемы. Расскажите, что вам нужно?",
  
  // Тема: Настроение
  "как настроение": "У меня всегда хорошее настроение и я готов помогать! Как ваше настроение?",
  "весело": "Рад, что вам весело! Хорошее настроение очень важно.",
  "грустно": "Сочувствую. Хотите поговорить об этом? Иногда разговор помогает почувствовать себя лучше.",
  
  // Тема: Работа с ошибками
  "ошибка": "Извините, произошла ошибка. Давайте попробуем сначала или сформулируем вопрос иначе.",
  "не работает": "Сожалею, что возникли проблемы. Давайте разберемся, что именно не работает.",
  "не понимаю": "Я постараюсь объяснить понятнее. Что именно вызывает затруднения?",
  
  // Тема: Прощание
  "спокойной ночи": "Спокойной ночи! Приятных снов!",
  "увидимся": "Буду ждать нашей следующей встречи! Хорошего дня!",
  "пока пока": "До свидания! Возвращайтесь, когда будет нужна помощь!"
};

// Функция нормализации текста
function normalizeText(text) {
  return text.toLowerCase()
    .replace(/[.,!?]/g, '')
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ')
    .trim();
}

// Функция поиска наилучшего совпадения
function findBestMatch(text) {
  const normalizedInput = normalizeText(text);
  const words = normalizedInput.split(' ');
  
  let bestMatch = {
    response: null,
    confidence: 0
  };

  for (const [key, value] of Object.entries(database)) {
    const normalizedKey = normalizeText(key);
    const keyWords = normalizedKey.split(' ');
    
    // Прямое совпадение
    if (normalizedInput === normalizedKey) {
      return {
        response: value,
        confidence: 1
      };
    }
    
    // Частичное совпадение
    let matchCount = 0;
    let wordImportance = 0;
    
    for (const word of words) {
      if (keyWords.includes(word)) {
        matchCount++;
        // Придаём больший вес более длинным словам
        wordImportance += word.length;
      }
    }
    
    // Вычисляем уверенность с учетом длины слов и их количества
    const confidence = (matchCount / Math.max(words.length, keyWords.length)) * 
                      (wordImportance / (normalizedInput.length + normalizedKey.length));
    
    if (confidence > bestMatch.confidence) {
      bestMatch = {
        response: value,
        confidence: confidence
      };
    }
  }
  
  // Возвращаем результат только если уверенность выше порога
  return bestMatch.confidence > 0.3 ? bestMatch : {
    response: "Извините, я не совсем понял ваш вопрос. Можете переформулировать?",
    confidence: 0
  };
}

// Экспортируем функции и базу данных
window.database = database;
window.findBestMatch = findBestMatch;
window.normalizeText = normalizeText;
