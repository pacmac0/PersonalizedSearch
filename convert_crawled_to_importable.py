import sys
import json

"""
EXAMPLE format
{"index":{"_id":"1"}}
{"account_number":1,"balance":39225,"firstname":"Amber","lastname":"Duke","age":32,"gender":"M","address":"880 Holmes Lane","employer":"Pyrami","email":"amberduke@pyrami.com","city":"Brogan","state":"IL"}
"""

def main(src, dst):
    with open(dst, 'w') as f_out, open(src,"r") as f_in:
        for idx, line in enumerate(f_in):
            if line[0] in ['[', ']']:
                continue
            if line[-2] == ',':
                obj_str = json.loads(line[:-2])
            else:
                obj_str = json.loads(line[:-1])
            json.dump({"index":{"news_id":obj_str['news_id']}}, f_out)
            f_out.write("\n")
            json.dump(obj_str, f_out)
            f_out.write("\n")
            print("Line read: %d"%idx, end = "\r")
    print("Convert finished")

"""
run from comandline with the source path and the destination path as arguments
src = 'crawler/val.json'
dst = 'data/val_import.json'
"""
if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])