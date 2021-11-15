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

            // inspired by https://www.codementor.io/@dev_amitpandey/convert-multidimensional-array-to-xml-file-in-php-wt74w2bvw

            // create a new dom with a formatted output
            $dom = new DOMDocument('1.0', 'UTF-8');
            $dom->formatOutput = true;

            // create base node "Countries"
            $countries = $dom->appendChild($dom->createElement("Countries"));

            foreach($array as $key => $value) {

                // for each country in the array a new node is added
                $country = $countries->appendChild($dom->createElement("Country"));

                foreach($value as $subkey => $subvalue) {

                    // if the key contains spaces return only the first word, then remove the remaining spaces
                    if (preg_match('/\s/', $subkey)) {
                        $subkey = str_replace(' ', '', substr($subkey, 0, strpos($subkey, ' ')));
                    }
                
                    // for each attribute of a country a new node is added within that country
                    $country->appendChild($dom->createElement($subkey, str_replace(' ', '', $subvalue)));
                }
            }

            // return true if file saved or false if not
            return $dom->save('world_data.xml');
        }

        public function printXML($xml_path, $xsl_path) {

            // load xml
            $xml = new DOMDocument();
            $xml->load($xml_path);
    
            // create xslt processor
            $xslt = new XSLTProcessor();
    
            // load xsl and import it with the processor
            $xsl = new DOMDocument();
            $xsl->load($xsl_path);
            $xslt->importStylesheet($xsl);
    
            // return transformed 
            return $xslt->transformToXML($xml);
        }
    }
?>