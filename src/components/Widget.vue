<style scoped>
.widget {
  position: relative;
  box-sizing: border-box;
  border: 1px solid #999;
  float: left;
}
</style>

<template>
<div class="widget" :style="widgetStyle" @mousedown.prevent="beginDrag" @mouseup.prevent="stopDrag" @mousemove.prevent="draging">
  This is widget {{ id }}
</div>
</template>

<script>
import {
  getOffset,
  getSize
} from '../utils.js'
export default {
  name: 'Widget',
  computed: {
    widgetStyle: function() {
      var style = {
        backgroundColor: this.bgColor,
        zIndex: this.zIndex,
        width: this.width + 'px',
        height: this.height + 'px'
      };

      if (this.top !== false) {
        style.top = this.top + 'px';
        style.position = 'absolute';
        style.left = this.left + 'px';
      }
      return style;
    }
  },
  mounted: function() {
    // set position absolue
    var parentPos = this.$parent.getPosition();
    var elmPos = getOffset(this.$el);
    this.left = elmPos.left - parentPos.left;
    this.top = elmPos.top - parentPos.top;
    var elmSize = getSize(this.$el);
    this.width = elmSize.width;
    this.height = elmSize.height;

    this.savePos();
  },
  methods: {
    beginDrag: function(evt) {
      this.isDraging = true;
      this.zIndex = this.$parent.getNextZIndex();
      // save init state
      var elmPos = getOffset(this.$el);
      this.refXEvt = elmPos.left - evt.clientX;
      this.refYEvt = elmPos.top - evt.clientY;

      // save stage
      this.saveTop = elmPos.top;
      this.saveLeft = elmPos.left;
    },
    stopDrag: function() {
      this.isDraging = false;
      var elmPos = getOffset(this.$el);

      if (this.$parent.checkIntersect({
        id: this.id,
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height
      })) {
        // rolback to begin drag state
        this.rollback();
      }else{
       this.savePos();
      }
    },
    draging: function(evt) {
      if (this.isDraging) {
        var parentPos = this.$parent.getPosition();
        this.left = evt.clientX + this.refXEvt - parentPos.left;
        this.top = evt.clientY + this.refYEvt - parentPos.top;
      }
    },
    rollback: function(){
     var parentPos = this.$parent.getPosition();
     this.top = this.saveTop - parentPos.top;
     this.left = this.saveLeft - parentPos.left;
     if(this.saveWidth){
      this.width = this.saveWidth;
     }
     if(this.saveHeight){
      this.height = this.saveHeight;
     }
    },
    savePos: function(){
     this.saveTop = this.top;
     this.saveLeft = this.left;
     this.saveWidth = this.width;
     this.saveHeight = this.height;

     this.$emit('savePos',{
       id: this.id,
       left: this.left,
       top: this.top,
       width: this.width,
       height: this.height
     });
    }
  },
  data: function() {
    return {
      top: false,
      left: false,
      width: 200,
      height: 200,

      saveTop: false,
      saveLeft: false,
      saveWidth: false,
      saveHeight: false,

      zIndex: 1,
      isDraging: false,

      refXEvt: false, // top left widget compare with mouse down event position
      refYEvt: false, // top left widget compare with mouse down event position
    };
  },
  props: ['id', 'moveEvt', 'bgColor']
}
</script>
