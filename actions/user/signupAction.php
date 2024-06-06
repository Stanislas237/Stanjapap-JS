<?php
session_start();
require('actions/database.php');

if(isset($_POST['btn'])){
    if(!empty($_POST['pseudo']) && !empty($_POST['pass']) && !empty($_POST['pass2'])){

        if($_POST['pass'] == $_POST['pass2']){

            $pseudo = trim(htmlspecialchars($_POST['pseudo']));
            $mdp = password_hash($_POST['pass'], PASSWORD_DEFAULT);
    
            $check_user = $bdd->prepare('SELECT * FROM user WHERE pseudo = ?');
            $check_user->execute(array($pseudo));
    
            if($check_user->rowCount() == 0){
    
                $new_user = $bdd->prepare('INSERT INTO user(pseudo, password, id_ami, nb_ami, last_id, profil)VALUES(?, ?, ?, ?, ?, ?)');
                $new_user->execute(array($pseudo, $mdp, '', 0, 0, 'assets/profiles/Nopicture.png'));
    
                $check_user = $bdd->prepare('SELECT id FROM user WHERE pseudo = ?');
                $check_user->execute(array($pseudo));
                $new_user = $check_user->fetch();
    
                $_SESSION['auth'] = 0;
                $_SESSION['message'] = "";
                $_SESSION['pseudo'] = $pseudo;
                $_SESSION['id'] = $new_user['id'];
    
                header('Location: index.php');
    
            }else{
                $errorMsg = "Ce pseudo existe déjà, choisissez un autre svp";
            }
        }else{
            $errorMsg = "Les mots de passe doivent être identiques ..";
        }
    }else{
        $errorMsg = "Veuillez remplir tous les champs ..";
    }
}