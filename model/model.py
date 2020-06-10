import os
import speech_recognition as sr
import numpy as np
import glob
import pickle
import os
import librosa
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from keras import backend as K
from keras.models import load_model
from keras.optimizers import rmsprop


from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer


ALERT_WORDS = ["kill", "slut", "attack", "bitch", "b****", "f******"]


def process_wav(filename: str) -> list:
    r = sr.Recognizer()
    wav_file = sr.AudioFile(filename)

    with wav_file as source:
        r.adjust_for_ambient_noise(source)
        audio = r.record(source)

    transcript = r.recognize_google(audio, show_all=True)
    sentences = [list(trans.values())[0] for trans in transcript['alternative']]
    print(sentences)
    return sentences


def identify_key_words(sentences: list) -> bool:
    text_options = " ".join(sentences)
    words = list(set(text_options.split()))
    is_alert = np.any(np.isin(ALERT_WORDS, words))
    return is_alert


def alert_on(message):
    print("ALERT!!!!", message)


def shelp_load_model(insult_pickle_file, toxic_pickle_file, vct_pickle_file):
    with open(insult_pickle_file, 'rb') as f:
        insult_model = pickle.load(f)
    with open(toxic_pickle_file, 'rb') as f:
        toxic_model = pickle.load(f)
    with open(vct_pickle_file, 'rb') as f:
        vect = pickle.load(f)
    return insult_model, toxic_model, vect


def predict(insult_model, toxic_model, vect, sentences):

    test_X_dtm = vect.transform(sentences)
    is_insult = np.any(insult_model.predict(test_X_dtm))
    is_toxic = np.any(toxic_model.predict(test_X_dtm))
    return is_insult, is_toxic


def predict_emotion(file_path):
    X, sample_rate = librosa.load(file_path, res_type='kaiser_fast', duration=3, sr=22050 * 2, offset=0.5)
    X = np.concatenate((X, X), axis=None)
    X = X[:132300]
    sample_rate = np.array(sample_rate)
    model = load_model('../model/my_model.k')
    opt = rmsprop(lr=0.0001, decay=1e-6)
    model.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])
    lb = LabelEncoder()
    lb.classes_ = np.load('../model/label_classes.npy', allow_pickle=True)
    features = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13), axis=0)
    features_df = pd.DataFrame(data=features)
    features_stacked = features_df.stack().to_frame().T
    features_expanded = np.expand_dims(features_stacked, axis=2)
    predictions = model.predict(features_expanded, batch_size=512, verbose=1)
    predictions_mod = predictions.argmax(axis=1)
    preds_flat = predictions_mod.astype(int).flatten()
    preds_flat
    predictions_array = (lb.inverse_transform((preds_flat)))
    predictions_array
    if (predictions_array[0] == 'female_sad' or predictions_array[0] == 'male_angry'):
        return True
    return False

def main():
    insult_model, toxic_model, vect = shelp_load_model(insult_pickle_file='../model/insult_shelp.pkl',
                                                       toxic_pickle_file='../model/toxic_shelp.pkl',
                                                       vct_pickle_file='../model/vect_shelp.pkl')

    Input_file_path = '../api/record.wav'

    os.remove(Input_file_path + "_output.wav")
    os.system("ffmpeg -i " + Input_file_path + " -strict experimental " + Input_file_path + "_output.wav")
    file_path = Input_file_path + "_output.wav"
    sentences = process_wav(filename=file_path)
    is_insult, is_toxic = predict(insult_model, toxic_model, vect, sentences=sentences)

    # Hard coded version
    sisterhood_alert = False
    is_hc_alert = identify_key_words(sentences=sentences)

    # Using model prediction
    if is_insult or is_toxic:
        alert_on("Model prediction")
        sisterhood_alert = True
    elif is_hc_alert:
        alert_on("Hard coded words")
        sisterhood_alert = True
    else:
        print('no alert')

    # Check if magic word was activated
    magic_word = "bla"  # config.MAGIC_WORD
    police_alert = False
    if np.any(np.isin(magic_word, sentences)):
        police_alert = True

    return {"alert_police": police_alert, "alert_sisterhood": sisterhood_alert}


if __name__ == "__main__":
    main()

