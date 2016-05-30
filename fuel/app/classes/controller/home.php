<?php
class Controller_Home extends Controller
{
    public function action_index()
    {
        // create the layout view
        $view = View::forge('home/layout');

        // assign global variables so all views have access to them
        $view->set_global('username', 'Rupinder');
        $view->set_global('age','48');
        $view->set_global('title', 'Home');
        $view->set_global('site_title', 'My Website');

        //assign views as variables, lazy rendering
        $view->head 	= View::forge('home/head');
        $view->header 	= View::forge('home/header');
        $view->content 	= View::forge('home/content');
        $view->footer 	= View::forge('home/footer');

	//	$funds  = Model_Release::find('all');
	//	$data 	= array('funds'  => $funds);
        
       //	$view->content = View::forge('home/content', $data, false);
		//$view->footer 	= View::forge('home/footer');


        // return the view object to the Request
        return $view;
    }
}

?>