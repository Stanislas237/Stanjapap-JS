<?php
    require('actions/user/securityAction.php');
    require('actions/user/uploadAction.php');
?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/head.php'; ?>
<body>
    
<br><br>
  <form class="container" method="POST" enctype="multipart/form-data">

    <?php 
      if(isset($errorMsg)) {
        echo '<p style="color:red">'.$errorMsg.'</p>';
      }
      echo "<br>Sélectionnez un fichier PNG de moins de 500Ko svp..<br><br>";
    ?>
    <div class="mb-2">
        <div class="mb-3">
          <label>Image</label>
        </div>
        <div class="mb-3">
          <input type="file" name="profile" accept="image/png"/>
        </div>
    </div><br>
    <button type="submit" class="btn-primary" name="btn">Valider</button>
    <br><br><br><p>Retour à <a href="index.php" class="lien_i">mes discussions</a></p>
  </form>
</body>
</html>