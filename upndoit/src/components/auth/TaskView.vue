<script setup>
import TaskItemAdd from './TaskItemAdd.vue'

async function updatetaskview(){
  let tasks = await fetch('http://localhost:25565/gettasks')
    
}

</script>

<script>
export default {
  name : "task_view",
  data() {
    return {
      tasks: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}
</script>

<template>
  <div class="contentcontainer">
    <TaskItemAdd/>
    <div class="taskcontainer">
      <div class="task" v-for="task in tasks" :key="task.id">
        {{ task.message }}
      </div>
    </div>
  </div>
</template>

<style>
.contentcontainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-content: center;
}
</style>
  