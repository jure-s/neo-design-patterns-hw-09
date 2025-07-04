# Домашнє завдання до Теми Поведінкові патерни: Шаблонний метод та Ітератор

## Частина 1 — Реалізація патерну **Шаблонний метод**

У цьому домашньому завданні реалізовано експорт користувацької статистики у формати CSV, JSON та XML, використовуючи патерн **Шаблонний метод**.

### 🔧 Мета

- виокремити сталі етапи алгоритму експорту в базовому класі;
- інкапсулювати алгоритм у методі `export()` без умовних конструкцій;
- реалізувати варіативну поведінку через абстрактні методи `render()` і `save()`;
- використати hook-методи `beforeRender()` та `afterRender()` для розширення.

### 🧱 Структура експорту

- **`DataExporter`** — базовий абстрактний клас з шаблонним методом `export()`
- **`CsvExporter`**, **`JsonExporter`**, **`XmlExporter`** — реалізують форматування та збереження у відповідні формати
- **`XmlExporter`** перевизначає `afterRender()`, додаючи дату генерації у коментарі

### 🔄 Алгоритм експорту:

1. Завантаження даних з API:  
   `https://jsonplaceholder.typicode.com/users`
2. Трансформація (поля: `id`, `name`, `email`, `phone`) + сортування по імені
3. Форматування (`render()`)
4. Збереження у файл (`save()`)

### 📂 Файли експорту

Після запуску:
```bash
npx ts-node ./src/main.ts
```

Створюються:

- `dist/users.csv`
- `dist/users.json`
- `dist/users.xml`

### 📌 Приклад запуску

```ts
import { CsvExporter } from './exporters/CsvExporter';
import { JsonExporter } from './exporters/JsonExporter';
import { XmlExporter } from './exporters/XmlExporter';

const exporters = [new CsvExporter(), new JsonExporter(), new XmlExporter()];

(async () => {
  await Promise.all(exporters.map(e => e.export()));
})();
```

---

## Частина 2 — Реалізація патерну **Ітератор**

Реалізовано три класи-ітератори для обходу створених файлів `CSV`, `JSON`, `XML`.

### 🎯 Мета

- створити ітератори, які реалізують `Iterable<UserData>`;
- інкапсулювати логіку читання та парсингу;
- реалізувати ітерацію без умов — окремий клас на кожен формат.

### 🧱 Структура ітераторів

- **`CsvIterator`** — парсить `users.csv`
- **`JsonIterator`** — читає масив з `users.json`
- **`XmlIterator`** — парсить `users.xml`, ігноруючи коментар у кінці

Усі класи реалізують `[Symbol.iterator]()` для підтримки `for...of`.

### 📌 Запуск

```bash
npx ts-node ./src/main-iterate.ts
```

### ✅ Приклад виводу:

```bash
--- CSV ---
{ id: 5, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', phone: '(254)954-1289' }
...
--- JSON ---
...
--- XML ---
...
```

### 📌 Приклад коду:

```ts
import { CsvIterator } from './iterators/CsvIterator';

for (const user of new CsvIterator('./dist/users.csv')) {
  console.log(user);
}
```

---

## 📦 Структура проєкту

```
/
└── src/
    ├── exporters/
    │   ├── DataExporter.ts     # Базовий клас
    │   ├── CsvExporter.ts
    │   ├── JsonExporter.ts
    │   └── XmlExporter.ts
    ├── iterators/
    │   ├── CsvIterator.ts
    │   ├── JsonIterator.ts
    │   └── XmlIterator.ts
    ├── data/
    │   └── UserData.ts         # Тип для користувача
    ├── main.ts                 # Експорт у файли
    └── main-iterate.ts         # Ітерація по файлах
```

---

## 🧩 Як додати новий формат експорту

1. Створіть клас `NewFormatExporter`, який наслідується від `DataExporter`
2. Реалізуйте `render()` та `save()`
3. (Опційно) перевизначте `beforeRender()` чи `afterRender()`
4. Додайте його у масив `exporters` в `main.ts`

---

## 📝 Вимоги до запуску

- Node.js
- TypeScript
- Встановлені залежності:

```bash
npm install
```

---

## ✅ `.gitignore`

```gitignore
node_modules/
dist/
.env
```

---