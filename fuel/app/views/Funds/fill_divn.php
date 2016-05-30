<?php  
 //fetch_division.php  
 
 $connect = mysqli_connect("localhost", "root", "dwss", "dwsspb");  
 $output = '';  
 $sql = "SELECT * FROM divisions where district_id = '".$_POST["district"]."' ORDER BY division_name";  
 $result = mysqli_query($connect, $sql);  
 $output = '<option value="0">---All Division---</option>'; 
 while($row = mysqli_fetch_array($result))  
 {  
      $output .= '<option value="'.$row["division_id"].'">'.$row["division_name"].'</option>';  
 }  
 echo $output;  
 ?>  