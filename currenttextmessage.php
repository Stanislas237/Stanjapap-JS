<?php

session_start();

if(isset($_GET['m']) && !empty($_GET['m'])){
    $_SESSION['message'] = $_GET['m'];
}
