<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['ime']) &&
        isset($_POST['prezime']) &&
        isset($_POST['korisnickoime']) &&
        isset($_POST['password']) &&
        isset($_POST['email']) &&
        isset($_POST['privilegije'])){
        $ime = $_POST['ime'];
        $prezime = $_POST['prezime'];
        $korisnickoime = $_POST['korisnickoime'];
        $password = $_POST['password'];
        $email = $_POST['email'];
        $privilegije = $_POST['privilegije'];
        echo register($ime,$prezime,$korisnickoime,$password,$email,$privilegije);
    }
?>