$(document).ready(function(){  
      $('#district').change(function(){  
           	var dist = $(this).val();  
           	dist = dist.trim();
           	 //alert(dist);
			var D01 = ["Batala","Gurdaspur"];           	
			var V01 = ["DIV02","DIV01"];
			var D02 = ["Amritsar No1","Amritsar No2","Amritsar No3"];           	
			var V02 = ["DIV05","DIV06","DIV07"];
			var D03 = ["Tarn Taran",];           	
			var V03 = ["DIV09"];
			var D04 = ["Kapurthala"];           	
			var V04 = ["DIV11"];
			var D05 = ["Jalandhar No1","Jalandhar No2"];           	
			var V05 = ["DIV13","DIV14"];
			var D06 = ["Garhshankar","Hoshiarpur No1","Hoshiarpur No2", "Talwara"];   
			var V06 = ["DIV18","DIV16","DIV17","DIV19"];
			var D07 = ["SBS Nagar"];           	
			var V07 = ["DIV21"];
			var D08 = ["Anandpur Sahib","Rupnagar"];           	
			var V08 = ["DIV23","DIV24"];
			var D09 = ["SAS Nagar"];           	
			var V09 = ["DIV28"];
			var D10 = ["Fatehgarh Sahib"];           	
			var V10 = ["DIV34"];
			var D11 = ["Khanna","Ludhiana No1","Ludhiana No2","Ludhiana No3"];     	
			var V11 = ["DIV39","DIV36","DIV37","DIV38"];
			var D12 = ["Moga"];           	
			var V12 = ["DIV41"];
			var D13 = ["Ferozepur No1","Ferozepur No2"];           	
			var V13 = ["DIV43","DIV44",];
			var D14 = ["Malout","Muktsar"];           	
			var V14 = ["DIV50","DIV48"];
			var D15 = ["Faridkot"];           	
			var V15 = ["DIV52"];
			var D16 = ["Bathinda No1","Bathinda No2","Bathinda No3"];           	
			var V16 = ["DIV54","DIV55","DIV56"];
			var D17 = ["Mansa No1","Mansa No2"];           	
			var V17 = ["DIV58","DIV59"];
			var D18 = ["Malerkotla","Sangrur"];           	
			var V18 = ["DIV61","DIV62"];
			var D19 = ["Barnala"];           	
			var V19 = ["DIV64"];
			var D20 = ["Patiala No1","Patiala No2","Rajpura"];           	
			var V20 = ["DIV66","DIV67","DIV"];
			var D21 = ["Pathankot"];           	
			var V21 = ["DIV03"];
			var D22 = ["Abohar","Fazilka"];           	
			var V22 = ["DIV46","DIV45"];

           	switch (dist){
	    		case 'D01':
	    			division.options.length=0;
					for(i=0; i < D01.length; i++){
						createOption(division,V01[i],D01[i]);
					}
					break;
				
				case 'D02':
	    			division.options.length=0;
					for(i=0; i < D02.length; i++){
						createOption(division,V02[i],D02[i]);
					}
					break;
				case 'D03':
	    			division.options.length=0;
					for(i=0; i < D03.length; i++){
						createOption(division,V03[i],D03[i]);
					}	
					break;
				case 'D04':
	    			division.options.length=0;
					for(i=0; i < D04.length; i++){
						createOption(division,V04[i],D04[i]);
					}	
					break;
				case 'D05':
	    			division.options.length=0;
					for(i=0; i < D05.length; i++){
						createOption(division,V05[i],D05[i]);
					}	
					break;
				case 'D06':
	    			division.options.length=0;
					for(i=0; i < D06.length; i++){
						createOption(division,V06[i],D06[i]);
					}	
					break;
				case 'D07':
	    			division.options.length=0;
					for(i=0; i < D07.length; i++){
						createOption(division,V07[i],D07[i]);
					}	
					break;
				case 'D08':
	    			division.options.length=0;
					for(i=0; i < D08.length; i++){
						createOption(division,V08[i],D08[i]);
					}	
					break;
				case 'D09':
	    			division.options.length=0;
					for(i=0; i < D09.length; i++){
						createOption(division,V09[i],D09[i]);
					}	
					break;
				case 'D10':
	    			division.options.length=0;
					for(i=0; i < D10.length; i++){
						createOption(division,V10[i],D10[i]);
					}	
					break;
				case 'D11':
	    			division.options.length=0;
					for(i=0; i < D11.length; i++){
						createOption(division,V11[i],D11[i]);
					}	
					break;
				case 'D12':
	    			division.options.length=0;
					for(i=0; i < D12.length; i++){
						createOption(division,V12[i],D12[i]);
					}	
					break;
				case 'D13':
	    			division.options.length=0;
					for(i=0; i < D13.length; i++){
						createOption(division,V13[i],D13[i]);
					}	
					break;
				case 'D14':
	    			division.options.length=0;
					for(i=0; i < D14.length; i++){
						createOption(division,V14[i],D14[i]);
					}	
					break;
				case 'D15':
	    			division.options.length=0;
					for(i=0; i < D15.length; i++){
						createOption(division,V15[i],D15[i]);
					}	
					break;
				case 'D16':
	    			division.options.length=0;
					for(i=0; i < D16.length; i++){
						createOption(division,V16[i],D16[i]);
					}	
					break;
				case 'D17':
	    			division.options.length=0;
					for(i=0; i < D17.length; i++){
						createOption(division,V17[i],D17[i]);
					}	
					break;
				case 'D18':
	    			division.options.length=0;
					for(i=0; i < D18.length; i++){
						createOption(division,V18[i],D18[i]);
					}	
					break;
				case 'D19':
	    			division.options.length=0;
					for(i=0; i < D19.length; i++){
						createOption(division,V19[i],D19[i]);
					}	
					break;
				case 'D20':
	    			division.options.length=0;
					for(i=0; i < D20.length; i++){
						createOption(division,V20[i],D20[i]);
					}	
					break
				case 'D21':
	    			division.options.length=0;
					for(i=0; i < D21.length; i++){
						createOption(division,V21[i],D21[i]);
					}	
					break
				case 'D22':
	    			division.options.length=0;
					for(i=0; i < D22.length; i++){
						createOption(division,V22[i],D22[i]);
					}	
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
    function mynormal(){
    var x = document.getElementById("#normal");
    alert("gotit");
    //x.value = x.value.toUpperCase();
    }
    

    });    


 });  
