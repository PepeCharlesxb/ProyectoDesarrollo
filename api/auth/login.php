<?php
// --- INICIO DE CORRECCIÓN CORS ---
// 1. Mover las cabeceras al principio de todo.
header("Access-Control-Allow-Origin: http://localhost:4200"); // Permitir solo a tu app de Angular
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Permitir POST y OPTIONS
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 2. Manejar la petición de sondeo (preflight request) del navegador
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(); // Terminar el script aquí para las peticiones OPTIONS
}
// --- FIN DE CORRECCIÓN CORS ---


// El resto del código es igual, pero ahora está después de la validación CORS.
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->password)) {
        
        // Lógica de validación (simulada)
        if ($data->email == 'admin@tienda.com' && $data->password == '123456') {
            http_response_code(200);
            echo json_encode([
                "message" => "Login exitoso.",
                "user" => ["email" => "admin@tienda.com", "role" => "admin"]
            ]);
        } else if ($data->email == 'cliente@tienda.com' && $data->password == '123456') {
            http_response_code(200);
            echo json_encode([
                "message" => "Login exitoso.",
                "user" => ["email" => "cliente@tienda.com", "role" => "cliente"]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Credenciales incorrectas."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Datos incompletos."]);
    }
}
// Se eliminó el último 'else' porque ya no es necesario
?>