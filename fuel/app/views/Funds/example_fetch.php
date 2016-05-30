<?php
function load_district()  
 {  
      $connect = mysqli_connect("localhost", "root", "dwss", "dwsspb");  
      $output = '';  
      $sql = "SELECT * FROM districts ORDER BY district_name";  
      $result = mysqli_query($connect, $sql);  
      while($row = mysqli_fetch_array($result))  
      {  
           $output .= '<option value="'.$row["id"].'">'.$row["district_name"].'</option>';  
      }  
      return $output;  
 }  

?>



<html>
<head>
<!--
  	//var dist_val = $(this).val();  
	//var hr = new XMLHttpRequest(); //Create Object hr
	//var url = "fill.php"; //Declare Var from which fill we fetch data
	//var fn =document.getElementById("firstname").value;
	//var ln =document.getElementById("lastname").value
	//var vars ="firstname="+fn+"lastname="+ln;
-->
<script type="text/javascript">
	function a(){  
  
	var dist ="D01";
	var district = "id="+dist;
	alert("Hello")
}

</script>
<!--/*		hr.open("POST", url , true);
		hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//var dist = document.getElementById("cbo_district").val();
		
		hr.onreadystatechange = function()
		{
			if(hr.readystate == 4 && hr.status == 200 ) 
			{
				alert("hello");
				var return_data = hr.responseText;
				document.getElementById("status").innerHTML = return_data;
			}
		}
		hr.send(vars);
		document.getElementById("status").innerHTML ="Processing"; */

-->
	



</head>
<body>
<div id="container">
	<h2> Department of Water Supply and Sanitation Punjab
	<fieldset>
		<legend>Select</legend>
		<table>
			<thead>
				<th>
					<label>District</label>
				</th>
				<th>:</th>
				<th>
					<select name= "cbo_district" id="cbo_district" placeholder ="select">
						<option value="1">Select District</option>
						<?php echo load_district(); ?>
					</select>
				</th>
				<th>
					<input type="submit" Value ="Show" name ="btn" onclick="javascript:a();">
				</th>
				<th>fname
				</th>
				<th><input id ="firstname" name="firstname" type ="text"</th>
				<th>fname
				</th>
				<th><input id ="lastname" name="lastname" type ="text"</th>
			</thead>
		</table>
	</fieldset>	
</div>
<div id="status">
</div>
</body>
</html>