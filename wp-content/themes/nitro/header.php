<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head><!--HEAD START-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <meta name="author" content="">
    <?php if(is_home()): ?>
     	<meta name="pagetype" content="homepage">
    <?php else : ?>
    	<meta name="pagetype" content="<?php echo get_post_meta(get_the_ID(),'pagetype', true);?>">
	<?php endif;?>
    <title><?php wp_title('|',true,'right'); ?><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head><!--HEAD END-->
    
<body class="custom-background woocommerce">
  <div class="outter-container">
    <div id="wrap">       
        <nav class="navbar navbar-default" role="navigation" id="header">
		  <div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="col-xs-12 col-md-2 navbar-branding-container">
			<div class="navbar-header">
			  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			  </button>
			  <a class="navbar-brand pull-left" href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a> <!--LOGO-->
			</div>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="col-xs-12 col-md-10"><!--HEADER RIGHT START-->
			<div class="row"><!-- PRIMARY MENU START -->
                        <div class="col-sm-12">
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			  
			  <ul class="nav navbar-nav navbar-right">
				<?php wp_nav_menu( array('menu' => 'Main','container'=> '','items_wrap' => '%3$s')); ?>
			  </ul>
			</div><!-- /.navbar-collapse -->
			</div>
			</div>
			</div>
		  </div><!-- /.container-fluid -->
		</nav>

          
        <div id="content">   
                   
        <!-- BREADCRUMBS -->
        <?php if ( function_exists('yoast_breadcrumb') ) { ?>
        <div id="breadcrumbs-banner">
          <div class="container">
                
                <?php yoast_breadcrumb('<p id="breadcrumbs" class="small">','</p>'); ?>
               
          </div>
        </div>
        <?php  } ?>