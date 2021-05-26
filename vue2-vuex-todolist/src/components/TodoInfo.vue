<template>
  <div class="todo-info">
    <div class="progress">
      <div class="cover"></div>
    </div>
    <div class="row">
      <div class="tabs">
        <span class="tab" :class="{active:'all'===currentTab}" @click="select('all')">All({{all}})</span>
        <span class="tab" :class="{active:'active'===currentTab}" @click="select('active')">Active({{active}})</span>
        <span class="tab" :class="{active:'done'===currentTab}" @click="select('done')">Done({{done}})</span>
      </div>
      <p>{{active}}/{{all}}{{all|filter}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoInfo',
  props: {
    all: {
      type: Number,
      default: 0,
    },
    active: {
      type: Number,
      default: 0,
    },
    done: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      currentTab: '',
    }
  },
  filters: {
    filter(cnt) {
      if (cnt<=1) return ` item left`;
      else return ` items left`;
    }
  },
  methods: {
    changeCover() {
      if (this.all===0) return;
      const radio = 1-this.active/this.all;
      document.querySelector('.cover').style.width = `${radio*100}%`;
    },
    select(tab) {
      this.currentTab = tab;
      this.$router.replace(`/${this.currentTab}`);
    }
  },
  watch: {
    active() {
      this.changeCover();
    },
    all() {
      this.changeCover();
    },
    $route() {
      this.currentTab = location.pathname.slice(1);
    }
  },
  mounted() {
    this.changeCover();    
  }
}
</script>

<style scoped>
.todo-info {
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  font-size: 14px;

}
.progress {
  width: 100%;
  height: 7px;
  background-color: #caeadb;
  position: relative;
}
.cover {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #4eba88;
}
.row {
  height: 41px;
  padding: 0 20px;
}
.tabs {
  width: 40%;
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.tab {
  box-sizing: content-box;
  padding: 4px;
  height: 40px;
  color: #d9f0e6;
  height: 20px;
}
.tab:hover {
  background-color: #eaf7f0;
  cursor: pointer;
}
.active {
  color: #51bb8a;
  background-color: #eaf7f0;
}
p {
  height: 100%;
  line-height: 41px;
  color: #4eba88;
}
</style>