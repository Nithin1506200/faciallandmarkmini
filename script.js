 const myapp= ()=>{
    let video = document.getElementById('video');
    let canvas =document.getElementById("canvas");
    
    let ctx=canvas.getContext("2d");
    const setupCam = () =>{
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio:false,
        }).then(stream => {
            video.srcObject=stream;
        });
    };
   setupCam();
   const detectFaces = async () => {
        var predictions = await faceapi.detectAllFaces(video).withFaceLandmarks(useTinymodel=true);

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
            ctx.fillStyle="black";

               // ctx.fillRect(pred.positions[kk])
               pred.landmarks.positions.forEach(point => {
                ctx.fillRect(point['x'],point['y'],6,5)
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
        await faceapi.loadTinyFaceDetectorModel('/models')
        await faceapi.loadFaceLandmarkModel('/models');
        setInterval(detectFaces,0);
    });
 }
 myapp();