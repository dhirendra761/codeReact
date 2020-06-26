import sys
import os
import datetime
hostname = ["10.125.88.154","10.125.88.155","10.125.88.158","10.125.88.159","10.125.88.156","10.125.88.157","10.125.88.160","10.125.88.161","10.123.48.52","10.123.48.51"] #example
msg = []
for h in hostname:
	response = os.system("ping -c 1 " + h + " ")

	temp = {"url":h,
		"msg":"up" if response == 0 else "down",
		"time":str(datetime.datetime.now()).replace(" ","-")
	}
	print " ".join([str(key)+"="+str(temp[key]) for key in sorted(temp.keys())])