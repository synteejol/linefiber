    <?php
    /*METHOD GET AND GET WITH GET ID*/
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 1000");
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
    header("Access-Control-Allow-Methods: PUT,PATCH, POST, GET, OPTIONS, DELETE");

    $servername = getenv('DB_HOST');
    $username   = "root";
    $password   = getenv('ALEPH_DB_ROOT_PASSWORD');
    $dbname     = getenv('ALEPH_DATABASE');

    $idsez = $_GET['idsez'];
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
      //echo "Connected successfully";
    $sql = "SELECT * FROM video WHERE `idsezione`=$idsez ";
//     $sql2 = "SELECT * FROM video";

    $result = mysqli_query($conn,$sql);
    $myArray = array();
    if ($result->num_rows > 0) {
    // output data of each row
        while($row = $result->fetch_assoc()) {
            $myArray[] = $row;
        }
        print json_encode($myArray);
//         echo $idsez;
    }
    else
    {
        echo "0 results";
    }
    ?>
