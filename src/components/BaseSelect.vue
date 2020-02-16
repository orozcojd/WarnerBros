<template>
  <div class="select">
    <button
      @click="showDropdown = !showDropdown"
      :disabled="disabled"
    >
      <span><slot name="btn-name"/></span>
      <img
        src="@/assets/expand_more-24px.svg"
        alt="">
    </button>
    <div
      v-show="showDropdown"
      class="select__dropdown"
    >
      <ul>
        <slot name="drop-down"/>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDropdown: false
    }
  }

}
</script>

<style scoped>
  button {
    border: inherit;
    background: inherit;
    outline: inherit;
    cursor: pointer;
    padding: 1em;
    font-weight: bold;
  }
  button:hover {
    background: #E7F1E9;
  }
  button span,
  button img {
    vertical-align: middle;
  }
  .select {
    position: relative;
  }
  .select ul {
    padding-left: .5em;
  }
  .select li {
    list-style-type: none;
  }
  .select__dropdown {
    position: absolute;
    border: 1px solid #E7F1E9;
    width: 200px;
    height: 200px;
    overflow: scroll;
    z-index: 10;
    background: rgba(255,255,255, 0.9);
    font-weight: bold;
  }
</style>
