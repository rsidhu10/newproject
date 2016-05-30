<?php  
 //fetch_division.php  
 
 $connect = mysqli_connect("localhost", "root", "dwss", "dwsspb");  
 $output = '';  
 echo "hello i am here";
 $sql = "SELECT * FROM divisions where district_id = '".$_POST["district_value"]."' ORDER BY division_name";  
 echo $_POST['district_value'];
 $result = mysqli_query($connect, $sql);  
 $output = '<option value="0">---All Division---</option>'; 
 while($row = mysqli_fetch_array($result))  
 {  
      $output .= '<option value="'.$row["division_id"].'">'.$row["division_name"].'</option>';  
 }  
 echo $output;  
 ?>  
 
 