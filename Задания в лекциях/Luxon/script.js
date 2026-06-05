const { DateTime, Duration, Interval, Settings } = luxon;


function logToScreen(message, isError = false) {
    const outputDiv = document.getElementById('output');
    const item = document.createElement('div');
    item.className = isError ? 'log-item error' : 'log-item';
    item.textContent = message;
    outputDiv.appendChild(item);

    console.log(message);
}

// Settings
Settings.defaultZone = 'Europe/Moscow';

// DateTime
const startDateTime = DateTime.fromISO('2026-05-24T14:30:00', {
  locale: 'ru',
  zone: 'Europe/Moscow'
});

logToScreen(`Исходная дата: ${startDateTime.year}-${startDateTime.month}-${startDateTime.day}`);
logToScreen(`Локаль: ${startDateTime.locale}, Часовой пояс: ${startDateTime.zoneName}`);

// Immutability
const endDateTime = startDateTime.plus({ days: 1, hours: 2 });
const isImmutable = (startDateTime.hour === endDateTime.hour); 
logToScreen(`Изменился ли исходный объект при вызове .plus()? ${isImmutable ? 'Нет (Объект неизменяемый)' : 'Да'}`);

// Duration и Interval
const meetingDuration = Duration.fromObject({ hours: 2, minutes: 45 });
const projectInterval = Interval.fromDateTimes(startDateTime, endDateTime);

logToScreen(`Длительность встречи: ${meetingDuration.hours} ч. ${meetingDuration.minutes} мин.`);
logToScreen(`Интервал валиден? ${projectInterval.isValid ? 'Да' : 'Нет'}`);

// Fail-Graceful
const invalidDate = DateTime.fromISO('некорректная-строка');

if (!invalidDate.isValid) {
  logToScreen(`Ошибка валидации! Причина: ${invalidDate.invalidReason}`, true);
}
