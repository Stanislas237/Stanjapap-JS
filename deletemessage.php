<?php
  require('actions/user/securityAction.php');
  require('actions/messages/deletemessageAction.php');
?>
<!DOCTYPE html>
<html lang="en">
<?php include 'includes/head.php'; ?>
<body>
    
<br><br>
  <form class="container" method="POST">
    <p style="color:red">Voulez-vous vraiment supprimer ce message ?</p><br><br>
    <div class="mb-4">
      <button type="submit" name="btn">Oui</button>
      <a href="javascript:history.back();">Non</a>
    </div><br>
    <br>
  </form>
</body>
</html>