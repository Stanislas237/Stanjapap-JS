<?php
  require('actions/user/signupAction.php');
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
    <div class="mb-2">
        <div class="mb-3">
          <label>Pseudo</label><hr>
          <label>Password</label><hr>
          <label>Password</label>
        </div>
        <div class="mb-3">
          <input type="text" name="pseudo"><br>
          <input type="password" name="pass"><br>
          <input type="password" name="pass2">
        </div>
    </div><br>
    <button type="submit" class="btn-primary" name="btn">S'inscrire</button>
    <br><br><br><p>J'ai déjà un compte, <a href="login.php" class="lien_i">se connecter</a></p>
  </form>
</body>
</html>