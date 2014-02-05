A Framework and Application for Efficient Analysis of Peptide Libraries
========================================================
author: Eric Hare
date: 02-06-2014
font-family: 'Helvetica'

Introduction
========================================================

Peptide Libraries are important in a number of fields for a number of different applications:

- Protein Interaction
- Vaccine Research
- Drug Screening

Problems
========================================================
- Cost - The more peptides, the more expensive
- Quality - The fewer different peptides, the less useful for most applications

Being able to assess the quality of a peptide library, and doing so in a way so as to minimize cost, should help researchers make better choices about which peptide library to purchase.

Framework
========================================================
My project is a three-layer tool to assess the statistical properties of peptide libraries.
![The layers of my project](figure/CC_Drawing_1.png)

discreteRV
========================================================
Manipulation of Discrete Random Variables

* Based on idea and code by Andreas Buja (Wharton School of Business)
* My contribution: additional functionality, packaging, documentation, and write-up 



Installing discreteRV
========================================================
discreteRV is available on CRAN (stable) and GitHub (development)

(1) Install from CRAN or GitHub

```r
install.packages("discreteRV")

library(devtools)
install_github("discreteRV", "erichare")
```


(2) Load the package

```r
library(discreteRV)
```



Creating discrete random variables
========================================================
Let X be a random variable representing a single toss of a fair die. X takes on the values 1 to 6 with probability $\frac{1}{6}$

$P(X = x) = \frac{1}{6} \ \ \ \ x \in \{1, 2, 3, 4, 5, 6\}$

In discreteRV,


```r
X <- make.RV(1:6, rep(1/6, 6), fractions = TRUE)
X
```

```
random variable with 6 outcomes

  1   2   3   4   5   6 
1/6 1/6 1/6 1/6 1/6 1/6 
```


Creating discrete random variables (continued)
========================================================

```r
plot(X)
```

<img src="hare_eric_cc_defense-figure/unnamed-chunk-4.png" title="plot of chunk unnamed-chunk-4" alt="plot of chunk unnamed-chunk-4" style="display: block; margin: auto;" />



Probability Functions
========================================================
discreteRV features probability functions which have a syntax very similar to Casella & Berger:


```r
P(X > 3)
```

```
[1] 0.5
```

```r
P(X < 1 | X >= 5)
```

```
[1] 0.3333
```



Probability Functions (continued)
========================================================


```r
E(X)
```

```
[1] 3.5
```

```r
V(X)
```

```
[1] 2.917
```

```r
SD(X)
```

```
[1] 1.708
```


Joint Distributions
========================================================
discreteRV allows easy computation of joint distributions:


```r
multN(X, n = 2, fractions = TRUE)
```

```
random variable with 36 outcomes

 1.1  1.2  1.3  1.4  1.5  1.6  2.1  2.2  2.3  2.4  2.5  2.6  3.1  3.2  3.3 
1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 
 3.4  3.5  3.6  4.1  4.2  4.3  4.4  4.5  4.6  5.1  5.2  5.3  5.4  5.5  5.6 
1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 1/36 
 6.1  6.2  6.3  6.4  6.5  6.6 
1/36 1/36 1/36 1/36 1/36 1/36 
```


Simulations
========================================================
We can simulate trials from any defined random variable:


```r
X.sim <- rsim(10, X)
X.sim
```

```
1/6 1/6 1/6 1/6 1/6 1/6 1/6 1/6 1/6 1/6 
  4   6   4   2   1   1   6   5   6   4 
attr(,"RV")
random variable with 6 outcomes

  1   2   3   4   5   6 
1/6 1/6 1/6 1/6 1/6 1/6 
attr(,"class")
[1] "RVsim"
```


Simulations (continued)
========================================================


```r
plot(X.sim)
```

<img src="hare_eric_cc_defense-figure/unnamed-chunk-9.png" title="plot of chunk unnamed-chunk-9" alt="plot of chunk unnamed-chunk-9" style="display: block; margin: auto;" />


An Application of discreteRV
========================================================
Peptides are chains of amino acids linked by peptide bonds

![Amino Acid Wheel](aa.png)

Suppose we regard each amino acid as independent of the others in a peptide...

peptider
========================================================
peptider is an R package, built on top of discreteRV, which allows for the statistical analysis of peptide libraries.

(1) Install from CRAN or GitHub

```r
install.packages("peptider")

library(devtools)
install_github("peptider", "heike")
```


(2) Load the package

```r
library(peptider)
```


Peptide Encoding
========================================================
Idea - Divide 20 amino acids into classes based on the number of codons describing each amino acid.

SLRLLRS = $6^7$ = 279936 distinct codon sequences yielding this peptide

