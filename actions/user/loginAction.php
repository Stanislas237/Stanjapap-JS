<?php
session_start();
require('actions/database.php');

if(isset($_POST['btn'])){
    if(!empty($_POST['pseudo']) && !empty($_POST['pass'])){

        $pseudo = trim(htmlspecialchars($_POST['pseudo']));
        $mdp = htmlspecialchars($_POST['pass']);

        $check_user = $bdd->prepare('SELECT * FROM user WHERE pseudo = ?');
        $check_user->execute(array($pseudo));

        if($check_user->rowCount() > 0){

            $user = $check_user->fetch();

            if(password_verify($mdp, $user['password'])){

                $_SESSION['auth'] = 0;
                $_SESSION['pseudo'] = $user['pseudo'];
                $_SESSION['message'] = "";
                $_SESSION['id'] = $user['id'];
                $errorMsg = "bien ..";

                header('Location: index.php');

            }else{
                $errorMsg = "Entrée invalide ..";
            }

        }else{
            $errorMsg = "Entrée invalide ..";
        }
    }else{
        $errorMsg = "Veuillez remplir tous les champs ..";
    }
}