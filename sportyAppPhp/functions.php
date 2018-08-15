<?php
include("config.php");

//Za HOME PAGE FUNKCIJE ZA PRIKAZ DOSTUPNIH TERMINA
function getZabrTermini(){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * FROM zabranjenitermini");
    $num_rows = $result->num_rows;
    $termini=array();

    if($num_rows > 0){
        while($row = $result->fetch_assoc()){
            $termin = array();
            $termin['sport'] = $row['sport'];
            $termin['mesec'] = $row['mesec'];
            $termin['dan'] = $row['dan'];
            $termin['sat'] = $row['sat'];
            array_push($termini,$termin);
        }
    $rarray['termini'] = $termini;
    return json_encode($rarray);
    }
    else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }   
}
function getZabrTerminiFull(){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * FROM zabranjenitermini");
    $num_rows = $result->num_rows;
    $termini=array();

    if($num_rows > 0){
        while($row = $result->fetch_assoc()){
            $termin = array();
            $termin['zabr_id']=$row['zabr_id'];
            $termin['sport'] = $row['sport'];
            $termin['mesec'] = $row['mesec'];
            $termin['dan'] = $row['dan'];
            $termin['sat'] = $row['sat'];
            array_push($termini,$termin);
        }
    $rarray['terminiful'] = $termini;
    return json_encode($rarray);
    }
    else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }   
}

function getUsernameRn($id){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * from korisnici where token='$id'");
    $num_rows = $result->num_rows;
    $user = array();
    if($num_rows > 0)
    {
        $result2 = $conn->query("SELECT * from korisnici where token='$id'");
        while($row = $result2->fetch_assoc()) {
            $one_user = array();
            $one_user['korisnickoime'] = $row['korisnickoime'];

            array_push($user,$one_user);
        }
    }
    $rarray['user'] = $user;
    return json_encode($rarray);
}



//ZA TIMOVE

function updatestatusdog($id_dog){
    global $conn;
    $result = $conn->prepare("UPDATE dogadjaji SET status=1 WHERE id_dog=?");
    $result->bind_param("i",$id_dog);
    $result->execute();
}

function updatetim2($id_dog,$tim2){
    global $conn;
    $result = $conn->prepare("UPDATE dogadjaji SET tim2=? WHERE id_dog=?");
    $result->bind_param("si",$tim2,$id_dog);
    $result->execute();
}

function novitimulistiigraca($igrac,$status, $nazivtima){
    global $conn;
    $result = $conn->prepare("INSERT INTO igraci (igrac,status,nazivtima) VALUES (?,?,?)");
    $result->bind_param("sis",$igrac,$status,$nazivtima);
    $result->execute();
}

function novitim($nazivtima,$kreator){
    global $conn;
    $result = $conn->prepare("INSERT INTO timovi (nazivtima,kreator) VALUES (?,?)");
    $result->bind_param("ss",$nazivtima,$kreator);
    $result->execute();
}

function updatestatus($id){
    global $conn;
    $broj = 1;
    $result = $conn->prepare("UPDATE igraci SET status=? WHERE id=?");
    $result->bind_param("ii",$broj,$id);
    $result->execute();
}

function pozoviutimigraca($igrac,$nazivtima,$status){
    global $conn;
    $result = $conn->prepare("INSERT INTO igraci (igrac,status,nazivtima) VALUES(?,?,?)" );
    $result->bind_param("sis",$igrac,$status,$nazivtima);
    $result->execute();
}

function deletezahtev($id){
    global $conn;
    $result = $conn->prepare("DELETE FROM  igraci WHERE id=?");
    $result->bind_param("i",$id);
    $result->execute();
}

function obrisitim($nazivtima){
    global $conn;
    $result = $conn->prepare("DELETE FROM timovi WHERE nazivtima=?");
    $result->bind_param("s",$nazivtima);
    $result->execute();
}
function obrisitimizlisteigraca($nazivtima){
    global $conn;
    $result = $conn->prepare("DELETE FROM igraci WHERE nazivtima=?");
    $result->bind_param("s",$nazivtima);
    $result->execute();
}

