#!/usr/bin/env python

import json
import collections

header = ["News ID", "Category", "SubCategory", "Title", "Abstract", "URL"]
src = "./news.tsv"
dst = "./news.json"


def converter():
    with open(dst, 'w') as outfile, open(src,"r") as f:
        firstline = f.readline()
        lines = f.readlines()
        print("Start converting ...")
        for i, line in enumerate(lines):
            values = line.split("\t")
            json.dump({"index":{"_id":values[0]}}, outfile)
            outfile.write("\n")
            entry = collections.OrderedDict(zip(header, values[:-2]))
            json.dump(entry, outfile)
            outfile.write("\n")
        print("end converting ...")

converter()
