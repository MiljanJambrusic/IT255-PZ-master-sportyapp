<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Token, token, TOKEN');
include("functions.php");

if(isset($_POST['id_dog'])&&
    isset($_POST['tim2'])){

  $id_dog = $_POST['id_dog'];
  $tim2 = $_POST['tim2'];
  echo updatetim2($id_dog,$tim2);

}
?>