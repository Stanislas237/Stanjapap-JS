<?php

require('actions/database.php');

if((isset($_POST['btn'])) && !empty($_POST['search'])){

    $search = trim(htmlspecialchars($_POST['search']));

    $friends_match = $bdd->query('SELECT id, pseudo,profil FROM user WHERE pseudo LIKE "%'.$search.'%"');
}

