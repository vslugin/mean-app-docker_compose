var urlpath = window.location.pathname.split('/');

var id = urlpath[3];
var action = urlpath[4];

console.log("url?", id, action);

switch (action) {
    case 'edit':

        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', '/api/news/'+id, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // 3. Отсылаем запрос
        xhr.send();

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            console.log("ОШИБКА ПОЛУЧЕНИЯ НОВОСТИ", xhr.statusText);
        } else {
            var news = JSON.parse(xhr.responseText);
            document.getElementById("title").value=news.title;
            document.getElementById("body").value=news.body;
        }

        break;
    case 'delete':

        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('GET', '/api/news/'+id, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // 3. Отсылаем запрос
        xhr.send();

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            console.log("ОШИБКА ПОЛУЧЕНИЯ НОВОСТИ", xhr.statusText);
        } else {
            var news = JSON.parse(xhr.responseText);

            document.getElementById("header")
                .innerHTML='Вы действительно хотите удалить новость с заголовком "'+news.title+'"?';
        }
        break;
}


var btnAddNews =  document.getElementById("add-news-button");
var btnEditNews =  document.getElementById("edit-news-button");
var btnDelNews =  document.getElementById("delete-news-button");
var fieldId = document.getElementById("id");
if(fieldId){fieldId.value=id;}


if(btnAddNews){
    btnAddNews.addEventListener('click', function () {

        console.log("add-news-button was clicked!");

        var title = document.getElementById('title').value;
        var body = document.getElementById('body').value;


        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('POST', '/api/news', false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        var data = JSON.stringify( {
            title: title,
            body: body
        });

        // 3. Отсылаем запрос
        xhr.send(data);

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 201) {
            console.log("ОШИБКА ДОБАВЛЕНИЯ НОВОСТИ", xhr.statusText);
        } else {
            document.location.href='/admin/news';
        }

    });
}

if(btnEditNews){
    btnEditNews.addEventListener('click', function () {

        var title = document.getElementById('title').value;
        var body1 = document.getElementById('body').value;
        var id = document.getElementById('id').value;


        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('PUT', '/api/news/'+id, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        var data = JSON.stringify( {
            title: title,
            body: body1
        });

        // 3. Отсылаем запрос
        xhr.send(data);

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            console.log("ОШИБКА ИЗМЕНЕНИЯ НОВОСТИ", xhr.statusText);
        } else {
            document.location.href='/admin/news';
        }

    });
}

if(btnDelNews){
    btnDelNews.addEventListener('click', function () {

        var id = document.getElementById('id').value;

        // 1. Создаём новый объект XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
        xhr.open('DELETE', '/api/news/'+id, false);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // 3. Отсылаем запрос
        xhr.send();

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 201) {
            console.log("ОШИБКА УДАЛЕНИЯ НОВОСТИ", xhr.statusText);
        } else {
            document.location.href='/admin/news';
        }

    });
}
