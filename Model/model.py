import tensorflow as tf
import os
import cv2
import imghdr
from matplotlib import pyplot as plt
import numpy as np

#os.listdir('trash_data')

# gpus = tf.config.experimental.list_physical_devices('GPU')

#For each of available GPUs set memory consumption growth
#for gpu in gpus: 
 #   tf.config.experimental.set_memory_growth(gpu, True)

data_dir = 'trash_data'
#img_exts = ['jpeg','jpg','bmp','png']
