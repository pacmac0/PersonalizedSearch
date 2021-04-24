# #!bin/sh
# for FILE in "train_import_10000.json" "train_import_20000.json" "train_import_30000.json" "train_import_40000.json" "train_import_50000.json" "train_import_60000.json" "train_import_70000.json" "train_import_80000.json" "train_import_90000.json" "train_import_100000.json" "train_import_110000.json"
# do
# 	curl -H "Content-Type: application/json" -XPOST "localhost:9200/news/_bulk?pretty&refresh" --data-binary "@${FILE}"
# done

#!bin/sh
for FILE in "user0.json" "user1.json" "user2.json" "user3.json" "user4.json" 
do
	curl -H "Content-Type: application/json" -XPOST "localhost:9200/users/_bulk?pretty&refresh" --data-binary "@${FILE}"
done