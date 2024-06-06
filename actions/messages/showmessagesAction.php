<?php

require('../database.php');

$id = explode(",", $_GET['id']);
if(isset($id[1]) && !empty($id[1])){

    $check_id = $bdd->prepare('SELECT id, pseudo FROM user WHERE id = ?');
    $check_id->execute(array($id[1]));

    if($check_id->rowCount() > 0){
        $friend['id'] = $id[1];
        session_start();
        include '../friends/checkiffriends.php';


        if(!$test){
            $receiver = $check_id->fetch();

            $sender_id = $_SESSION['id'];
            $receiver_id = $id[1];

            $message_view = $bdd->prepare('UPDATE messages SET vu = ? WHERE (id_sender = ? AND id_receiver = ?)');
            $message_view->execute(array(1, $receiver_id, $sender_id));

            $get_message = $bdd->prepare('SELECT id, id_sender, heure, date, contenu, vu, tag FROM messages WHERE (id_sender = ? AND id_receiver = ?) OR (id_sender = ? AND id_receiver = ?) ORDER BY id ASC');
            $get_message->execute(array($sender_id, $receiver_id, $receiver_id, $sender_id));

            require '../../showmessages.php';

        }else{
            $errorMsg = "";
        }
    }else{
        $errorMsg = "";
    }        
}else{
    $errorMsg = "";
}