import tensorflow as tf
import os
import cv2
import imghdr
from matplotlib import pyplot as plt
import numpy as np
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from keras.metrics import Precision, Recall, BinaryAccuracy
from keras.callbacks import LearningRateScheduler
from keras.models import load_model

gpus = tf.config.experimental.list_physical_devices('GPU')

#For each of available GPUs set memory consumption growth
for gpu in gpus: 
   tf.config.experimental.set_memory_growth(gpu, True)


#Removing Bad Images
data_dir = 'trash_data'
image_exts = ['jpeg','jpg','bmp','png']

for image_class in os.listdir(data_dir): 
    for image in os.listdir(os.path.join(data_dir, image_class)):
        image_path = os.path.join(data_dir, image_class, image)
        try: 
            img = cv2.imread(image_path)
            tip = imghdr.what(image_path)
            if tip not in image_exts: 
                print('Image not in ext list {}'.format(image_path))
                os.remove(image_path)
        except Exception as e: 
            print('Issue with image {}'.format(image_path))


# Load the data
# 1 - RECYCLABLE
# 0 - TRASH
data = tf.keras.utils.image_dataset_from_directory(data_dir)
data_iterator = data.as_numpy_iterator()
batch = data_iterator.next()

fig, ax = plt.subplots(ncols=4, figsize=(20,20))
for idx, img in enumerate(batch[0][:4]):
    ax[idx].imshow(img.astype(int))
    ax[idx].title.set_text(batch[1][idx])
    
plt.show()

#Scale Data
data = data.map(lambda x,y: (x/255, y))
data.as_numpy_iterator().next()

# Split the data
train_size = int(len(data)*.7)
val_size = int(len(data)*.2) + 1
test_size = int(len(data)*.1) + 1

train = data.take(train_size)
val = data.skip(train_size).take(val_size)
test = data.skip(train_size+val_size).take(test_size)

# Building Model
model = Sequential()

model.add(Conv2D(16, (3,3), 1, activation='relu', input_shape=(256,256,3)))
model.add(MaxPooling2D())
model.add(Conv2D(32, (3,3), 1, activation='relu'))
model.add(MaxPooling2D())
model.add(Conv2D(16, (3,3), 1, activation='relu'))
model.add(MaxPooling2D())
model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dropout(0.8)) #0.8 working best so far
model.add(Dense(1, activation='sigmoid'))

model.compile('adam', loss=tf.losses.BinaryCrossentropy(), metrics=['accuracy'])
# print(model.summary())

# Train the model
logdir = 'logs'
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=logdir)
early_stop_callback = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=3)

initial_learning_rate = 0.1
decay = initial_learning_rate / 20

def lr_time_based_decay(epoch, lr):
    return lr * 1 / (1 + decay * epoch)

hist = model.fit(train, epochs=20, 
                 validation_data=val, 
                 #callbacks=[tensorboard_callback], 
                 callbacks=[tensorboard_callback, LearningRateScheduler(lr_time_based_decay, verbose=1), early_stop_callback])

# plot performance
fig = plt.figure()
plt.plot(hist.history['loss'], color='teal', label='loss')
plt.plot(hist.history['val_loss'], color='orange', label='val_loss')
fig.suptitle('Loss', fontsize=20)
plt.legend(loc="upper left")
plt.show()

fig = plt.figure()
plt.plot(hist.history['accuracy'], color='teal', label='accuracy')
plt.plot(hist.history['val_accuracy'], color='orange', label='val_accuracy')
fig.suptitle('Accuracy', fontsize=20)
plt.legend(loc="upper left")
plt.show()

# Evaluate the model
precision = Precision()
recall = Recall()
accuracy = BinaryAccuracy()

for batch in test.as_numpy_iterator(): 
    X, y = batch
    yhat = model.predict(X)
    precision.update_state(y, yhat)
    recall.update_state(y, yhat)
    accuracy.update_state(y, yhat)
    
print(precision.result(), recall.result(), accuracy.result())

# Test the model
def predict_image(image_path):
    img = cv2.imread(image_path)
    plt.imshow(img)
    plt.show()

    resize = tf.image.resize(img, (256,256))
    plt.imshow(resize.numpy().astype(int))

    yhat = model.predict(np.expand_dims(resize/255, 0))
    print(yhat*100)

    if yhat > 0.5: 
        print(f'Recyclable with {yhat*100}% confidence')
    else:
        print(f'Trash with {1- yhat*100}% confidence')
        
predict_image('trash.jpg')
predict_image('recyclable.jpg')

# save the model
model.save(os.path.join('Model','imageclassifier.h5'))