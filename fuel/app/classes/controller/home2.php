<?php
class Controller_Home2 extends Controller
{
    public function action_index()
    {
        //assign variables
        $data = array();
        $data['title'] = 'Home';
        $data['site_title'] = 'My Website';
        $data['username'] = 'Joe14';

        //assign views as variables, forced rendering
        $views = array();
        $views['head'] = View::forge('home/head', $data)->render();
        $views['header'] = View::forge('home/header', $data)->render();
        $views['content'] = View::forge('home/content', $data)->render();
        $views['footer'] = View::forge('home/footer', $data)->render();

        // return the rendered HTML to the Request
        return View::forge('home/layout', $views)->render();
    }
}

?>