MWMWMWM = $1^7$ = 1 distinct codon sequence yielding this peptide

Peptide Encoding (continued)
========================================================
Depending on the Encoding scheme, this yields either one, three, or five classes:

* NNN - A/G/C/T unrestricted in all three positions
* NNB - First two unrestricted, third either C/G/T
* NNK (NNS) - First two unrestricted, third either G/T (G/C)
* trimer - Codons are pre-defined, equal probabilities for all AA

Peptide Encoding (continued)
========================================================

```r
libscheme("NNN")$info$scheme
```

```
  class    aacids c s
1     A       SLR 6 3
2     B     AGPTV 4 5
3     C         I 3 1
4     D DEFHKNQYC 2 9
5     E        MW 1 2
6     Z         * 3 1
```

The probability of a single amino acid class i occurring is defined as (ignoring class Z):

$c_is_i / \sum_{i=1}^n c_is_i, i \ne Z$

Peptide Encoding (continued)
========================================================
So we can create a random variable representing the occurrence of a single amino acid class.

Treating each amino acid as independent in a peptide sequence, we can use the multN function to compute the joint distribution for peptides of length k.


```r
head(libscheme("NNK", 6)$data, n = 4)
```

```
                  class   di     probs
A.A.A.A.A.A A.A.A.A.A.A  729 0.0005988
A.A.A.A.A.B A.A.A.A.A.B 1215 0.0006653
A.A.A.A.A.C A.A.A.A.A.C 2916 0.0007984
A.A.A.A.B.A A.A.A.A.B.A 1215 0.0006653
```


Peptide Library Measures
========================================================
Diversity - Expected # of unique peptides in the library.

$D(N, k) = \sum_{i=1}^{v^k}b_i(1 - e^{-Np_i/b_i})$


```r
diversity(4, "NNK", N = 10^4)
```

```
[1] 8298
```


Makowski Diversity - Measure of diversity where 1 is a library in which each peptide has the same probability


```r
makowski(4, "NNK")
```

```
[1] 0.4399
```


Peptide Library Measures (continued)
========================================================
Expected Coverage - The expected proportion of all possible peptides of length k included in the library.

$C(N, k) = D(N, k)/c^k$


```r
coverage(4, "NNK", N = 10^4)
```

```
[1] 0.05186
```

```r
diversity(4, "NNK", N = 10^4) / 20^4
```

```
[1] 0.05186
```


Peptide Library Measures (continued)
========================================================
Relative Efficiency - Ratio of expected peptide diversity to the total number of peptides in the library.

$R(N, k) = D(N, k)/N$


```r
efficiency(4, "NNK", N = 10^4)
```

```
[1] 0.8298
```

```r
diversity(4, "NNK", N = 10^4) / 10^4
```

```
[1] 0.8298
```


A New Peptide Encoding
========================================================
The old encoding computes a joint distribution for every possible peptide. 

But we know by independence the probability of obtaining a peptide HENNING is the same as a peptide EHNNING - The amino acids are simply rearranged.

Idea: Encode a peptide by a *count* of amino acids, and store number of possible permutations.

A New Peptide Encoding (continued)
========================================================

```r
peptider:::libscheme_new("NNK", k = 3)$data
```

```
   class   di choices   probs
1  3,0,0   27       1 0.02447
2  2,1,0   45       3 0.02719
3  1,2,0   75       3 0.03021
4  0,3,0  125       1 0.03357
5  2,0,1  108       3 0.03263
6  1,1,1  180       6 0.03625
7  0,2,1  300       3 0.04028
8  1,0,2  432       3 0.04350
9  0,1,2  720       3 0.04834
10 0,0,3 1728       1 0.05800
```


A New Peptide Encoding (continued)
========================================================
This allows for much faster computations, even for large peptides.


```r
peptider:::coverage_new("NNK", k = 18, N = 10^24)
```

```
[1] 0.4012
```


PeLiCa
========================================================
Shiny-based web-frontend to peptider

Available at http://www.pelica.org

Development version available at http://erichare.shinyapps.io/pelica - Uses the new peptide encoding.

Features
========================================================
* Full-featured frontend for peptider
* Use pre-built library schemes or create a custom scheme
* Textual and graphical visualization of library properties
* Supports peptide lengths six through ten, library sizes up to $9.9 \times 10^{15}$

PeLiCa - Live Demo
========================================================

Conclusion
========================================================
PeLiCa is powerful and easy to use...

... But this was only possible because of the modular nature of the components it builds upon.
![The layers of my project](figure/CC_Drawing_1.png)

Thank You
========================================================
Any questions?