//Za dogadjaj
function novidogadjaj($tim1,$tim2,$mesec,$dan,$sat,$status,$kreator){
    global $conn;
    $result = $conn->prepare("INSERT INTO dogadjaji (tim1,tim2,mesec,dan,sat,status,kreator) VALUES(?,?,?,?,?,?,?)");
    $result->bind_param("sssisis",$tim1,$tim2,$mesec,$dan,$sat,$status,$kreator);
    $result->execute();
}

function getKorisnike(){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT k_id,korisnickoime FROM korisnici");
    $num_rows = $result->num_rows;
    $korisnici=array();

    if($num_rows > 0){
        while($row = $result->fetch_assoc()){
            $korisnik = array();
            $korisnik['k_id'] = $row['k_id'];
            $korisnik['korisnickoime'] = $row['korisnickoime'];
            
            array_push($korisnici,$korisnik);
        }
    $rarray['korisnici'] = $korisnici;
    return json_encode($rarray);
    }
    else{
        $rarray['error'] = "Please log in";
        header('HTTP/1.1 401 Unauthorized');
        return json_encode($rarray);
    }
}

function getNazivTimova(){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * FROM timovi");
    $num_rows = $result->num_rows;
    $timovi=array();

    if($num_rows>0){
        while($row = $result->fetch_assoc()){
            $tim=array();
            $tim['nazivtima'] = $row['nazivtima'];
            $tim['kreator'] = $row['kreator'];
            array_push($timovi,$tim);
        }
    }
    $rarray['timovi'] =$timovi;
    return json_encode($rarray);
}

function preuzmidogadjaje(){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * FROM dogadjaji");
    $num_rows = $result->num_rows;
    $dogadjaji=array();
    if($num_rows>0){
        while($row = $result->fetch_assoc()){
            $dogadjaj = array();
            $dogadjaj['id_dog']= $row['id_dog'];
            $dogadjaj['tim1']= $row['tim1'];
            $dogadjaj['tim2']= $row['tim2'];
            $dogadjaj['mesec']= $row['mesec'];
            $dogadjaj['dan']= $row['dan'];
            $dogadjaj['sat']= $row['sat'];
            $dogadjaj['status']= $row['status'];
            $dogadjaj['kreator']= $row['kreator'];
            array_push($dogadjaji,$dogadjaj);
        }
        $rarray['dogadjaji'] = $dogadjaji;
        return json_encode($rarray);
    }
    else{
        $rarray['error'] = "Get događaje ne valja";
        header('HTTP/1.1 401 Unauthorized BURAZ');
        return json_encode($rarray);
    }
}

function getIgrace(){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * FROM igraci");
    $num_rows = $result->num_rows;
    $skupigraca=array();

    if($num_rows > 0){
        while($row = $result->fetch_assoc()){
            $igrac = array();
            $igrac['igrac'] = $row['igrac'];
            $igrac['status'] = $row['status'];
            $igrac['nazivtima']=$row['nazivtima'];
            $igrac['id'] = $row['id'];
            array_push($skupigraca,$igrac);
        }
    $rarray['skupigraca'] = $skupigraca;
    return json_encode($rarray);
    }
}
function getTimove(){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * FROM timovi");
    $num_rows = $result->num_rows;
    $skuptimova=array();

    if($num_rows > 0){
        while($row = $result->fetch_assoc()){
            $tim = array();
            $tim['id_tima'] = $row['id_tima'];
            $tim['nazivTima'] = $row['nazivtima'];
            $tim['kreator'] = $row['kreator'];
            array_push($skuptimova,$tim);
        }
    $rarray['skuptimova'] = $skuptimova;
    return json_encode($rarray);
    }
}

function checkAdmin($id){
    global $conn;
    $rarray = array();
    $result = $conn->query("SELECT * from korisnici where token='$id'");
    $num_rows = $result->num_rows;
    $user = array();
    if($num_rows > 0)
    {
        $result2 = $conn->query("SELECT * from korisnici where token='$id'");
        while($row = $result2->fetch_assoc()) {
            $one_user = array();
            $one_user['privilegije'] = $row['privilegije'];

            array_push($user,$one_user);
        }
    }
    $rarray['user'] = $user;
    return json_encode($rarray);
}




