<script setup lang="ts">
defineProps<{ }>();
</script>

<template>
  <div id="card" ref="card" @mousedown="mouseDownDragCard">
    <div id="title"> 
        <span v-if="editing"> 
            <input type="text" v-model="title" placeholder="Card title...">
        </span>
        <span v-else> {{title ? title : "New Card"}}  </span>
    </div>
    <button @click="editing = !editing">{{ editing ? "Save card" : "Edit card" }}</button>
    <canvas @mousedown="drawCanvas" id="art" width="300" height="300"></canvas>
    <div id="rules"> 
        <span v-if="editing"> 
            <textarea v-model="rules" placeholder="Insert card text..."></textarea>  
        </span>
        <span v-else> {{rules}}  </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Card',
  data: function () {
    return {
      editing: false,
      title: "",
      rules: "",
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
      }
    }
  },
  methods: {
    mouseDownDragCard: function (event) {
      if (this.editing) return;
      event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.dragCard
      document.onmouseup = this.stopDragCard
    },
    dragCard: function (event) {
      event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      this.$refs.card.style.top = (this.$refs.card.offsetTop - this.positions.movementY) + 'px'
      this.$refs.card.style.left = (this.$refs.card.offsetLeft - this.positions.movementX) + 'px'
    },
    stopDragCard () {
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
    text-align: center;
}

#title {
    padding: 10px;
    font-size: 16pt;
    font-weight: bold;
}

button {
    position: absolute;
    top: 10px;
    right: 10px;
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
