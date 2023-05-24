<script setup>
import axios from 'axios';

async function createTask(fields) {
    var currentDate = new Date();
    var options = { day: 'numeric', month: 'long', year: 'numeric' };
    var formattedDate = currentDate.toLocaleDateString('en-US', options);

    fields.date = formattedDate
    await axios.post('http://localhost:25565/taskadd', fields, { withCredentials: true })
}
</script>

<template>
    <div class="taskcard">
        <h1>New Task</h1>
        <FormKit type="form" id="tasksubmit" submit-label="Add" @submit="createTask" :submit-attrs="{
            ignore: false
        }">
            <FormKit type="text" name="taskname" id="taskname" validation="required|not:Admin" label="Task name"
                placeholder="School" />
            <FormKit type="textarea" name="taskdesc" id="taskdesc" validation="required|not:Admin" label="Task description"
                placeholder="Do homework" />
        </FormKit>
    </div>
</template>

<style></style>