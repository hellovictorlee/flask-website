from PIL import Image
import copy
import json


img = Image.open("USAMap_Path.png")
data = img.getdata()
x = data.size[0]
y = data.size[1]


# make a list color for each days
dic = {}
state = ['0x00', '0x7f', '0xff']
num = 0
for i in state:
    for j in state:
        for k in state:
            dic[(int(i, 0), int(j, 0), int(k, 0))] = num
            num += 1


mapper = {}
for j in range(y):
    for i in range(x):
        for k in dic:
            if (data[j*x+i][0], data[j*x+i][1], data[j*x+i][2]) == k:
                mapper[str([i, j])] = dic[k]


data = json.dumps(mapper)
with open('data.json', 'w') as output:
    output.write(data)
