import os
import base64
import cv2
from urllib import request
import numpy as np
import tensorflow as tf
from flask import Flask
from flask import request
from keras.models import load_model


app = Flask(__name__)

@app.route('/image', methods=['POST'])
def decodeBase64ToImage():
    encoded_data = request.data
    decoded_data = base64.b64decode((encoded_data))

    #write the decoded data back to original format in  file
    img_file = open('image.jpeg', 'wb')
    img_file.write(decoded_data)
    img = cv2.imread('image.jpeg')
    resize = tf.image.resize(img, (256,256))

    new_model = load_model(os.path.join('Model', 'imageclassifier.h5'))
    yhatnew = new_model.predict(np.expand_dims(resize/255, 0))
    img_file.close()

    if yhatnew > 0.5: 
        return 'Recyclable'
    else:
        return 'Trash'

if __name__ == "__main__":
    app.run(debug=True)

