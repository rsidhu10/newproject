<?php
/**
* 
*/
class Controller_Circles extends Controller_CommonRest
{
	public function action_circle()
	{
		$id = $this->param("id"); //Wing ID 
		if(isset($id) and $id != 'all' and $id != 'list' and $id !== false){
			$result =\Model_Circle::find('first', array(
				'where' => array(
					array('wing_id', '=', $id)
				),
					'related' => array('circle')	
				));
			$data = array('cirlce' => $circle)
			$this->template->title = 'Blog Posts';
       		$this->template->content = View::forge('funds/circle', $data, false);
       	}	
    }   		
}//main function close 
?>
<!--
			if(isset($result)){
				$circle_type_string = "";
				\Log::Debug("District Type:" . $result->wing_id);
				if($result->wing_id == "Z01")
				{
					$circle_type_string ="North";
				}
				else if ($result->wing_id == "Z02")
				{ 
					$circle_type_string ="Central";
				}else 
				{
					$circle_type_string ="South";
				}	
			}
			$result['circle_type_string'] = $circle_type_string;
			$this->response($result,200);
		}
		else
		{
			$this->response(array('empty' => true, 'message' => 'No records found.'), 204);
		}	
	}
-->