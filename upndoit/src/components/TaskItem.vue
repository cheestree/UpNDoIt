<template>
    <div class="item">
      <i>
        <slot name="icon"></slot>
      </i>
      <div class="details">
        <h3>
          <slot name="tasktitle"></slot>
        </h3>
        <slot></slot>
      </div>
    </div>
  </template>