<?php

$topic = 'general-es-en';

$next_random = "data_" . rand(1, 15);

if ( !isset( $_GET[ 'topic' ] ) ) {
    $random_number = rand(1, 14);
    $topic = 'data_' . $random_number;
} else {
    $topic = $_GET[ 'topic' ];
}

$fileName = 'data/' . $topic . '.txt';
$file = fopen( $fileName, 'r' );

if ( $file ) {
    $words = array();
    while ( ( $line = fgets( $file ) ) !== false ) {
        $pair = explode( ':', $line );
        $words[] = array( trim( $pair[ 0 ] ), trim( $pair[ 1 ] ) );
    }
    fclose( $file );

    // Convert the PHP array to a JSON string
    $jsonWords = json_encode( $words );
}
?>

<script>
// Parse the JSON string into a JavaScript array
var dictionary = <?php echo $jsonWords;
?>;

// Create two empty arrays for the original words and translated words
var wordsES = [];
var words = [];

// Loop through the words array and add each word to the appropriate array
for ( var i = 0; i < dictionary.length; i++ ) {
    wordsES.push( dictionary[ i ][ 0 ] );
    words.push( dictionary[ i ][ 1 ] );
}
</script>

<!DOCTYPE html>
<html>

<head>
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RE35635XG0"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RE35635XG0');
</script>
<title>Shuffled!</title>
<link rel = 'stylesheet' type = 'text/css' href = 'css/style.css'>
<meta charset = 'UTF-8'>
</head>

<body onload = 'preloadAudio()'>

<?php
if($topic == "marcelino") {
?>
<div id="topBanner">
    <span class="title"><a href="index.php">SHUFFLED</a></span> | <a href="https://www.esferatic.com" target="_blank">Esfera TIC</a><!-- | <a href="https://ebenimeli.substack.com/" target="_blank">La ventana digital</a> | <a href="https://notasalvuelo.substack.com/" target="_blank">Notas al vuelo</a> --> | <a href="https://www.ebenimeli.org/" target="_blank">Enrique Benimeli</a>
</div>
<?php } ?>

<div id="topics-menu">
    <a href="topics.html">Temas</a>
</div>

<?php
if($topic == "marcelino") {
?>
<div id="marcelino">San Marcelino Champagnat</div>
<?php } ?>

<div id = 'num'></div>
<div id = 'word'></div>

<div id = 'solution'>???</div>

<div id = 'user'>
<input type = 'text' id = 'guess' oninput = 'clearInput()'>
</div>

<center>
<div id = 'points'>0 puntos</div>
</center>

<div id = 'summary'>
</div>

<div id="playagain" class="container">
    <div class="center">
        <a href="https://www.esferatic.com/shuffled?topic=<?php echo $topic; ?>">Repetir este tema</a>
        <a href="https://www.esferatic.com/shuffled?topic=<?php echo $next_random; ?>">Otro tema al azar</a>
    </div>
</div>

<div id = 'credits'>
<span>by <a href = 'https://www.ebenimeli.org' target = '_blank'>Enrique Benimeli</a> · 2025</span>
<span>
    <a href = 'https://twitter.com/esferatic' target = '_blank'>@esferatic</a>
</span>
<span>
    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Play and learn new words!" data-url="https://www.esferatic.com/shuffled/" data-via="esferatic" data-hashtags="words,game,languages" data-related="enriquebenimeli" data-show-count="false">Tweet</a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<script src = 'js/words.js'></script>

</body>

</html>
