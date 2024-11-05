<?php

header('Content-Type: application/json');

$data = [
    "data" => [
        ["name" =>"Хлеб", "price" => 50, "quantity" => 12],
        ["name" =>"Сыр", "price" => 150, "quantity" => 33],
        ["name" =>"Картофель", "price" => 40, "quantity" => 168],
    ]
];

echo json_encode($data);