<?php 

$final = "";
$j = "'Bradley Hand ITC'";
$del_message = '<p style="color:purple; font-family:'.$j.'; font-style:italic; font-weight:bold">Ce message a été supprimé..</p>';

$final = $final."<br><div class='warning' align='center'><div>Vos messages sont cryptés de bout en bout.<p>Profitez de notre espace pour converser avec vos proches.</p></div></div><br>";

while($messages = $get_message->fetch())
{
    if(!isset($actu_date) || ($actu_date != $messages['date'])){
        $final = $final."<div class='date'>".$messages['date']."</div><br>";
    }
    $actu_date = $messages['date'];
    if($messages['id_sender'] == $_SESSION['id']){
        $class = 'me';
    }else{
        $class = 'you';
    }
    $final = $final."<div style='float:right'><div class=".$class.">";
    if($messages['tag'] > 0){
        $message_data = $bdd->prepare('SELECT id_sender, contenu FROM messages WHERE id = ?');
        $message_data->execute(array($messages['tag']));
        $message = $message_data->fetch();
    
        $final = $final.'<a href="#'.$messages['tag'].'" onclick="color('.$messages['tag'].');"><div class="tag"><div class="tagcontent"><div class="sender">';
        if($message["id_sender"] == $_SESSION["id"]){
            $final = $final."Vous";
        }else{
            $final = $final.$receiver["pseudo"];
        }
        $final = $final.'</div><div class="text">'.$message['contenu'].'</div></div></div></a><br>';
    }
    if($messages['contenu'] != $del_message){
        $final = $final."<a href='".$messages['id']."' class='liens' onclick='currentM();'>";
    }
    $final = $final."<div id='".$messages['id']."' class='last'>".$messages['contenu']."<br><br><div class='heure last'>".$messages['heure'];
    if(($messages['id_sender'] == $_SESSION['id']) && ($messages['contenu'] != $del_message)){
        $id_message = $messages['id'];
        $final = $final."<a href='deletemessage.php?id=".$id_message."'><img src='assets/delete.png'></a>";
        if(($messages['vu'] == 0)){
            $final = $final."<img src='assets/sent.png'>";
        }else{
            $final = $final."<img src='assets/seen.png'>";
        }
    }
    $final = $final."</div></div>";
    if($messages['contenu'] != $del_message){
        $final = $final."</a>";
    }
    $final = $final."</div></div><br>";
}
echo $final;
?>