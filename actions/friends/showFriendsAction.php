<?php

try {
    $bdd = new PDO('mysql:host=localhost;dbname=mailbox;charset=utf8mb4', 'root', '');
} catch (Exception $e) {
    die ('Une erreur a été trouvée : '. $e->getMessage());
}

$friends = $bdd->prepare('SELECT id_ami FROM user WHERE id = ?');
$friends->execute(array($_GET['id']));
$friends = $friends->fetch();

if($friends['id_ami'] != ""){
    $list = rtrim($friends['id_ami'], ',');

    $friend_list = $bdd->query('SELECT id FROM user WHERE id IN('.$list.')');

    while($friend_data = $friend_list->fetch()){
        $last_id = $bdd->prepare('SELECT MAX(id) FROM messages WHERE ((id_sender = ? AND id_receiver = ?) OR (id_sender = ? AND id_receiver = ?)) AND heure <> ?');
        $last_id->execute(array($_SESSION['id'], $friend_data['id'], $friend_data['id'], $_SESSION['id'], ""));
        $last_id = $last_id->fetch();

        $friend_list2 = $bdd->prepare('UPDATE user SET last_id = ? WHERE id = ?');
        $friend_list2->execute(array($last_id[0], $friend_data['id']));
    }

    $friend_list = $bdd->query('SELECT id, pseudo, profil FROM user WHERE id IN('.implode(",", $a).') ORDER BY last_id DESC');

    while ($friend_data = $friend_list->fetch()){
        ?>
            <div class="disc">
                <a href="index.php?id=<?=$friend_data['id']?>">
                    <div class="contact">
                        <img src="<?=$friend_data['profil']?>">
                        <?=$friend_data['pseudo']?>
                    </div>
                </a>
            </div><hr>
        <?php 
    }
}

echo json_encode($result);

?>