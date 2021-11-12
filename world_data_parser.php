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

            // close file
            fclose($file);

            // get the array on $array index 0 which contains the xml key values, then remove that array from $array            
            $names = array_splice($array[0], 0);
            unset($array[0]);
            $array = array_values($array);

            foreach($array as $key => $value) {
                $array[$key] = array_combine($names, $value);
            }

            return $array;
        }

        public function saveXML($array) {

            // inspired by solutions on https://stackoverflow.com/questions/1397036/how-to-convert-array-to-simplexml

            $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><Countries></Countries>');

            $domxml = new DOMDocument('1.0');
            $domxml->preserveWhiteSpace = false;
            $domxml->formatOutput = true;
            /* @var $xml SimpleXMLElement */
            $domxml->loadXML($xml->asXML());

            echo '<pre>';
            print_r($xml->saveXML());
            echo '</pre>';

            // return true if file saved or false if not
            return $domxml->save('world_data.xml');
        }

        public function printXML($xml, $xsl) {
            return TRUE;
        }
    }
?>