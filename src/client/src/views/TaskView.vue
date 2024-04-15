<script lang="ts">
import TaskServices from "@/services/TaskServices";
import Requests from "@/services/requests/Requests";
import type {Task, TaskAdd} from "@/services/models/Task";
import TaskComponent from "@/components/task/TaskComponent.vue";

const services = new TaskServices(new Requests(), '/api/task');

export default {
  components: {
    TaskComponent
  },
  data() {
    return {
      tasks: [] as Task[]
    }
  },
  async created() {
    await this.getTasks();
  },
  methods: {
    async addTask(taskToAdd: TaskAdd) {
      await services.addTask(taskToAdd.title, taskToAdd.description, taskToAdd.public)
      await this.getTasks()
    },
    async getTasks() {
      await services.getTasks().then((responseTasks: Task[]) => {
        console.log(responseTasks);
        this.tasks.splice(0, this.tasks.length, ...responseTasks);
      })
    },
    async deleteTask(taskId: number) {
      await services.deleteTask(taskId)
      await this.getTasks();
    }
  }
}
</script>

<template>
  <div class="content-container">
    <div class="task-container" v-if="tasks.length != 0">
      <TransitionGroup name="list" tag="div" class="task-container-animate">
        <div class="task-in-div" v-for="task in tasks" :key="task.id">
          <TaskComponent
              :description="task.description"
              :created_at="task.created_at"
              :modified_at="task.modified_at"
              :title="task.title"
              :isPublic="task.public"
              :deleteTask="() => deleteTask(task.id)"
          />
        </div>
      </TransitionGroup>
    </div>
    <div class="task-add-hover">
      <span class="material-symbols-outlined task-add">
      add
      </span>
      <div class="task-add-hover-content">
        <FormKit type="form" id="task-submit" submit-label="Add" @submit="addTask" :submit-attrs="{ignore: false}">
          <FormKit type="text" name="title" id="title" validation="required|not:Admin" label="Title"
                   placeholder="School" />
          <FormKit type="textarea" name="description" id="description" validation="required|not:Admin" label="Description"
                   placeholder="Do homework" />
          <FormKit type="checkbox" name="public" id="public" label="Public?" :value="true" />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
.task-add-hover {
  background-color: #7F669DFF;
  border-radius: 30px;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 1rem;
  left: 1rem;
  transition: 1s ease-in-out;
}

.task-add-hover:hover .task-add-hover-content{
  width: 200px;
  height: 200px;
  opacity: 1;
  transform: translate(20px, 20px);
  background: #7F669DFF;
}

.task-add-hover-content {
  opacity: 0;
  width: 200px;
  height: 200px;
  transform: translate(-20px, -20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.content-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  height: 100%;
}

.task-container,
.task-container-animate {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  align-content: center;
  width: 100%;
}

.task-in-div {
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

#task-in-div-desc {
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
.task-card {
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

#task-name,
#task-desc {
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
#task-delete {
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
