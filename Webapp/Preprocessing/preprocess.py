import cv2
import numpy as np
import os

os.chdir('..')

img = cv2.imread('image.png',0);


img = cv2.bilateralFilter(img,9,75,75)


T,img1 = cv2.threshold(img.copy(),200,255,cv2.THRESH_BINARY_INV)

contours, heirarchy = cv2.findContours(img1, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

outline = np.zeros((img.shape), dtype = 'uint8')

cv2.drawContours(outline, contours, -1, (255,255,255), 1)

if len(contours) == 4:
    images = []
    i = 1
    for cnt in contours:
        x,y,w,h = cv2.boundingRect(cnt)
        sel_img = img[y:y+h, x:x+w]
        sel_img = cv2.resize(sel_img,(80,80))
        cv2.imwrite(str(i)+'.png',sel_img)


cv2.imshow('img',outline);

cv2.waitKey(0)
cv2.destroyAllWindows()
