<?php
    class WorldDataParser {
        public function parseCSV($path) {

            // initialize empty array for all lines
            $array = [];

            // open file
            $file = fopen($path, "r");

            // while there are lines in the file add line to array
            while (($line = fgetcsv($file)) !== FALSE) {
                $array[] = $line;
            }

            return $array;

            fclose($file);
        }
    }
?>