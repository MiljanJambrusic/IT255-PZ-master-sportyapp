<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: POST');
    include("functions.php");
    if(isset($_POST['token'])){
        $token = $_POST['token'];
        echo getUsernameRn($token);
    }
?>