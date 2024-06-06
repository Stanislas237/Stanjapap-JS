<?php

$user_data = $bdd->prepare('SELECT id_ami, nb_ami FROM user WHERE id = ?');
$user_data->execute(array($_SESSION['id']));
$user = $user_data->fetch();

$friend_list = explode(',', $user['id_ami']);

$i = 0;
$test = true;
while ($i <= ($user['nb_ami'])-1){
    if($friend_list[$i] == $friend['id']){
        $test = false;
    }
    $i = $i + 1;
}
