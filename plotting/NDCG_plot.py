import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd



# data [0.0, 0.1, ...., 1.0]
ndcg_scores = np.array([
    [0.7438001111831367, 0.7914823489223388, 0.8556359193745740, 0.8570823950681968, 0.8572255182549484,\
     0.8591844430250170, 0.8661761980271542, 0.8679606301397402, 0.8677444683368686, 0.9116620813893755, 0.9156313191610688],
    [0.6375230371567724, 0.8669070176050718, 0.9105884500903919, 0.9311146477635582, 0.9535565076708566,\
     0.9612691747732938, 0.9612691747732938, 0.9612691747732938, 0.9608251570032031, 0.9649707678137933, 0.9666797953356446],
])
labels = ["Fynn searching \"markets\"", "Artin searching \"markets\""]
p_values = [np.around(v, 2) for v in np.arange(0.0, 1.1, 0.1)]

def plot():
    sns.set_theme(style="whitegrid")
    plt.plot(ndcg_scores.T[:,0], label=labels[0])
    plt.plot(ndcg_scores.T[:,1], label=labels[1])
    plt.legend()
    plt.ylim([np.min(ndcg_scores), 1.0])
    plt.xticks(range(0,11), p_values)
    plt.ylabel("NDCG Score")
    plt.xlabel("personlaization factor P")
    plt.savefig("plots/ndcg_p_plot.png")

if __name__ == '__main__':
    plot()