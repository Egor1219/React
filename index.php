<?php
define ("DB_HOST", "localhost"); // set database host
define ("DB_USER", "idsrealty"); // set database user
define ("DB_PASS","hQ4i7duD3da2"); // set database password
define ("DB_NAME","idsrealty"); // set database name

$link = mysqli_connect(DB_HOST, DB_USER, DB_PASS,DB_NAME) or die("Couldn't make connection.");
$sql="SELECT * FROM advancedstyle where id = 1";   
$query = mysqli_query($link,$sql) or die(mysql_error()); 
$row = mysqli_fetch_array($query) or die(mysql_error());
$sql1="SELECT * FROM style where id = 1";   
$query1 = mysqli_query($link,$sql1) or die(mysql_error()); 
$row1 = mysqli_fetch_array($query1) or die(mysql_error());
//var_dump($row1);exit;
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="google-signin-client_id" content="812830057825-mlsscmagpnfmru7fagul0k5o61g1p3nh.apps.googleusercontent.com">
    <title>Upreal</title>
    <link rel="stylesheet" href="/assets/css/global.min.css?v=<?=time();?>" media="screen" title="no title">
    <style>
    .location{
    	display:<?php echo $row['city'];?>
    }
    .area_slide{
    	display:<?php echo $row['area'];?>
    }
     .bed_slide{
    	display:<?php echo $row['bed'];?>
    }
     .bath_slide{
    	display:<?php echo $row['bath'];?>
    }
    .footer__content{
    	background:<?php echo $row1['background'];?>
    }
    .footer__text{
    	font-size:<?php echo $row1['fontsize'];?>px;
    	color:<?php echo $row1['color'];?>;
    	font-family:<?php echo $row1['family'];?>
    }
    	.fb-login-button{
    		
    		
    		color:white;
    		margin-top:10px;
    		display:block;
    		height:50px
    	}
    </style>
</head>
<body>
    <div id="app"> </div>
   
    <script src="/assets/js/libs/jquery-3.1.0.min.js" charset="utf-8"></script>
    <script src="/assets/js/libs/jquery.cookie.js" charset="utf-8"></script>
    <script src="/assets/js/libs/microevent.js" charset="utf-8"></script>
    <script src="/assets/js/libs/dropzone.js" charset="utf-8"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDs36AVbmNXyHcvMEF0JY5pteca8adxg0&libraries=drawing"></script>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
    <script src="http://connect.facebook.net/en_US/all.js"></script>
    <script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
   
    <div id="fb-root"></div>
	<script>
	window.fbAsyncInit = function() {
            FB.init({appId: '253953341682110', status: true, cookie: true,
            xfbml: true});
        };
        
	var drawingManager = new google.maps.drawing.DrawingManager();
drawingManager.setMap(map);
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=171044540069510";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
      </script>
<script src="/assets/js/bundle.js?v=<?=time();?>"></script>
</body>
</html>
