<?php
    require("world_data_parser.php");

    $parser = new WorldDataParser();

    $array = $parser->parseCSV("world_data_v1.csv");

    if($parser->saveXML($array)) {
        print($parser->printXML("world_data_v1.csv", "world_data_v1.csv"));
    }
?>