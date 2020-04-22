<template>
  <div class="badges">
    <b-badge class="badge" v-for="(item, index) in items" :key="`${_uid}-${index}`" pill>{{item}}</b-badge>
  </div>
</template>

<script>
export default {
	props: {
		items: Array,
    required: true,
    default: () => [],
	},
}
</script>

<style lang="stylus" scoped>
.badges {
  margin: 5px -5px 5px -5px;

  .badge {
    margin-right: 5px;
    margin-left: 5px;
    padding: 5px 10px;
    font-size: 0.8rem;
    background-color: $white;
    color: $brand-primary;
    border: 1px solid $brand-primary;
  }
}
</style>
