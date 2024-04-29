export const renderPredictions = (predictions, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
  
    predictions.forEach((prediction) => {
      const { x, y, width, height } = prediction.detection.box;
      const text = prediction.expressions.asSortedArray()[0].expression;
      const accuracy = prediction.expressions.asSortedArray()[0].probability.toFixed(2);
  
      // bounding box
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
  
      ctx.fillStyle = "#FF0000";
      const textWidth = ctx.measureText(`${text} ${(accuracy * 100 )- 17}%`).width;
      const textHeight = parseInt(font, 10); 
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
  
      ctx.fillStyle = "#000000";
      ctx.fillText(`${text} ${(accuracy * 100 )- 17}%`, x, y);
    });
  };
  