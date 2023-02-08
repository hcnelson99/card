<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div id="card" ref="card" @mousedown="dragMouseDown">
    <div id="title"> {{title}} </div>
    <canvas id="art" width="300" height="300"></canvas>
    <div id="rules"> <slot></slot> </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DraggableDiv',
  data: function () {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },
  methods: {
    dragMouseDown: function (event) {
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.card.style.top = (this.$refs.card.offsetTop - this.positions.movementY) + 'px'
      this.$refs.card.style.left = (this.$refs.card.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
</script>

<style scoped>
#card {
    width: 350px;
    height: 500px;
    background: lightgrey;
    position: absolute;
}

#title {
    text-align: center;
    padding: 10px;
}

#rules {
    padding: 10px;
    font-size: 16pt;
}

canvas {
    background: white;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0;
    padding-right: 0;
    display: block;
}

</style>
