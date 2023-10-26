  <template>
      <div class="header">
        <div class="header__wrapper">
          <h1 class="title">
            Pokedex
          </h1>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'Header',
    }
    </script>
    
    <style scoped lang="scss">
    .header{
      position: sticky;
      height: 16%;
      background-color: #fff;
      position: relative;
      z-index: 100;
      margin: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      &__wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: max-content;
        padding: 15px;
        border: 3px solid #646464;
        .title{
          font-size: 46px;
          margin: 0;
        }
      }
    }
    </style>
    