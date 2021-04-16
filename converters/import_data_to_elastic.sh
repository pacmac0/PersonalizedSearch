#!bin/sh
for FILE in "train_files/"*
do
	curl -H "Content-Type: application/json" -XPOST "localhost:9200/news/_bulk?pretty&refresh" --data-binary "@${FILE}"
done
for FILE in find . -name "train_user_data/"*
do
	curl -H "Content-Type: application/json" -XPOST "localhost:9200/users/_bulk?pretty&refresh" --data-binary "@${FILE}"
done