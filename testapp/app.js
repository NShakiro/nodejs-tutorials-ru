// const express = require('express');
// var app = express();

// app.get('/', function(req, res) {
//   res.send('Hello Test');
// });

// app.listen(3000, () => {
//   console.log(`Server started on 3000 🔥`);
// });

// module.exports.app = app;

/* Данное приложение при обращении по главному маршруту "/" отправляет в ответ некоторую строку "Hello Test".

И чтобы задействовать данное приложение в тесте, оно оформляется в виде модуля: module.exports.app = app; 

Для тестирования получаем модули supertest и нашего приложения и используем метод it() для получения результата.

Для настройки и выполнения теста в request передается функционал приложения:

request(app)
устанавливаем маршрут, по которому будем обращаться в приложении:

get("/")
Устанавливаем ожидаемый результат через метод expect:

expect("Hello Test")
и с помощью метода end() выполняем тест:

end(done)
*/

// Новый пример. Здесь определена обработка для трех маршрутов.
const express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send('Hello Test');
});

app.get('/error', function(request, response) {
  response.status(404).send('NotFound');
});

app.get('/user', function(request, response) {
  response.send({ name: 'Tom', age: 22 });
});

app.listen(3000);

module.exports.app = app;
