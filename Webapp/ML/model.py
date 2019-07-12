from keras.models import model_from_json
import cv2
import os

json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)
model.load_weights("model.h5")

os.chdir('..')

images = []
for i in range(1,5):
    img = cv2.imread(str(i)+'.png')
    a = model.predict(img)
    if(a[0] == 1){
        images.append(0)
    }else{
        images.append(1)
    }

if sum(images) == 0:
    res = 2
else if sum(images) == 1:
    if images[2] == 1:
        res = 1
    else if images[0] == 1:
        res = 4
    else res = 6
else if sum(images) == 2:
    if images[0] == 1 and images[2]==1:
        res = 3
    else if images[1] == 1 and images[2]==1:
        res = 5
    else res = 8
else if sum(images) == 3:
    res = 7
print(str(res))
sys.stdout.flush()
