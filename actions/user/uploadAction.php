<?php

require('actions/database.php');


if(isset($_FILES["profile"]) && !empty($_FILES["profile"]["tmp_name"])){

  $target_dir = "assets/profiles/";
  $target_file = $target_dir . basename($_FILES["profile"]["name"]);
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
  
  // Lorsqu'on clique sur valider
  if(isset($_POST["btn"])) {

    // Vérifie la taille du fichier
    if ($_FILES["profile"]["size"] > 500000) {
      $errorMsg= "Fichier trop lourd..";
      $uploadOk = 0;
    }else{
    
      //Vérifie si c'est bien une image
      $check = getimagesize($_FILES["profile"]["tmp_name"]);
      if($check == false){
        $uploadOk = 0;
      }
    
      // Vérifie le type du fichier
      if(($imageFileType != "png") && ($uploadOk == 1)){
        $errorMsg= "Ceci n'est pas un PNG..";
        $uploadOk = 0;
      }
    
      // Check if $uploadOk is set to 0 by an error
      if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["profile"]["tmp_name"], $target_file)) {
          rename ('assets/profiles/'.$_FILES["profile"]["name"], 'assets/profiles/'.$_SESSION["id"].'.png');
  
          $set_pp = $bdd->prepare('UPDATE user SET profil = ? WHERE id = ?');
          $set_pp->execute(array('assets/profiles/'.$_SESSION["id"].'.png', $_SESSION["id"]));
  
          header('Location: index.php');
  
        } else {
          $errorMsg= "Unknown error, please retry..";
        }
      }
    }
  }
}else if(empty($_FILES["profile"]["tmp_name"]) && isset($_POST["btn"]) && !empty($_FILES["profile"]["name"])){
  $errorMsg= "Fichier trop lourd..";
}
?>