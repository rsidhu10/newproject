<?php

class Model_Wing extends Orm\Model{
	protected static $_properties = array(
		'id',
		'wing_name',
		'wing_circle',
		'wing_district',
		'wing_block',
		'wing_panchayat',
		'wing_village',
	);


 #   // in a Model_Wing which has many circles
	protected static $_has_many = array(
		'cirlces' => array(
    	'model_to' => 'Model_Circle',
	    'key_from' => 'id',
	    'key_to' => 'zone_id',
	    'cascade_save' => true,
	    'cascade_delete' => false,
	    // there are some more options for specific relation types
	));


}











?>