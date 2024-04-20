import pickle
# pickle.dump(tfidf,open('vectorizer.pkl','wb'))
# pickle.dump(mnb,open('model.pkl','wb'))
from nltk.corpus import stopwords
import nltk
import string
import warnings
import os
import __main__


PATH = os.path.join(os.path.dirname(__main__.__file__), "swiftmail", "model")

warnings.filterwarnings("ignore")

# nltk.download('stopwords')
# nltk.download('punkt')


def transform_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)

    y = []
    for i in text:
        if i.isalnum():
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        y.append(i)

    return " ".join(y)


model = pickle.load(open(PATH+'/model.pkl', 'rb'))
tfidf = pickle.load(open(PATH+'/vectorizer.pkl', 'rb'))

# test="WINNER!! As a valued network customer you have been selected to receivea �900 prize reward! To claim call 09061701461. Claim code KL341. Valid 12 hours only"
# test2="I'm gonna be home soon and i don't want to talk about this stuff anymore tonight, k? I've cried enough today."


def detect(text):

    transformed_sms = transform_text(text)
    # 2. vectorize
    vector_input = tfidf.transform([transformed_sms])
    # 3. predict
    result = model.predict(vector_input)[0]
    # 4. return
    if result == 1:
        return True
    else:
        return False


# print(detect(test))
