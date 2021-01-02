'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {


    it('should automatically redirect to /login when anonymous', function () {
        browser.get('/');
        expect(browser.getLocationAbsUrl()).toMatch("/login");
    });

    //describe('login ok', function () {
    it('вход пользователем vasya с паролем 123456 должен быть успешен', function () {

        browser.get('/#/login');

        element(by.model('vm.fLogin')).clear().sendKeys('vasya');
        element(by.model('vm.fPassword')).clear().sendKeys('123456');
        element(by.css('#add-news-button')).click();
        expect(browser.getLocationAbsUrl()).toMatch("/list");

    });

    it('выход должен привести пользователя на страницу /login', function () {
        element(by.css("#navbarNav > ul > li:nth-child(3) > a")).click();
        expect(browser.getLocationAbsUrl()).toMatch("/login");
    });

});
