<?php

try {
    $bdd = new PDO('mysql:host=localhost;dbname=mailbox;charset=utf8mb4', 'Stanislas', 'pokamarte');
} catch (Exception $e) {
    die ('Une erreur a été trouvée : '. $e->getMessage());
}
