import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TerminalService} from "../../../../shared/terminal.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {TerminalAddImgFormalComponent} from "../modals/terminal-add-img-formal/terminal-add-img-formal.component";

import Swal from 'sweetalert2';
import {TerminalDeleteImgComponent} from "../modals/terminal-delete-img/terminal-delete-img.component";

@Component({
  selector: 'app-terminal-customize-formal',
  templateUrl: './terminal-customize-formal.component.html',
  styleUrls: ['./terminal-customize-formal.component.css']
})
export class TerminalCustomizeFormalComponent implements OnInit {
  public uid;
  public code;
  public name;
  public id;

  public devices = {}; // 所有控件属性
  public imgLists1 = []; // 公共图片控件
  public imgLists2 = []; // 单形态图片控件
  public imgLists3 = []; // 多形态图片控件
  public dataLists1 = []; // 固定文本框
  public dataLists2 = []; // 自定义文本框
  public dataLists3 = [];
  public btnLists = []; // 按钮控件属性
  public z = 1;
  public moving = false; // 当前移动状态
  public selected = null; // 当前选中控件
  public chans; // 通道列表
  public chans1 = []; // 模拟量列表
  public chans2 = [];
  public chans3 = [];
  public imgComponents1 = []; // 公共图片组件库列表
  public imgComponents2 = []; // 单形态图片组件库列表
  public imgComponents3 = []; // 多形态图片组件库列表
  public ctrl0 = false; // 关联点位
  public ctrl1 = false; // 宽高
  public ctrl2 = false; // style样式
  public ctrl3 = false; // 文本内容
  public ctrl4 = false; // 寄存器地址
  public temporary = null; // 临时变量
  public cName; // 当前选中组件名称
  public cType; // 当前选中组件类型
  public i_w = 0; // 当前选中组件宽度
  public i_h = 0; // 当前选中组件高度
  public dataValue; // 当前选中组件通道
  public showCh;
  public color1 = ''; // 当前选中组件背景色
  public color2 = ''; // 当前选中组件字体颜色
  public color3 = ''; // 当前选中组件边框颜色
  public fontSize1; // 当前选中组件字体大小
  public curText; // 当前选中组件文本内容
  public curAddress; // 当前选中组件寄存器地址


  constructor(private route: ActivatedRoute,
              private terminalService: TerminalService,
              public el: ElementRef,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.code = this.route.snapshot.paramMap.get('code');
    this.getImages();
    this.getChans();
    this.getContent();
  }

  // 获取图片
  getImages() {
    this.terminalService.getComponents()
      .subscribe(data => {
        console.log(data);
        this.imgComponents2 = data.single;
        this.imgComponents3 = data.multi;
      });

    this.imgComponents1 = [
      /*{
        id: 1,
        name: '图片1',
        src: 'assets/images/mapicon1.png'
      }*/
    ];
    /*this.imgComponents2 = [
      {
        id: 1,
        name: '自定义图片1',
        img: 'assets/images/no_image.png',
        type: 1
      },
      {
        id: 3,
        name: '自定义图片3',
        img: 'assets/images/no_image.png',
        type: 1
      },
    ];
    this.imgComponents3 = [
      {
        id: 2,
        name: '自定义多态图片2',
        imgs: [
          {
            img: 'assets/images/boilerwater.gif',
            max: 2,
            min: 1,
            sort: 1
          },
          {
            img: 'assets/images/boilerwater.png',
            max: 4,
            min: 3,
            sort: 2
          }
        ],
        type: 2
      },
      {
        id: 4,
        name: '自定义多态图片3',
        imgs: [
          {
            img: 'assets/images/gasboiler.gif',
            max: 2,
            min: 1,
            sort: 1
          },
          {
            img: 'assets/images/gasboiler.png',
            max: 4,
            min: 3,
            sort: 2
          }
        ],
        type: 2
      },
      {
        id: 5,
        name: '自定义多态图片4',
        imgs: [
          {
            img: 'assets/images/coalsingle.gif',
            max: 2,
            min: 1,
            sort: 1
          },
          {
            img: 'assets/images/coalsingle.png',
            max: 4,
            min: 3,
            sort: 2
          }
        ],
        type: 2
      }
    ];*/


  }

