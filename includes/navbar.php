<nav class="navbar">
    <div class="brand">@<?=$_SESSION['pseudo']?></div>
    <div class="link">
        <div class="nav-item">
            <a class="nav-link" href="upload.php">Profil</a>
        </div>
        <div class="nav-item">
            <a class="nav-link" href="newfriend.php">Nouvelle discussion</a>
        </div>

        <div class="nav-item">
            <a class="nav-link-logout" href="actions/user/logoutAction.php">Déconnexion</a>
        </div>
    </div>
</nav>

<div class="searchbar" method="get">
    <input type="search" placeholder= "Recherchez vos contacts ici.." name="search"
        <?php
            if(isset($_POST['search'])){
                echo "value='".$_POST['search']."'";
            }
        ?>
    >
    <button type="submit" name="btn">Rechercher</button>
</div>

<hr>