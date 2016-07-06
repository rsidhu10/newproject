
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<?php echo Asset::css('bootstrap.css'); ?>
	<?php echo Asset::css('jquery-ui.css'); ?>
	<?php echo Asset::js('jquery.js'); ?>
	<?php echo Asset::js('jquery-ui.js'); ?>	
	<?php echo Asset::css('bootstrap.css') ?>
	<?php echo Asset::css('report.css') ?>

</head>
<body>

	<?php
        //var_dump($q);
    	$num = 0;
    	$sel = $num;
    	$prog_cur ="WB1a"; 
    	foreach ($q as $row) 
    	{

			// $zone[$num] = $row->wing_name;
			// $pans[$num] = $row->panchayat_count;
			// $vill[$num] = $row->village_count;
			// $habs[$num] = $row->habitation_count;
			// $schs[$num] = $row->scheme_count;
			// $normal[$num] =$row->normal_cen;
			// $sustain[$num] =$row->sustain_cen;
			// $earmark[$num] =$row->earmark_cen;
			// $omfunds[$num] =$row->om_cen;
			// $wb_1a[$num] =$row->wb1a;
			// $wb_2a[$num] =$row->wb2a;
			// $wb_2b[$num] =$row->wb2b;
			// $wb_com4[$num] =$row->wbcom4;
           // $mapnum        =$row->num;
            $zone[$num] = $row->wing;
            $pans[$num] = $row->panchayat;
            $vill[$num] = $row->village;
            
            // $habs[$num] = $row->habitation_count;
            $schs[$num] = $row->scheme;
            
            if($row->surveynum===NULL){
                $surveynum[$num] = 0;
            }
            else
            {
                $surveynum[$num] = $row->surveynum;
            }    

            if($row->num===NULL){
               $mapnum[$num]  =0;    
            }
            else
            {
                $mapnum[$num]  =$row->num;
            }
            if($row->normal===NULL){
                $normal[$num] =0;                
            }
            else
            {
            $normal[$num] =$row->normal;    
            }    
            if($row->sustain===NULL){
                $sustain[$num] =0;    
            }
            else
            {
                $sustain[$num] =$row->sustain;
            }
            
            if($row->earmark===NULL){
                $earmark[$num] =0;
            }
            else
            {
            $earmark[$num] =$row->earmark;
            }
            if($row->omfunds===NULL){
                $omfunds[$num] =0;    
            }
            else {
            $omfunds[$num] =$row->omfunds;
            }
            $wb_1a[$num] =$row->fund1a;
            $wb_2a[$num] =$row->fund2a;
            $wb_2b[$num] =$row->fund2b;
            $wb_com4[$num] =$row->fundcom4;
             
			$num++;

            
		}	
        
        // $pans[0] =3459;
        // $pans[1] =2459;
        // $pans[2] =1459;

		$total = $pans[0] + $pans[1] + $pans[2];
		$total_wb1a = $wb_1a[0] + $wb_1a[1] + $wb_1a[2];
		$total_normal = $normal[0] + $normal[1] +$normal[2];
		$central = $wb_1a[0] + $wb_2a[0] + $wb_2b[0] + $wb_com4[0];
		$north   = $wb_1a[1] + $wb_2a[1] + $wb_2b[1] + $wb_com4[1]; 
		$south   = $wb_1a[2] + $wb_2a[2] + $wb_2b[2] + $wb_com4[2];
		
        $com1a   = $wb_1a[0] + $wb_1a[1] + $wb_1a[2];
		$com2a   = $wb_2a[0] + $wb_2a[1] + $wb_2a[2];
		$com2b   = $wb_2b[0] + $wb_2b[1] + $wb_2b[2];
		$com4    = $wb_com4[0] + $wb_com4[1] + $wb_com4[2];
		$gtamt   = $com1a + $com2a + $com2b + $com4;
        
		$cen_normal  = $normal[0] + $normal[1] + $normal[2];
        $cen_sustain = $sustain[0] + $sustain[1] + $sustain[2];
        $cen_earmark = $earmark[0] + $earmark[1] + $earmark[2];
        $cen_omfunds = $omfunds[0] + $omfunds[1] + $omfunds[2];
        $cen_gtamt   = $cen_normal + $cen_sustain + $cen_earmark +$cen_omfunds; 
        //NRDWP Funds
		$norm_cen = $normal[0] + $normal[1] + $normal[2];
		$sust_cen = $sustain[0] + $sustain[1] + $sustain[2];
		$earm_cen = $earmark[0] + $earmark[1] + $earmark[2];
		$om_cen   = $omfunds[0] + $omfunds[0] + $omfunds[0];
		$gtamt_cen = $norm_cen + $sust_cen + $earm_cen + $om_cen;

	?>
	<!--
    <div class="container">
		<div class="panel-group">
	
			<div class="panel panel-default">
				<div class="panel-heading">
					Basic Reports 
				</div>
				<div class="panel-body">
					<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
				</div>
				<div class="panel panel-primary">
				<div class="panel-heading">
					Financial Reports (NRDWP) 
				</div>
				<div class="panel-body">
					<li>
								<a href="/funds/rpt_wing" >Report-F1-Funds Released under NRDWP Central (Wingwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_circle" >Report-F1-Funds Released under NRDWP Central (Circlewise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_district" >Report-F1-Funds Released under NRDWP Central (Districtwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_division" >Report-F1-Funds Released under NRDWP Central (Divisionwise)
								</a>	
							</li>
				</div>
			</div>
			
		</div>
		
	</div>

<!-- **********************************

	<div class="country-state-graph">
  	  <div class="at-a-glance-report">
    	    <div class="report-home-sub-header">
        	    Reports
        	</div>
        	<div class="report-grid-container">
            	<div class="report-grid">
                	<div class="grid-single hvr-rectangle-in">
                    	<div class="report-cat-name">
	                        <a id="btnPhysical" data-toggle="modal" data-target="#physical" href="javascript:__doPostBack('btnPhysical','')">Physical</a>
	                    </div>
                	</div>
	                <div class="border-veritcal">
	                </div>
	                <div class="grid-single hvr-rectangle-in">
	                    <div class="report-cat-name">
	                        <a id="btnFinancial" data-toggle="modal" data-target="#fianancial" href="javascript:__doPostBack('btnFinancial','')">Financial</a>
	                    </div>
	                </div>
	                <div class="border-veritcal">
	                </div>
	                <div class="grid-single hvr-rectangle-in">
	                    <div class="report-cat-name">
                        <a id="LinkButton1" data-toggle="modal" data-target="#release" href="javascript:__doPostBack('LinkButton1','')">Release</a>
                    </div>
                </div>
            </div>
            <div class="border-horizontal type1">
            </div>
            <div class="report-grid">
                <div class="grid-single hvr-rectangle-in">
                    <div class="report-cat-name">
                        <a id="LinkButton2" data-toggle="modal" data-target="#panchayat" href="javascript:__doPostBack('LinkButton2','')">Panchayat</a>
                    </div>
                </div>
                <div class="border-veritcal">
                </div>
                <div class="grid-single hvr-rectangle-in">
                    <div class="report-cat-name">
                       <a id="HlLogin">Report Login</a></div>
                </div>
                <div class="border-veritcal">
                </div>
                <div class="grid-single hvr-rectangle-in">
                    <div class="report-cat-name">
                        <a id="LinkButton3" data-toggle="modal" data-target="#IECHRD" href="javascript:__doPostBack('LinkButton3','')">IEC/Admin</a>
                    </div>
                </div>
            </div>
            <div class="border-horizontal type2">
            </div>
            <div class="report-grid">
                <div class="grid-single hvr-rectangle-in">
                    <div class="report-cat-name">
                        <a id="LinkButton4" data-toggle="modal" data-target="#monitor" href="javascript:__doPostBack('LinkButton4','')">Monitoring</a>
                    </div>
                </div>
                <div class="border-veritcal">
                </div>
                <div class="grid-single hvr-rectangle-in">
                    <div class="report-cat-name">
                        <a id="LinkButton5" data-toggle="modal" data-target="#special" href="javascript:__doPostBack('LinkButton5','')">Special</a>
                    </div>
                </div>
                <div class="border-veritcal">
                </div>
                <div class="grid-single hvr-rectangle-in">
                    <div class="report-cat-name">
                        <a id="LinkButton6" data-toggle="modal" data-target="#reportcard" href="javascript:__doPostBack('LinkButton6','')">Report Card</a>
                    </div>
                </div>
            </div>

-->
	<div class="container">
        <div class="content-part" id="maincontent" style="min-height: 346px;">
            <div class="row">
                <div class="at-a-glance left" style="">
                    <div class="report-home-sub-header">
                        Punjab at a Glance
                    </div>
                    <div class="at-a-glance-head">
                        Status as per IMIS
                    </div>
                    <div class="single-record">
                        <span>
                            <span id="lblTltCurYear">
                                <p id="show_left_up_1">
                                </p>
                            </span>
                        </span>                                
                            <p id="show_left_up_1_2">
                            
                            </p>
                        <small>
                            status as on 1/4/2015
                        </small>
                    </div>
                    <div class="single-record">
                        <span>
                            <span id="lblTltLastMonth">
                                11288
                            </span>
                        </span>
                        <p>
                            Total Villages
                        </p>
                        <small>
                            status as on 1/4/2015
                        </small>
                    </div>
                    <div class="single-record">
                        <span>
                            <span id="lblTlt7Day">
                                15428
                            </span>
                        </span>
                        <p>
                            Total Habitations
                        </p>
                        <small>
                            status as on 1/4/2015
                        </small>
                    </div>
                    <div class="single-record">
                        <span>
                            <span id="lblTltCurMonth">
                                <p id="show_left_up_4">
                                </p>
                            </span>
                        </span>
                        <p id="show_left_up_4_2">
                            
                        </p>
                        <small>
                             Mapping status as on </br><?php echo date("d-M-y"); ?>
                        </small>
                    </div>
                    <div class="clearfix">
                    </div>
                    <div class="at-a-glance-head">
                        Status of Habitations Directory (2016-17)
                    </div>
                    <div class="single-record">
                        <span>
                            <span id="lblPhotoUploaded2ndOct">
                                <p id="show_left_down_1">
                                </p>
                            </span>
                        </span>                                
                        <p id="show_left_down_1_2">
                            
                        </p>
                        <small>
                            Status as per 1/4/2016
                        </small>
                    </div>
                    <div class="single-record">
                        <span>
                            <span id="lblPhotoUploadedLastMonth">
                                <p id="show_left_down_2">
                                </p>
                            </span>
                        </span>                                
                        <p id="show_left_down_2_2">
                            
                        </p>
                        <small>
                            Status as per 1/4/2016
                        </small>
                    </div>
                    <div class="single-record">
                    <span>
                            <span id="lblPhotoUploadedCurYear">
                                <p id="show_left_down_3">
                                </p>
                            </span>
                    </span>
                    <p id="show_left_down_3_2">
                            
                        </p>
                    <small>
                        Status as per 1/4/2016
                    </small>
                </div>
                <div class="single-record">
                    <span>
                        <span id="lblPhotoUploaded7Day">
                           <p id="show_left_down_4">
                                </p>
                        </span>
                    </span>
                    <p id="show_left_down_4_2">
                            
                        </p>
                    <small>
                        Status as per 1/4/2016
                    </small>
                </div>
            </div>


            <div class="country-state-graph">
                <div class="at-a-glance-report">
                    <div class="report-home-sub-header">
                        Reports
                    </div>
<!--****************-->
                    <div class="report-grid-container">
                        <div class="report-grid">
                            <div class="grid-single hvr-rectangle-in">
                                <div class="report-cat-name">
                                    <a href="/statefunds/rpt_wing" >
                                        State Release						
                                    </a>
                                </div>
                            </div>
                            <div class="border-veritcal">
                            </div>
                            <div class="grid-single hvr-rectangle-in">
                                <div class="report-cat-name">
                                    <a href="/funds/rpt_wing" >
                                        Central Release					
                                    </a>	
                                </div>
                            </div>
                            <div class="border-veritcal">
                            </div>
                            <div class="grid-single hvr-rectangle-in">
                                <div class="report-cat-name">
                                     <a href="/survey/vmap" ><p>Mapping</p> <p>Survey</p></a>
                                </div>
                            </div>
                        </div>
                        <div class="border-horizontal type1">
                        </div>
                        <div class="report-grid">
                            <div class="grid-single hvr-rectangle-in">
                                <div class="report-cat-name">
                                    <a href="/survey/survey_input" ><p>Service</p> <p>Delivery</p></a>

                                </div>
                            </div>
                            <div class="border-veritcal">
                            </div>
                            <div class="grid-single hvr-rectangle-in">
                                <div class="report-cat-name">
                                   <a href="#">
                                        Achievement (2016-17)
                                    </a>
                                </div>
                            </div>
                            <div class="border-veritcal">
                            </div>
                            <div class="grid-single hvr-rectangle-in">
                                <div class="report-cat-name">
                                    <!--<p id="mapstatus">Status
                                    </p>-->
                                    <p><h4 id="mapwing"></h4>
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="border-horizontal type2">
                        </div>
                        <div class="report-grid">
                            <div class="grid-single hvr-rectangle-in">
                                <div class="report-cat-name">
                                    <a href="#">
                                        2a Habitations
                                    </a>
                                </div>
                            </div>
                            <div class="border-veritcal">
                            </div>
                            <div class="grid-single hvr-rectangle-in">
                                <div class="report-cat-name">
                                    <a href="#">
                                        ?????
                                    </a>
                                </div>
                            </div>
                            <div class="border-veritcal">
                                </div>
                                <div class="grid-single hvr-rectangle-in">
                                    <div class="report-cat-name">
                                        <a href="/imis/test" ><p>Mapping </p> <p>Villages</p></a>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix">
                            </div>
                        </div>
                    </div>


                    <div class="at-a-glance right">
                        <div class="report-home-sub-header">
                            Funds Released (2016-17) <span></span>
                        </div>
                        <div class="at-a-glance-head">
                            Status of WB Funds (Amt in lacs)
                        </div>
                        <div class="single-record">
                            <span>
                                <span id="lblTltCurYear">
                                    <p id = "c_selamount">
                                    </p>
                                </span>
                            </span>
                                <p id="c_selprog_state">
                                </p>
                            <small>
                                status as on <?php echo date("d-M-y"); ?>
                            </small>
                        </div>
                        <div class="single-record">
                            <span>
                                <span id="lblTltLastMonth">
                                    <p id = "n_selamount">
                                    </p>
                                </span>
                            </span>
                                <p id="n_selprog_state">
                                </p>
                            <small>
                                status as on <?php echo date("d-M-y"); ?>
                            </small>
                        </div>
                        <div class="single-record">
                            <span>
                                <span id="lblTlt7Day">
                                    <p id = "s_selamount">
                                    </p>
                                </span>
                            </span>
                                <p id="s_selprog_state">
                                </p>
                            <small>
                                status as on <?php echo date("d-M-y"); ?>
                            </small>
                        </div>
                        <div class="single-record">
                            <span>
                                <span id="lblTltCurMonth">
                                    <p id = "t_selamount">
                                    </p>
                                </span>
                            </span>
                                <p id="t_selprog_state">
                                </p>
                            <small>status as on <?php echo date("d-M-y"); ?> </small>
                        </div>
                       
                        <div class="clearfix">
                        </div>
                        <div class="at-a-glance-head">
                            Status of NRDWP Funds (Amt in lacs)
                        </div>
                        <div class="single-record">
                            <span>
                                <span id="lblPhotoUploaded2ndOct">
                                	<p id = "c_selamount_cen">
                                    </p>
                                </span>
                            </span>                                
                            <p id="c_selprog_center">
                            </p>
                            <small>
                                status upto <?php echo date("d-M-y"); ?>
                            </small>
                        </div>
                        <div class="single-record">
                            <span>
                                <span id="lblPhotoUploadedLastMonth">
                                <p id = "n_selamount_cen" > 
                                </p>	
                                </span></span>
                            
                            <p id="n_selprog_center">
                            </p>
                            <small>
                                status upto <?php echo date("d-M-y"); ?>
                            </small>
                        </div>
                        <div class="single-record">
                            <span>
                                <span id="lblPhotoUploadedCurYear">
                                    <p id =  "s_selamount_cen">
                                    </p>
                                </span>
                            </span>
                            <p id="s_selprog_center"> 
                            </p>
                            <small>
                                status upto <?php echo date("d-M-y"); ?>
                            </small>
                        </div>
                        <div class="single-record">
                            <span>
                                <span id="lblPhotoUploaded7Day">
                                    <p id = "t_selamount_cen">
                                    </p>
                                </span>
                            </span>
                            <p id = "t_selprog_center"> 
                            </p>
                            <small>
                                status upto <?php echo date("d-M-y"); ?>
                            </small>
                        </div>
                    </div>
                    <div class="report-grid-container">
                        <div id="totalcoverage">
                        </div>
                        
                    </div>
                </div>
                <div class="clearfix">
                </div>
                <div class="state-coverage-status padding-left-right">
                    <div class="header">
                        Various Reports
                    </div>
                    <div id="statecoverage" style="width: 100%;">
                    </div>
                </div>
            </div>
            <div class="clearfix">
            </div>
        </div>
        <div class="clearfix">
        </div>
    </div>
</div>
        
        <div class="modal fade report-home-custom-modal" id="state" tabindex="-1" role="dialog"
            aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fa fa-times-circle"></i></span>
                        </button>
                        <h4 class="modal-title" id="H2">
                            Select State</h4>
                    </div>
                    <div class="modal-body mis-content-list">
                        
                        <div class="clearfix">
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            <div class="modal fade report-home-custom-modal" id="physical" tabindex="-1" role="dialog"
                aria-labelledby="myModalLabel">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fa fa-times-circle"></i></span>
                            </button>
                            <h4 class="modal-title" id="myModalLabel">
                                [Format A] Physical Progress</h4>
                        </div>
                        <div class="modal-body mis-content-list">
                            <ul>
                                <li><a href="../Report_NBA/Physical/Rpt_TargetVsAch_SelectionBased.aspx?id=Home" target="_blank">
                                    <span class="format-count">[A03]</span><span class="link">Swachh Bharat Mission Target
                                        Vs Achievement of BLS-2012 (Entry Status)</span></a></li>
                                <li><a href="../Report_NBA/Physical/RptIHHLProgressWithMGNREGA.aspx?id=Home" target="_blank">
                                    <span class="format-count">[A21]</span><span class="link">Statewise status of IHHL Convergence
                                        with MNREGA or IAY for the Financial Year</span></a></li>
                                <li><a href="../Report_NBA/Physical/Rpt_PhysicalProgreReported.aspx?id=Home" target="_blank">
                                    <span class="format-count">[A22]</span><span class="link">Physical Progress Reported
                                        by States</span></a></li>
                                <li><a href="../Report/Physical/RptStateDistrictMonthWiseMPRMFR_net.aspx?id=Home" target="_blank">
                                    <span class="format-count">[A10]</span><span class="link">Month wise Physical Progress
                                        during financial Year</span></a></li>
                                <li><a href="../Report/Physical/RptYearWiseCountryLevelAch.aspx?id=Home" target="_blank">
                                    <span class="format-count">[A07]</span><span class="link">Year Wise Country Level Achievements</span></a></li>
                                <li><a href="../Report/Physical/Rpt_PhysiMPRBetweendate.aspx?id=Home" target="_blank">
                                    <span class="format-count">[A05]</span><span class="link">Comparative Physical Report</span></a></li>
                                <li><a href="../Report_NBA/Physical/Rpt_StatusofDefunctionalToilet.aspx?id=Home" target="_blank">
                                    <span class="format-count">[A23]</span><span class="link"> Coverage Status of Dysfunctional
                                        Toilet found in BLS-2012</span></a></li>
                                <li><a href="../Report_NBA/MonitoringStatus/Rpt_EntryStatusofCommunityOtherToiletAccess.aspx?id=Home" target="_blank">
                                    <span class="format-count">[A24]</span><span class="link"> HH's accessing Community/Other
                                        Toilet</span></a></li>
                            </ul>
                            <div class="clearfix">
                            </div>
                        </div>
                    </div>
                </div>
            </div>













<!-- ----------------------------------------- -->
	<div class="container">
		<table>
			<tr>
				<td>
					<div class="panel panel-default">
						<div class="panel-heading">Basic Reports</div>
						<div class="panel-body">
							<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
						</div>	
					</div>
				</td>
				<td>
					<div class="panel panel-default">
						<div class="panel-heading">Financial Reports (NRDWP)</div>
						<div class="panel-body">
							<li>
								<a href="/funds/rpt_wing" >Report-F1-Funds Released under NRDWP Central (Wingwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_circle" >Report-F1-Funds Released under NRDWP Central (Circlewise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_district" >Report-F1-Funds Released under NRDWP Central (Districtwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_division" >Report-F1-Funds Released under NRDWP Central (Divisionwise)
								</a>	
							</li>

						</div>	
					</div>
				</td>
				<td>
					<div class="panel panel-default">
						<div class="panel-heading">Physical Reports</div>
						<div class="panel-body">
							<li>
								<a href="/funds/rpt_wing" >Report-F1-Funds Released under NRDWP Central (Wingwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_circle" >Report-F1-Funds Released under NRDWP Central (Circlewise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_district" >Report-F1-Funds Released under NRDWP Central (Districtwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_division" >Report-F1-Funds Released under NRDWP Central (Divisionwise)
								</a>	
							</li>
						</div>	
					</div>
				</td>	
			</tr>
			<tr>
				<td>
					<div class="panel panel-default">
						<div class="panel-heading">Estimate Approved Reports</div>
						<div class="panel-body">
								<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/wingwise_status_habs" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/village/circle/all" >Report-B1- Wingwise Status of Punjab</a>
							</li>
							<li>
								<a href="/funds/rpt_district" >Report-F1-Funds Released under NRDWP Central (Districtwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_division" >Report-F1-Funds Released under NRDWP Central (Divisionwise)
								</a>	
							</li>
						</div>	
					</div>
				</td>
				<td>
					<div class="panel panel-default">
						<div class="panel-heading">Financial Reports (World Bank)</div>
						<div class="panel-body">
							<li>
								<a href="/statefunds/rpt_wing" >Report-F3-Funds Released under World Bank (Wingwise) 						</a>
							</li>
							<li>
								<a href="/statefunds/rpt_circle" >Report-F4-Funds Released under World Bank (Circlewise) 						</a>
							</li>
							<li>
								<a href="/statefunds/rpt_district" >Report-F5-Funds Released under World Bank (Districtwise) 						</a>
							</li>
							<li>
								<a href="/statefunds/rpt_division" >Report-F6-Funds Released under World Bank (Divisionwise) 						</a>
							</li>

						</div>	
					</div>
				</td>
				<td>
					<div class="panel panel-default">
						<div class="panel-heading">Survey Reports</div>
						<div class="panel-body">
							<li>
								<a href="/funds/rpt_wing" >Report-F1-Funds Released under NRDWP Central (Wingwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_circle" >Report-F1-Funds Released under NRDWP Central (Circlewise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_district" >Report-F1-Funds Released under NRDWP Central (Districtwise)
								</a>	
							</li>
							<li>
								<a href="/funds/rpt_division" >Report-F1-Funds Released under NRDWP Central (Divisionwise)
								</a>	
							</li>
						</div>	
					</div>
				</td>	
			</tr>
			
		</table>
        <table>
            <tr>
                <th></th>

        </table>
	</div>

<script type="text/javascript">
	var funds  =['Component-WB1a','Component-WB2a','Component-WB2b','Component-Com4','All Components'];

	var funds_cen  =['Normal + QA','Sustainability','Earmarked ','O & M','NRDWP Progrom'];

	var totalamtc = <?php echo $wb_1a[0]; ?> + 
					<?php echo $wb_2a[0]; ?> +
					<?php echo $wb_2b[0]; ?> + 
					<?php echo $wb_com4[0];?>; 

	var amountc = [	<?php echo $wb_1a[0]; ?>,
	 				<?php echo $wb_2a[0]; ?>,
	 				<?php echo $wb_2b[0]; ?>,
	 				<?php echo $wb_com4[0];?>,
	 				totalamtc]; 

    var mapvil  = [ <?php echo $mapnum[0]; ?>,
                    <?php echo $mapnum[1]; ?>,
                    <?php echo $mapnum[2]; ?>,
                    <?php echo $mapnum[0]; ?>+
                    <?php echo $mapnum[1]; ?>+
                    <?php echo $mapnum[2]; ?>,
                    ""
                    ];                  
    var mis_center=[<?php echo $pans[0];?>,
                    <?php echo $vill[0];?>,
                    <?php echo 1234; ?>,
                    <?php echo 2345; ?>,
                    <?php echo $schs[0];?>];
    
    var mis_label= ["Panchayats",
                    "Villages",
                    "Habitations",
                    "Other Habs",
                    "Schemes"];                               

    var mis_north= [<?php echo $pans[1];?>,
                    <?php echo $vill[1];?>,
                    <?php echo 1234; ?>,
                    <?php echo 2345; ?>,
                    <?php echo $schs[1];?>];
    
    var mis_south= [<?php echo $pans[2];?>,
                    <?php echo $vill[2];?>,
                    <?php echo 1234; ?>,
                    <?php echo 2345; ?>,
                    <?php echo $schs[2];?>];

    var mis_total= [<?php echo $pans[0];?>+
                    <?php echo $pans[1];?>+
                    <?php echo $pans[2];?>,
                    <?php echo $vill[0];?>+
                    <?php echo $vill[1];?>+
                    <?php echo $vill[2];?>,
                    <?php echo 7234; ?>,
                    <?php echo 6345; ?>,
                    <?php echo $schs[0];?>+
                    <?php echo $schs[1];?>+
                    <?php echo $schs[2];?>];

    var surveymap =[<?php echo $surveynum[0];?>,
                    <?php echo $surveynum[1];?>,
                    <?php echo $surveynum[2];?>,
                    <?php echo $surveynum[0];?>+
                    <?php echo $surveynum[1];?>+
                    <?php echo $surveynum[2];?>,
                    "Mapping Status"
                    ];                
                    
    

    var zonename = ["Central",
                    "North",
                    "South",
                    "Total",
                    "Status"];                

	var totalamtn = <?php echo $wb_1a[1];?>+ 
                    <?php echo $wb_2a[1];?>+
                    <?php echo $wb_2b[1];?>+ 
                    <?php echo $wb_com4[1];?>;  
	
    var amountn =  [<?php echo $wb_1a[1]; ?>,
                    <?php echo $wb_2a[1]; ?>,
                    <?php echo $wb_2b[1]; ?>,
                    <?php echo $wb_com4[1]; ?>,
                    totalamtn]; 

	var totalamts = <?php echo $wb_1a[2]; ?>+ 
                    <?php echo $wb_2a[2]; ?>+
                    <?php echo $wb_2b[2]; ?>+ 
                    <?php echo $wb_com4[2];?>;  

	var amounts =  [<?php echo $wb_1a[2]; ?>,
                    <?php echo $wb_2a[2]; ?>,
                    <?php echo $wb_2b[2]; ?>,
                    <?php echo $wb_com4[2]; ?>,
                    <?php echo $south; ?>]; 

	var amountt =  [<?php echo $com1a;?>,
                    <?php echo $com2a;?>,
                    <?php echo $com2b;?>,
                    <?php echo $com4;?>,
                    <?php echo $gtamt;?>];

	var totalamtc_cen = <?php echo $normal[0]; ?>+
                        <?php echo $sustain[0];?>+
                        <?php echo $earmark[0];?>+ 
                        <?php echo $omfunds[0];?>;

	var amountc_cen = [ <?php echo $normal[0]; ?>,
                        <?php echo $sustain[0];?>,
                        <?php echo $earmark[0];?>, 
                        <?php echo $omfunds[0];?>, 
                        totalamtc_cen];

    var totalamtn_cen = <?php echo $normal[1];?>+ 
                        <?php echo $sustain[1];?>+
                        <?php echo $earmark[1];?>+ 
                        <?php echo $omfunds[1]; ?>;

    var amountn_cen = [ <?php echo $normal[1]; ?>, 
                        <?php echo $sustain[1];?>,
                        <?php echo $earmark[1];?>, 
                        <?php echo $omfunds[1];?>, 
                        totalamtn_cen];

    var totalamts_cen = <?php echo $normal[2];?>+ 
                        <?php echo $sustain[2];?>+
                        <?php echo $earmark[2];?>+ 
                        <?php echo $omfunds[2]; ?>;

    var amounts_cen = [ <?php echo $normal[2];?>, 
                        <?php echo $sustain[2];?>,
                        <?php echo $earmark[2];?>, 
                        <?php echo $omfunds[2];?>, 
                        totalamts_cen];
    
    var total_cen = [<?php echo $norm_cen;?>,
                    <?php echo $sust_cen;?>,
                    <?php echo $earm_cen;?>,
                    <?php echo $om_cen;  ?>,
                    <?php echo $gtamt_cen;?>];





	var totalfunds = funds.length;
	var i =0;
	var c_s1 = document.getElementById("c_selamount");
	var c_s2 = document.getElementById("c_selprog_state");
	var n_s1 = document.getElementById("n_selamount");
	var n_s2 = document.getElementById("n_selprog_state");
	var s_s1 = document.getElementById("s_selamount");
	var s_s2 = document.getElementById("s_selprog_state");
	var t_s1 = document.getElementById("t_selamount");
	var t_s2 = document.getElementById("t_selprog_state");
	var c_s1_cen = document.getElementById("c_selamount_cen");
	var c_s2_cen = document.getElementById("c_selprog_center");
	var n_s1_cen = document.getElementById("n_selamount_cen");
    var n_s2_cen = document.getElementById("n_selprog_center");
    var s_s1_cen = document.getElementById("s_selamount_cen");
    var s_s2_cen = document.getElementById("s_selprog_center");
    var t_s1_cen = document.getElementById("t_selamount_cen");
    var t_s2_cen = document.getElementById("t_selprog_center");
    var mwing   = document.getElementById("mapwing");
    var mstat   = document.getElementById("mapstatus");
    var left_down_1_1 = document.getElementById("show_left_down_1");
    var left_down_1_2 = document.getElementById("show_left_down_1_2");
    var left_down_2_1 = document.getElementById("show_left_down_2");
    var left_down_2_2 = document.getElementById("show_left_down_2_2");
    var left_down_3_1 = document.getElementById("show_left_down_3");
    var left_down_3_2 = document.getElementById("show_left_down_3_2");
    var left_down_4_1 = document.getElementById("show_left_down_4");
    var left_down_4_2 = document.getElementById("show_left_down_4_2");
    var left_top_4_1 = document.getElementById("show_left_up_4");
    var left_top_4_2 = document.getElementById("show_left_up_4_2");
                   

	function loop() {
		if(i> (funds.length-1)){
			i=0;
		}
		$prog_cur = funds[i];
		//alert($prog_cur);
      // mwing.innerHTML = mywing[i];
      // mstat.innerHTML = mapvil[i] ;     
	   left_down_1_1.innerHTML="Central :" + mis_center[i];
       left_down_1_2.innerHTML= mis_label[i];
       left_down_2_1.innerHTML="North :" + mis_north[i];
       left_down_2_2.innerHTML= mis_label[i];
       left_down_3_1.innerHTML="South :" + mis_south[i];
       left_down_3_2.innerHTML= mis_label[i];
       left_down_4_1.innerHTML="Punjab :" + mis_total[i];
       left_down_4_2.innerHTML= mis_label[i];
       
        //c_s1.innerHTML = "Mapped villages" + mapvil[i] ;
		c_s1.innerHTML = "Central :" + amountc[i];
		c_s2.innerHTML = funds[i];	
		n_s1.innerHTML = "North :" + amountn[i];
		n_s2.innerHTML = funds[i];	
		s_s1.innerHTML = "South :" + amounts[i];
		s_s2.innerHTML = funds[i];	
		t_s1.innerHTML = "Total  :" + amountt[i];
		t_s2.innerHTML = funds[i];
        c_s1_cen.innerHTML = "Central : " + amountc_cen[i];
        c_s2_cen.innerHTML = funds_cen[i];
        n_s1_cen.innerHTML = "North : " + amountn_cen[i];
        n_s2_cen.innerHTML = funds_cen[i];
        s_s1_cen.innerHTML = "South : " + amounts_cen[i];
        s_s2_cen.innerHTML = funds_cen[i];
        t_s1_cen.innerHTML = "Total Funds: " + total_cen[i];
        t_s2_cen.innerHTML = funds_cen[i];
        mwing.innerHTML = "<p> Mapping </p> " + zonename[i] + " " + mapvil[i] ; 
        if(i==4){
           left_top_4_1.innerHTML = surveymap[i];    
        }
        else{
        left_top_4_1.innerHTML = zonename[i] +" : " +surveymap[i];       			
        left_top_4_2.innerHTML=  "Survey Data";
        }
		i++;
		loopTimer = setTimeout('loop()',3000);
	}
	loop();
</script>

<script type="text/javascript">
    function loop2() {
        if(counter1> (4-1)){
            counter1=0;
        }
       //mwing.innerHTML = zonename[counter1] + " " + mapvil[counter1] ; 
       //mstat.innerHTML = ;     
       //left_top_4_1.innerHTML = surveymap;
       left_top_4_1.innerHTML="Punjab :" + mis_total[i];
       left_top_4_2.innerHTML= mis_label[i];
      


        counter1++;
        loopTimer = setTimeout('loop2()',1000);
    }
    loop2();
</script>

</body>
</html>

