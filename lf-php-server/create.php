<?php
	$host = getenv('DB_HOST');
	$dbname= getenv('ALEPH_DATABASE');
	$user='root';
	$pass= getenv('ALEPH_DB_ROOT_PASSWORD');
// 	$dbname= getenv('ALEPH_DATABASE');
	$pdo = new PDO("mysql:host=$host;port=3306;charset=utf8; dbname=$dbname", 'root', 'rootpass');
	//$pdo = new PDO("mysql:host=localhost; dbname=$dbname", $user, $pass);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$dbname = "`".str_replace("`","``",$dbname)."`";
	$pdo->query("CREATE DATABASE IF NOT EXISTS $dbname");
	$pdo->query("use $dbname");

 	$dbname= getenv('ALEPH_DATABASE');
	$table = "sezioni";
	$table2 ="user";

// 			try {
// 		 $db = new PDO ("mysql:host=$host;port=3306;charset=utf8; dbname=$dbname", $user,$pass);
// 		 $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );//Error Handling
// 		 $query = $db->prepare("CREATE TABLE IF NOT EXISTS $table(
// 					   `id` int(11) AUTO_INCREMENT,
// 					   `nome` varchar(100),
// 					   `descrizione` varchar(100),
// 					   `immagine` text,
//
//
// 					   PRIMARY KEY(`id`))");
// 	$query->execute();
// 	}
// 	catch (PDOException $e) {
// 	  echo 'Errore !' . $e->getMessage();
// 	}
// 	$nome = 'One Plus 8';
//     $descrizione = 'android';
// 	$immagine = '750';
//
//    		try {
// 			$sql = "INSERT INTO sezioni (nome,descrizione, immagine)
// 		VALUES('$nome','$descrizione','$immagine')";
// 			$db->exec($sql);
// 		}catch(PDOException $e) {
// 			 $sql ."<br/>" . $e->getMessage();
// 		}


	try {
    		 $db = new PDO ("mysql:host=mysqldb;port=3306;charset=utf8; dbname=$dbname", $user,$pass);
    		 $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );//Error Handling
    		 $query = $db->prepare("CREATE TABLE IF NOT EXISTS $table2  (
    					   `id` int(11) AUTO_INCREMENT,
    					   `username` varchar(100) NOT NULL,
    					   `password` varchar(100) NOT NULL,
    					   `scadenza` varchar(100) NOT NULL,
    					   `token`    varchar(100) NOT NULL,
--     					   `price` float NOT NULL,
--     					   `isbn` varchar(100) NOT NULL,
--     					   `description` text NOT NULL,
--     					   `img` mediumtext NOT NULL,
    					   PRIMARY KEY(`id`))");
    	$query->execute();
    	}
    	catch (PDOException $e) {
    	  echo 'Errore !' . $e->getMessage();
    	}



	$username = 'demo';
    $password = 'demo';
	$scadenza = '30000';
	$token = '';
       		try {
    			$sql = "INSERT INTO user (username,password,scadenza,token)
    		VALUES('$username','$password','$scadenza' ,'$token')";
    			$db->exec($sql);
    		}catch(PDOException $e) {
    			echo $sql ."<br/>" . $e->getMessage();
    		}
