<template>
  <b-button variant="outline-info" @click="$bvModal.show(`bv-modal-${index}`)"
    >編集</b-button
  >
</template>

<script>
export default {
  props: {
    index: Number
  }
};
</script>

<style></style>
