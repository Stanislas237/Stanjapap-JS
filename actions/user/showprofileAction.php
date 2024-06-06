<?php

require('actions/database.php');

if(isset($_GET['id']) && !empty($_GET['id'])){

    $check_id = $bdd->prepare('SELECT id, pseudo FROM user WHERE id = ?');
    $check_id->execute(array($_GET['id']));

    if($check_id->rowCount() > 0){
        $friend['id'] = $_GET['id'];
        include 'actions/friends/checkiffriends.php';
        if(!$test){
            $receiver = $check_id->fetch();
        }else{
            $errorMsg = "";
        }
    }else{
        $errorMsg = "";
    }        
}else{
    $errorMsg = "";
}