//Za Login
function login($korisnickoime, $password){
    global $conn;
    $rarray = array();
    if(checkLogin($korisnickoime,$password)){
        $id = sha1(uniqid());
        $result = $conn->prepare("UPDATE korisnici SET token=? WHERE korisnickoime=?");
        $result->bind_param("ss",$id,$korisnickoime);
        $result->execute();
        $rarray['token'] = $id;

    //$admin = checkAdmin($id);
    //$rarray['administrator'] = $admin;

    } else{
        header('HTTP/1.1 401 Unauthorized');
        $rarray['error'] = "Nepravilno korisničko ime ili password";
    }
    return json_encode($rarray);
}

//provera da li postoji ovaj login
function checkLogin($korisnickoime, $password){
    global $conn;
    $password = md5($password);
    $result = $conn->prepare("SELECT * FROM korisnici WHERE korisnickoime=? AND password=?");
    $result->bind_param("ss",$korisnickoime,$password);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{   
        return false;
    }
}



//Funkcija za proveru da li korisnik postoji sa tim unetim imenom u bazi podataka

function checkIfUserExists($korisnickoime){
    global $conn;
    $result = $conn->prepare("SELECT * FROM korisnici WHERE korisnickoime=?");
    $result-> bind_param("s", $korisnickoime);
    $result->execute();
    $result->store_result();

    $num_rows = $result->num_rows;
    if($num_rows>0){
        return true;
    }
    else{
        return false;
    }
}

function checkIfEmailExists($email){
    global $conn;
    $result = $conn->prepare("SELECT * FROM korisnici WHERE email=?");
    $result-> bind_param("s", $email);
    $result->execute();
    $result->store_result();

    $num_rows = $result->num_rows;
    if($num_rows>0){
        return true;
    }
    else{
        return false;
    }
}

function obrisizabranjenitermin($id){
    global $conn;
    $result = $conn->prepare(" DELETE FROM zabranjenitermini WHERE zabr_id=? ");
    $result->bind_param("i",$id);
    $result->execute();
}

//Funkcija za registraciju
function register($ime,$prezime,$korisnickoime,$email,$lozinka,$privilegije){
    global $conn;

    $earray = array();
    $errors = "";

    if(strlen($korisnickoime)<5){
        $errors .= "Korisnicko ime mora imati najmanje 5 karaktera!\r\n";
    }
    if(strlen($lozinka)<6){
        $errors .= "Lozinka mora imati najmanje 6 karaktera!\r\n";
    }
    if(checkIfEmailExists($email)){
        $errors .="Ova email adresa već postoji, izaberite neku drugu!\r\n";
    }
    if(checkIfUserExists($korisnickoime)){
        $error .="Korisničko ime je već zauzeto, molimo vas izaberite neko drugo!\r\n";
    }


    if($errors==""){
        $stmt = $conn->prepare("INSERT INTO korisnici (ime, prezime, korisnickoime, password, email, privilegije) VALUES(?, ?, ?, ?, ?, ?)");
        $pw = md5($lozinka);
        $stmt -> bind_param("sssssi", $ime, $prezime, $korisnickoime, $pw, $email, $privilegije);
        if($stmt->execute()){
            $id = sha1(uniqid());
            $result = $conn->prepare("UPDATE korisnici SET token=? WHERE korisnickoime=?");
            $result->bind_param("ss",$id,$korisnickoime);
            $result->execute();
            $earray['token'] = $id;
        }else{
            header('HTTP/1.1 400 Bad request');
            $earray['error'] = "Database connection error";
        }
    }else{
        header('HTTP/1.1 400 Bad request');
        $earray['error'] = json_encode($errors);
    }
    return json_encode($earray);
}

//funkcija za dodavanje zabranjenih termina
function postzabrtermin($sport, $mesec, $dan, $sat){
    global $conn;
    $stmt = $conn->prepare("INSERT INTO zabranjenitermini (sport, mesec, dan, sat) VALUES(?, ?, ?, ?)");
    $stmt -> bind_param("ssis", $sport, $mesec, $dan, $sat);
    $stmt ->execute();
}





?>