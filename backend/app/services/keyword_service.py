import re

import spacy
from keybert import KeyBERT
from nltk.corpus import stopwords

from ..models import Review


# Load spaCy model once
nlp = spacy.load("en_core_web_sm")

# Load KeyBERT model once
kw_model = KeyBERT(model="all-MiniLM-L6-v2")

# English stopwords
STOP_WORDS = set(stopwords.words("english"))

# Configuration
TOP_KEYWORDS = 25
MIN_SCORE = 35

BLACKLIST = {
    "day",
    "days",
    "thing",
    "things",
    "time",
    "times",
    "life",
}


def preprocess_reviews(reviews):
    """
    Clean and preprocess reviews before keyword extraction.
    """

    cleaned_reviews = []

    for review in reviews:

        text = review.review.lower()

        text = re.sub(r"[^a-zA-Z\s]", "", text)

        doc = nlp(text)

        words = []

        for token in doc:

            if (
                token.is_stop
                or token.is_punct
                or token.lemma_ in STOP_WORDS
                or len(token.lemma_) < 3
            ):
                continue

            words.append(token.lemma_)

        cleaned_reviews.append(" ".join(words))

    return cleaned_reviews


def filter_keywords(keywords):
    """
    Remove weak, duplicate and meaningless keywords.
    """

    filtered = []
    seen = set()

    for keyword, score in keywords:

        keyword = keyword.strip().lower()

        # Remove low confidence keywords
        if score * 100 < MIN_SCORE:
            continue

        words = keyword.split()

        # Remove meaningless words
        if len(words) == 1 and words[0] in BLACKLIST:
            continue

        # Remove duplicates based on individual words
        duplicate = False

        for existing in seen:
            if keyword in existing or existing in keyword:
                duplicate = True
                break

        if duplicate:
            continue

        seen.add(keyword)

        filtered.append(
            {
                "keyword": keyword,
                "score": round(score * 100, 2),
            }
        )

    return filtered[:TOP_KEYWORDS]


def extract_keywords(cleaned_reviews):
    """
    Extract keywords using KeyBERT.
    """

    if not cleaned_reviews:
        return []

    text = " ".join(cleaned_reviews)

    keywords = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=50,
    )

    return filter_keywords(keywords)


def extract_positive_keywords():

    reviews = Review.query.filter_by(
        sentiment="Positive"
    ).all()

    cleaned = preprocess_reviews(reviews)

    return extract_keywords(cleaned)


def extract_negative_keywords():

    reviews = Review.query.filter_by(
        sentiment="Negative"
    ).all()

    cleaned = preprocess_reviews(reviews)

    return extract_keywords(cleaned)