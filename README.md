<h1 align="center"><a href="https://armageddon.nikolab131.xyz/">Armageddon 2023 ☄️</a></h1>

Онлайн-сервис по мониторингу и уничтожению опасных астероидов на основе данных [API NASA](https://api.nasa.gov/) (вкладка **Asteroids NeoWs**).

Макет в [Figma](https://www.figma.com/file/N9aUcWK3o189lZcwQyzU79/Armaggedon-V3?type=design&mode=design&t=43gucwIGyLaUhKVy-0).

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

1. Склонируйте репозиторий
```bash
git clone https://github.com/NikolaB131-org/Armageddon-2023.git
```

2. Перейдите в папку с проектом
```bash
cd Armageddon-2023
```

3. Для корректной работы необходимо получить ключ с [API NASA](https://api.nasa.gov/)
4. Создайте файл `.env.local` и укажите там полученный ключ:
```bash
DATA_API_KEY=PASTE_YOUR_KEY_HERE
```

5. Установите зависимости
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

В обоих случаях проект запустится на: http://localhost:3000

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
