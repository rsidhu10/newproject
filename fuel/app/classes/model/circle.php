<?php

    class Model_Circle extends Orm\Model{
    	protected static $_properties = array(
    		'id',
    		'wing_id',
    		'circle_name',
    		'circle_sname',
    		'circle_district',
    		'circle_block',
    		'circle_panchayat',
    		'circle_village',
    	);

        // in a Model_Comment which belong to a post
        protected static $_belongs_to = array(
            'wing' => array(
            'key_from'          => 'wing_id',
            'model_to'          => 'Model_Wing',
            'key_to'            => 'id',
            'cascade_save'      => true,
            'cascade_delete'    => false,
            )
        );

        // in a Model_Circle which has many districts
        protected static $_has_many = array(
            'districts' => array(
            'key_from'       => 'id',
            'model_to'       => 'Model_District',
            'key_to'         => 'circle_id',
            'cascade_save'   => true,
            'cascade_delete' => false,
                //            'conditions' => array('where' => array(
                //                array('deleted', '!=', 1)
                //            ))
            )
        );


    }
?>