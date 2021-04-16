1. crawl body data from the web sources with spider as described in crawler/README.md
2. convert news data from crawler to importable format in processable chunks, with convert_crawled_to_importable.py
3. convert user data from file to importable format in processable chunks, with userdata_converter.py
4. import all news and user files to elastic search
    - remember to have the correct file tree
    - data
        - train_files (dir: news converted to importable)
        - train_user_data (dir: user data converted to importable)
        - run import_data_to_elastic.sh in data directory