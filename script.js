let current = {
    hour:0,
    minute:0,
    second:0, 
    now(){
        let d=new Date();
       
        this.hour=d.getHours();
        this.minute=d.getMinutes();
        this.second=d.getSeconds();
        /*$("#timer").text(this.hour+":" +this.minute+":"+this.second);
      */
     } 
 } ;
$(document).ready(function() {
  /* setInterval(()=>{
 let dt=new Date();
    
current.hour=dt.getHours();
current.minute=dt.getMinutes();
current.second=dt.getSeconds(); 
$("#timer").text(current.hour+":"+current.minute+":"+current.second); 
   }, 1000);*/
  current.now();
  setInterval(function() {current.now();}, 1000);
  
 });
Vue.component("task", {
    props:["time", "id", "title", "message","status"], 
    template:`<div class="task">
       <h2 class="task__title">{{id}} {{title}}</h2>
       <div class="task__message">
       {{message}}
       </div>
       <div class="task__status">
       <div class="task__time">
       {{time}}
       </div>
       <div class="task__active">
          <input type="text" v-bind:value="active(time)">
       </div>
       </div>
</div>`, 
     data() {
       return {          
          active:(dt)=>{
            current.now();
            t=dt.split(":");
            tt=Number(t[0])*60*60+Number(t[1])*60+Number(t[2]);              
              let d=current.hour*60*60+current.minute*60+current.second;
            let def=tt-d;           
              current.now(); 
              if(def > 0) return "будущее";
              else if(def===0) return "сейчас";
            else
                return "прошлое";
           } 
        } 
 }/*, 
  computed:{
      timer() {
           setTimeout(()=>{current.now()},1000);
       } 
   } */
 });
let v = new Vue({el:".app", 
                 data:{
                   tasks:[{
                     hour:current.hour,
        minute:current.minute+1,
        second:current.second,
        title:"test", 
        message:"This is test"} ],
                   task:{
                     hour:0,
                     minute:0,
                     second:0,
                     message:"",
                     title:"",
                     status:""
                   }, 
                   time:current
                  }, 
                 methods:{
                    add() {
                      this.tasks.push(this.task);                      
                     }                                                      
                  },
  created:function(){ 
        current.now();
        if(current.minute<59){
        this.tasks[0].hour=current.hour;
        this.tasks[0].minute=current.minute+2;
          }else{
            this.tasks[0].hour=(this.tasks[0].hour>23)?(0):(this.tasks[0].hour);
            this.minute=0;
            }
     }   
});
