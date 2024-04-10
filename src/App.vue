<template>
  <div id="app">
    <ControlPanel @initialize="initializeGrid" />
    <SimulationGrid :gridState="gridState" />
  </div>
</template>
<script>
import { ref } from 'vue';
import ControlPanel from './components/ControlPanel.vue';
import SimulationGrid from './components/SimulationGrid.vue';

export default {
  name: 'App',
  components: {
    ControlPanel,
    SimulationGrid
  },
  setup() {
    const gridState = ref([]);

    const initializeGrid = () => {
      // Assuming gridSize is defined
      const gridSize = 50; // Example size, adjust as necessary
      gridState.value = Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => Math.random() > 0.75 ? 1 : 0)
      );
    };

    initializeGrid();
    return { gridState, initializeGrid };
  }
};
</script>


<style>
/* Global styles */
</style>
