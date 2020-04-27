<?php
use Components\Property\Property;

class SMSC_HTTP {
    private $login = null;
    private $pass = null;
    private $url = 'http://smsc.ru/sys/';
    private $subclientLogin = '';
    private $subclientPass = '';

    public function __construct($subclientLogin = '', $subclientPass = '') {
        $this->initMainLoginPass();

        if (is_null($this->login) OR is_null($this->pass)) {
            throw new Exception("Login or password is empty");
        }

        $this->subclientLogin = urlencode($subclientLogin);
        $this->subclientPass = $subclientPass;
    }

    private function initMainLoginPass() {
        $countryId = (int) Property::get('coutry_id', 1); // Russia and others, except ukraine

        if ($countryId == 0) {
            throw new Exception(LS::$InSmsCenterSettingNotSetCountry);
        } else if ($countryId == 2) { // Ukraine
            $this->login = 'vetmanager'; // TODO: get from vladimir
            $this->pass = '3f9c33c1c259b3a92ab5badbd6ed5db0'; // TODO: get from vladimir
        } else { // Russia and others // TODO: move passwords to application.php
            $this->login = 'vetmanager';
            $this->pass = '3f9c33c1c259b3a92ab5badbd6ed5db0';
        }
    }

    private function sendToServer($cmd, $params) {
        if (function_exists('curl_init')) {
            if ($curl = curl_init()) {
                curl_setopt($curl, CURLOPT_URL, $this->url.$cmd);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_POST, true);
                curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
                $out = curl_exec($curl);
                curl_close($curl);

                return $out;
            }
        }

        return file_get_contents($this->url.$cmd.'?'.$params);
    }

    private function encode($message) {
        return urlencode(iconv("utf-8", "windows-1251", $message));
    }

    public function get_sender_names() {
//            https://smsc.ru/sys/senders.php?get=1&login=<login>&psw=<password>
        $params = array(
            'get=1'
            , "login={$this->subclientLogin}"
            , "psw={$this->subclientPass}"
            , 'fmt=3'
            , 'cur=1'
        );

        $cmd = 'senders.php';
        $res = $this->sendToServer($cmd, implode('&', $params));

        return json_decode($res, true);
    }

    public function edit_subclient_by_params($values = array()) {
        $vals = '';

        if (is_array($values) and count($values) > 0) {
            $vals = '&'.implode('&', $values);
        }

        $params = array(
            "login={$this->login}"
            , "psw={$this->pass}"
            , "user={$this->subclientLogin}"
            , 'chg=1'
            , 'fmt=3'
            , 'cur=1'
        );

        $cmd = 'users.php';
        $res = $this->sendToServer($cmd, implode('&', $params).$vals);

        return json_decode($res, true);
    }

    public function edit_subclient($user, $email, $phone) {
        $params = array(
            "login={$this->login}"
            , "psw={$this->pass}"
            , "user={$user}"
            , "email={$email}"
            , "phone={$phone}"
            , 'chg=1'
            , 'fmt=3'
            , 'cur=1'
        );

        $cmd = 'balance.php';
        $res = $this->sendToServer($cmd, implode('&', $params));

        return json_decode($res, true);
    }

    public function get_balance() {
        $params = array(
            "login={$this->subclientLogin}"
            , "psw={$this->subclientPass}"
            , 'fmt=3'
            , 'cur=1'
        );

        $cmd = 'balance.php';
        $res = $this->sendToServer($cmd, implode('&', $params));

        return json_decode($res, true);
    }

    public function register_subclient($login, $password, $email, $phone) {
        $params = array(
            "login={$this->login}"
            , "psw={$this->pass}"
            , 'user=' .urlencode($login)
            , 'password=' .urlencode($password)
            , 'email=' .$email
            , 'phone=' .$phone
            , 'reseller=1'
            , 'type=0'
            , 'tariff=0'
            , 'mintrf=0'
            , 'add=1'
            , 'fmt=3'
            , 'op=1'
            , 'sender=vet4u.ru'
            , 'sender2=vetmanager'
            , 'fl2[24]=1'
        );

        $cmd = 'users.php';
        $res = $this->sendToServer($cmd, implode('&', $params));

        return json_decode($res, true);
    }

    public function send_email($emails, $message, $theme, $sender, $isSubclient = true) {
        if (is_array($emails)) {
            $emails = implode(',', $emails);
        }

        $emails = str_replace('@', '%40', $emails);

        $message = $this->encode($message);
        $theme = $this->encode($theme);
        $login = ($isSubclient) ? $this->subclientLogin : $this->login;
        $pass = ($isSubclient) ? $this->subclientPass : $this->pass;

        $params = array(
            "login={$login}"
            , "psw={$pass}"
            , "phones={$emails}"
            , "mes={$message}"
            , "sender=help%40vetmanager.ru"
            , "subj={$theme}"
            , 'fmt=3'
            , 'mail=1'
        );

        $cmd = 'send.php';
        $res = $this->sendToServer($cmd, implode('&', $params));

        return json_decode($res, true);
    }

    public function send_sms($phones, $message, $sender = '', $isSubclient = true) {
        if (is_array($phones)) {
            $phones = implode(',', $phones);
        }

        $message = $this->encode($message);

        $login = ($isSubclient) ? $this->subclientLogin : $this->login;
        $pass = ($isSubclient) ? $this->subclientPass : $this->pass;

        $params = array(
            "login={$login}"
            , "psw={$pass}"
            , "phones={$phones}"
            , "mes={$message}"
            , 'fmt=3'
            , 'cost=3'
            , 'op=1'
        );

        if ($sender != '') {
            $params[]= "sender={$sender}";
        }

        $cmd = 'send.php';
        $res = $this->sendToServer($cmd, implode('&', $params));

        return json_decode($res, true);
    }

    public function get_sms_status($id, $phone = '') {
        if (!$id) {// Если id не указан, вернем статус, что сообщение не найдено
            return ['status' => -3];
        }
        $params = array(
            "login={$this->subclientLogin}"
            , "psw={$this->subclientPass}"
            , "id={$id}"
            , 'fmt=3'
            , 'all=0'
            , 'charset=utf-8'
        );

        if ($phone != '') {
            $params[]= "phone={$phone}";
        }

        $cmd = 'status.php';
        $res = $this->sendToServer($cmd, implode('&', $params));

        return json_decode($res, true);
    }

    public function update_subclient_balance() {
        $params = array(
            "login={$this->login}"
            , "psw={$this->pass}"
            , "user={$this->subclientLogin}"
            , 'sum=10'
            , 'fmt=3'
            , 'balance2=1'
            , 'pay=1'
        );

        $cmd = 'users.php';
        $res = $this->sendToServer($cmd, implode('&', $params));

        return json_decode($res, true);
    }
}