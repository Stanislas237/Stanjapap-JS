<?php
  require('actions/user/securityAction.php');
  require('actions/friends/newfriendAction.php');
?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/head.php'; ?>
<body>
    
<br><br>
  <form class="container" method="POST">

    <?php 
      if(isset($errorMsg)) {
        echo '<p style="color:red">'.$errorMsg.'</p>';
      }
    ?>
    <?= "<br>Entrez le pseudo de l'utilisateur à contacter svp<br>"; ?>
    <br><div class="mb-2">
        <div class="mb-3">
          <label for="exampleInputEmail1"><b>Pseudo</b></label>
        </div>
        <div class="mb-3">
          <input type="text" name="pseudo"><br>
        </div>
    </div><br>
    <button type="submit" class="btn-primary" name="btn">Valider</button>
    <br><br><br><p>Retour à <a href="index.php" class="lien_i">mes discussions</a></p>
  </form>
</body>
</html>