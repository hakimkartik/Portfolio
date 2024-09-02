<?php
if($_POST["submit"]) {
    $recipient="hakimkartik@gmail.com";
    $subject="Feedback from Portfolio Website";
    $sender=$_POST["name"];
    $senderEmail=$_POST["email"];
    $message=$_POST["comments"];
    $mailBody="Name: $sender\nEmail Address: $senderEmail\n\nMessage: $message";
    mail($recipient, $subject, $mailBody);
    sleep(1);
    alert("Message Sent! Thank you for your feedbacks")
    header("index.html");
}
?>