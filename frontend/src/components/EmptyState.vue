<template>
  <div class="empty-state">
    <font-awesome-icon icon="frown" class="icon" size="5x"></font-awesome-icon>
    <h3 class="title">{{title}}</h3>
    <p v-if="subTitle" class="sub-title">{{subTitle}}</p>
    <b-button v-if="action && actionText" class="btn-action" @click="action">{{actionText}}</b-button>
  </div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		subTitle: {
			type: String,
			default: '',
    },
    action: {
      type: Function,
      default: void(0),
    },
    actionText: {
      type: String,
      default: '',
    }
	}
}
</script>

<style lang="stylus" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;

  .icon {
    margin-bottom: 10px;
  }

  .title {
    color: $brand-primary;
  }

  .sub-title {
    font-size: 1.1em;
    color: lighten($brand-primary, 40%);
  }

  .btn-action {
    background-color: $brand-primary;
    color: $white;
    font-size: 1.1em;
  }
}
</style>


