<?php
    require("world_data_parser.php");

    $parser = new WorldDataParser();

    $array = $parser->parseCSV("world_data_v1.csv");

    if($parser->saveXML($array)) {
        print("XML Savestatus: erfolgreich (1)");
    } else {
        print("XML Savestatus: nicht erfolgreich (0)");
    } 
?>