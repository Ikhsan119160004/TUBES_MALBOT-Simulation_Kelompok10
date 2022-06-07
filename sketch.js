var svg = [], path;
var imgData = ['cloud.svg', 'computer1.svg', 'laptop.svg', 'server.svg', 'usb1.svg', 'virus.svg', 'info.svg', 'network.svg', 'upload.svg'];
let imageSVGs = [];
let lineWebs = [];
let counter = 0;
let net = false;
let selectedMenu = false;
let menuContent = false;
let menuSelected = false;
let scInfo = 'Simulasi Mallicious Bot';

function preload() {
  for(let i of imgData){
    svg.push(loadSVG('assets/'+i));
  }  
}

class ImageSVG{
constructor(x, y, infected, size, img) {
    this.x = x;
    this.y = y;
    this.infected = infected;
    this.img = img;
    this.size = size;
    this.display = false;
    this.id = counter;
    this.show();
    counter++;
  }
  
  show(){
    image(this.img, this.x, this.y, this.size,this.size);
    path = querySVG('path')[this.id];
    if(this.infected == 'Mallicious Bot'){
      path.attribute('fill', color(250,0,0));
    }else if(this.infected == 'network'){
      path.attribute('fill', color(0,150,0));
    }else if(this.infected == 'upMallicious Bot'){
      path.attribute('fill', color(0,0,250));
    }else if(this.infected == 'usb'){
      path.attribute('fill', color(0,0,0));
    }else if(this.infected == 'usbInfected'){
      path.attribute('fill', color(250,0,0));
    }else if(this.infected == 'server'){
      path.attribute('fill', color(0,0,0));
    }else if(this.infected == 'serverInfected'){
      path.attribute('fill', color(250,0,0));
    }else if(this.infected){
      path.attribute('fill', color(250,0,0));
    }
    this.display = true;
  }
  
  update(){
    path = querySVG('path')[this.id];
    if(this.infected){
      path.attribute('fill', color(250,0,0));
    }
    this.display = true;
  }
  
  getData(){
    let data = {
      x : this.x,
      y : this.y,
      size : this.size,
      infected : this.infected,
      img: this.img,
      id: this.id,
    }
    return data;
  }
  
  inMouseClicked(oX, oY) {
      let d = dist(this.x + this.size/2, this.y + this.size/2, oX, oY);
      return (d < this.size);
  }
  
  infect(val){
    this.infected = val;
    this.display = false;
  }
}

class LineWeb{
  constructor(x1, y1, x2, y2, infected, display){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.infected = infected;
    this.display = display;
    this.update = false;
    this.id = counter;
    counter++;
    this.show();
  }
  
  show(){
    if(this.infected == 'header'){
      strokeWeight(4);
      fill(0);
      rect(width - width, height - height, width, height - height + 30);

      strokeWeight(0);
      fill(255);
      textSize(15);
      text(scInfo, width - width + 15, 20);
    }else{
      strokeWeight(3);
      if(!this.display){
        strokeWeight(4);
        stroke(color(255));
      }else if(this.display && !this.infected){
        stroke(color(90,90,90));
      }else{
        stroke(color(255,0,0));
      }
      line(this.x1, this.y1, this.x2, this.y2);
    }
  }
  
  updateLine(display, infected){
    if(this.infected != 'header'){
      this.display = display;
      this.infected = infected;
      strokeWeight(3);
      if(!this.display){
        strokeWeight(4);
        stroke(color(255));
      }else if(this.display && !this.infected){
        stroke(color(0,0,0));
      }else if(this.display && this.infected){
        stroke(color(255,0,0));
      }
      line(this.x1, this.y1, this.x2, this.y2);
    }
  }
}


function setup() {
  createCanvas(900, windowHeight, SVG);
  background(255);
  
  lineWebs.push(new LineWeb(width - width, height - height, width, height - height + 30, 'header', false));
  lineWebs.push(new LineWeb(450, 100 + 30 , 450, 200, false, false));
  lineWebs.push(new LineWeb(400, 300 + 30 , 50, 400, false, false));
  lineWebs.push(new LineWeb(420, 300 + 30 , 800/5 + 50, 400, false, false));
  lineWebs.push(new LineWeb(440, 300 + 30 , (800/5 * 2)+ 50, 400, false, false));
  lineWebs.push(new LineWeb(460, 300 + 30 , (800/5 * 3)+ 50, 400, false, false));
  lineWebs.push(new LineWeb(480, 300 + 30 , (800/5 * 4)+ 50, 400, false, false));
  lineWebs.push(new LineWeb(500, 300 + 30 , (800)+ 50, 400, false, false));
  
  imageSVGs.push(new ImageSVG(10, 10 + 30, 'network', 50, svg[7]));
  imageSVGs.push(new ImageSVG(110, 10 + 30, 'usb', 50, svg[4]));
  imageSVGs.push(new ImageSVG(840, 10 + 30, 'Mallicious Bot', 50, svg[5]));
  imageSVGs.push(new ImageSVG(740, 10 + 30, 'upMallicious Bot', 50, svg[8]));
  
  imageSVGs.push(new ImageSVG(800/2, 0 + 30, 'server', 100, svg[3]));
  imageSVGs.push(new ImageSVG(800/2, 200 + 30, false, 100, svg[0]));
  imageSVGs.push(new ImageSVG(0, 400 + 30, false, 100, svg[2]));
  imageSVGs.push(new ImageSVG(800/5, 400 + 30, false, 100, svg[1]));
  imageSVGs.push(new ImageSVG(800/5 * 2, 400 + 30, false, 100, svg[1]));
  imageSVGs.push(new ImageSVG(800/5 * 3, 400 + 30, false, 100, svg[1]));
  imageSVGs.push(new ImageSVG(800/5 * 4, 400 + 30, false, 100, svg[1]));
  imageSVGs.push(new ImageSVG(800, 400 + 30, false, 100, svg[1]));
  
}

