from flask import Flask
from tensorflow.keras.models import load_model
import os
import base64
import numpy as np
import tensorflow as tf

app = Flask(__name__)

@app.route('/<encoded_data>')
def decodeBase64ToImage():
    decoded_data = base64.b64decode((encoded_data))

    #write the decoded data back to original format in  file
    img_file = open('image.jpeg', 'wb')
    img_file.write(decoded_data)
    img_file.close()
    resize = tf.image.resize(img, (256,256))

    new_model = load_model('imageclassifier.h5')
    yhatnew = new_model.predict(np.expand_dims(resize/255, 0))

    if yhat > 0.5: 
        print(f'Recyclable with {yhat*100}% confidence')
    else:
        print(f'Trash')

if __name__ == "__main__":
    app.run(debug=True)