  // 获取通道
  getChans() {

    /*this.chans = [
      {
        channel_type: 10,
        channel_number: 3,
        name: '温度1',
      },
      {
        chanType: 10,
        channel_number: 4,
        name: '气压'
      },
      {
        channel_type: 10,
        channel_number: 5,
        name: '模拟hhhhhhh'
      },
      {
        channel_type: 11,
        channel_number: 3,
        name: '开关排烟温度'
      },
      {
        channel_type: 12,
        channel_number: 5,
        name: '状态hhhhhhh'
      }
    ];
    for (let i = 0; i < this.chans.length; i++) {
      const ch = this.chans[i];
      ch.id = ch.channel_type + '_' + ch.channel_number + '_' + ch.name;
      switch (ch.channel_type) {
        case 10:
          this.chans1.push(ch);
          break;
        case 11:
          this.chans2.push(ch);
          this.chans3.push(ch);
          break;
        case 12:
          this.chans3.push(ch);
          break;
      }
    }
    console.log(this.chans1, this.chans2, this.chans3);*/


    this.terminalService.getChannelName(this.uid)
      .subscribe(data => {

        this.chans = data.channel;

        /*this.chans1 = data.alalog;
        this.chans2 = data.switch;
        this.chans3 = data.range;
        this.chans = this.chans1.concat(this.chans2, this.chans3);*/

        for (let i = 0; i < this.chans.length; i++) {
          const ch = this.chans[i];
          ch.id = ch.channel_type + '_' + ch.channel_number + '_' + ch.name;
          switch (ch.channel_type) {
            case 10:
              this.chans1.push(ch);
              break;
            case 11:
              this.chans2.push(ch);
              this.chans3.push(ch);
              break;
            case 12:
              this.chans3.push(ch);
              break;
          }
        }
        console.log(this.chans1, this.chans2, this.chans3);

      });

  }


  // ----获取组态内容---------
  getContent() {
    let that = this;
    this.terminalService.getContent(this.uid)
      .subscribe(data => {
        let content = JSON.parse(data.content);
        this.id = data.id;
        this.name = data.name;
        if (!content) {
          return;
        }
        that.imgLists1 = content.imgs1;
        that.imgLists2 = content.imgs2;
        that.imgLists3 = content.imgs3;
        that.dataLists1 = content.data1;
        that.dataLists2 = content.data2;
        that.btnLists = content.btns;
      }, err => {

      });
  }


