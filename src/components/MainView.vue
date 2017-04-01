<template>
<div class="main-view clearfix">
  <Widget v-for="(widget, index) in widgets" :id="index" :key="index" :bgColor="widget.bgColor" @savePos="savePos"></Widget>
</div>
</template>

<style>
.main-view {
  margin-left: 50px;
  position: relative;
}
</style>

<script>
import {
  getOffset,
  intersectRect
} from '../utils.js'
import Widget from './Widget'

var nextZIndex = 1;
var poses = [];
export default {
  name: 'mainView',
  data() {
    return {
     widgets:[
      {
       bgColor: '#2ecc71'
      },{
       bgColor: '#3498db'
      },{
       bgColor: '#e67e22'
      }
     ]
    };
  },
  methods: {
    getPosition: function() {
      return getOffset(this.$el);
    },
    getNextZIndex: function() {
      return ++nextZIndex;
    },
    // save position for widget
    savePos: function(elmData) {
      for(var i=0;i<poses.length;i++){
       if(poses[i].id == elmData.id){
        poses[i] = elmData;
        return ;
       }
      }
      poses.push(elmData);
    },
    checkIntersect: function(elmData) {
      for (var i = 0; i < poses.length; i++) {
        if (poses[i].id == elmData.id) {
          continue;
        }

        // check override
        if (intersectRect({
            left: elmData.left,
            top: elmData.top,
            right: elmData.left + elmData.width,
            bottom: elmData.top + elmData.height
          }, {
            left: poses[i].left,
            top: poses[i].top,
            right: poses[i].left + poses[i].width,
            bottom: poses[i].top + poses[i].height
          })) {
          return true;
        }
      }
      return false;
    }
  },
  components: {
    Widget
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
