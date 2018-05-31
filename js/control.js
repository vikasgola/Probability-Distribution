var Gui = new dat.GUI();

function control(name){
    this.name = name;

    this.probfunc;

    this.folder = Gui.addFolder(this.name);

    this.add = function(name,min,max){
        if(min == undefined && max == undefined)
            this.folder.add(this,name);
        else
            this.folder.add(this , name, min, max);
    }
}