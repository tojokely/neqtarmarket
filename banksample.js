//no message error
curl --request POST \
  --url https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge \
  --header 'content-type: application/json' \
  --data '{ "PBFPubKey": "FLWPUBK-db19681bf7beff56c7ac44cf5444b474-X","client": "ERxZBMUD28psEL/U48IxmpygwPbS5ocOv3QBOInRjqJkq4cuHnOQR0lQLhCtIXOP9Ir8SHNiU+OBm+HvHFs6sIP2htXe7jrVIVz3afPyOuizBwSjqFeLZHEXs/Ql5T52cCIpTmRJQ3BPUo7xEuYEzgcTa3X/rm4KqDhgDHHbhVM5cCIP0BMPyWDeU0IVmN7hjzk3T+Qxro5LcBbsfx7K3Vuk6ikhIOmuWqvr2SIkq9jQ2Jhj7O79eA3CwrGBFdKzNultFwqvGpTurjA/2ayBp6g6+TXOmoIr4FwAWGJZM7KTa/odFYnMOkBQrBKs26F0BZTSLPOUh3q94cNP5WhTjJwnuhQXqAu/9cfwxq+W9Mg8N2DeEGpF0WqqlGj35YcAfmVouJ2gzlBlheHpkdbh0ho5qj0SvB98EKZ64SMOqEbKT0MF3QtvIhFpCl+2SIKGYlPL816AUjI8M+DB0kuhqGeEUpcdlppWP5JBFIA7Qbt2cduOoH23TyNcG/g66SDTJnJzf3QQJeRd2gjnUfKVrg==","alg": "3DES-24" }'

//invalid pbk
curl --request POST \
   --url https://api.ravepay.co/flwv3-pug/getpaidx/api/charge \
   --header 'content-type: application/json' \
   --data '{ "client": "ERxZBMUD28psEL/U48IxmpygwPbS5ocOv3QBOInRjqJkq4cuHnOQR0lQLhCtIXOP9Ir8SHNiU+OBm+HvHFs6sIP2htXe7jrVIVz3afPyOuizBwSjqFeLZHEXs/Ql5T52cCIpTmRJQ3BPUo7xEuYEzgcTa3X/rm4KqDhgDHHbhVM5cCIP0BMPyWDeU0IVmN7hjzk3T+Qxro5LcBbsfx7K3Vuk6ikhIOmuWqvr2SIkq9jQ2Jhj7O79eA3CwrGBFdKzNultFwqvGpTurjA/2ayBp6g6+TXOmoIr4FwAWGJZM7KTa/odFYnMOkBQrBKs26F0BZTSLPOUh3q94cNP5WhTjJwnuhQXqAu/9cfwxq+W9Mg8N2DeEGpF0WqqlGj35YcAfmVouJ2gzlBlheHpkdbh0ho5qj0SvB98EKZ64SMOqEbKT0MF3QtvIhFpCl+2SIKGYlPL816AUjI8M+DB0kuhqGeEUpcdlppWP5JBFIA7Qbt2cduOoH23TyNcG/g66SDTJnJzf3QQJeRd2gjnUfKVrg==", "PBFPubKey": "FLWPUBK-db19681bf7beff56c7ac44cf5444b474-X","alg": "3DES-24" }'

//reverse of ipk - still invalid
curl --request POST \
   --url https://api.ravepay.co/flwv3-pug/getpaidx/api/charge \
   --header 'content-type: application/json' \
   --data '{ "PBFPubKey": "FLWPUBK-db19681bf7beff56c7ac44cf5444b474-X", "client": "ERxZBMUD28psEL/U48IxmpygwPbS5ocOv3QBOInRjqJkq4cuHnOQR0lQLhCtIXOP9Ir8SHNiU+OBm+HvHFs6sIP2htXe7jrVIVz3afPyOuizBwSjqFeLZHEXs/Ql5T52cCIpTmRJQ3BPUo7xEuYEzgcTa3X/rm4KqDhgDHHbhVM5cCIP0BMPyWDeU0IVmN7hjzk3T+Qxro5LcBbsfx7K3Vuk6ikhIOmuWqvr2SIkq9jQ2Jhj7O79eA3CwrGBFdKzNultFwqvGpTurjA/2ayBp6g6+TXOmoIr4FwAWGJZM7KTa/odFYnMOkBQrBKs26F0BZTSLPOUh3q94cNP5WhTjJwnuhQXqAu/9cfwxq+W9Mg8N2DeEGpF0WqqlGj35YcAfmVouJ2gzlBlheHpkdbh0ho5qj0SvB98EKZ64SMOqEbKT0MF3QtvIhFpCl+2SIKGYlPL816AUjI8M+DB0kuhqGeEUpcdlppWP5JBFIA7Qbt2cduOoH23TyNcG/g66SDTJnJzf3QQJeRd2gjnUfKVrg==", "alg": "3DES-24" }'

