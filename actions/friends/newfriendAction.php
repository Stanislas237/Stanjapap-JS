<?php

require('actions/database.php');

if(isset($_POST['btn'])){
    if(!empty($_POST['pseudo'])){

        $pseudo = trim(htmlspecialchars($_POST['pseudo']));

        $check_friend = $bdd->prepare('SELECT id FROM user WHERE pseudo = BINARY ?');
        $check_friend->execute(array($pseudo));

        if($check_friend->rowCount() > 0){

            if($pseudo != $_SESSION['pseudo']){

                $friend = $check_friend->fetch();
                include 'actions/friends/checkiffriends.php';

                if($test){
                    $new_friend = $bdd->prepare('UPDATE user SET id_ami = ?, nb_ami = ? WHERE id = ?');
                    $new_friend->execute(array($user['id_ami'].$friend['id'].',', ($user['nb_ami']+1), $_SESSION['id']));
        
                    header('Location: index.php');
                }else{
                    $errorMsg = "Vous êtes déjà amis ..";
                }   
            }else{
                $errorMsg = "Vous ne pouvez pas entrer votre pseudo ..";
            }
        }else{
            $errorMsg = "Cet utilisateur n'existe pas ..";
        }
    }else{
        $errorMsg = "Remplissez le pseudo ..";
    }
}