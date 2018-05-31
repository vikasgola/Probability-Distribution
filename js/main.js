
var laplace,cauchy,normal,beta,gamma,poisson,binomial;

function setup() {
    distribution;
    distribution.selected = "laplace";

    createCanvas(window.innerWidth,window.innerHeight);

    laplace = new control("laplace");
    laplace.b = random(0,3);
    laplace.mu = random(-2,2);
    laplace.add("b",0.01,3);
    laplace.add("mu",-5,5);
    laplace.probfunc = (i) => laplaceDist(i,laplace.mu,laplace.b);

    cauchy = new control("cauchy");
    cauchy.gamma = random(2);
    cauchy.x0 = random(-2,2);
    cauchy.add("gamma",0.01,2);
    cauchy.add("x0",-2,2);
    cauchy.probfunc = (i) => cauchyDist(i,cauchy.gamma,cauchy.x0);    


    normal = new control("normal");
    normal.mean = random(-10, 10);
    normal.standDev = random(-0.5, 0.5);
    normal.add("mean",-10,10);
    normal.add("standDev",-2,2);
    normal.probfunc = (i) => normalDist(i,normal.mean,normal.standDev);

    beta = new control("beta");
    beta.a = random(0.5,1);
    beta.b = random(0.5,1);
    beta.add("a",0.01,5);
    beta.add("b",0.01,5);
    beta.probfunc = (i) => betaDist(i*0.1 + 0.5,beta.a,beta.b);
    
    gamma = new control("gamma");
    gamma.theta = random(3.14);
    gamma.k = random(10);
    gamma.add("k",0.01,10);
    gamma.add("theta",0.01,3.14);
    gamma.probfunc = (i) => gammaDist(i+10,gamma.k,gamma.theta);

    poisson = new control("poisson");
    poisson.lambda = random(0.1,40);
    poisson.add("lambda",0.01,40);
    poisson.probfunc = (i) => poissionDist(poisson.lambda,i*10+100)*3;

    binomial = new control("binomial");
    binomial.n = floor(random(40));
    binomial.p = random(1);
    binomial.add("n",0,100);
    binomial.add("p",0,1);
    binomial.probfunc = (i) => binomialDist(binomial.n,i*10 + 100,binomial.p)*3;


    Gui.add(distribution,"selected",["laplace","cauchy","normal","beta","gamma","poisson","binomial"]);
}

function draw(){
    background(255);
    distribution.update();

    beginShape();
    noFill();    
    for(var i=-10;i<10;i+=0.1){
        var t = map(i,-10,10,0,width);
        var m = map(distribution.current.probfunc(i),0,2,height-40,0);
        strokeWeight(3);
        vertex(t,m);
    }
    endShape();
}