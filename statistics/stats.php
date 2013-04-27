<?php
// load database
$databaseName = "stats.csv";
$database = array();

print_r($_GET);

function getRowByName($name, $array2d){
	foreach ($array2d as $key => $value) {
		if($value[0] == $name){
			return $key;
		}
	}
	return false;
}

if (($handle = fopen($databaseName, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
    	$database[] = $data;
    }
    fclose($handle);
}

foreach ($_GET as $key => $value) {
	$row = getRowByName($key, $database);
	if($row === false){
		echo "adding";
		$database[] = array($key);
		$row = count($database)-1;
	}
	if($value != 1){
		echo "adding value";
		$database[$row][] = $value;
	}
	else {
		$database[$row][1] = (int)$database[$row][1] + 1;
	}
}

$fp = fopen($databaseName, 'w');

foreach ($database as $fields) {
    fputcsv($fp, $fields);
}
?>