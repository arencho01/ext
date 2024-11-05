<?php

header ('Content-Type: application/json');

$data = [
            "name" => "User",
            "comment" => 'Bla bla bla...',
            "radio" => 2,
            "checkbox1" => true,
            "checkbox2" => true,
            "selection" => 2
];

echo json_encode($data);