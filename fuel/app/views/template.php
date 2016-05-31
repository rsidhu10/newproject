<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>DWSS PUNJAB</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <?php echo Asset::js('jquery-1.8.0.min.js'); ?>
    <?php echo Asset::css('bootstrap.css'); ?>
    <?php echo Asset::js('bootstrap.js'); ?>
<!--    <?php echo Asset::js('select2.js'); ?>
    <?php echo Asset::css('select2.css'); ?>
 --> 

    <?php echo Asset::js('jquery-1.8.0.min.js'); ?>


    <style type="text/css">

        body {
            padding-top: 0px;
            padding-bottom: 40px;
            padding-left: 0px;
        }

        .sidebar-nav {
            padding: 9px 0;
        }
    </style>

    <style type="text/css">

        body {

            position: relative;

            background-color: white;
            background-image: url(../assets/img/grid-18px-masked.png);
            background-repeat: repeat-x;
            background-position: 0 40px;
        }

        .container_main {
            padding-bottom: 60px;
        }

        .bottombar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
        }
    </style>
    <?php echo Asset::css('bootstrap-responsive.css'); ?>


    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->


    <?php echo Asset::css('datepicker.css'); ?>
    <?php echo Asset::css('backgrid.min.css'); ?>
    <?php echo Asset::css('backgrid-text-cell.min.css'); ?>
    <?php echo Asset::css('backgrid-select-all.min.css'); ?>
    <?php echo Asset::css('site.css'); ?>
    <?php echo Asset::css('mystyle.css'); ?>
    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">


</head>
<body>
    <div class="blog-masthead">
        <div class="container">
            <nav class="blog-nav">
                <a class="blog-nav-item active" href="/">Home</a>
                <a class="blog-nav-item" href="/funds/index">Central Funds</a>
                <a class="blog-nav-item" href="/statefunds/index">State Funds</a>
                <a class="blog-nav-item" href="/survey/slevel">Service Delivey</a>
                <a class="blog-nav-item" href="#">Amout Us</a>
            </nav>
        </div>
    </div>
    <div><h3><center>Department of Water Supply & Sanitation Punjab</center></h3></div>
    <div id="content_main">
        <?php echo $content; ?>
    </div>

</div>

</body>
</html>
