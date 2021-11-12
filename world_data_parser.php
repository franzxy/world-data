<?php
    class WorldDataParser {

        public function parseCSV($path) {

            // initialize empty array for all lines
            $array = [];

            // open file
            $file = fopen($path, "r");

            // while there are lines in the file add line to array
            while ($line = fgetcsv($file)) {
                $array[] = $line;
            }

            return $array;

            fclose($file);
        }

        public function saveXML($array) {

            // inspired by solutions on https://stackoverflow.com/questions/1397036/how-to-convert-array-to-simplexml

            $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><data></data>');

            function array_to_xml( $data, &$xml ) {
                foreach( $data as $key => $value ) {
                    if( is_array($value) ) {
                        if( is_numeric($key) ){
                            $key = 'item'.$key; //dealing with <0/>..<n/> issues
                        }
                        $subnode = $xml->addChild($key);
                        array_to_xml($value, $subnode);
                    } else {
                        $xml->addChild("$key",htmlspecialchars("$value"));
                    }
                }
            }

            array_to_xml($array,$xml);

            // return true if file saved or false if not
            return $xml->asXML('world_data.xml');
        }
    }
?>