  // 开始拖放
  dragstart(ev, data) {
    ev.dataTransfer.effectAllowed = 'copy';
    ev.dataTransfer.setData('Text', ev.target.id);
    this.temporary = data;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  // 拖放结束-初始化组件
  drop(ev) {
    const that = this;
    ev.preventDefault();
    this.z++;
    const data = ev.dataTransfer.getData('Text');
    const aa = document.getElementById(data);
    let x = ev.offsetX ;
    let y = ev.offsetY;
    let styles;
    // console.log(that.temporary); // 打印当前选中组件
    // console.log(aa);

    if (data.indexOf('img') !== -1) {
      x = x - 50;
      y = y - 50;
      styles = {
        position: 'absolute',
        width: '100px',
        height: '100px',
        left: x + 'px',
        top: y + 'px',
        zIndex: that.z
      };
      if (data.indexOf('imgA') !== -1) {
        this.addImg1(aa, styles);
      }
      if (data.indexOf('imgB') !== -1) {
        this.addImg2(aa, styles);
      }
      if (data.indexOf('imgC') !== -1) {
        this.addImg3(aa, styles);
      }

    } else if (data.indexOf('data') !== -1) {
      x = x - 20;
      styles = {
        padding: '3px 6px',
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        zIndex: 100 + this.z,
        backgroundColor: '',
        color: '#000000',
        borderColor: '',
        borderWidth: '1px',
        borderStyle: 'solid',
        fontSize: '16px'
      };
      this.addData(aa, styles);
    } else {
      x = x - 20;
      styles = {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        zIndex: 100 + this.z
      };
      this.addBtn(aa, styles);
    }


  }


  // 添加图片
  addImg1(e, styles) {
    const that = this;
    const con = this.el.nativeElement.querySelector('#capture');
    /*let w = e.naturalWidth;
    let h = e.naturalHeight;
    styles.width = w > 200 ? '200px' : w + 'px';
    styles.height = h > 200 ? '200px' : h + 'px';*/
    const imgData = {
      type: 'imgA',
      cType: '单形态',
      cName: this.temporary.name,
      id: 'img' + that.z * 10,
      imgs: this.temporary,
      src: e.src,
      style: styles
    };
    this.imgLists1.push(imgData);
    that.select1(imgData);

    /*setTimeout(() => {
      const node = con.querySelector('#' + imgData.id);
      const renode = node.querySelector('.scale'); // 右下角缩放按钮
      this.resizeItem(renode); // 添加缩放
    }, 200);*/
  }

  addImg2(e, styles) {
    const that = this;
    const con = this.el.nativeElement.querySelector('#capture');
    let img;
    // 获取图片组件id
    /*let w = e.naturalWidth;
    let h = e.naturalHeight;
    styles.width = w > 200 ? '200px' : w + 'px';
    styles.height = h > 200 ? '200px' : h + 'px';*/
    const imgData = {
      type: 'imgB',
      cType: '单形态',
      cName: this.temporary.name,
      id: 'img' + that.z * 10,
      imgs: this.temporary,
      src: e.src,
      style: styles
    };
    this.imgLists2.push(imgData);
    that.select12(imgData);

    /*setTimeout(() => {
      const node = con.querySelector('#' + imgData.id);
      const renode = node.querySelector('.scale'); // 右下角缩放按钮
      this.resizeItem(renode); // 添加缩放
    }, 200);*/

  }

  addImg3(e, styles) {
    const that = this;
    const con = this.el.nativeElement.querySelector('#capture');
    // console.log(con);
    // 获取图片组件id
    /*let w = e.naturalWidth;
    let h = e.naturalHeight;
    styles.width = w > 200 ? '200px' : w + 'px';
    styles.height = h > 200 ? '200px' : h + 'px';*/
    const imgData = {
      type: 'imgC',
      cType: '多形态',
      cName: this.temporary.name,
      id: 'img' + that.z * 10,
      imgs: this.temporary,
      src: e.src,
      style: styles
    };
    this.imgLists3.push(imgData);
    that.select13(imgData);

    /*setTimeout(() => {
      const node = con.querySelector('#' + imgData.id);
      const renode = node.querySelector('.scale'); // 右下角缩放按钮
      this.resizeItem(renode); // 添加缩放
    }, 200);*/

  }


  // 添加数据
  addData(e, styles) {
    const that = this;
    // const con = this.el.nativeElement.querySelector('#capture');

    let dataData;
    switch (e.id) {
      case 'data1':
        dataData = {
          type: 'data1',
          cType: '固定显示模式',
          cName: '固定文本框',
          id: 'data' + that.z * 10,
          text: '固定文本框',
          style: styles
        };
        this.dataLists1.push(dataData);
        that.select21(dataData);
        break;
      case 'data2':
        dataData = {
          type: 'data2',
          cType: '自定义显示模式',
          cName: '自定义文本框',
          id: 'data' + that.z * 10,
          style: styles,
          chanName: '监测点'
        };
        this.dataLists2.push(dataData);
        that.select22(dataData);
        break;
    }

  }


  // 添加按钮
  addBtn(e, styles) {
    const that = this;
    const con = this.el.nativeElement.querySelector('#capture');
    const btnData = {
      type: 'btn',
      cType: '开关型态',
      cName: '交互按钮',
      id: 'btn' + that.z * 10,
      style: styles
    };
    this.btnLists.push(btnData);

    that.select3(btnData);

    /*setTimeout(() => {
      let node = con.querySelector('#' + btnData.id);
      node.setAttribute('data-type', 'btn');

    }, 200);*/


  }


  eventDown(e) {
    const that = this;
    that.dragImg(e, that);
  }

  eventUp(e) {
    const that = this;
    that.end(e, that);
  }



  // 点击移动
  dragImg(event, that) {
    // console.log(event);
    event.preventDefault();
    that.moving = true;
    that.z = that.z + 1;
    const con = that.el.nativeElement.querySelector('#capture');
    const disX = event.clientX;
    const disY = event.clientY;
    let tgt = event.target;
    let dataS = false;
    let isBtn = false;
    // console.log(tgt);
    if (tgt.className === 'dataComponent') {
      dataS = true;
    }
    if (tgt.nodeName === 'BUTTON') {
      tgt = event.target.parentNode;
      isBtn = true;
    }
    if (tgt.nodeName === 'IMG') {
      tgt = event.target.parentNode;
    }
    // console.log(tgt);
    const p = tgt.parentNode.getBoundingClientRect();
    const b = tgt.getBoundingClientRect();

    const w = b.right - b.left;
    const h = b.bottom - b.top;

    con.addEventListener('mousemove', function(e) {
      that.moveEvent(e, that, disX, disY, p, b, w, h, dataS, isBtn);
    });
  }

  // 移动
  moveEvent(e, that, disX, disY, p, b, w, h, dataS, isBtn) {
    if (that.moving === true) {
      // console.log(e);
      const dx = b.left - p.left + e.clientX - disX;
      const dy = b.top - p.top + e.clientY - disY;

      this.selected.style.left = dx + 'px';
      this.selected.style.top = dy + 'px';

      if (dataS) {
        this.selected.style.zIndex = 100 + that.z;
      } else if (isBtn) {
        this.selected.style.zIndex = 100 + that.z;
      } else {
        this.selected.style.zIndex = that.z;
      }
    }
  }

  // 结束拖动
  end(evt, that) {
    that.moving = false;
    // console.log('end');
  }


  // 缩放
  resizeItem(e) {
    const that = this;
    e.stopPropagation();
    e.preventDefault();
    // console.log('e:', e);
    const fa = that.el.nativeElement.querySelector('#capture');
    const event = e.target;
    const box = e.target.parentNode;
    const pos = {
      'w': box.offsetWidth,
      'h': box.offsetHeight,
      'x': e.clientX,
      'y': e.clientY
    };
    fa.onmousemove = function (ev) {
      // console.log(ev, fa)
      ev.preventDefault();

      // 设置图片的最小缩放为30*30
      let w = Math.max(20, ev.clientX - pos.x + pos.w);
      let h = Math.max(20, ev.clientY - pos.y + pos.h);
      // console.log(w,h)

      // 设置图片的最大宽高
      w = w >= fa.offsetWidth - box.offsetLeft ? fa.offsetWidth - box.offsetLeft : w;
      h = h >= fa.offsetHeight - box.offsetTop ? fa.offsetHeight - box.offsetTop : h;
      // 改变元素大小
      that.selected.style.width = w + 'px';
      that.selected.style.height = h + 'px';
      that.selected.style.zIndex = that.z + 1;
      // 监测元素大小
      that.i_w = w;
      that.i_h = h;
    };
    fa.onmouseup = function() {
      fa.onmousemove = null;
      fa.onmouseup = null;
    };
  }





  // 选择图片
  select1(d) {
    const that = this;
    this.selected = d;
    this.ctrl2 = false;
    this.ctrl3 = false;
    this.ctrl1 = true;
    this.ctrl4 = false;
    if (this.selected) {
      this.cName = this.selected.cName;
      this.cType = this.selected.cType;
      this.i_h = parseFloat(d.style.height);
      this.i_w = parseFloat(d.style.width);
    } else {
      this.ctrl1 = false;
    }
  }

  select12(d) {
    const that = this;
    this.selected = d;
    this.ctrl2 = false;
    this.ctrl3 = false;
    this.ctrl1 = true;
    this.ctrl0 = false;
    this.ctrl4 = false;
    if (this.selected) {
      this.cName = this.selected.cName;
      this.cType = this.selected.cType;
      this.i_h = parseFloat(d.style.height);
      this.i_w = parseFloat(d.style.width);
    } else {
      this.ctrl1 = false;
    }
  }

  select13(d) {
    const that = this;
    this.selected = d;
    this.ctrl2 = false;
    this.ctrl3 = false;
    this.ctrl1 = true;
    this.ctrl0 = true;
    this.ctrl4 = false;
    this.showCh = 3;
    const chType = this.selected.chanType;
    const chNum = this.selected.chanNum;
    const chName = this.selected.chanName;
    if (this.selected) {
      this.dataValue = chType + '_' + chNum + '_' + chName;
      this.cName = this.selected.cName;
      this.cType = this.selected.cType;
      this.i_h = parseFloat(d.style.height);
      this.i_w = parseFloat(d.style.width);
    } else {
      this.ctrl1 = false;
      this.ctrl0 = false;
      this.showCh = 0;
    }
  }

  // 选择数据
  select21(d) {
    const that = this;
    this.selected = d;
    // console.log(this.selected.style);
    this.ctrl0 = false;
    this.ctrl1 = false;
    this.ctrl2 = true;
    this.ctrl3 = true;
    this.ctrl4 = false;
    this.showCh = 0;

    if (this.selected) {
      this.cName = this.selected.cName;
      this.cType = this.selected.cType;
      this.color1 = this.selected.style.backgroundColor;
      this.color2 = this.selected.style.color;
      this.curText = this.selected.text;
      if (this.selected.style.borderColor === 'transparent') {
        this.color3 = '#ffffff';
      } else {
        this.color3 = this.selected.style.borderColor;
      }
      this.fontSize1 = parseInt(this.selected.style.fontSize);

      /*switch (chType) {
        case 1:
          this.showCh = 1;
          break;
        case 3:
          this.showCh = 2;
          break;
        case 5:
          this.showCh = 3;
          // this.ctrl1 = true;
          // this.i_h = parseFloat(d.style.height);
          // this.i_w = parseFloat(d.style.width);
          break;
      }*/

      // console.log(this.color1, this.color2);
    } else {
      this.ctrl2 = false;
      this.ctrl3 = false;
    }
  }

  select22(d) {
    const that = this;
    this.selected = d;
    // console.log(this.selected.style);
    this.ctrl0 = true;
    this.ctrl1 = false;
    this.ctrl2 = true;
    this.ctrl3 = false;
    this.ctrl4 = false;
    this.showCh = 0;
    const chType = this.selected.chanType;
    const chNum = this.selected.chanNum;
    const chName = this.selected.chanName;
    if (this.selected) {
      this.dataValue = chType + '_' + chNum + '_' + chName;
      this.cName = this.selected.cName;
      this.cType = this.selected.cType;
      this.color1 = this.selected.style.backgroundColor;
      this.color2 = this.selected.style.color;
      if (this.selected.style.borderColor === 'transparent') {
        this.color3 = '#ffffff';
      } else {
        this.color3 = this.selected.style.borderColor;
      }
      this.fontSize1 = parseInt(this.selected.style.fontSize);

      /*switch (chType) {
        case 1:
          this.showCh = 1;
          break;
        case 3:
          this.showCh = 2;
          break;
        case 5:
          this.showCh = 3;
          // this.ctrl1 = true;
          // this.i_h = parseFloat(d.style.height);
          // this.i_w = parseFloat(d.style.width);
          break;
      }*/

      // console.log(this.color1, this.color2);
    } else {
      this.ctrl2 = false;
      this.ctrl3 = false;
    }
  }

  // 选择按钮
  select3(d) {
    const that = this;
    this.selected = d;
    this.ctrl0 = true;
    this.ctrl1 = false;
    this.ctrl2 = false;
    this.ctrl3 = false;
    this.ctrl4 = false;


    if (this.selected) {
      const chType = this.selected.chanType;
      const chNum = this.selected.chanNum;
      const chName = this.selected.chanName;

      this.showCh = 2;
      this.cName = this.selected.cName;
      this.cType = this.selected.cType;
      this.dataValue = chType + '_' + chNum + '_' + chName;
      // this.curAddress = this.selected.address;

    } else {
      this.ctrl0 = false;
      this.showCh = 0;
    }
  }



  // 改变宽度
  changeH(h) {
    this.selected.style.height = h + 'px';
  }

  // 改变高度
  changeW(w) {
    this.selected.style.width = w + 'px';
  }

  // 选择通道
  chooseValue(val) {
    const arr = val.split('_');
    this.selected.chanType = arr[0];
    this.selected.chanNum = arr[1];
    this.selected.chanName = arr[2];
    // console.log(this.selected);
  }


  // 选择数据背景颜色
  changeColor11(color) {
    this.selected.style.backgroundColor = color;

  }
  // 选择数据字体颜色
  changeColor12(color) {
    this.selected.style.color = color;
  }
  // 选择数据边框颜色
  changeColor13(color) {
    this.selected.style.borderColor = color;
  }
// 选择数据字体大小
  changeSize1(size) {
    // console.log(size);
    this.selected.style.fontSize = size + 'px';
  }

  changeText(text) {
    this.selected.text = text;
  }

  changeAddress(address) {
    this.selected.address = address;
  }




  // 删除
  deleteD() {
    const con = this.el.nativeElement.querySelector('#capture');
    // console.log(this.selected);
    const id = this.selected.id;
    const type = this.selected.type;
    switch (type) {
      case 'imgA':
        for (let i = 0; i < this.imgLists1.length; i++) {
          const im = this.imgLists1[i];
          // console.log(im.id, id)
          if ( im.id === id) {
            this.imgLists1.splice(i, 1);
            break;
          }
        }
        break;
      case 'imgB':
        for (let i = 0; i < this.imgLists2.length; i++) {
          const im = this.imgLists2[i];
          // console.log(im.id, id)
          if ( im.id === id) {
            this.imgLists2.splice(i, 1);
            break;
          }
        }
        break;
      case 'imgC':
        for (let i = 0; i < this.imgLists3.length; i++) {
          const im = this.imgLists3[i];
          // console.log(im.id, id)
          if ( im.id === id) {
            this.imgLists3.splice(i, 1);
            break;
          }
        }
        break;
      case 'data1':
        for (let i = 0; i < this.dataLists1.length; i++) {
          const im = this.dataLists1[i];
          if ( im.id === id) {
            this.dataLists1.splice(i, 1);
            break;
          }
        }
        break;
      case 'data2':
        for (let i = 0; i < this.dataLists2.length; i++) {
          const im = this.dataLists2[i];
          if ( im.id === id) {
            this.dataLists2.splice(i, 1);
            break;
          }
        }
        break;
      case 'data3':
        /*for (let i = 0; i < this.dataLists3.length; i++) {
          let im = this.dataLists3[i];
          if ( im.id === id) {
            this.dataLists3.splice(i, 1);
            break;
          }
        }*/
        break;
      case 'btn':
        for (let i = 0; i < this.btnLists.length; i++) {
          const im = this.btnLists[i];
          if ( im.id === id) {
            this.btnLists.splice(i, 1);
            break;
          }
        }
        break;
    }

    // con.removeChild(this.selected);
    this.selected = null;
    this.cName = '';
    this.cType = '';
    this.ctrl0 = false;
    this.ctrl1 = false;
    this.ctrl2 = false;
    this.ctrl3 = false;
  }





  // 打开自定义组件模态框
  createComponentModal(): void {
    const that = this;
    const modal = this.modalService.create({
      nzTitle: '自定义组件上传',
      nzContent: TerminalAddImgFormalComponent,
      nzWidth: '600',
      nzClassName: 'customize',
      nzComponentParams: {
        // title: '',
        // subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '确定',
          type: 'primary',
          onClick: (componentInstance) => {
            let post;
            if (!componentInstance.name) {
              Swal(
                '请输入组件名称',
                '',
                'info'
              );
              return;
            }
            if (componentInstance.type === '1') {
              if (!componentInstance.imgFile1) {
                Swal(
                  '请上传图片',
                  '',
                  'info'
                );
                return;
              } else {
                post = {
                  name: componentInstance.name,
                  type: parseInt(componentInstance.type),
                  img: componentInstance.imgFile1.response.id
                };
              }

            } else {
              if (!componentInstance.isValid) {
                Swal(
                  '请填写正确数值区间',
                  '',
                  'info'
                );
                return;
              }
              if (!componentInstance.imgFiles[0] || !componentInstance.imgFiles[1]) {
                Swal(
                  '请上传图片',
                  '',
                  'info'
                );
                return;
              }

                post = {
                  name: componentInstance.name,
                  type: parseInt(componentInstance.type),
                  imgs: [
                    {
                      img: componentInstance.imgFiles[0].response.id,
                      min: componentInstance.imgs[0].min,
                      max: componentInstance.imgs[0].max,
                      sort: 1
                    },
                    {
                      img: componentInstance.imgFiles[1].response.id,
                      min: componentInstance.imgs[1].min,
                      max: componentInstance.imgs[1].max,
                      sort: 2
                    }
                  ]
                };

            }

            console.log(post);
            this.terminalService.uploadComponent(post)
              .subscribe(val => {
                Swal(
                  '组件上传成功',
                  '',
                  'success'
                );
                modal.destroy();
                that.getImages();
              }, err => {
                Swal(
                  '组件上传失败',
                  err.message || err,
                  'error'
                );
              });

          }
        },
      ]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    /*setTimeout(() => {
      const instance = modal.getContentComponent();
      instance.subtitle = 'sub title is changed';
    }, 2000);*/
  }


  // 删除自定义组件模态框
  deleteComponentModal(): void {
    const that = this;
    const modal = this.modalService.create({
      nzTitle: '删除自定义组件',
      nzContent: TerminalDeleteImgComponent,
      nzWidth: '600',
      nzClassName: 'customize',
      nzComponentParams: {
        // title: '',
        // subtitle: 'component sub title，will be changed after 2 sec'
        imgList1: this.imgComponents2,
        imgList2: this.imgComponents3
      },
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: '确定',
          type: 'primary',
          onClick: (componentInstance) => {
            this.modalService.confirm({
              nzTitle: '<b>确认删除当前组件?</b>',
              nzContent: '<b></b>',
              nzOnOk: () => {
                let post = [];
                let img1 = componentInstance.img1;
                let img2 = componentInstance.img2;
                img1.forEach((item) => {
                  if (item.checked) {
                    post.push(item.id);
                  }
                });
                img2.forEach((item) => {
                  if (item.checked) {
                    post.push(item.id);
                  }
                });

                // console.log(img1, img2, post);
                this.terminalService.deleteComponent({data: post})
                  .subscribe(val => {
                    Swal(
                      '组件删除成功',
                      '',
                      'success'
                    );
                    modal.destroy();
                    that.getImages();
                  }, err => {
                    Swal(
                      '组件删除失败',
                      err.message || err,
                      'error'
                    );
                  });
              }
            });


          }
        },
      ]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    /*setTimeout(() => {
      const instance = modal.getContentComponent();
      instance.subtitle = 'sub title is changed';
    }, 2000);*/
  }




  // 保存
  save() {
    const that = this;
    let img3 = [];
    // let da1 = [];
    let da2 = [];
    // let da3 = [];
    let btn = []


    // 多形态图片通道
    for (let k = 0; k < that.imgLists3.length; k++) {
      const im = that.imgLists3[k];

      if (!im.chanNum) {
        alert('有图片组件未选择参数');
        return;
      }
      img3.push({
        chanType: parseInt(im.chanType),
        chanNum: parseInt(im.chanNum)
      });
    }


    // 通道数据
    /*for (let i = 0; i < that.dataLists1.length; i++) {
      let d1 = that.dataLists1[i];
      // const dr1 = this.el.nativeElement.querySelector('#' + d1.id);

      if (d1.chanNum === 0) {
        alert('有模拟量组件未选择参数');
        return;
      }
      // 提出数据通道
      da1.push({
        chanType: d1.chanType,
        chanNum: d1.chanNum
      });
    }*/
    for (let j = 0; j < that.dataLists2.length; j++) {
      const d2 = that.dataLists2[j];
      // const dr2 = this.el.nativeElement.querySelector('#' + d2.id);

      if (!d2.chanNum) {
        alert('有文本组件未选择参数');
        return;
      }
      // 提出数据通道
      da2.push({
        chanType: parseInt(d2.chanType),
        chanNum: parseInt(d2.chanNum)
      });
    }
    /*for (let n = 0; n < that.dataLists3.length; n++) {
      let d3 = that.dataLists3[n];
      const dr3 = this.el.nativeElement.querySelector('#' + d3.id);

      if (d3.chanNum === 0) {
        alert('有开关量组件未选择参数');
        return;
      }
      // 提出数据通道
      da3.push({
        chanType: d3.chanType,
        chanNum: d3.chanNum
      });
    }*/



    for (let k = 0; k < that.btnLists.length; k++) {
      const bt = that.btnLists[k];
      if (!bt.chanNum) {
        alert('有按钮组件未选择参数');
        return;
      }
      // 提出数据通道
      btn.push({
        chanType: parseInt(bt.chanType),
        chanNum: parseInt(bt.chanNum)
      });
    }

    this.devices = {
      terminal_id: this.uid,
      img: img3,
      data: da2,
      btn: btn,
      content:  {
        imgs1: that.imgLists1,
        imgs2: that.imgLists2,
        imgs3: that.imgLists3,
        data1: that.dataLists1,
        data2: that.dataLists2,
        // data3: that.dataLists3,
        btns: that.btnLists
      }
    };
    console.log(this.devices);



    this.terminalService.saveZ(this.devices)
      .subscribe(val => {
        Swal(
          '保存成功',
          '',
          'success'
        );
      }, err => {
        Swal(
          '保存失败',
          err.message || err,
          'error'
        );
      });


  }


  goBack() {
    window.history.go(-1);
  }

}
