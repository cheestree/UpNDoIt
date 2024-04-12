<script lang="ts">
export default {
  data() {
    return {
      tasks: null
    }
  },
  async created() {
    this.tasks = await this.getTasks()
  },
  methods: {
    async addTask(fields) {
      const today = new Date(Date.now());
      fields.taskdate = today
      await fetch('http://localhost:25565/api/task', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(fields)
      })
      this.tasks = await this.getTasks()
    },
    async getTasks() {
      let tasksget = await fetch('http://localhost:25565/api/tasks', { credentials: "include" })
      const tasks = await tasksget.json()
      return tasks
    },
    async deleteTask(task_id) {
      await fetch('http://localhost:25565/api/task/'+task_id, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })
      this.tasks = await this.getTasks()
    }
  }
}
</script>

<template>
  <div class="contentcontainer">
    <div class="taskaddhover">
      <span class="material-symbols-outlined">
      add
      </span>
      <div class="taskaddhovercontent">
        <h1>New Task</h1>
        <FormKit type="form" id="tasksubmit" submit-label="Add" @submit="addTask" :submit-attrs="{
          ignore: false
        }">
          <FormKit type="text" name="taskname" id="taskname" validation="required|not:Admin" label="Task name"
            placeholder="School" />
          <FormKit type="textarea" name="taskdesc" id="taskdesc" validation="required|not:Admin" label="Task description"
            placeholder="Do homework" />
        </FormKit>
      </div>
    </div>
    <div class="taskcard">
      <TransitionGroup name="taskcardform" tag="div" class="taskcardanimate">
        <h1 key="title">New Task</h1>
        <FormKit type="form" id="tasksubmit" submit-label="Add" @submit="addTask" :submit-attrs="{ ignore: false }" key="form">
          <FormKit type="text" name="taskname" id="taskname" validation="required|not:Admin" label="Task name" placeholder="School" key="taskname"/>
          <FormKit type="textarea" name="taskdesc" id="taskdesc" validation="required|not:Admin" label="Task description" placeholder="Do homework" key="taskdesc"/>
        </FormKit>
      </TransitionGroup>
    </div>
    <div class="taskcontainer">
      <TransitionGroup name="list" tag="div" class="taskcontaineranimate">
        <div class="taskindiv" v-for="(task) in tasks" :key="task.taskid">
          <div id="taskindivname">
            <h1>{{ task.taskname }}</h1>
          </div>
          Description : <div id="taskindivdesc">{{ task.taskdescription }}</div>
          Made in<p>{{ task.taskdate }}</p>
          <button id="taskdelete" @click="deleteTask(task.taskid)">Delete</button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.taskaddhover {
  background-color: #F2DD72;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 1rem;
  left: 1rem;
  transition: 1s ease-in-out;
}

.taskaddhover:hover .taskaddhovercontent{
  width: 200px;
  height: 200px;
  opacity: 1;
  transform: translate(20px, 20px);
}

.taskaddhovercontent {
  opacity: 0;
  width: 200px;
  height: 200px;
  transform: translate(-20px, -20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.contentcontainer {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-content: center;
}

.taskcontainer,
.taskcontaineranimate {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  align-content: center;
  width: 100%;
}

.taskindiv {
  color: var(--text);
  margin: 14px;
  background-color: var(--wbg);
  width: fit-content;
  width: 200px;
  padding: 10px;
  border-radius: 6px;
  border: 4px solid var(--wborder);
  padding: 20px;
  filter: drop-shadow(10px 10px 0px var(--wborder));
}

#taskindivdesc {
  overflow-wrap: break-word;
  height: 100px;
  overflow-y: auto;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

/**/
.taskcard {
  transition: 1s ease-in 0.5s 1 scale-up-center;
  -webkit-animation: scale-up-center 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: scale-up-center 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  color: var(--text);
  margin: 10px;
  background-color: var(--wbg);
  width: fit-content;
  padding: 10px;
  border-radius: 6px;
  border: 4px solid var(--wborder);
  padding: 20px;
  filter: drop-shadow(10px 10px 0px var(--wborder));
  align-self: center;
}

#taskname,
#taskdesc {
  background-color: transparent;
  border: 2px solid var(--wborder);
  border-radius: 5px;
  width: 30vh;
  resize: none;
  font-family: inherit;
  margin-top: 10px;
  margin-bottom: 10px;
}

[data-type="submit"] .formkit-input,
#taskdelete {
  color: var(--text);
  font-family: inherit;
  background: var(--wborder) !important;
  border-radius: 5px;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* ----------------------------------------------
 * Generated by Animista on 2023-5-19 14:41:29
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}</style>
