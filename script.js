
tf.ready().then(() => {
    let video = document.getElementById('video');
    let model;
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
    const detectFaces = async () => {
            const predictions = await model.estimateFaces({
                input: video
            });
            ctx.clearRect(0,0,canvas.width,canvas.height);
    if(predictions.length>0){
        predictions.forEach((pred)=>{
            ctx.beginPath();
            ctx.lineWidth="4";
            ctx.strokeStyle= "red";
            ctx.rect(
                pred.boundingBox.topLeft[0],
                pred.boundingBox.topLeft[1],
                pred.boundingBox.bottomRight[0]-pred.boundingBox.topLeft[0],
                pred.boundingBox.bottomRight[1]-pred.boundingBox.topLeft[1] 
            );
            ctx.stroke();
           // console.log(ctx);
            ctx.fillStyle="green";
            pred.scaledMesh.forEach(mesh =>{
                ctx.fillRect(mesh[0],mesh[1],3,3)
            });
        });
    }
    };
    setupCam();
    video.addEventListener("loadeddata",async () => {
         model = await faceLandmarksDetection.load(
            faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
        setInterval(detectFaces,50);
    })

});


