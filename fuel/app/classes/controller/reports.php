<?php
class Controller_reports extends Controller
{
	public function action_reports()
	{
		return Response::forge(View::forge('reports'));
	}

}
