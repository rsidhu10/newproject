<?php  
 //fetch_division.php  
 
 $connect = mysqli_connect("localhost", "root", "dwss", "dwsspb");  
 $output = '';  
 $sql = "SELECT * FROM villages where division_id = '".$_POST["division_id"]."' ORDER BY village_name";  
 $result = mysqli_query($connect, $sql);  
 $output = '<option value="0">---All Division---</option>'; 
 while($row = mysqli_fetch_array($result))  
 {  
      $output .= '<option value="'.$row["village_misid"].'">'.$row["village_name"].'</option>';  
 }  
 echo $output;  
 ?>  