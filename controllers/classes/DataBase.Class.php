<?php 
declare(strict_types = 1);
class DataBase {
    protected static $pdo;
    protected $dbname;
    protected $dbuser;
    protected $dbpass;
    protected $host;
    protected $dsn;

    public function __construct(){
        try {
            $this->dbname = 'test';
            $this->host = 'localhost';
            $this->dbuser = 'roott';
            $this->dbpass = 'root';
            $this->dsn = "mysql:dbname={$this->dbname};host={$this->host}";
            self::$pdo = new PDO($this->dsn, $this->dbuser, $this->dbpass);
            self::$pdo->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );

        } catch (PDOException $e) {
            header('/');
        }
    }
}