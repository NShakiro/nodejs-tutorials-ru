// TODO: Загрузка файлов с помощью multer
/* Одной из наиболее часто встречаемых задач в Node.js является загрузка файлов на сервер. В Node.js для этого нет встроенных инструментов, однако мы можем использовать дополнительные специальные пакеты. Одним из популярных подобных пакетов является multer, который работает поверх Express.*/
// const express = require('express');
// const multer = require('multer');

// const app = express();

// app.use(express.static(__dirname));
// app.use(multer({ dest: 'uploads' }).single('filedata'));
// app.post('/upload', function(req, res, next) {
//   let filedata = req.file;
//   console.log(filedata);
//   if (!filedata) res.send('Произошла ошибка при загрузке файла');
//   else res.send('Файл успешно загружен');
// });

// app.listen(3000, () => {
//   console.log(`Server started on 3000 🔥`);
// });

/* В данном случае multer добавляется в виде компонента middleware. Для конфигурации в функцию multer передается объект, в котором параметр dest указывает на путь, по которому будет загружаться файл. 

Если внутри проекта такой папки нет, то она автоматически будет создана.

Далее вызывается функция single(), кот-ая указывает, что загружаться будет один файл. Собственно на форме в index.html мы имеем поле для загрузки одного файла. В этот метод передается название поля, которое используется на форме для загрузки файла. Соответствующее поле в файле index.html называется "filedata", поэтому в функцию single() передается соответствующее значение.

В результате в папке проекта будет создан подкаталог uploads, где мы найдем загруженный файл.
*/

// TODO: Настройка параметров сохранения файла
/* В прошлый раз при загрузке имени файла было присваивоено некоторое произвольное значение. Тем не менее, возможно, нас такие имена файлов не устраивают, и мы хотим сами контроллировать процесс именования файлов. В этом случае мы можем выполнить более точную настройку multer:
 */
const express = require('express');
const multer = require('multer');

const app = express();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

app.use(express.static(__dirname));

app.use(multer({ storage: storageConfig }).single('filedata'));
app.post('/upload', function(req, res, next) {
  let filedata = req.file;
  if (!filedata) res.send('Ошибка при загрузке файла');
  else res.send('Файл загружен');
});
app.listen(3000, () => {
  console.log('Server started on port 3000 🔥');
});

// Фильтрация файлов.
/* При сохранении файлов мы можем столкнуться с необходимостью их фильтрации по типу. Возможно, нам нужны только файлы изображений или файлы pdf или какие-то другие типы файлов. В этом случае мы можем определить фильтр. Например, будем принимать только файлы изображений:*/

const express = require('express');
const multer = require('multer');

const app = express();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
// определение фильтра
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.static(__dirname));

app.use(
  multer({ storage: storageConfig, fileFilter: fileFilter }).single('filedata')
);
app.post('/upload', function(req, res, next) {
  let filedata = req.file;

  console.log(filedata);
  if (!filedata) res.send('Ошибка при загрузке файла');
  else res.send('Файл загружен');
});
app.listen(3000, () => {
  console.log('Server started on port 3000 🔥');
});
