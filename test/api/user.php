<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With, enctype'); 
session_start();

if(isset($_SESSION['user']) && $_SESSION['user'] == 'admin') {
    $user = $_SESSION['user'];
    echo '{
        "success": true,
        "message": "This is a secret. Only for admin"
    }';
} else {
    echo '{
        "success": false,
        "message": "Go out from here..."
    }';
}