<?php
/*METHOD GET AND GET WITH GET ID*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT,PATCH, POST, GET, OPTIONS, DELETE");

/*CONN DB*/
$host = getenv('DB_HOST');
$dbname= getenv('ALEPH_DATABASE');
$user = 'root';
$pass = 'rootpass';

try {
    $dbh = new PDO ("mysql:host=$host;port=3306;charset=utf8; dbname=$dbname", 'root', 'rootpass');
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Errore connessione al database !' . $e->getMessage();
    die();
}
/*END CONN DB*/

$json = trim(file_get_contents('php://input'));
$input = json_decode($json, true);
$method = $_SERVER['REQUEST_METHOD'];


if (isset ($_GET['id'])) {
    $id = $_GET['id'];

    try {
        $sql = 'SELECT *FROM dispositivi WHERE id = :id';
        $stmt = $dbh->prepare($sql);
        $id = $id;
        $stmt->execute(['id' => $id]);
        $rows = $stmt->fetch();
        echo json_encode($rows);
    } catch (PDOException $e) {
        echo 'Errore select tabella !' . $e->getMessage();
        die();
    }
} else {
    try {
        $sql = 'SELECT *FROM dispositivi';
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    } catch (PDOException $e) {
        echo 'Errore select tabella !' . $e->getMessage();
        die();
    }

}

switch ($method) {
    case 'PATCH':
        $id = $_GET['id'];
        $label = $input["label"];
        $os = $input["os"];
        $price = $input["price"];
        $rate = $input["rate"];
        $description = $input["description"];
        $memory = $input["memory"];
        try {
            $sql = "UPDATE dispositivi SET label=?, os=?, price=?,rate=?,description=? ,memory=? WHERE id=?";
            $stmt = $dbh->prepare($sql);
            $stmt->execute([$label, $os, $price, $rate, $description, $memory, $id]);
        } catch (PDOException $e) {
            echo $sql . "<br/>" . $e->getMessage();
        }
        break;

    case 'POST':
        $id = $_GET['id'];
        $label = $input["label"];
        $os = $input["os"];
        $price = $input["price"];
        $rate = $input["rate"];
        $description = $input["description"];
        $memory = $input["memory"];
        try {
            $sql = "INSERT INTO dispositivi (label,os,price,rate,description,memory)
		VALUES('$label','$os','$price' ,'$rate','$description','$memory')";
            $dbh->exec($sql);
        } catch (PDOException $e) {
            echo $sql . "<br/>" . $e->getMessage();
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        try {
            $sql = "Delete From dispositivi WHERE id= :id";
            $stmt = $dbh->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
        } catch (PDOException $e) {
            echo $sql . "<br/>" . $e->getMessage();
        }
        break;
}


