<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['sport']) &&
        isset($_POST['mesec']) &&
        isset($_POST['dan']) &&
        isset($_POST['sat'])){
        $sport = $_POST['sport'];
        $mesec = $_POST['mesec'];
        $dan = $_POST['dan'];
        $sat = $_POST['sat'];
        echo postzabrtermin($sport,$mesec,$dan,$sat);
    }
?>