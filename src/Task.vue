<template>
<tr class="task">
       <td class="task__title">#{{task.id+1}}  {{task.title}}</td>
       <td class="task__message">
       {{task.message}}
       </td>
       <td class="task__status">
       <span class="task__time">
       {{task.hour+':'+task.minute+':'+task.second}}
       </span>
       <span :class="'task__active '+active()">
          {{active()}}
       </span>
       </td>
</tr>
</template>
<style lang="scss">
.future {
    color:green!important;
}
.now {
    color:#dd0!important;
}
.present {
   color:red!important;
}
</style>
<script>
export default {
      props:{
          task: {
              type: Object,
              required:true          
          },
          current: {
              type: Object,
              required: true          
          }      
      },
      methods:  {        
          active(){
            let tt=this.task.hour*60*60+this.task.minute*60+this.task.second;              
            let d=this.current.hour*60*60+this.current.minute*60+this.current.second;
            let def=tt-d;           
              if(def > 0) return "future ";//+this.current.hour+":"+this.current.minute+":"+this.current.second;
              else if(def===0) return "now ";//+this.current.hour+":"+this.current.minute+":"+this.current.second;
            else
                return "present ";//+this.current.hour+":"+this.current.minute+":"+this.current.second;
           } 
       
      } 

}


</script>