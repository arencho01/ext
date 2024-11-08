<?php

header('Content-Type: application/json');

$data = [
    "success" => true,
    "data" => [
        ["id" => 1, "text" => "Запись 1"],
        ["id" => 2, "text" => "Запись 2"],
        ["id" => 3, "text" => "Запись 3"],
        ["id" => 4, "text" => "Запись 4"]
    ]
];

echo json_encode($data);