###
## discreteRV 1.0 Demo
###

## Install and load
install.packages(discreteRV)
library(discreteRV)


## Making a Random Variable
## Let's make our first couple random variables
## We need a vector of outcomes, and a vector of probabilities
# Create a "fair die" (DiscreteUnif(1, 6))
X <- make.RV(1:6, rep("1/6", 6))
# Equivalent: X2 <- make.RV(1:6, rep((1/6), 6))

# Create a biased die (higher probability of 5 and 6)
Y <- make.RV(1:6, c(0.1,0.1,0.1,0.1,0.2,0.4))


## Probabilities and Moments of Random Variables
## Notice the familiar syntax
P(X > 3);  P(Y > 3)
E(X);  E(Y)
V(X);  V(Y)
SD(X);  SD(Y)

# Do you guys remember your moments?
E((X - E(X))^2)
# Let's take a look at the variance function
V

## Plotting Random Variables
# Default plotting style
# Implements an "S3" plot method
par(mfrow=c(2,1))
plot(X, ylim = c(0, 0.5), col = "red");  plot(Y, ylim = c(0, 0.5), col = "blue")
# Yes... standard R graphics.  We CAN plot it similarly with ggplot2 but its a little work
X.probs <- sapply(names(X), function(str) { return(eval(parse(text = str))) } )
qplot(as.numeric(X), X.probs, geom = "bar", stat = "identity", ylim = c(0, 0.5), width = 0.01, colour = I("red")) +
    geom_point(colour = I("red"), size = 4)

## Sum of independent random variables
# Now let's assume X and Y are independent and define:
# Z = X + Y
Z <- SofI(X,Y)
plot(Z)

# Let's illustrate CLT using SofIID.  We'll sum up 50 IID "fair die"... takes a little while to run!
S50 <- SofIID(X, 50)
plot(S50)
E(S50) # 50 * 3.5

## Joint Distributions
# mult - Joint distributions!
# Define W = XY
W <- mult(X, Y)
probs(W)

# What about more than two variables?
W2 <- multN(Y, 4)
probs(W2)


###
# Simulations
###

X.sim <- rsim(10000, X)
plot(X.sim)
Y.sim <- rsim(10000, Y)
plot(Y.sim)

## Now, I want to show you the code for rsim
rsim
## It's essentially just a wrapper around sample.  And yet, this syntax makes it much more intuitive

# Compare the theoretical and observed probabilities
probs(X);  props(X.sim)
probs(Y);  props(Y.sim)