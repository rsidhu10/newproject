<?php
class Controller_Posts extends Controller_Template
{
		
	public function action_index()
#	{
#		$new = Model_Wing::forge();
#		$new->id = 'Z04';
#		$new->wing_name= 'Punjab';
#		$new->wing_circle= 3;
#		$new->wing_district= 5;
#		$new->wing_block = 18;
#		$new->wing_panchayat= 3418;
#		$new->wing_village= 4318;
#		$new->wing_habitations= 4318;
#		$new->save();
#		$posts  = Model_Wing::find('all');
#		$data = array('posts'  => $posts);
#        $this->template->title = 'Blog Posts';
#        $this->template->content = View::forge('posts/index', $data, false);
#	}

	{

		// $result['q'] =DB::select('*')
		// 			->from('wing_stats')
		// 			->join('wings','LEFT')
		// 			->on('wings.id', '=', 'wing_stats.wing_id')
		// 			->order_by('wing_name','asc')
		// 			->as_object()
		// 			->execute();
		
// 		$result['q'] =DB::query("select z.wing_name as wing, sf.funds1a as fund1a, sf.funds2a as fund2a, sf.funds2b as fund2b, sf.fundscom4 as fundcom4, cf.normal as normal, cf.sustain as sustain, cf.earmark as earmark, cf.omfunds as omfunds, map.num as num
// from 

// 		(select w.id, sum(s.funds_1a) as funds1a, sum(s.funds_2a) as funds2a, sum(s.funds_2b) as funds2b, sum(s.funds_com4) as fundscom4
// 		from (Select * from state_funds where deleted =0)  as s left join wings as w on w.id = s.wing_id group by w.id)  as sf
			
// left join 
// wings as z on
// z.id = sf.id

// left join 
	
// 		(select w.id, sum(r.funds_cen_normal) as normal, sum(r.funds_cen_sustain) as sustain, sum(r.funds_cen_earmark) as earmark, sum(r.funds_cen_om) as omfunds
// 		from (Select * from releases where deleted =0) as r left join wings as w on w.id = r.wing_id group by w.id) as cf 
// on
// z.id = cf.id

// left join
// 		(SELECT v.zone_id as id, v.circle_id as c_id, v.district_id as d_id, v.division_id as div_id, v.block_id as b_id, count(m.misid) as num  
// 			FROM mappedvillages as m left join villages as v on v.village_misid = m.misid group by v.zone_id) as map 
// on
// z.id = map.id")
			
		$result['q'] =DB::query	("SELECT z.wing_name as wing,pans.panchayat as panchayat,vill.village as village ,sch.scheme as scheme, sf.funds1a as fund1a, sf.funds2a as fund2a, sf.funds2b as fund2b, sf.fundscom4 as fundcom4 , cf.normal as normal, cf.sustain as sustain, cf.earmark as earmark, cf.omfunds as omfunds,mapped.num as num , survey.surveynum as surveynum
FROM 

		(SELECT w.id, SUM(s.funds_1a) AS funds1a, SUM(s.funds_2a) AS funds2a, SUM(s.funds_2b) AS funds2b, SUM(s.funds_com4) AS fundscom4
		FROM (SELECT * FROM state_funds where deleted =0)  AS s LEFT JOIN wings AS w ON w.id = s.wing_id GROUP BY w.id)  AS sf
			
LEFT JOIN 
wings AS z ON
z.id = sf.id

LEFT JOIN 
	
		(SELECT w.id, SUM(r.funds_cen_normal) AS normal, SUM(r.funds_cen_sustain) AS sustain, SUM(r.funds_cen_earmark) AS earmark, SUM(r.funds_cen_om) AS omfunds
		FROM (SELECT * FROM releASes where deleted =0) AS r LEFT JOIN wings AS w ON w.id = r.wing_id GROUP BY w.id) AS cf 
ON
z.id = cf.id

LEFT JOIN
		(SELECT v.zONe_id AS id, v.circle_id AS c_id, v.district_id AS d_id, v.divisiON_id AS div_id, v.block_id AS b_id, COUNT(m.misid) AS num  
			FROM mappedvillages AS m LEFT JOIN villages AS v ON v.village_misid = m.misid GROUP BY v.zone_id) AS mapped 
ON
z.id = mapped.id

LEFT JOIN
                     (SELECT w.id AS id, w.wing_name AS wing,COUNT(v.village_name) AS village FROM `villages` AS v 
                     LEFT JOIN wings AS w ON w.id = v.zONe_id GROUP BY v.zONe_id) AS vill
ON
z.id =vill.id

LEFT JOIN
                    (SELECT w.id AS id,COUNT(p.pan_name) AS panchayat FROM `panchayats` AS p 
                    LEFT JOIN wings AS w ON w.id = p.wing_id GROUP BY w.id) AS pans
ON
z.id = pans.id

LEFT JOIN
                    (select w.id AS id,count(s.sch_name) AS scheme FROM schemes AS s
                    LEFT JOIN wings AS w ON w.id = s.wing_id GROUP BY wing_id) AS SCH
ON
z.id = sch.id

LEFT JOIN
		(SELECT v.zone_id AS id, COUNT(m.misid) AS surveynum  
			FROM mappedsurvey AS m LEFT JOIN villages AS v ON v.village_misid = m.misid where deleted = 0 GROUP BY v.zone_id) AS survey 
ON
z.id = survey.id

ORDER BY z.wing_name")

			->as_object()
			->execute();			


		$this->template->content = View::forge('posts/index', $result, false);
	}



	public function action_view()
	{
		$id ='Z02';
		$posts  = Model_Circle::find('all', array(
			'where' => array(
				array('wing_id', $id ),
			),
			'order_by' => array('circle_name'),

			));


		$data = array('posts'  => $posts);
        $this->template->title = 'Blog Posts';
        $this->template->content = View::forge('posts/view', $data, false);
	}


	public function action_zonewise_status()
	{
		$posts  = Model_District::find('all');
		$data = array('posts'  => $posts);
        $this->template->title = 'Blog Posts';
        $this->template->content = View::forge('posts/zonewise_status', $data, false);
	}

	public function action_tcombo()
	{
		$posts  = Model_District::find('all');
		$data = array('posts'  => $posts);
        $this->template->title = 'Blog Posts';
        $this->template->content = View::forge('posts/tcombo', $data, false);
	}




#	if(input::post('send')){
#			$new = Model_Release::forge();
#			$new->id = 3;
#			$new->funds_type	= '1';
#			$new->funds_year 	= '2016-17';
#			$new->funds_district= 'D02';
#			$new->funds_division= 'D02B02';
#			$new->funds_cen_normal	= '120.754';
#			$new->funds_cen_sustain	= '10.784';
#			$new->funds_cen_earmark	= '13.57';
#			$new->save();
	
#			Session::set_flash('success','Post Added');
			//Response::redirect('/index');
#			Response::redirect('/zonewise_status', 'refresh');
#			$data = array();
#        	$this->template->title = 'Blog Posts';
#        	$this->template->content = View::forge('posts/zonewise_status', $data, false);
#		}
#	}

	public function action_funds_edit()
	{
		$id ='1';
		$posts  = Model_Release::find('all', array(
			'where' => array(
				array('id', $id ),
			),
			'order_by' => array('id'),

			));


		$data = array('posts'  => $posts);
        $this->template->title = 'Blog Posts';
        $this->template->content = View::forge('posts/funds_edit', $data, false);
		




	}

	public function action_add()
	{
		$data = array('posts'  => $posts);
        $this->template->title = 'Blog Posts';
        $this->template->content = View::forge('posts/add', $data, false);
	}


	public function action_testview()
	{
		$result['q'] =DB::query("select z.wing_name as wing, sf.funds1a as fund1a, sf.funds2a as fund2a, sf.funds2b as fund2b, sf.fundscom4 as fundcom4, cf.normal as normal, cf.sustain as sustain, cf.earmark as earmark, cf.omfunds as omfunds, map.num as mapnum 
from 

		(select w.id, sum(s.funds_1a) as funds1a, sum(s.funds_2a) as funds2a, sum(s.funds_2b) as funds2b, sum(s.funds_com4) as fundscom4
		from (Select * from state_funds where deleted =0)  as s left join wings as w on w.id = s.wing_id group by w.id)  as sf
			
left join 
wings as z on
z.id = sf.id

left join 
	
		(select w.id, sum(r.funds_cen_normal) as normal, sum(r.funds_cen_sustain) as sustain, sum(r.funds_cen_earmark) as earmark, sum(r.funds_cen_om) as omfunds
		from (Select * from releases where deleted =0) as r left join wings as w on w.id = r.wing_id group by w.id) as cf 
on
z.id = cf.id

left join
		(SELECT v.zone_id as id, v.circle_id as c_id, v.district_id as d_id, v.division_id as div_id, v.block_id as b_id, count(m.misid) as num  
			FROM mappedvillages as m left join villages as v on v.village_misid = m.misid group by v.zone_id) as map 
on
z.id = map.id")
			->as_object()
			->execute();			


		$this->template->content = View::forge('posts/testview', $result, false);
	}












}	
#		$id ='Z02';
#		$posts  = Model_Circle::find('all', array(
#			'where' => array(
#				array('zone_id', $id ),
#			),
#			'order_by' => array('circle_name'),
#
#			));



#$data = array();
#$data = array('posts'  => $posts);
#        $this->template->title = 'Add Posts';
#        $this->template->content = View::forge('posts/add', $data);



#public function action_add()
#	{

	#	if(input::post('send')){
	#		$post = new Model_Post();
	#		$post->title 		= Input::post('title');
	#		$post->category 	= Input::post('category');
	#		$post->body 		= Input::post('body');
	#		$post->tags 		= Input::post('tags');
	#		$post->create_date 	= date('Y-m-d H:i:s');
#			
	#		$post->save();
	#		Session::set_flash('success','Post Added');
#			//Response::redirect('/index');
	#		Response::redirect('/index', 'refresh');
	#}
#	$data = array();
#        $this->template->title = 'Add Posts';
#        $this->template->content = View::forge('posts/add', $data);
	
#	}
#	public function action_view($id)
#	{
#		$post = Model_tbl_village::find('first', array(
#			'where' => array(
#					'id' => $village_id
#			   	)
#		));
#		$data = array('post'  => $post);
#        $this->template->title = $post->wing_id;
#        $this->template->content = View::forge('posts/view', $data, false);
#	}
#	
#		public function action_edit()
#	{
#		return Response::forge(View::forge('posts/edit'));
#	}


