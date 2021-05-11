module.exports = {
  typescript: style => {
    return `<template></template>
  
  <script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return { };
    },
    
    methods: { },

    computed: { },

    watch: { },
  });
  </script>
  
  <style lang="${style}"></style>`;
  },

  javascript: style => {
    return `<template></template>
  
  <script>
  export default {
    data() {
      return { };
    },
    
    methods: { },

    computed: { },

    watch: { },
  };
  </script>
  
  <style lang="${style}"></style>`;
  },
};
