<?php

require('actions/database.php');

$j = "'Bradley Hand ITC'";
$del_message = '<p style="color:purple; font-family:'.$j.'; font-style:italic; font-weight:bold">Ce message a été supprimé..</p>';

if(isset($_GET['tag']) && !empty($_GET['tag']) && isset($_GET['id']) && !empty($_GET['id'])){
    $message_data = $bdd->prepare('SELECT id_sender, id_receiver, contenu FROM messages WHERE id = ?');
    $message_data->execute(array($_GET['tag']));

    if($message_data->rowCount() > 0){
        $message = $message_data->fetch();

        if($message['contenu'] != $del_message){
            if((($message['id_sender'] == $_SESSION['id']) && ($message['id_receiver'] == $_GET['id'])) ||
            (($message['id_sender'] == $_GET['id'] && ($message['id_receiver'] == $_SESSION['id']))))
            {
                $check_tag = 1;
            }
        }
    }
}



if(isset($_POST['send']) && !empty($_POST['message'])){

    if(!empty($_GET['id']) && isset($_GET['id'])){

        $check_id = $bdd->prepare('SELECT id FROM user WHERE id = ?');
        $check_id->execute(array($_GET['id']));

        if($check_id->rowCount() > 0){

            $friend['id'] = $_GET['id'];
            include 'actions/friends/checkiffriends.php';


            if(!$test){

                $sender_id = $_SESSION['id'];
                $receiver_id = $_GET['id'];
                date_default_timezone_set('Africa/Douala');
                $heure = date('H:i');
                $date = date('d/m/Y');
                $contenu = nl2br(trim(htmlspecialchars($_POST['message'])));

                $publish_message = $bdd->prepare('INSERT INTO messages(id_sender, id_receiver, heure, date, contenu, vu, tag)VALUES(?, ?, ?, ?, ?, ?, ?)');
                if(isset($check_tag) && ($check_tag == 1)){
                    $publish_message->execute(array($sender_id, $receiver_id, $heure, $date, $contenu, 0, $_GET['tag']));
                }else{
                    $publish_message->execute(array($sender_id, $receiver_id, $heure, $date, $contenu, 0, 0));
                }
                
                $_SESSION['message'] = '';
                header('Location: index.php?id='.$receiver_id);
    
            }else{
                $errorMsg = "";
            }
        }else{
            $errorMsg = "";
        }        
    }else{
        $errorMsg = "";
    }
}