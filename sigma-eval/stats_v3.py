#!/usr/bin/env python3
"""Sigma Eval stats v3: power of the locked 15/20 rule, power-sized n, symmetric week-1 bounds. Exact binomial (scipy)."""
from scipy.stats import binom, beta
def tail(n,k,p): return binom.sf(k-1,n,p)          # P(X>=k)
def cp(k,n,a=0.05):                                  # one-sided exact (Clopper-Pearson) bounds at level 1-a
    lo = 0.0 if k==0 else beta.ppf(a,k,n-k+1); hi = 1.0 if k==n else beta.ppf(1-a,k+1,n-k); return lo,hi
print("== A. Locked rule on n=20: P(go: X>=15), P(stop: X<=10), P(inconclusive 11-14) ==")
for p in (0.50,0.55,0.60,0.65,0.70,0.75,0.80):
    g=tail(20,15,p); s=binom.cdf(10,20,p); print(f"p={p:.2f}  power/P(go)={g:.4f}  P(stop)={s:.4f}  P(inconcl)={1-g-s:.4f}")
print("(preference criterion only; the zero-untraceable, fabrication, cost and non-inferiority conditions can only lower P(go))")
print("\n== B. Smallest n (one-sided alpha<=0.05 exact) with power>=0.80 ==")
for p1 in (0.65,0.70,0.75,0.80):
    for n in range(10,400):
        k=next(k for k in range(n+1) if tail(n,k,0.5)<=0.05)
        if tail(n,k,p1)>=0.80: print(f"p1={p1:.2f}: n={n}, go at >={k}/{n}, alpha={tail(n,k,0.5):.4f}, power={tail(n,k,p1):.4f}"); break
print("\n== C. Symmetric week-1 rule on pooled Arm 2 findings (g = traceable AND supported) ==")
print("RE-SCOPE if good>=K_hi(N): K_hi = smallest k with k/N>=0.80 and exact one-sided 95% lower bound >0.50")
print("BUILD-CONFIRM if good<=N-K_hi(N) (mirror image: share<=0.20 and upper bound <0.50); else NO EARLY DECISION")
for N in (5,6,8,10,12,15,20,25,30,40,50,60):
    K=next((k for k in range(N+1) if k/N>=0.80 and cp(k,N)[0]>0.5),None)
    if K is None: print(f"N={N}: no decision possible"); continue
    lo=cp(K,N)[0]; hi=cp(N-K,N)[1]
    print(f"N={N:3d}: re-scope if good>={K} (share {K/N:.2f}, LB {lo:.3f}); build-confirm if good<={N-K} (share {(N-K)/N:.2f}, UB {hi:.3f}); "
          f"P(re-scope|true g=.5)={tail(N,K,.5):.4f} = P(build-confirm|.5)={binom.cdf(N-K,N,.5):.4f}")
