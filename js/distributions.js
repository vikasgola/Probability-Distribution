var distribution = new function(){
    this.selected;
    this.current;

    this.update = function(){
        this.current = eval(this.selected);
        this.current.folder.open();
        
        fill(0);
        textSize(62);
        textAlign(CENTER);
        text(this.selected.toUpperCase() + " Distribution" ,width/2,height/2);
    }
};

function normalDist(x,mean,standDev){
    return (1/sqrt(2*PI*standDev*standDev))*exp(-pow(x-mean, 2)/(2*standDev*standDev));
}

function binomialDist(n,k,p){
    if(n < k) return 0;
    return (fact(n)/(fact(k)*fact(n-k)))*pow(p,k)*pow(1-p,n-k);
}

function betaDist(x,a,b){
    return (fact(a+b-1)/(fact(a-1)*fact(b-1)))*pow(x,a-1)*pow(1-x,b-1);
}


function poissionDist(lambda , k){
    return pow(lambda,k)*exp(-lambda)/fact(k);
}

function gammaDist(x,k,theta){
    return pow(x,k-1)*exp(-x/theta)/(pow(theta,k)*fact(k-1));
}

function cauchyDist(x,gamma,x0){
    return gamma*gamma/((pow(x-x0,2) + gamma*gamma)*Math.PI*gamma);
}


function laplaceDist(x,mu,b){
    return exp(-abs(x-mu)/b)/(2*b);
}

function fact(k){
    if(k <= 0 ) return 1;
    return k*fact(k-1);
}