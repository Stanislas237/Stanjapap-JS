<?php 
    include 'includes/navbar.php';

    if(isset($_GET['scroll'])){
        echo '
            <script language="Javascript">
                function scroll() {
                    a.scrollTop ='.$_GET["scroll"].';
                }
            </script>
        ';
    }else{
        echo '
            <script language="Javascript">
                function scroll() {
                    a.scrollTop = a.scrollHeight;
                }
            </script>
        ';
    }

    if(!isset($friends_match))
    {
        $user_friends = $bdd->prepare('SELECT id_ami FROM user WHERE id = ?');
        $user_friends->execute(array($_SESSION['id']));
        $user_friends = $user_friends->fetch();

        if($user_friends['id_ami'] != ""){
            $a = explode(',', $user_friends['id_ami']);
            array_pop($a);
            $friend_list = $bdd->query('SELECT id FROM user WHERE id IN('.implode(',', $a).')');

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

    }else{
        while ($matching = $friends_match->fetch()){

            $friend = $matching;
            include 'actions/friends/checkiffriends.php';

            if(!$test){
                ?>
                    <div class="disc">
                        <a href="index.php?id=<?=$matching['id']?>">
                            <div class="contact">
                                <img src="<?=$matching['profil']?>">
                                <?=$matching['pseudo']?>
                            </div>
                        </a>
                    </div><hr>
                <?php 
            }
        }
    }
?>
