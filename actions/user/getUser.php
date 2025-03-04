<?php

try {
    $bdd = new PDO('mysql:host=localhost;dbname=mailbox;charset=utf8mb4', 'root', '');
} catch (Exception $e) {
    die ('Une erreur a été trouvée : '. $e->getMessage());
}

$self = $bdd->prepare('SELECT * FROM user WHERE id = ?');
$friends->execute(array($_GET['id']));

$result = [];
while ($row = $friends->fetch_assoc()) {
    $result[] = $row;
}
echo json_encode($result);

?>