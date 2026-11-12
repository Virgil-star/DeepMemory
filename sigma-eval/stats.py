"""Sigma Eval E3 statistics. Exact methods; seeds fixed. Run: python3 stats.py"""
import numpy as np
from scipy import stats
from math import comb, sqrt
B=stats.binom
print("== 1. Exact one-sided binomial tail P(X>=k | n, p=0.5)")
for n,ks in [(20,range(10,17)),(30,range(18,22))]:
    for k in ks: print(f"n={n} k>={k}: P={B.sf(k-1,n,0.5):.4f}")
print("\n== 2. 95% intervals for k/20 (Wilson; Clopper-Pearson exact)")
def wilson(k,n,z=1.959964):
    p=k/n; d=1+z*z/n; c=(p+z*z/(2*n))/d; h=z*sqrt(p*(1-p)/n+z*z/(4*n*n))/d; return c-h,c+h
for k in [10,11,12,14,15]:
    lo,hi=wilson(k,20); cp=stats.binomtest(k,20).proportion_ci(0.95,'exact')
    print(f"{k}/20={k/20:.2f} Wilson[{lo:.3f},{hi:.3f}] CP[{cp.low:.3f},{cp.high:.3f}]")
print("\n== 3. Operating characteristics of locked rule at n=20 (go>=15, stop<=10, inconclusive 11-14)")
for p in [0.5,0.6,0.7,0.75,0.8]:
    print(f"true p={p}: P(go)={B.sf(14,20,p):.3f} P(stop)={B.cdf(10,20,p):.3f} P(inconcl)={B.cdf(14,20,p)-B.cdf(10,20,p):.3f}")
print("\n== 4. Zero untraceable findings among N checked: 95% upper bound on true rate")
for N in [20,50,100,150]: print(f"N={N}: rule-of-three 3/N={3/N:.4f}; exact 1-0.05^(1/N)={1-0.05**(1/N):.4f}")
print("\n== 5. n to detect p=0.60 vs 0.50, one-sided a=0.05, power 0.80 (normal approx)")
za,zb=stats.norm.ppf(0.95),stats.norm.ppf(0.80)
n=((za*0.5+zb*sqrt(0.6*0.4))/0.1)**2; print(f"n≈{n:.1f} -> {int(np.ceil(n))}")
print("\n== 6. Two-stage type-I error under H0 p=0.5 (stage1 n=20; stage2 if 11-14)")
# (a) v2 reading: extend to 30 cumulative (10 more), go if total>=20
a=B.sf(14,20,.5)
for x in range(11,15): a+=B.pmf(x,20,.5)*B.sf(20-x-1,10,.5)
print(f"(a) cumulative 20->30, go if >=20/30: overall alpha={a:.4f}")
# (b) 30 fresh exercises, go if >=20/30
b=B.sf(14,20,.5)+(B.cdf(14,20,.5)-B.cdf(10,20,.5))*B.sf(19,30,.5)
print(f"(b) fresh 30, go if >=20/30: overall alpha={b:.4f}")
# (c) cumulative, go if >=k30 ; find smallest k keeping overall<=0.05
for k30 in range(19,24):
    c=B.sf(14,20,.5)+sum(B.pmf(x,20,.5)*B.sf(k30-x-1,10,.5) for x in range(11,15))
    print(f"(c) cumulative 30, go threshold {k30}/30: overall alpha={c:.4f}")
# (d) locked rule read as unlimited repeats of fresh 20 (same 15/20 bar each time)
p_go,p_inc=B.sf(14,20,.5),B.cdf(14,20,.5)-B.cdf(10,20,.5)
print(f"(d) repeated fresh-20 rounds, unlimited: overall alpha={p_go/(1-p_inc):.4f} (P(inconcl|H0)={p_inc:.3f})")
print("\n== 7. Cohen's kappa precision on 10 reports (2 raters), simulation")
rng=np.random.default_rng(20261026)
def kappa(a,b,K):
    po=np.mean(a==b); pe=sum(np.mean(a==c)*np.mean(b==c) for c in range(K))
    return np.nan if pe==1 else (po-pe)/(1-pe)
for K,true_agree in [(2,0.85),(3,0.80)]:
    ks=[]
    for _ in range(20000):
        a=rng.integers(0,K,10); flip=rng.random(10)>true_agree
        b=a.copy(); b[flip]=(a[flip]+rng.integers(1,K,flip.sum()))%K
        ks.append(kappa(a,b,K))
    ks=np.array(ks); ks=ks[~np.isnan(ks)]
    print(f"K={K} categories, true raw agreement {true_agree}: median kappa={np.median(ks):.2f}, "
          f"2.5-97.5%=[{np.percentile(ks,2.5):.2f},{np.percentile(ks,97.5):.2f}], P(kappa>=0.6)={np.mean(ks>=0.6):.2f}, P(kappa<0.4)={np.mean(ks<0.4):.2f}")
