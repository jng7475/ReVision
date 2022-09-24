import os
import base64
import numpy as np
import tensorflow as tf
from flask import Flask
from keras.models import load_model


app = Flask(__name__)

@app.route('/image/<encoded_data>')
def decodeBase64ToImage(encoded_data):
    decoded_data = base64.b64decode((encoded_data))

    #write the decoded data back to original format in  file
    if os.path.exists('image.jpg'):
        os.remove('image.jpg')
        print("The file has been deleted successfully")
    img_file = open('image.jpg', 'wb')
    img_file.write(decoded_data)
    img = cv2.imread('image.jpg')
    resize = tf.image.resize(img, (256,256))

    new_model = load_model('imageclassifier.h5')
    yhatnew = new_model.predict(np.expand_dims(resize/255, 0))

    if yhatnew > 0.5: 
        return 'Recyclable'
    else:
        return 'Trash'

if __name__ == "__main__":
    app.run(debug=True)

