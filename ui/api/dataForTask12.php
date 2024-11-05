<?php

header('Content-Type: application/json');

$data = [
    "title" => 'Этот заголовок пришёл с сервера',
    "items" => ["Элемент с сервера 1", "Элемент с сервера 2", "Элемент с сервера 3"]
];

echo json_encode($data);