<template>
<tr class="task">
       <td class="task__title"> {{task.title}}</td>
       <td class="task__message">
       {{task.message}}
       </td>
       <td class="task__status">
       <span class="task__time">
       {{task.hour+':'+task.minute+':'+task.second}}
       </span>
       <span class="task__active">
          {{active()}}
       </span>
       </td>
</tr>
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
              if(def > 0) return "будущее "+this.current.hour+":"+this.current.minute+":"+this.current.second;
              else if(def===0) return "сейчас "+this.current.hour+":"+this.current.minute+":"+this.current.second;
            else
                return "прошлое "+this.current.hour+":"+this.current.minute+":"+this.current.second;
           } 
       
      } 

}


</script>