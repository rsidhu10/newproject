<?php

class Controller_village extends Controller
{
	public function action_index()
	{
		$config =array(
				'pagination_url' 	=> 'http://10.254.1.109/village/index',
				'total_items' 		=> 150,
				'per_page' 			=> 15,
				'uri_segment' 		=> 3,
			);

		$pagination = Pagination::forge('mypagination',$config);

		$result['q'] =DB::select('*')
					->from('villages')
					->join('panchayats','LEFT')
					->on('panchayats.pan_id', '=', 'villages.pan_id')
					->join('blocks','LEFT')
					->on('blocks.block_id', '=', 'panchayats.block_id')
					->join('divisions','LEFT')
					->on('divisions.division_id', '=', 'panchayats.division_id')
					->join('districts','LEFT')
					->on('villages.district_id', '=', 'panchayats.district_id')
					->join('circles','LEFT')
					->on('circles.id', '=', 'panchayats.circle_id')
					->where('districts.id',  '=' , 'D02')
					->order_by('circle_name','asc')
					->order_by('district_name','asc')
					->order_by('block_name','asc')
					->order_by('pan_name','asc')
					->order_by('village_name','asc')
					->limit($pagination->per_page)
					->offset($pagination->offset)
					->as_object()
					->execute();
	
		$result['pagination'] = $pagination;			
	
		return View::forge('village/index',$result);
	}
	public function action_homevill()
	{
		return View::forge('village/homevill');
	}


	public function action_wingwise_status_habs()
	{

		$result['q'] =DB::select('*')
					->from('wing_stats')
					->join('wings','LEFT')
					->on('wings.id', '=', 'wing_stats.wing_id')
					->order_by('wing_name','asc')
					->as_object()
					->execute();
		return View::forge('village/wingwise_status_habs',$result);
	}


	public function action_circle($id)
	{

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false )
		{
			$result['q'] =DB::select('*')
				->from('circle_stats')
				->join('circles','LEFT')
				->on('circles.id', '=', 'circle_stats.circle_id')
				->where('circles.wing_id', '=', $id )
				->order_by('circle_name','asc')
				->as_object()
				->execute();
		}
		else 
		{
			$result['q'] =DB::select('*')
				->from('circle_stats')
				->join('circles','LEFT')
				->on('circles.id', '=', 'circle_stats.circle_id')
				->order_by('circle_name','asc')
				->as_object()
				->execute();							
		}
		return View::forge('village/circle',$result);	
	}
	
		public function action_district($id)
		{

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false )
		{
			$result['q'] =DB::select('*')
				->from('district_stats')
				->join('districts','LEFT')
				->on('districts.id', '=', 'district_stats.district_id')
				->join('circles','LEFT')
				->on('circles.id', '=', 'districts.circle_id')
				->where('districts.circle_id', '=', $id )
				->order_by('district_name','asc')
				->as_object()
				->execute();
		}
		else 
		{
			$result['q'] =DB::select('*')
				->from('district_stats')
				->join('districts','LEFT')
				->on('districts.id', '=', 'district_stats.district_id')
				->join('circles','LEFT')
				->on('circles.id', '=', 'districts.circle_id')
				->order_by('district_name','asc')
				->as_object()
				->execute();							
		}
		return View::forge('village/district',$result);	


    }

		public function action_block($id)
		{

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false )
		{
			$result['q'] =DB::select('*')
				->from('block_stats')
				->join('blocks','LEFT')
				->on('blocks.block_id', '=', 'block_stats.block_id')
				->join('districts','LEFT')
				->on('districts.id', '=', 'blocks.district_id')
				->where('blocks.district_id', '=', $id )
				->order_by('block_name','asc')
				->as_object()
				->execute();
		}
		else 
		{
			$result['q'] =DB::select('*')
				->from('block_stats')
				->join('blocks','LEFT')
				->on('blocks.block_id', '=', 'block_stats.block_id')
				->join('districts','LEFT')
				->on('districts.id', '=', 'blocks.district_id')
				->order_by('block_name','asc')
				->as_object()
				->execute();
		}
		return View::forge('village/block',$result);	
    }

		public function action_division($id)
		{

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false )
		{
			$result['q'] =DB::select('*')
				->from('division_stats')
				->join('divisions','LEFT')
				->on('divisions.division_id', '=', 'division_stats.division_id')
				->join('circles','LEFT')
				->on('circles.id', '=', 'divisions.circle_id')
				->where('divisions.circle_id', '=', $id )
				->order_by('division_name','asc')
				->as_object()
				->execute();
		}
		else 
		{
			$result['q'] =DB::select('*')
				->from('division_stats')
				->join('divisions','LEFT')
				->on('divisions.division_id', '=', 'division_stats.division_id')
				->join('circles','LEFT')
				->on('circles.id', '=', 'divisions.circle_id')
				->order_by('division_name','asc')
				->as_object()
				->execute();
		}
		return View::forge('village/division',$result);	
    }


	public function action_panchayat($id)
	{
		$config =array(
				'pagination_url' 	=> 'http://10.254.1.109/village/panchayat',
				'total_items' 		=> 150,
				'per_page' 			=> 15,
				'uri_segment' 		=> 3,
			);

		$pagination = Pagination::forge('mypagination',$config);

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false )
		{

			$result['q'] =DB::select('*')
						->from('panchayats')
						->join('blocks','LEFT')
						->on('blocks.block_id', '=', 'panchayats.block_id')
						->where('panchayats.block_id',  '=' , $id)
						->order_by('pan_name','asc')
						->as_object()
						->execute();
		}
		else
		{
			$result['q'] =DB::select('*')
						->from('panchayats')
						->join('blocks','LEFT')
						->on('blocks.block_id', '=', 'panchayats.block_id')
						->order_by('pan_name','asc')
						->as_object()
						->execute();

		}				
		
				
	
	return View::forge('village/panchayat',$result);
		
	}

	public function action_scheme($id)
	{
		$config =array(
				'pagination_url' 	=> 'http://10.254.1.109/village/scheme',
				'total_items' 		=> 150,
				'per_page' 			=> 15,
				'uri_segment' 		=> 3,
			);

		$pagination = Pagination::forge('mypagination',$config);

		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false )
		{

			$result['q'] =DB::select('*')
						->from('schemes')
						->join('blocks','LEFT')
						->on('blocks.block_id', '=', 'schemes.block_id')
						->where('schemes.block_id',  '=' , $id)
						->order_by('sch_name','asc')
						->as_object()
						->execute();
		}
		else
		{
			$result['q'] =DB::select('*')
						->from('schemes')
						->join('blocks','LEFT')
						->on('blocks.block_id', '=', 'schemes.block_id')
						->order_by('sch_name','asc')
						->as_object()
						->execute();

		}				
		
				
	
	return View::forge('village/scheme',$result);
		
	}


}
