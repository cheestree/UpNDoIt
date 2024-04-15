<script lang="ts">

export default {
  props: {
    created_at: Date,
    modified_at: Date,
    title: String,
    isPublic: Boolean,
    description: String,
    deleteTask: Function
  }
}
</script>

<template>
  <div id="task-details">
    <h1>{{ title }}</h1>
    <div id="task-description">{{ description }}</div>
    Created in: <p>{{ created_at }}</p>
    Modified in: <p>{{ modified_at }}</p>
    Public? <p>{{ isPublic }}</p>
    <button id="task-delete" @click="deleteTask">Delete</button>
  </div>
</template>

<style scoped>

</style>
