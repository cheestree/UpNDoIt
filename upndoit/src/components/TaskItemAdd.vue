<script setup>
    import axios from 'axios';

    const castRangeToNumber = (node) => {
    // We add a check to add the cast only to range inputs
    if (node.props.type !== 'range') return
    node.hook.input((value, next) => next(Number(value)))
    }

    const createTask = async (fields) => {
        console.log(fields)
        let res = await axios.post('http://localhost:25565/taskadd', {
            taskname : "Hello",
            taskdesc : "World"
        })
        alert(JSON.stringify(fields))
    }
</script>

<template>
    <div class="taskcard">
        <h1>New Task</h1>
        <FormKit type="form"
        id="tasksubmit"
        submit-label="Add"
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
    h1 {
        display: inline-flex;
    }

    .template {
        font-family: inherit;
    }

    .taskcard {
        margin-top: 20px;
        background-color: rgb(186, 148, 209);
        width: fit-content;
        border: 4px;
        border-radius: 5px;
        border-style: solid;
        border-color: rgb(127, 102, 157);
        padding: 10px;
    }

    .taskcard::before {
        content: '';
        position: absolute;
        background: rgba(186, 148, 209, 0.25);
        inset: 0;
        border-radius: 5px;
        transform: translate(15px, 15px);
        z-index: -1;
    }

    #taskname, #taskdesc {
        background-color: transparent;
        border: 2px solid rgb(127, 102, 157);
        border-radius: 5px;
        width: 30vh;
        resize: none;
        font-family: inherit;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    #taskname::selection {
        transform: translate(.25rem, -65%) scale(.8);
    }

    [data-type="submit"] .formkit-input {
        font-family: inherit;
        background: rgb(127, 102, 157) !important;
        border-radius: 5px;
    }

    .taskcard {
        color: rgb(127, 102, 157);
    }
</style>