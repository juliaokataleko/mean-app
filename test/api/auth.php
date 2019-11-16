<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With, enctype'); 
session_start();
$_POST = json_decode(file_get_contents('php://input'), true);
if(isset($_POST) && !empty($_POST)) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if($username == 'a' && $password == 'a') { 
        $_SESSION['user'] = 'admin';
        ?>
        {
            "success": true,
            "secret": "This is a secret. No one know about this... Just the admin"
        }

    <?php } else { ?>

        {
            "success": false,
            "message": "Invalid credentials..."
        }

    <?php }
} else { 
    //var_dump($_POST);
    ?>
        {
            "success": false,
            "message": "Invalid credentials... Just Post request is acepted."
        }
<?php }