//mine with content-type changed to text
curl --request POST \
   --url https://api.ravepay.co/flwv3-pug/getpaidx/api/charge \
   --header 'content-type: application/json' \
   --data '{ "PBFPubKey": "FLWPUBK-db19681bf7beff56c7ac44cf5444b474-X", "client": "ERxZBMUD28psEL/U48IxmpygwPbS5ocOv3QBOInRjqJkq4cuHnOQR0lQLhCtIXOP9Ir8SHNiU+OBm+HvHFs6sIP2htXe7jrVIVz3afPyOuizBwSjqFeLZHEXs/Ql5T52cCIpTmRJQ3BPUo7xEuYEzgcTa3X/rm4KqDhgDHHbhVM5cCIP0BMPyWDeU0IVmN7hjzk3T+Qxro5LcBbsfx7K3Vuk6ikhIOmuWqvr2SIkq9jQ2Jhj7O79eA3CwrGBFdKzNultFwqvGpTurjA/2ayBp6g6+TXOmoIr4FwAWGJZM7KTa/odFYnMOkBQrBKs26F0BZTSLPOUh3q94cNP5WhTjJwnuhQXqAu/9cfwxq+W9Mg8N2DeEGpF0WqqlGj35YcAfmVouJ2gzlBlheHpkdbh0ho5qj0SvB98EKZ64SMOqEbKT0MF3QtvIhFpCl+2SIKGYlPL816AUjI8M+DB0kuhqGeEUpcdlppWP5JBFIA7Qbt2cduOoH23TyNcG/g66SDTJnJzf3QQJeRd2gjnUfKVrg==", "alg": "3DES-24" }'

//duplicate transaction
 curl --request POST \
    --url https://api.ravepay.co/flwv3-pug/getpaidx/api/charge \
   --header 'content-type: application/json' \
   --data '{"client":"Hqj0LP5HNRNIthnOLqYjBwTIPizUp4PdiP7ZAKwqVz2RYtx5I0tcWurEVI40yXW9vyXa6Xxr9vhbmsTD8wE5B5ETm8i0H3s9zBFUiwosSmVsm+dh/NvVYzBIKaTvYW8qfmycnhf0WqFGCvNe95ArrW4p+QYDy7IpVui9f892l1IurQMyRZAZlYoW2L/6iX3WB0FYmm6bA8RFfqRoVNEJuI7STziZE/DdjjTKGwbcQO+QnnBv8Pp0rWwRNEwrb4RHYogfR06WsoGW0Vpl3EGlzMC0N/VudyGMFzkIrYdNE3DXjY9BcyXy1JYVU94lbYJXIouYfO/t5X2rCS6z0Ded8P2UIF4AJPFYDdytPJxwOUSt7DoU03S4AE3cl/9mdfsx0Di42KVIDfUwDTTf5cdl3i5S+V6Gcb8Mi8VnUyINsiW7FqnifgGSeAqxrV3+gaVS0YbLUWrRMhqIAE8pvdpLRq2SnO6wzhRVOO8JiMvCtGgNj7tSkgn/AJ7Lt+RAhdovMYmwhr4yXfKm7QCwkq5bP0mcaH/L+X7n6vS3k+XS4usbPgBdTuz3+Tsl/qhhDMRQDhOWYEgFSIOMZ9tBFiRD3VXiKRYQzq68QSG9VYbT8K2/W8NVH+1igCIEJxjsFHmcqkTmxeoxr7s=","PBFPubKey":"FLWPUBK-4e581ebf8372cd691203b27227e2e3b8-X","alg":"3DES-24"}'

//the one they gave merchant needed then when content type -> no error
curl --request POST \
  --url https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge \
   --header 'content-type: application/json' \
  --data '{"PBFPubKey":"FLWPUBK-7adb6177bd71dd43c2efa3f1229e3b7f-X","client":"VodhvFFsni0CBeieHPq9HTuG5lbNPgmD5rbEw6Uxb0TD9eD9B3VM5uZ1B5lC3thQMbPypNBCAYwSybPo9pNJUIXSNhgdzsqG8eEggSJhWYv+4HToZxWamqsWrUqNUgvaCws3iPTAJOy0fPuHI53dSaMbq/EeHnGrdosfSuAGvm/L6joVVb6e7vyZ4bJl9bJyT73INhSN5glUAvHElup+AOYVoyQiQ1gN7PmW6I0DrUiiC1GSq87zk8rt7Xv31OBja7Ib+znEHBfcI/Ii36HbQF2MunOy2oAteyWIbr3cTyUuyERroRKL769f3NMxUQw5iQ39LU0KgmP2XvgMQONcuiPJWlJ9LzG8ngqCZNFGQ5yIvYrUiiufPowa7A8sAgaoIQQMt0OWGijfpJ4CeAA9/s1Bv03ZhhX2","alg":"3DES-24"}'

