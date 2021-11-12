<?php
    require("world_data_parser.php");

    $parser = new WorldDataParser();

    $array = $parser->parseCSV("world_data_v1.csv");

    // print the parsed array as html pre elementS
    echo '<pre>';
    print_r($array);
    echo '</pre>';
?>