<?php

class Model_Release extends Orm\Model{
	protected static $_properties = array(
		'id',
		'funds_type',
		'funds_year',
		'funds_num',
		'funds_date',
		'funds_district',
		'funds_division',
		'funds_cen_normal',
		'funds_cen_sustain',
		'funds_cen_earmark',
		'funds_cen_om',
	);
}