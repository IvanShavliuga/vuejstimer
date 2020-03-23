<template>
<div class="task">
       <h2 class="task__title"> {{task.title}}</h2>
       <div class="task__message">
       {{task.message}}
       </div>
       <div class="task__status">
       <div class="task__time">
       {{task.hour+':'+task.minute+':'+task.second}}
       </div>
       <div class="task__active">
          {{active()}}
       </div>
       </div>
</div>
</template>
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
              if(def > 0) return "будущее";
              else if(def===0) return "сейчас";
            else
                return "прошлое";
           } 
       
      } 

}


</script>