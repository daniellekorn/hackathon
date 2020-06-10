#!/usr/bin/env python
import firebase_admin
from firebase import firebase
from firebase_admin import credentials, firestore


# authentication for database
cred = credentials.Certificate("./db-config.json")
firebase_admin.initialize_app(cred)


def set_magic_word():
    """
    a setter for magic code which triggers police.
    """
    global magic_word

    users = firestore.client().collection('users').where(u'uid', u'==', user_id).stream()
    for user in users:
        magic_word = user.to_dict()['code']


def get_magic_word():
    """
    a getter for magic code which triggers police.
    """
    global magic_word
    try:
        magic_word
    except NameError:
        set_magic_word()
    return magic_word