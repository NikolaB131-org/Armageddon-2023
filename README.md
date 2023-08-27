<h1 align="center"><a href="https://armageddon.nikolab131.xyz/">Armageddon 2023 ☄️</a></h1>

Онлайн-сервис по мониторингу и уничтожению опасных астероидов на основе данных [API NASA](https://api.nasa.gov/) (вкладка **Asteroids NeoWs**).

## Фичи

- SSR
- Адаптивная вёрстка
- Тесты
- CI/CD
- Собственный хостинг

## Сделано с помощью

- Next.js
- Typescript
- CSS Modules
- Jest
- React Testing Library
- ESLint
- Stylelint

## Установка приложения

1. Для корректной работы необходимо получить ключ с [NASA API](https://api.nasa.gov/)
2. Создать файл `.env.local` и указать там полученный ключ:
```bash
DATA_API_KEY=PASTE_KEY_HERE
```
3. Установить зависимости
```bash
npm i
```

## Запуск приложения

> [!WARNING]
> Для работы приложения необходим `Node.js >= 18`\
> Eсли у вас есть nvm, тогда для удобства можно выполнить команду `nvm use`

Запуск в режиме разработчика
```bash
npm run dev
```

Сборка и запуск для прода
```bash
npm run build
npm start
```

## Остальные команды

Запуск тестов
```
npm test
```

Запуск линтеров
```
npm run lint
```

Запуск stylelint (с флагом --fix)
```
npm run lint:styles
```
