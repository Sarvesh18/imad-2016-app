<?php
   //$db_host = "db.imad.hasura-app.io";
   //$db_port = "5432";
   //$db_user = "sarvesh18";
   //$db_pass = "db-sarvesh18-95101";
   //$db_name = "sarvesh18";
   ////mysql_connect($db_host, $db_user, $db_pass);
   ////mysql_select_db($db_name) or die(mysql_error());
   //$con = mysqli_connect($db_host,$db_user,$db_pass,$db_name);
   
   $conn = pg_connect("host=db.imad.hasura-app.io port=5432 dbname=sarvesh18 user=sarvesh18 password=db-sarvesh18-95101");
   //$result = pg_query($db_connection, "SELECT lastname FROM employees");
   
   if($conn)
	echo "Connection Successful !";
   else
    echo "Connection Error";
?>
