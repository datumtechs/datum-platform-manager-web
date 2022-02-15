<template>
  <div class="homepage-box">
    <div class="homepage-wrapper">
      <HomeTitle :title="$t('homepage.allServices')"> </HomeTitle>
      <div class="homepage-search-box">
        <el-input
          v-model="searchText"
          class="searchBar"
          :placeholder="$t('homepage.searchPlacehold')"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </div>
      <div class="homepage-card-box">
        <div v-for="card in serviceList" :key="card.id" class="card-mini-box pointer">
          <p class="title">{{ card.title }}</p>
          <p class="description">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTitle from 'components/HomeTitle'
export default {
  components: { HomeTitle },
  props: {},
  data () {
    return {
      searchText: '',
      serviceList: [
        {
          id: 0,
          title: 'XXXXX服务',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'
        },
        {
          id: 1,
          title: 'XXXXX服务',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'
        },
        {
          id: 2,
          title: 'XXXXX服务',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'
        },
        {
          id: 3,
          title: 'XXXXX服务',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'
        },
        {
          id: 4,
          title: 'XXXXX服务',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.homepage-box {
  height: 200vh;
  .homepage-wrapper {
    .homepage-search-box {
      width: 577px;
      margin: 0 auto;
      margin-top: 0.34rem;
      .searchBar ::v-deep .el-input__inner {
        background-color: transparent;
        border: 1px solid #38ff82;
      }
      .searchBar::v-deep .el-input__icon {
        color: #38ff82;
        width: 37px;
      }

      &::v-deep .el-input--prefix .el-input__inner {
        padding-left: 44px;
      }
    }
    .homepage-card-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-row-gap: 50px;
      margin-top: 0.55rem;
      align-items: center;

      // justify-content: space-between;
      // white-space: nowrap;
      // flex-wrap: wrap;
      .card-mini-box {
        width: 321px;
        height: 188px;
        border: 1px solid red;
        color: #ffffff;
        padding: 30px 25px;
        margin: auto;
        .title {
          font-family: DINPro-Medium, Ali-Medium;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: 0;
        }
        .description {
          margin-top: 10px;
          font-size: 14px;
          color: #c8c8c8;
          letter-spacing: 0;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
