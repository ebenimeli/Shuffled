<?php

$topic = 'general-es-en';

if ( !isset( $_GET[ 'topic' ] ) ) {
    $topic = 'general-es-en';
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
<title>Words!</title>
<link rel = 'stylesheet' type = 'text/css' href = 'css/style.css'>
<meta charset = 'UTF-8'>
</head>

<body onload = 'preloadAudio()'>

<div id = 'num'></div>
<div id = 'word'></div>

<div id = 'solution'>???</div>

<div id = 'user'>
<input type = 'text' id = 'guess' oninput = 'clearInput()'>
</div>

<center>
<div id = 'points'>0 points</div>
</center>

<div id = 'summary'>
</div>

<div id = 'credits'>
<span>Developed by <a href = 'https://www.ebenimeli.org' target = '_blank'>Enrique Benimeli</a></span>
<span><a href = 'https://twitter.com/enriquebenimeli' target = '_blank'>@enriquebenimeli</a></span>
</div>

<script src = 'js/words.js'></script>

</body>

</html>
