# Обучение ExtJs

## Для решения:

Склонировать репозиторий и перейти в директорию с файлами репозитория

Запустить встроенный пхп сервер php -S localhost:8000

Открыть в браузере localhost:8000

Решать задачи, к примеру задача 1 решается в этом файле ui/js/test_panels/panel1.js

## Советы: 

1. Сначала сделайте внешний вид для всех заданий, потом добавляйте поведение каждому.
2. http://extjs.cachefly.net/ext-3.4.0/examples/index.html  - Тут можно найти примеры кода 
3. https://docs.sencha.com/extjs/3.4.0/  - Документация 
4. https://metanit.com/web/extjs/1.1.php - Туториал по Ext Js4. Можно некоторые моменты применить в 3.4.

## Советы по Задачам:

### Задание 1.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.Button
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.Container
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.Panel
- Нужна Panel или Container где будет отрисовываться новая кнопка

### Задание 2.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.ComboBox
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.data.ArrayStore
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.FormPanel-cfg-style 
- Для добавления новой записи можно использовать Форму
- Для обнавления 2-го ComboBox использовать данные с сервера при помощи Ext.data.JsonStore

### Задание 3.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.CheckboxGroup
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.RadioGroup
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.FieldSet
- http://extjs.cachefly.net/ext-3.4.0/examples/form/check-radio.html  - пример
- fieldSet использовать для checkboxgroup и radiogroup

### Задание 4.
- http://extjs.cachefly.net/ext-3.4.0/examples/locale/multi-lang.html  - пример

### Задание 5.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.grid.GridPanel
- http://extjs.cachefly.net/ext-3.4.0/examples/grid/array-grid.html   - пример
- http://extjs.cachefly.net/ext-3.4.0/examples/grid/grid-plugins.html  - пример

### Задание 6.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.grid.CheckboxSelectionModel-cfg-checkOnly
- http://extjs.cachefly.net/ext-3.4.0/examples/grid/grid-plugins.html   - пример
- Повторить нужно всё как в 5 задании, дополнить вывод данных и раздизейблить кнопку
- Для вывода данных можно использовать Ext.XTemplate

### Задание 7.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.layout.BorderLayout
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.layout.AccordionLayout
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.layout.ColumnLayout

### Задание 8.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.FormPanel  
- http://extjs.cachefly.net/ext-3.4.0/examples/form/dynamic.html   - пример
- Для вывода данных можно использовать Ext.XTemplate

### Задание 9.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.FormPanel 
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.Radio
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.Checkbox
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.form.TextField

- Данный пример из extjs4, но может помочь решить проблему загрузки готовых данных в форму
- https://metanit.com/web/extjs/11.2.php   - пример extjs4

### Задание 10.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.TabPanel
- http://extjs.cachefly.net/ext-3.4.0/examples/tabs/tabs.html  - пример
- Можно устанавливать Disabled табам

### Задание 11.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.XTemplate
- https://metanit.com/web/extjs/10.php  - extjs4 пример можно найти много полезного

### Задание 12.
- https://metanit.com/web/extjs/10.php  - extjs4 пример можно найти много полезного

### Задание 13.
- https://metanit.com/web/extjs/10.php  - extjs4 пример можно найти много полезного
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.XTemplate - полезно
Нужный СПОЙЛЕР!!! 
- overwrite нужно прописать в function (a) на 5 строчке.
  overwrite - применяет предоставленные значения к шаблону и перезаписывает содержимое el.
- для получения сложных данных (data => [articles => [...],likes => [...]]) не нужно использовать JsonStore(не любит сложные данные). Лучше использовать Ajax.request для получения данных с сервера.      
- В шаблоне Ext.XTemplate сначало достаются данные из articles, потом likes.
```  
'<tpl for="articles">'
     '<tr>'
         '<tpl for=".">'
```         
В данном примере выведутся все объекты articles, а ниже по такому же принципу для likes.
!!!       
 
### Задание 14.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.Window-method-doLayout
- http://extjs.cachefly.net/ext-3.4.0/examples/window/hello.html  - пример
- Добавление нового объекта как в 1 задании

### Задание 15.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.TabPanel
- http://extjs.cachefly.net/ext-3.4.0/examples/tabs/tabs.html  - пример
- Логику счётчика можно написать на Js

### Задание 16.
- https://docs.sencha.com/extjs/3.4.0/#!/api/Ext.LoadMask
- http://extjs.cachefly.net/ext-3.4.0/examples/message-box/msg-box.html  - примеры, много полезного про MessageBox
