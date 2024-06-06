<?php

require('actions/database.php');

$check_message = $bdd->prepare('SELECT id_sender, id_receiver, heure, date, contenu FROM messages WHERE id = ?');
$check_message->execute(array($_GET['id']));
$message_data = $check_message->fetch();

$i = "'Bradley Hand ITC'";
$del_message = '<p style="color:purple; font-family:'.$i.'; font-style:italic; font-weight:bold">Ce message a été supprimé..</p>';

if(($message_data['id_sender'] != $_SESSION['id']) || ($message_data['contenu'] == $del_message)){
    header('Location: index.php');
}

if(isset($_POST['btn'])){

    if(isset($_GET['id']) && !empty($_GET['id'])){

        $id = $message_data['id_receiver'];

        $check_message = $bdd->prepare('UPDATE messages SET heure = ?, contenu = ?, tag = ? WHERE id = ?');
        $check_message->execute(array("", $del_message, 0, $_GET['id']));

        header('Location: index.php?id='.$id);

    }else{
        header('Location: index.php');
    }
}