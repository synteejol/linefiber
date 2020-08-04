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
	$user = "root";
	$pass = getenv('ALEPH_DB_ROOT_PASSWORD');

    try {
        $dbh = new PDO ("mysql:host=$host;port=3306;charset=utf8; dbname=$dbname", $user,$pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        echo 'Errore connessione al database !' . $e->getMessage();
        die();
    }
	/*END CONN DB*/
	$json = trim(file_get_contents('php://input'));
	$input = json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '',$json), true);
	//Make sure that it is a POST request.

			$username = $_REQUEST['username'];
			$password = $_REQUEST['password'];

			if (isset($username ) AND isset($password)) {

			$fields = array('username' => $username , 'password' => $password);
			// Create token header as a JSON string
			$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
			// Create token payload as a JSON string
			$payload = json_encode($fields);

			// Encode Header to Base64Url String
			$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

			// Encode Payload to Base64Url String
			$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

			// Create Signature Hash
			$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);

			// Encode Signature to Base64Url String
			$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

			// Create JWT
			$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
			}
			else {
				exit();
			}
			// echo $jwt;
			    try{
					$sql = "UPDATE user SET token=? WHERE username=? AND password=?";
					$stmt= $dbh->prepare($sql);
					$stmt->execute([$jwt, $username, $password]);
				}catch(PDOException $e) {
					echo $sql ."<br/>" . $e->getMessage();
				}



		try{
		$sql = 'SELECT token, scadenza FROM user WHERE username = :username AND password = :password';
		$stmt = $dbh->prepare($sql);
		$stmt->execute(array('username' => $username, 'password' => $password));
		$rows = $stmt->fetch();
		$num_rows = $stmt->rowCount();
		} catch (PDOException $e) {
			echo 'Errore select tabella !' . $e->getMessage();
			die();
		}
		if ($num_rows == 1) {
			echo json_encode($rows);
		}
		else { 
		$response["msg"] = "Credenziali errate";
		$response["error"] = 1;
		echo json_encode($response);
		}


