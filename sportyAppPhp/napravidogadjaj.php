<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['tim1']) &&
        isset($_POST['tim2'])&&
        isset($_POST['mesec'])&&
        isset($_POST['dan'])&&
        isset($_POST['sat'])&&
        isset($_POST['status'])&&
        isset($_POST['kreator'])) {
        $tim1 = $_POST['tim1'];
        $tim2 = $_POST['tim2'];
        $mesec = $_POST['mesec'];
        $dan = $_POST['dan'];
        $sat = $_POST['sat'];
        $status = $_POST['status'];
        $kreator = $_POST['kreator'];
        echo novidogadjaj($tim1,$tim2,$mesec,$dan,$sat,$status,$kreator);
    }
?>