<template>
    <div>
      <h1>Breakpoint Test</h1>
      <p>Count: {{ count }}</p> <!-- Consider placing a breakpoint here to see updates -->
      <button @click="increment">Increment</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TestBreakpoints',
    data() {
      return {
        count: 0
      };
    },
    methods: {
      increment() {
        this.count++; // Place a breakpoint here to watch the count increase
        console.log(`Current count is: ${this.count}`); // Another good spot for a breakpoint
      }
    }
  }
  </script>
  
  <style scoped>
  h1 {
    color: green;
  }
  button {
    margin-top: 10px;
  }
  </style>
  