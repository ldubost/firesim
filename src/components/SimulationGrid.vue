<template>
  <div id="grid">
<div v-for="(row, rowIndex) in gridState" :key="`row-${rowIndex}`" class="grid-row">
      <div v-for="(cell, cellIndex) in row" :key="`cell-${rowIndex}-${cellIndex}`" class="cell" :class="getCellClass(cell)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimulationGrid',
  props: {
    gridState: {
      type: Array,
      required: true
    }
  },
  methods: {
    getCellClass(cell) {
      switch (cell) {
        case 0: return 'empty';
        case 1: return 'tree';
        case 2: return 'burning';
        case 3: return 'burned';
        default: return '';
      }
    },
  },
  mounted() {
    console.log("here");
    console.log(gridState);
  }
};
</script>

<style>
#grid {
  display: flex;
  flex-wrap: wrap;
}
.grid-row {
  display: flex;
}
.cell {
  width: 20px; /* Adjust size as needed */
  height: 20px; /* Adjust size as needed */
  border: 1px solid #999;
}
.cell.empty { background-color: #fff; }
.cell.tree { background-color: #0f0; }
.cell.burning { background-color: #f00; }
.cell.burned { background-color: #000; }
</style>
