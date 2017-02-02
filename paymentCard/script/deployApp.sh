scp -r app/dist root@188.226.223.252:/var/www/html/coinc/temp-3Dsecure
ssh root@188.226.223.252 'cd /var/www/html/coinc/; rm -rf 3Dsecure; mv temp-3Dsecure 3Dsecure; exit;'
