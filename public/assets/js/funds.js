$(document).ready(function(){  
      $('#district').change(function(){
        	document.getElementById('mess_district').innerHTML ="";
           	var dist = $(this).val();  
           	dist = dist.trim();
           	 //alert(dist);
			var D01 = ["Select Division","Batala","EE-2 Batala","EE-2,Gurdaspur","Gurdaspur"];           	
			var V01 = ["0","DIV02","DIV82","DIV81","DIV01"];
			var D02 = ["Select Division","Amritsar No1","Amritsar No2","Amritsar No3"];           	
			var V02 = ["0","DIV05","DIV06","DIV07"];
			var D03 = ["Select Division","EE-2, Tarn Taran", "Tarn Taran"];           	
			var V03 = ["0","DIV84","DIV09"];
			var D04 = ["Select Division","EE-2,Kapurthala","Kapurthala"];           	
			var V04 = ["0","DIV80","DIV11"];
			var D05 = ["Select Division","Jalandhar No1","EE-2,Jalandhar No2","Jalandhar No2"];           	
			var V05 = ["0","DIV13","DIV79","DIV14"];
			var D06 = ["Select Division","Garhshankar","Hoshiarpur No1","Hoshiarpur No2", "Talwara"];   
			var V06 = ["0","DIV18","DIV16","DIV17","DIV19"];
			var D07 = ["Select Division","SBS Nagar"];           	
			var V07 = ["0","DIV21"];
			var D08 = ["Select Division","Anandpur Sahib","EE-2, Rupnagar","Rupnagar"];           	
			var V08 = ["0","DIV23","DIV75","DIV24"];
			var D09 = ["Select Division","Ajitgarh Div-3"];           	
			var V09 = ["0","DIV28"];
			var D10 = ["Select Division","Fatehgarh Sahib"];           	
			var V10 = ["0","DIV34"];
			var D11 = ["Select Division","Khanna","Ludhiana No1","EE-2, Ludhiana No2 at Jagraon","Ludhiana No2","Ludhiana No3"];     	
			var V11 = ["0","DIV39","DIV36","DIV78","DIV37","DIV38"];
			var D12 = ["Select Division","EE-2, Moga","Moga"];           	
			var V12 = ["0","DIV76","DIV41"];
			var D13 = ["Select Division","Ferozepur No1","Ferozepur No2","Ferozepur No2 at Zira"];           	
			var V13 = ["0","DIV43","DIV44","DIV85"];
			var D14 = ["Select Division","Malout","Muktsar"];           	
			var V14 = ["0","DIV50","DIV48"];
			var D15 = ["Select Division","Faridkot"];           	
			var V15 = ["0","DIV52"];
			var D16 = ["Select Division","Bathinda No1","Bathinda No2","Bathinda No3"];           	
			var V16 = ["0","DIV54","DIV55","DIV56"];
			var D17 = ["Select Division","Mansa No1","Mansa No2"];           	
			var V17 = ["0","DIV58","DIV59"];
			var D18 = ["Select Division","Malerkotla","Sangrur"];           	
			var V18 = ["0","DIV61","DIV62"];
			var D19 = ["Select Division","Barnala"];           	
			var V19 = ["0","DIV64"];
			var D20 = ["Select Division","Patiala No1","EE-2, Patiala No2","Patiala No2","Rajpura"];           	
			var V20 = ["0","DIV66","DIV77","DIV67","DIV68"];
			var D21 = ["Select Division","EE-2, Pathankot","Pathankot"];           	
			var V21 = ["0","DIV83","DIV03"];
			var D22 = ["Select Division","Abohar","Fazilka"];           	
			var V22 = ["0","DIV46","DIV45"];

           	switch (dist){
	    		case 'D01':
	    			division.options.length=0;
					for(i=0; i < D01.length; i++){
						createOption(division,V01[i],D01[i]);
					}
					document.getElementById('circle_id').value ='C02';
					document.getElementById("wing_id").value = 'Z01';
					document.getElementById("mess_1a").value = 99;
					document.getElementById('mess_2a').value ='C02';
					break;
				
				case 'D02':
	    			division.options.length=0;
					for(i=0; i < D02.length; i++){
						createOption(division,V02[i],D02[i]);
					}
					document.getElementById('circle_id').value ='C01';
					document.getElementById("wing_id").value = 'Z01';
					break;
				case 'D03':
	    			division.options.length=0;
					for(i=0; i < D03.length; i++){
						createOption(division,V03[i],D03[i]);
					}	
					document.getElementById('circle_id').value ='C01';
					document.getElementById("wing_id").value = 'Z01';
					break;
				case 'D04':
	    			division.options.length=0;
					for(i=0; i < D04.length; i++){
						createOption(division,V04[i],D04[i]);
					}	
					document.getElementById('circle_id').value ='C04';
					document.getElementById("wing_id").value = 'Z01';
					break;
				case 'D05':
	    			division.options.length=0;
					for(i=0; i < D05.length; i++){
						createOption(division,V05[i],D05[i]);
					}	
					document.getElementById('circle_id').value ='C04';
					document.getElementById("wing_id").value = 'Z01';
					break;
				case 'D06':
	    			division.options.length=0;
					for(i=0; i < D06.length; i++){
						createOption(division,V06[i],D06[i]);
					}	
					document.getElementById('circle_id').value ='C03';
					document.getElementById("wing_id").value = 'Z01';
					break;
				case 'D07':
	    			division.options.length=0;
					for(i=0; i < D07.length; i++){
						createOption(division,V07[i],D07[i]);
					}	
					document.getElementById('circle_id').value ='C03';
					document.getElementById("wing_id").value = 'Z01';
					break;
				case 'D08':
	    			division.options.length=0;
					for(i=0; i < D08.length; i++){
						createOption(division,V08[i],D08[i]);
					}	
					document.getElementById('circle_id').value ='C05';
					document.getElementById("wing_id").value = 'Z03';
					break;
				case 'D09':
	    			division.options.length=0;
					for(i=0; i < D09.length; i++){
						createOption(division,V09[i],D09[i]);
					}	
					document.getElementById('circle_id').value ='C05';
					document.getElementById("wing_id").value = 'Z03';
					break;
				case 'D10':
	    			division.options.length=0;
					for(i=0; i < D10.length; i++){
						createOption(division,V10[i],D10[i]);
					}	
					document.getElementById('circle_id').value ='C06';
					document.getElementById("wing_id").value = 'Z02';
					break;
				case 'D11':
	    			division.options.length=0;
					for(i=0; i < D11.length; i++){
						createOption(division,V11[i],D11[i]);
					}	
					document.getElementById('circle_id').value ='C11';
					document.getElementById("wing_id").value = 'Z02';
					break;
				case 'D12':
	    			division.options.length=0;
					for(i=0; i < D12.length; i++){
						createOption(division,V12[i],D12[i]);
					}	
					document.getElementById('circle_id').value ='C09';
					document.getElementById("wing_id").value = 'Z03';
					break;
				case 'D13':
	    			division.options.length=0;
					for(i=0; i < D13.length; i++){
						createOption(division,V13[i],D13[i]);
					}	
					document.getElementById('circle_id').value ='C10';
					document.getElementById("wing_id").value = 'Z03';
					break;
				case 'D14':
	    			division.options.length=0;
					for(i=0; i < D14.length; i++){
						createOption(division,V14[i],D14[i]);
					}
					document.getElementById('circle_id').value ='C09';
					document.getElementById("wing_id").value = 'Z03';	
					break;
				case 'D15':
	    			division.options.length=0;
					for(i=0; i < D15.length; i++){
						createOption(division,V15[i],D15[i]);
					}
					document.getElementById('circle_id').value ='C09';
					document.getElementById("wing_id").value = 'Z03';	
					break;
				case 'D16':
	    			division.options.length=0;
					for(i=0; i < D16.length; i++){
						createOption(division,V16[i],D16[i]);
					}
					document.getElementById('circle_id').value ='C08';
					document.getElementById("wing_id").value = 'Z03';	
					break;
				case 'D17':
	    			division.options.length=0;
					for(i=0; i < D17.length; i++){
						createOption(division,V17[i],D17[i]);
					}	
					document.getElementById('circle_id').value ='C08';
					document.getElementById("wing_id").value = 'Z03';
					break;
				case 'D18':
	    			division.options.length=0;
					for(i=0; i < D18.length; i++){
						createOption(division,V18[i],D18[i]);
					}	
					document.getElementById('circle_id').value ='C07';
					document.getElementById("wing_id").value = 'Z02';
					break;
				case 'D19':
	    			division.options.length=0;
					for(i=0; i < D19.length; i++){
						createOption(division,V19[i],D19[i]);
					}
					document.getElementById('circle_id').value ='C07';
					document.getElementById("wing_id").value = 'Z02';	
					break;
				case 'D20':
	    			division.options.length=0;
					for(i=0; i < D20.length; i++){
						createOption(division,V20[i],D20[i]);
					}
					document.getElementById('circle_id').value ='C06';
					document.getElementById("wing_id").value = 'Z02';	
					break
				case 'D21':
	    			division.options.length=0;
					for(i=0; i < D21.length; i++){
						createOption(division,V21[i],D21[i]);
					}
					document.getElementById('circle_id').value ='C02';
					document.getElementById("wing_id").value = 'Z01';	
					break
				case 'D22':
	    			division.options.length=0;
					for(i=0; i < D22.length; i++){
						createOption(division,V22[i],D22[i]);
					}
					document.getElementById('circle_id').value ='C10';
					document.getElementById("wing_id").value = 'Z03';	
					break;
				default:
					division.options.length=0;
					createOption(division,"0","Select Division");
					break;
			}		
      });  
      function createOption(ddl, value, text){
      	var opt = document.createElement('option');
      	opt.value = value;
      	opt.text = text;
      	ddl.options.add(opt);

      }

 });  

