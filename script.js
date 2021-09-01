function myapp(){
    let video = document.getElementById('video');
    let canvas =document.getElementById("canvas");
    let endd=false;
   let end=document.getElementById("endModule");
   end.addEventListener("click",()=>{
     
       endd=true;
       return 0;
   })
    let ctx=canvas.getContext("2d");
    function setupCam() {
      navigator.mediaDevices.getUserMedia({
            video: true,
            audio:false,
        }).then(stream => {
            video.srcObject=stream;
        });
    }
    
   setupCam();
   let detectFaces = async () => {
   
        let predictions = await faceapi.detectAllFaces(video).withFaceLandmarks();

            ctx.clearRect(0,0,canvas.width,canvas.height);
          

 if(predictions.length>0){
        predictions.forEach((pred)=>{
            ctx.beginPath();
            ctx.lineWidth="4";
            ctx.strokeStyle= "red";
      /*      ctx.rect(
                pred.boundingBox.topLeft[0],
                pred.boundingBox.topLeft[1],
                pred.boundingBox.bottomRight[0]-pred.boundingBox.topLeft[0],
                pred.boundingBox.bottomRight[1]-pred.boundingBox.topLeft[1] 
            ); */
           // ctx.stroke();
           // console.log(ctx);
            ctx.fillStyle="green";

               // ctx.fillRect(pred.positions[kk])
               pred.landmarks.positions.forEach(point => {
                ctx.fillRect(point['x'],point['y'],2,2)
               })
        
           /* pred.positions.forEach(mesh =>{
               ctx.fillRect(mesh[x],mesh[y],3,3)
               console.log(mesh)
            });  */
        });
    } 
    };
    video.addEventListener("loadeddata",async () => {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
       // await faceapi.loadTinyFaceDetectorModel('/models')
        await faceapi.loadFaceLandmarkModel('/models');
     //   await faceapi.loadTinyFaceDetectorModel('/models')
 //  
 setInterval(detectFaces,100);


    });


}
 //myapp();

let start=document.getElementById("startModule");
start.addEventListener("click", ()=> {
myapp();
});   
