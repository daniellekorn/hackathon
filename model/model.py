import os
import speech_recognition as sr
import numpy as np
import glob
import pickle
import os



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


def load_model(insult_pickle_file, toxic_pickle_file, vct_pickle_file):
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


def main():
    insult_model, toxic_model, vect = load_model(insult_pickle_file='../model/insult_shelp.pkl',
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

