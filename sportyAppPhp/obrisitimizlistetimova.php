<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['nazivtima'])){
    $nazivtima = $_POST['nazivtima'];
  echo obrisitim($nazivtima);

}
?>