import os
import base64
import cv2
from urllib import request
import numpy as np
import tensorflow as tf
from flask import Flask
from flask import request
from keras.models import load_model
import json


app = Flask(__name__)

@app.route('/', methods=['POST'])
def decodeBase64ToImage():
    encoded_data = request.data
    decoded_data = base64.b64decode((encoded_data))

    #write the decoded data back to original format in  file
    if os.path.exists('image.jpg'):
        os.remove('image.jpg')
        print("The file has been deleted successfully")
    img_file = open('image.jpg', 'wb')
    img_file.write(decoded_data)
    img = cv2.imread('image.jpg')
    resize = tf.image.resize(img, (256,256))

    new_model = load_model(os.path.join('Model', 'imageclassifier.h5'))
    yhatnew = new_model.predict(np.expand_dims(resize/255, 0))
    img_file.close()

    if yhatnew > 0.5: 
        output_string = '{"recyclable": "true", "confidence": ' + str(yhatnew*100) + '}'
        json_object = json.loads(output_string)
        print(json_object)
        #return f'Recyclable {yhatnew*100}% confidence'
        return json_object
    else:
        output_string = '{"recyclable": "false", "confidence": ' + str((1 - yhatnew) * 100) + '}'
        json_object = json.loads(output_string)
        #return f'Trash {(1 - yhatnew)*100}% confidence'
        print(json_object)
        return json_object

if __name__ == "__main__":
    app.run(debug=True)