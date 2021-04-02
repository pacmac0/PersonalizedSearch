import numpy as np


def get_tfidf_score(term_vec, doc_count):
    """
    Tranditional tf-idf algorithm
    Args:
        term_vec (dict):
            E.g.
            {
                "doc_freq": 1012,
                "term_freq": 2
            }
        doc_count (int): the total number of documents
    Return:
        tf-idf score
    """
    tf = term_vec.get('term_freq', 0)
    doc_freq = term_vec.get('doc_freq', 0)
    idf = np.log(doc_count/(1+doc_freq))
    return tf*idf