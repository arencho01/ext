<?php
include_once 'pake.php';

define("JENKINS", !empty($_ENV['JENKINS_HOME']));

pake_desc('Default task');
pake_task('default', 'phpunit');
function run_default()
{
}

pake_desc("Run unit tests with PHPUnit");
pake_task("phpunit");
function run_phpunit() {
    pake_shdir(pake_which('phpunit') . ' unit', '../tests', true);
}
function getJava() {
    $settings = getSettings();
    try {
        return pake_which('java');
    } catch(pakeException $e) {
        putenv('PATH=' . $settings['env']['java_path'] . PATH_SEPARATOR . getenv('PATH'));
    }

    return 'java';
}

function getSettings() {
    static $settings = array();

    if (!empty($settings)) {
        return $settings;
    }

    return $settings = pakeYaml::loadFile(__DIR__ . '/Pakefile.yml');
}

function pake_shdir($cmd, $dir, $interactive = false) {
    $current_dir = realpath(getcwd());
    $dir = realpath($dir);
    pake_echo_comment("Jump into $dir");
    chdir($dir);
    try {
        $result = pake_sh($cmd, $interactive);
    } catch (Exception $e) {
        pake_echo_comment("Cd back into $current_dir");
        chdir($current_dir);
        throw $e;
    }

    pake_echo_comment("Jump back into $current_dir");
    chdir($current_dir);
    return $result;
}
