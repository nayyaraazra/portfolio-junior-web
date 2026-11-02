
import numpy as np

data = np.array([
    [90, 70, 90, 82], [85, 90, 95, 91], [75, 75, 80, 77], [80, 90, 85, 86],
    [75, 85, 90, 85], [95, 80, 90, 87], [50, 70, 85, 72], [100, 80, 80, 84],
    [85, 80, 70, 77], [45, 50, 80, 61], [75, 80, 80, 79], [80, 45, 50, 54],
    [50, 75, 80, 72], [90, 80, 85, 84], [90, 50, 90, 74], [75, 90, 80, 83],
    [80, 90, 95, 90], [50, 75, 80, 72], [90, 80, 85, 84], [60, 50, 90, 68],
], dtype=float)
X, y = data[:, :3] / 100.0, data[:, 3] / 100.0      # normalisasi (bagi 100)
 
ALPHA, EPOCH, W_AWAL = 0.2, 500, 0.5
 
def latih(X, y, alpha=ALPHA, epoch=EPOCH, w0=W_AWAL):
    w = np.full(X.shape[1], w0)                      # bobot awal
    mse_hist = []
    for _ in range(epoch):
        err2 = 0.0
        for x, t in zip(X, y):                       # pembaruan per data (online)
            o = np.dot(w, x)                         # keluaran (aktivasi linear)
            e = t - o                                # galat
            w = w + alpha * e * x                    # delta rule
            err2 += e ** 2
        mse_hist.append(err2 / len(X))
    return w, mse_hist
 
def prediksi(X, w):
    return X @ w
K = 5
n = len(X)
idx = np.arange(n)
fold = np.array_split(idx, K)                        # fold berurutan @4 data
hasil = []
for k, uji in enumerate(fold, start=1):
    latih_idx = np.setdiff1d(idx, uji)
    w, _ = latih(X[latih_idx], y[latih_idx])
    p = prediksi(X[uji], w) * 100
    asli = y[uji] * 100
    rmse = np.sqrt(np.mean((p - asli) ** 2))
    mae = np.mean(np.abs(p - asli))
    hasil.append((k, uji + 1, w, rmse, mae, p, asli))
    print(f"Fold {k}: uji=data {[int(i) for i in uji + 1]}  W1={w[0]:.4f} W2={w[1]:.4f} W3={w[2]:.4f}  RMSE={rmse:.6f}  MAE={mae:.6f}")
 
print("Rata-rata RMSE :", np.mean([h[3] for h in hasil]))
print("Rata-rata MAE  :", np.mean([h[4] for h in hasil]))
 
w_akhir, mse_hist = latih(X, y)
print(f"\nMODEL AKHIR: NILAI AKHIR = {w_akhir[0]:.4f}*UTS + {w_akhir[1]:.4f}*TUGAS + {w_akhir[2]:.4f}*UAS")
print("MSE akhir:", mse_hist[-1])

