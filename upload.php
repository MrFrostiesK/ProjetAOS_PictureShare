<?php
function genRanStr($length = 20) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
$ds = DIRECTORY_SEPARATOR;
$storeFolder = 'memes';
if (!empty($_FILES)) {
    $tempFile = $_FILES['fileToUpload']['tmp_name'];
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;
    $fullname = $_FILES['fileToUpload']['name'];
    $type = end(explode(".", $fullname));
    $fname = genRanStr() . "." . $type; 
    $targetFile =  $targetPath . $fname;
    $types = array("jpeg", "jpg", "png", "gif", "bmp", "tiff");
    if(in_array($type, $types)){
        if($_FILES["fileToUpload"]["size"] < 20000000){
            move_uploaded_file($tempFile,$targetFile);
            echo "File was uploaded to <a href='/memes/".$fname."'/memes/".$fname;
        }
        else echo "La taille de votre photo est trop importante, le maximum est de: 20 MiB!";
    }
    else echo "Something went terribly wrong!";
}
echo "titre ".$_POST["title"];
$url = 'http://localhost:3000/api/memes';
$data = array('title' => $_POST["title"], 'file' => '/memes/'.$fname, 'score' => '0', 'author' => $_POST["authoresu"]);
$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);
echo json_encode($data)." test ";
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) {
    echo "<br>";
}
echo "<br>";
var_dump($result);
echo "<br>";
var_dump($context);
//header("Location: http://the-dodo.xyz/");
?>