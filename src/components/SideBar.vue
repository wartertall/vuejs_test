<style scoped>
#sideBar {
  background: #ddd;
  position: fixed;
  left: 0;
  top: 0;
  width: 50px;
  border-right: 1px solid #999;
  height: 100%;
  -moz-transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  z-index: 999999;
}

#sideBar.open {
  width: 250px;
}
</style>

<template>
 <div id="sideBar" @click="toggle" :class="{open:isOpen}">
   This is side bar
 </div>
</template>

<script>
export default {
  name: 'SideBar',
  methods: {
    toggle: function() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },
    close: function() {
      this.isOpen = false;
    },
    open: function() {
      this.isOpen = true;
    }
  },
  data: function() {
    return {
      isOpen: false
    };
  }
}
</script>
