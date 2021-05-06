### Install
1. install elastic from https://www.elastic.co/de/downloads/elasticsearch
2. Make sure dependencies like flask and npm are available in your environment
3. download dataset from https://msnews.github.io/index.html

### Get data
1. Follow crawler/README.md to crawl body data from the web sources using spider. 
2. convert news data from crawler to importable format in processable chunks, with convert_crawled_to_importable.py in converters direcotry
    => run python3 convert_crawled_to_importable.py "src-path" "dest-path"
3. convert user data from file to importable format in processable chunks, with userdata_converter.py in converters direcotry.
    This will take the user data from "data/MINDlarge_train/behaviors.tsv" (example) and write chunck files to "user_data/user"
    => run python3 userdata_converter.py
4. import all news and user files to elastic search
    - use sh import_data_to_elastic.sh with following directory structure available
    - data
        - train_files (dir: news converted to importable)
        - train_user_data (dir: user data converted to importable)
        - run import_data_to_elastic.sh

### Run all required services
From project root use following comands to start all servers
1. sh elasticsearch-7.12.0/bin/elasticsearch
2. cd backend && python3 server_config.py
3. cd frontend && npm start
Optional:
4. sh kibana-7.12.0-darwin-x86_64/bin/kibana

The web/api interfaces should now be available at
1. http://localhost:9200/
2. http://localhost:8080/
3. http://localhost:3000/
4. http://localhost:5601/app/home#/

##### Usefull comands:
To reset a users history use: http://localhost:8080/api/deleteuser?id=Hamza