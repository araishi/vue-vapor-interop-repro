<script setup vapor>
import Child from './Child.vue'
import Outlet from './Outlet.vue'
</script>

<template>
  <!-- vapor > vdom (Outlet) > vapor (Page), followed by a vapor sibling (Child) -->
  <div>
    <Outlet />
    <Child />
  </div>
</template>
