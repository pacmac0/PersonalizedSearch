import json
import collections

def main():
    tracker = {}
    with open("behaviors.tsv","r") as f:
        lines = f.readlines()
        print("Start converting ...")
        for i, line in enumerate(lines):
            values = line.split("\t")
            userid = values[1]
            history = values[3].split(" ")
            impressions = values[-1].split(" ")
            for imp in impressions:
                newsid, click = imp.split("-")
                if click == '1':
                    history.append(newsid)
            if (userid in tracker):
                tracker[userid] += history
            else:
                tracker[userid] = history

        numberOfSamples = 0
        fileNumber = 0
        filepath = "user_data/user"
        outfile = open(filepath + str(fileNumber) + ".json", "w")
        for key in tracker:
            # Limit samples / file
            if numberOfSamples == 10000:
                print("New file")
                fileNumber += 1
                outfile.close()
                outfile = open(filepath + str(fileNumber) + ".json", "w")
                numberOfSamples = 0

            history = tracker[key]
            json.dump({"index":{"_id":key}}, outfile)
            outfile.write("\n")
            json.dump({"user_id":key, "history":history}, outfile)
            outfile.write("\n")
            numberOfSamples += 1
        print("end converting ...")
main()

