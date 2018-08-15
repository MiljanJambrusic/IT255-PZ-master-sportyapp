<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['nazivtima']) &&
        isset($_POST['kreator'])) {
        $nazivtima = $_POST['nazivtima'];
        $kreator = $_POST['kreator'];
        echo novitim($nazivtima,$kreator);
    }
?>