<?php
return array(
	'_root_'  => 'posts/index',  // The default route
	'_404_'   => 'welcome/404',    // The main 404 route
	
	'wing/:id' => 'wing/index',
	'mytest/:id' => 'mytest/index',
	'sfunds/:id' => 'statefunds/editsfunds',
	'mydivn' => 'survey/mydivn',
    'myvill' => 'survey/myvill',
    'myhab'  => 'targets/myhab',
    'mapsur'  => 'survey/mapsur',
    'maphab'  => 'survey/maphab',
    'myblock'  => 'survey/myblock',
    'mismap'  => 'survey/mismap',
    'dist'    => 'survey/dist',
	
	

	
	'hello(/:name)?' => array('welcome/hello', 'name' => 'hello'),
);
