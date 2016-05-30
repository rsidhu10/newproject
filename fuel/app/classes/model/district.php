<?php

class Model_District extends Orm\Model{
	protected static $_properties = array(
		'id',
		'wing_id',
		'circle_id',
		'district_name',
		'district_sname',
	);

	protected static $_belongs_to = array (
		'circle' => array(
			'key_from' => 'circle_id',
			'model_to' => 'Model_Circle',
			'key_to' => 'id',
			'cascade_save' => true,
			'cascade_delete' => false,
			)
		);	
 
    // in a Model_Circle which has many districts
    protected static $_has_many = array(
        'blocks' => array(
        'key_from'       => 'id',
        'model_to'       => 'Model_Block',
        'key_to'         => 'district_id',
        'cascade_save'   => true,
        'cascade_delete' => false,
            //            'conditions' => array('where' => array(
            //                array('deleted', '!=', 1)
            //            ))
        )
    );


}