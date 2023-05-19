<script setup>
    import axios from 'axios';

    const castRangeToNumber = (node) => {
    // We add a check to add the cast only to range inputs
    if (node.props.type !== 'range') return
    node.hook.input((value, next) => next(Number(value)))
    }

    async function createTask(fields){
        let res = await axios.post('http://localhost:25565/taskadd', fields)
        alert(JSON.stringify(fields))
    }
</script>

<template>
    <div class="taskcard">
        <h1>New Task</h1>
        <FormKit type="form"
        id="tasksubmit"
        submit-label="Add"
        @submit="createTask"
        :submit-attrs="{
            ignore: false
        }">
            <FormKit
                type="text"
                name="taskname"
                id="taskname"
                validation="required|not:Admin"
                label="Task name"
                placeholder="School"
            />
            <FormKit
                type="textarea"
                name="taskdesc"
                id="taskdesc"
                validation="required|not:Admin"
                label="Task description"
                placeholder="Do homework"
            />
        </FormKit>
    </div>    
</template>

<style>
    .taskcard {
        color: var(--text);
        margin: 10px;
        background-color: var(--wbg);
        width: fit-content;
        padding: 10px;
        border-radius: 6px;
        border: 4px solid var(--wborder);
        padding: 20px;
        filter: drop-shadow(10px 10px 0px var(--wborder));
    }

    #taskname, #taskdesc {
        background-color: transparent;
        border: 2px solid var(--wborder);
        border-radius: 5px;
        width: 30vh;
        resize: none;
        font-family: inherit;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    [data-type="submit"] .formkit-input {
        color: var(--text);
        font-family: inherit;
        background: var(--wborder) !important;
        border-radius: 5px;
    }
    
</style>