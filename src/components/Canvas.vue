<script setup lang="ts">
defineProps<{
  editing: bool;
}>();
</script>

<template>
  <canvas @mousedown="mouseDownDraw" ref="canvas" width="300" height="300"></canvas>
</template>

<script lang="ts">
export default {
  name: 'Canvas',
  mounted () {
    this.ctx = this.$refs.canvas.getContext("2d");
  },
  data () {
    return {
      prevX : undefined,
      prevY : undefined
    };
  },
  methods: {
    mouseDownDraw (event) {
      if (!this.$props.editing) return;
      this.moveDraw(event);
      document.onmousemove = this.moveDraw;
      document.onmouseup = this.stopMoveDraw;
    },

    draw (currX, currY) {
        if (this.prevX !== undefined && this.prevY !== undefined) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.prevX, this.prevY);
          this.ctx.lineTo(currX, currY);
          this.ctx.strokeStyle = "black"
          this.ctx.lineWidth = 2;
          this.ctx.stroke();
          this.ctx.closePath();
        }

        this.prevX = currX;
        this.prevY = currY;
    },

    moveDraw (event) {
      var canvasLoc = this.$refs.canvas.getBoundingClientRect();
      var x = event.clientX - canvasLoc.left;
      var y = event.clientY - canvasLoc.top;
      this.draw(x, y);
    },

    stopMoveDraw () {
      document.onmouseup = null
      document.onmousemove = null
      this.prevX = undefined;
      this.prevY = undefined;
    },

  }
}
</script>

<style>
canvas {
    background: white;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0;
    padding-right: 0;
    display: block;
}

</style>
