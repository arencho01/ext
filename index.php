<?php

    if (!function_exists('pre')) {
        function pre(){
            $numargs = func_num_args();
            $arguments = func_get_args();

            echo '<pre>';
            for($i = 0; $i < $numargs; $i++){
                var_dump($arguments[$i]);
            }
            echo '</pre>';
        }
    }

    $panels = [];
    $panelNames = [];
    $dir = "ui/js/test_panels";
    $addFileString = '<script language="javascript" type="text/javascript" src="' . $dir . '/{filename}"></script>';
    $files = scandir($dir);

    asort($files, SORT_STRING | SORT_FLAG_CASE | SORT_NATURAL);

    foreach ($files as $fileName) {
        if (!in_array($fileName, ['..', '.'])) {
            $panelNames[] = explode('.', $fileName)[0];
            $panels[] = str_replace('{filename}', $fileName, $addFileString);
        }
    }

    $panelsJSNames = json_encode($panelNames);
    $panelsString = implode(' ', $panels);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Задания на обучение</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="ui/dev/extjs/resources/css/ext-all.css" />
<!--    <link rel="stylesheet" type="text/css" href="ui/dev/extjs4/resources/css/ext-sandbox-debug.css" />-->
<!--    <link rel="stylesheet" type="text/css" href="ui/dev/extjs4/resources/css/ext-sandbox-fix.css" />-->
    <link rel="stylesheet" type="text/css" href="ui/resources/css/added_styles.css" />

    <link rel="stylesheet" href="ui/css/style.css">

</head>
<body scroll="no">
    <script language="javascript" type="text/javascript" src="ui/dev/dexie/dexie.js"></script>
    <script language="javascript" type="text/javascript" src="ui/dev/stomp/stomp.min.js"></script>
    <script language="javascript" type="text/javascript" src="ui/dev/extjs/adapter/ext/ext-base.js"></script>
    <script language="javascript" type="text/javascript" src="ui/dev/extjs/ext-all.js"></script>
<!--    <script language="javascript" type="text/javascript" src="ui/dev/extjs4/ext-all-sandbox.js"></script>-->
    <script language="javascript" type="text/javascript" src="vendors/jquery.md5.js"></script>

    <?php

    echo $panelsString;

    echo '<script>window._PANEL_NAMES = ' . $panelsJSNames . ';</script>';

    ?>

    <script language="javascript" type="text/javascript" src="ui/js/start.js"></script>

</body>
</html>