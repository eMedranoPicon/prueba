scp -r app/dist root@188.226.223.252:/var/www/html/temp-coinc3Dsecure
ssh root@188.226.223.252 'cd /var/www/html; rm -rf coinc3Dsecure; mv temp-coinc3Dsecure coinc3Dsecure; exit;'
