<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['igrac']) &&
        isset($_POST['status'])&&
        isset($_POST['nazivtima'])) {
        $igrac = $_POST['igrac'];
        $status = $_POST['status'];
        $nazivtima = $_POST['nazivtima'];
        echo novitimulistiigraca($igrac,$status, $nazivtima);
    }
?>