function draw() {
  
  lineWebs[0].show();
  for(let is of imageSVGs){
    if(!is.display){
      is.update();
    }
  }
  
}

function mouseClicked(){
  if(selectedMenu == 'usb'){
    if(menuContent != false){
      for(let is of imageSVGs){
        if(is.inMouseClicked(mouseX, mouseY)){
          if(is.infected == true){
            for(let ims of imageSVGs){
              if(ims.id == menuContent.id){
                ims.infect('usbInfected');
              }
            }
            selectedMenu = false;
            menuContent = false;
            scInfo = 'USB terinfeksi Mallicious Bot';
          }else if(is.infected == false){
            selectedMenu = false;
            menuContent = false;
            
            scInfo = 'USB Aman';
          }else{
            scInfo = 'Simulasi Mallicious Bot';
            selectedMenu = false;
            menuContent = false;
          }
        }
      }
    }
  }else if(selectedMenu == 'Mallicious Bot'){
    if(menuContent != false){
      for(let is of imageSVGs){
        if(is.inMouseClicked(mouseX, mouseY)){
          if(is.infected == false){
            is.infect(true);
            scInfo = 'Perangkat terserang Mallicious Bots';
            
            selectedMenu = false;
            menuContent = false;
          }else if(is.infected == 'usb'){
            is.infect('usbInfected');
            scInfo = 'USB terserang Mallicious Bots';
            
            selectedMenu = false;
            menuContent = false;
          }else if(is.infected == 'server'){
            is.infect('serverInfected');
            scInfo = 'Server terserang Mallicious Bots';
            
            selectedMenu = false;
            menuContent = false;
          }else{
            scInfo = 'Simulasi Mallicious Bot';
            selectedMenu = false;
            menuContent = false;
          }
        }
      }
    }
  }else if(selectedMenu == 'usbInfected'){
    if(menuContent != false){
      for(let is of imageSVGs){
        if(is.inMouseClicked(mouseX, mouseY)){
          if(is.infected == false){
            is.infect(true);
            scInfo = 'Perangkat terserang Mallicious Bots';
            
            selectedMenu = false;
            menuContent = false;
          }else if(is.infected == 'usb'){
            is.infect('usbInfected');
            scInfo = 'USB terserang Mallicious Bots';
            
            selectedMenu = false;
            menuContent = false;
          }else if(is.infected == 'server'){
            is.infect('serverInfected');
            scInfo = 'Server terserang Mallicious Bots';
            
            selectedMenu = false;
            menuContent = false;
          }else{
            scInfo = 'Simulasi Mallicious Bot';
            selectedMenu = false;
            menuContent = false;
          }
        }
      }
    }
  }else{
    for(let is of imageSVGs){
      if(is.inMouseClicked(mouseX, mouseY)){
        if(is.infected == 'Mallicious Bot'){
          selectedMenu = is.infected;
          menuContent = is.getData();
          
          scInfo = "Mallicious Bot dipilih"
        }else if(is.infected == 'usb'){
          selectedMenu = is.infected;
          menuContent = is.getData();
          
          scInfo = "USB dipilih"
        }else if(is.infected == 'usbInfected'){
          selectedMenu = is.infected;
          menuContent = is.getData();
          
          scInfo = "USB terinfeksi dipilih"
        }else if(is.infected == 'upMallicious Bot'){
          
          if(!net){
            scInfo = 'Upload Mallicious Bot gagal. Hubungkan perangkat ke jaringan!';
          }else if(net){
            let inf = false;
            for(let ims of imageSVGs){
              if(ims.infected == true){
                inf = true;
              }
            }
            if(inf){
              for(let ims of imageSVGs){
                if(ims.infected == 'server'){
                  ims.infect('serverInfected');
                  scInfo = 'Mallicious Bot berhasil diupload ke server. Semua perangkat yang terhubung menjadi terinfeksi';
                }else if(ims.infected == false){
                  ims.infect(true);
                }
              }
            }else{
              scInfo = 'Tidak ada perangkat yang mengupload Mallicious Bot. Perangkat dan Server Aman.';
            }
          }
        }else if(is.infected == 'network'){
          if(net){
            deActiveNetwork();
            net = false;
            scInfo = 'Perangkat tidak terhubung ke jaringan';
          }else{
            activeNetwork();
            net = true;
            scInfo = 'Perangkat terhubung ke jaringan';
          }
        }
      }
    }
  }
}

function activeNetwork(){
  for(let lw of lineWebs){
    if(!lw.display){
      lw.updateLine(true, false);
    }
  }
}

function deActiveNetwork(){
  for(let lw of lineWebs){
    if(lw.display){
      lw.updateLine(false, false);
    }
  }
}



