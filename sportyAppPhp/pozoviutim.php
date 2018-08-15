<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['igrac']) &&
        isset($_POST['nazivtima']) &&
        isset($_POST['status'])){
        $igrac = $_POST['igrac'];
        $nazivtima = $_POST['nazivtima'];
        $status = $_POST['status'];
        echo pozoviutimigraca($igrac,$nazivtima,$status);
    }
?>