<template>
    <el-tooltip
      effect="light"
      :content="text"
      placement="top"
    >
      <div class="tooltip-ellipsis-content"   @dblclick="copy">{{text}}</div>
    </el-tooltip>
</template>
<script  lang="ts" setup>
const props = defineProps({
  text:{
    type: String,
    default:''
  }
})

 const copy =(e:any)=> {
      const text:any = e.target.innerText
      e.target.style.backgroundColor="颜色值"
      const input:any = document.createElement('input');
      document.body.appendChild(input);
      input.setAttribute('value', text);
      input.value = text
      input.select();
      if (document.execCommand('copy')) {
          document.execCommand('copy');
      }
      document.body.removeChild(input)
  }
</script>