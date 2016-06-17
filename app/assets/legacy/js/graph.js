var hasDash = false;

function drawBarChart(context, data, data2, startX, barWidth, chartHeight, markDataIncrementsIn, maxHeight) {
      var encuadreY = 0;
      /* Draw the x and y axes */
      context.lineWidth = "0.3";
      var startY = 360;
      /* vertical */
      context.strokeStyle = "#A6A6A6";
      var heightDiff = 49;
      drawLine(context, startX, startY-heightDiff, startX, 10); 
      /* horizontal */
      drawLine(context, startX, startY-heightDiff, 571, startY-heightDiff); 
      /* vertical derecha */
      drawLine(context, 571, startY-heightDiff, 571, 10); 
      /* horizontal superior */
      drawLine(context, startX, 10, 571, 10); 
        
      context.lineWidth = "0.6";
      var maxValue = 0;
      var xLastLineOrigin = 0;
      var lastHeight = 0;
    
      for (var i=0; i < data.movements.length; i++) {
    	  	if(i>48 || data.movements[i]==null) {
    	  		break;
    	  	}
			var name = "";
			var height = parseInt(data.movements[i].total);
			height = chartHeight * height / maxHeight;
			if(height>chartHeight) {
				height = chartHeight;
			}
			height = height*0.7;
			lastHeight = height;
			
			if (parseInt(height) > parseInt(maxValue)) {
				maxValue = height;
			}
			 /* Write the data to the chart */
			drawRectangle(context, startX + (i * barWidth) + i, (chartHeight - height) - 40, barWidth, height, "#aaaaaa", true);
			 
			/* Add the column title to the x-axis */
			context.textAlign = "left";
			context.fillStyle = "#000";
			context.fillText(name, startX + (i * barWidth) + i, chartHeight + 30, 200); 
			  
			xLastLineOrigin = startX + (i * barWidth) + i + barWidth;
			heightLastLine = height;
			
			for( var y=0; y < data2.movements.length; y++) {
				if(data2.movements[y]!=null) {
		            if(data2.movements[y].id == i) {
		            	if (data2.movements[y].type=="INCOME") {
		            		context.fillStyle = "#00A308";
		            		context.beginPath();
		            		context.arc(xLastLineOrigin-barWidth, (chartHeight - height) - encuadreY - 40, 2, 0, Math.PI*2, true); 
		            		context.closePath();
		            		context.fill();
		            	}
		            	else if (data2.movements[y].type=="WITHDRAW") {
		            		context.fillStyle = "#FF1C0A";
		            		context.beginPath();
		            		context.arc(xLastLineOrigin-(barWidth/2), (chartHeight - height) - encuadreY - 40, 2, 0, Math.PI*2, true); 
		            		context.closePath();
		            		context.fill();
		            	}
		            }
				}
			}
        }
      
      	if( hasDash ) {
      		context.dashedLine(xLastLineOrigin, (chartHeight - lastHeight) - encuadreY - 40, 571, (chartHeight - lastHeight) - encuadreY - 40);
      	}
      	else {
      		drawLine(context, xLastLineOrigin, (chartHeight - lastHeight) - encuadreY - 40, 571, (chartHeight - lastHeight) - encuadreY - 40);
      	}

        
        /* pongo porcentaje actual al final de linea anterior */
        context.fillStyle = '#b5b0a0';
        context.font = 'bold 10px Helvetica, Myriad, Arial, Verdana, sans-serif';
        context.fillText("OBJETIVO", 576, (chartHeight - height - 30) - encuadreY);
        context.fillStyle = '#000000';
        context.font = 'bold 16px Helvetica, Myriad, Arial, Verdana, sans-serif';
        context.fillText(txtGetPercentageRealReachedAmount, 576, (chartHeight - height - 16) - encuadreY);
        
        /* renderizado de porcentaje de tiempo */
        var control  = startX + (i * barWidth) + i - 14;
        if(control<60) {
        	control = 60;
        }
        if(control>500) {
        	control = 500;
        }
        
		context.fillStyle = '#b5b0a0';
		context.font = 'bold 10px Helvetica, Myriad, Arial, Verdana, sans-serif';
		context.fillText("TIEMPO", control, startY-35);
		context.fillStyle = '#000000';
		context.font = 'bold 16px Helvetica, Myriad, Arial, Verdana, sans-serif';
		context.fillText(txtGetPercentageConsumedTime,  control, startY-17);
        
        /* renderizado de anio y mes de inicio */
        context.fillStyle = '#000000';
        context.font = 'bold 16px Helvetica, Myriad, Arial, Verdana, sans-serif';
        context.fillText(txtGetStartDateNumberDay, 10, startY - 30);
        context.fillStyle = '#000000';
        context.font = 'bold 10px Helvetica, Myriad, Arial, Verdana, sans-serif';
        context.fillText(txtGetStartDateShortTextMonth, 10, startY-15);
        
        /* renderizado de anio y mes de fin */
        context.fillStyle = '#000000';
        context.font = 'bold 16px Helvetica, Myriad, Arial, Verdana, sans-serif';
        context.fillText(txtGetEndDateNumberDay, 550, startY-30);
        context.fillStyle = '#000000';
        context.font = 'bold 10px Helvetica, Myriad, Arial, Verdana, sans-serif';
        context.fillText(txtGetEndDateShortTextMonth, 550, startY-15);
                    
        /* renderizamos quedan */
        context.fillStyle = '#000000';
        context.font = 'bold 10px Helvetica, Myriad, Arial, Verdana, sans-serif';
        context.fillText('QUEDAN', 20, startY - 330);
        
        var image = new Image();
        image.src = "../../envs/coinc/images/global/calendario.png";
        image.onload = function(){
        	context.drawImage(image, 20 + 2, startY - 326);
       	};        
                            
        /* renderizamos dias que quedan */
        context.fillStyle = '#000000';
        context.font = 'bold 14px Helvetica, Myriad, Arial, Verdana, sans-serif';
        var daysRemain = txtNumDaysRemaining;
        var daysStartX;
        switch(daysRemain.length) {
            case 0: daysStartX = 24; break;
            case 1: daysStartX = 35; break;
            case 2: daysStartX = 31; break;
            case 3: daysStartX = 28; break;
            case 4: daysStartX = 24; break;
            default: daysStartX = 24; break;
        }
        context.fillText(daysRemain, daysStartX, startY - 298);
        
        /* renderizamos dias */
        context.fillStyle = '#000000';
        context.font = 'bold 10px Helvetica, Myriad, Arial, Verdana, sans-serif';
        context.fillText('DÍAS', 20 + 8, startY - 274);
        
        /* Add some data markers to the y-axis */
        var numMarkers = Math.ceil(maxValue / markDataIncrementsIn);
        context.textAlign = "right";
        context.fillStyle = "#000";
        var markerValue = 0;
        for (var i=0; i < numMarkers; i++) {    
        	markerValue += markDataIncrementsIn;
      	}
    }
    
    /* drawLine - draws a line on a canvas context from the start point to the end point  */
    function drawLine(contextO, startx, starty, endx, endy) {
      contextO.beginPath();
      contextO.moveTo(startx, starty);
      contextO.lineTo(endx, endy);
      contextO.closePath();
      contextO.stroke();
    }

    /* drawRectangle - draws a rectangle on a canvas context using the dimensions specified */
    function drawRectangle(contextO, x, y, w, h, fillStyle, fill) {      
      contextO.beginPath();
      contextO.rect(x, y, w, h);
      contextO.closePath();
      contextO.stroke();
      
      var g = contextO.createLinearGradient(x, y, x+w, y+h);      
      g.addColorStop(0, '#EBE1CE');
      g.addColorStop(1, '#FFFFFF');
      contextO.fillStyle = g;
      if (fill) contextO.fill();
    }
    
    try {
	    CanvasRenderingContext2D.prototype.dashedLine = function(x1, y1, x2, y2, dashLen) {
	        if (dashLen == undefined) dashLen = 2;
	        
	        this.beginPath();
	        this.moveTo(x1, y1);
	        
	        var dX = x2 - x1;
	        var dY = y2 - y1;
	        var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
	        var dashX = dX / dashes;
	        var dashY = dY / dashes;
	        
	        var q = 0;
	        while (q++ < dashes) {
	         x1 += dashX;
	         y1 += dashY;
	         this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
	        }
	        this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
	        
	        this.stroke();
	        this.closePath();
	    };
	    hasDash = true;
    }
    catch(err) {
    	// No Canvas2d...
    }