//newest one - failed no message
curl --request POST \
  --url https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge \
   --header 'content-type: application/json' \
  --data '{ "PBFPubKey": "FLWPUBK-db19681bf7beff56c7ac44cf5444b474-X","client": "ERxZBMUD28psEL/U48IxmpygwPbS5ocOv3QBOInRjqJkq4cuHnOQR0lQLhCtIXOP9Ir8SHNiU+OBm+HvHFs6sIP2htXe7jrVIVz3afPyOuizBwSjqFeLZHEXs/Ql5T52cCIpTmRJQ3BPUo7xEuYEzgcTa3X/rm4KqDhgDHHbhVM5cCIP0BMPyWDeU0IVmN7hjzk3T+Qxro5LcBbsfx7K3Vuk6ikhIOmuWqvr2SIkq9jQ2Jhj7O79eA3CwrGBFdKzNultFwqvGpTurjA/2ayBp6g6+TXOmoIr4FwAWGJZM7KTa/odFYnMOkBQrBKs26F0BZTSLPOUh3q94cNP5WhTjJwnuhQXqAu/9cfwxq+W9Mg8N2DeEGpF0WqqlGj35YcAfmVouJ2gzlBlheHpkdbh0ho5qj0SvB98EKZ64SMOqEbKT0MF3QtvIhFpCl+2SIKGYlPL816AUjI8M+DB0kuhqGeEUpcdlppWP5JBFIA7Qbt2cduOoH23TyNcG/g66SDTJnJzf3QQJeRd2gjnUfKVrg==","alg": "3DES-24" }'

//approved sample card transaction
curl --request POST \
  --url https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge \
  --header 'content-type: application/json' \
  --data '{"PBFPubKey":"FLWPUBK-7adb6177bd71dd43c2efa3f1229e3b7f-X","client":"VodhvFFsni0CBeieHPq9HTuG5lbNPgmD5rbEw6Uxb0TD9eD9B3VM5uZ1B5lC3thQMbPypNBCAYxaW2W21VnGuznMPf1G1digW0sHjuO6BGLGbzkwv12rmgNelv19ECSaKfyJmWOSPBvQifHMXZz2M35WuZpE2oD78Be54Xz7vUy3b6MkxrFc+d5gTnuiluBcSDSmnpj/d1ovlo5bix3PeuMUtIYzGFE/RK/EcIYyfYnpL26VFT1aEn5d/iOPyHecqFYVhCMwzV0E6j0uBtT/DMWg+Bi4O1VHej2EBxxKcmwu9rTYvsFf81AtOKZazJEKOea9Xn7mx0J/QpcP2kEf3asWrUqNUgvacl8y8IyaS4jGtU7fCcrIreHttSekpT/16rc45sC428zQy6OfSLoJDA4D2Ww+TEYnMWRNhzuBDHJ9wJTfHmgQcipiD/r7cQyLAzyllfhXsHWFIv3R+ECgrrvxpYMe2lVQ5d+DdTO2pC1MyhkOscNBp7dUwoEGfU7nxY/UGoRWV5WSAg9nFYELS2F4gfvWVkbP07Q+ap11GYUbuZFTMmfULbK/3j//q+9eElWS+E2m6mY4upgehIat8qIGsvGLKR3kagL4wQPZlBMD/S8eiQ8sUD+ngFS8T0XfZUXC5m6IMQdZ7Bfz0mAT2w==","alg":"3DES-24"}'

//non approved sample bank
curl --request POST \
  --url https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge \
  --header 'content-type: application/json' \
  --data '{"PBFPubKey":"FLWPUBK-7adb6177bd71dd43c2efa3f1229e3b7f-X","client":"VodhvFFsni0CBeieHPq9HTuG5lbNPgmD5rbEw6Uxb0TD9eD9B3VM5uZ1B5lC3thQMbPypNBCAYwSybPo9pNJUIXSNhgdzsqG8eEggSJhWYv+4HToZxWamqsWrUqNUgvaCws3iPTAJOy0fPuHI53dSaMbq/EeHnGrdosfSuAGvm/L6joVVb6e7vyZ4bJl9bJyT73INhSN5glUAvHElup+AOYVoyQiQ1gN7PmW6I0DrUiiC1GSq87zk8rt7Xv31OBja7Ib+znEHBfcI/Ii36HbQF2MunOy2oAteyWIbr3cTyUuyERroRKL769f3NMxUQw5iQ39LU0KgmP2XvgMQONcuiPJWlJ9LzG8ngqCZNFGQ5yIvYrUiiufPowa7A8sAgaoIQQMt0OWGijfpJ4CeAA9/s1Bv03ZhhX2","alg":"3DES-24"}'
