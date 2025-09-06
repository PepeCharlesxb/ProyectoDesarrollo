<?php
// Cabeceras CORS (como las teníamos)
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluimos nuestro archivo de conexión
include_once '../config/database.php';

// Verificamos que el método sea POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Creamos una instancia de la base de datos y obtenemos la conexión
    $database = new Database();
    $db = $database->getConnection();
    
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->password)) {

        // Preparamos la consulta para evitar inyecciones SQL
        $query = "SELECT email, password, role FROM users WHERE email = :email LIMIT 0,1";
        $stmt = $db->prepare($query);

        // Limpiamos y vinculamos el parámetro
        $email = htmlspecialchars(strip_tags($data->email));
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $num = $stmt->rowCount();

        // Si se encontró el usuario
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $password_from_db = $row['password'];

            // Verificamos la contraseña
            if (password_verify($data->password, $password_from_db)) {
                // Contraseña correcta
                http_response_code(200);
                echo json_encode([
                    "message" => "Login exitoso.",
                    "user" => [
                        "email" => $row['email'],
                        "role" => $row['role']
                    ]
                ]);
            } else {
                // Contraseña incorrecta
                http_response_code(401);
                echo json_encode(["message" => "Credenciales incorrectas."]);
            }
        } else {
            // No se encontró el usuario
            http_response_code(404);
            echo json_encode(["message" => "Usuario no encontrado."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Datos incompletos."]);
    }
}
?>