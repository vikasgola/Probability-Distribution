

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    background(255);
}


function draw(){
    frameRate(2);
    showPoision();
}

function showPoision(){
    
}

function showBinomial(){

    var k = 0;
    var n = floor(random(40));
    var p = random(1);

    noFill();
    beginShape()
    for(var i=0;i<n;i++){
        var t = map(i,0,n,0,width);
        var m = map(binomialDist(n,i,p),0,1,height,0);
        strokeWeight(8);          
        point(t,m);
        strokeWeight(3);
        vertex(t,m);
    }
    endShape();
}


function showNormal(){
    var mean,standDev;
    
    if(frameCount%10 == 0){
        strokeWeight(1);
        text("mean:" + nf(mean ,0 ,2), 20  , 30);
        text("std:" +nf(standDev,0,2), width - 100  , 30 );
        fill(0);
        background(255);    
    }

    frameRate(1);
    mean = random(-10, 10);
    standDev = random(-10, 10);
    noFill();
    beginShape();
    stroke(floor(random(0,256)),floor(random(0,256)),floor(random(0,256)));
    strokeWeight(3);
    for(var i=0;i<width;i++){
        vertex(i , height - 1000*normalDist((-width/2 + i)*0.04, mean , standDev));
    }
    endShape();

    strokeWeight(1);
    text("mean:" + nf(mean ,0 ,2), 20  ,30 + (frameCount%10)*30);
    text("std:" +nf(standDev,0,2), width - 100  ,30 + (frameCount%10)*30 );
    fill(0);
}


function normalDist(x,mean,standDev){
    return (1/sqrt(2*PI*standDev*standDev))*exp(-pow(x-mean, 2)/(2*standDev*standDev));
}

function binomialDist(n,k,p){
    return (fact(n)/(fact(k)*fact(n-k)))*pow(p,k)*pow(1-p,n-k);
}


function fact(k){
    if(k == 0 ) return 1;
    return k*fact(k-1);
}