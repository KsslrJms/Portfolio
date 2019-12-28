var gl;
var points = [];
var centers = [];
var normals = [];
var texs = [];
var canvas;
var NumTimesToSubdivide = 1;
var thetax = 0.0;
var thetay = 0.0;
var thetaz = 0.0;
var thetaLoc;
var thetaLox;
var thetaLoy;
var thetaLoz;
var direction = true;
var line = false;
var canvasClick = false;
var delay = 0;
var rotatex = 0;
var rotatey = 0;
var rotatez = 0;
var mProjection;
var mView;
var program;
var lightProgram;
var mModel;
var vObjColor;
var vLightColor;
var vLightPos;
var vViewPos;
var vTexCoord;
var yaw = 90;
var pitch = 180;
var roll = 0;
var oldX = 0;
var oldY = 0;
var vertices = [
	vec3( -1,  1, 1 ),
	vec3( 1, 1, 1 ),
	vec3(  -1,  -1, 1 ),
	vec3(  1, -1, 1 ),
	vec3( -1,  1, -1 ),
	vec3( 1, 1, -1 ),
	vec3(  -1, -1, -1 ),
	vec3(  1, -1, -1 ),
];
var norms = [
	vec3( 0,  0,  1),  // FRONT
	vec3( 0,  1,  0),  // UP
	vec3( 1,  0,  0),  // RIGHT
	vec3( 0, -1,  0),  // DOWN
	vec3(-1,  0,  0),  // LEFT
	vec3( 0,  0, -1)   // BACK
];
var view = [vec4(1, 0, 0, 0),
	        vec4(0, 1, 0, 0),
	        vec4(0, 0, 1, 0),
	        vec4(0, 0, 0, 1)
];			
view.matrix = true;
var model = [vec4(1, 0, 0, 0),
	         vec4(0, 1, 0, 0),
	         vec4(0, 0, 1, -5),
	         vec4(0, 0, 0, 1)];
model.matrix=true;
var lightmodel = [vec4(1, 0, 0, 0.5),
	              vec4(0, 1, 0, 0.5),
	              vec4(0, 0, 1, -3),
	              vec4(0, 0, 0, 1)];
lightmodel.matrix=true;

lightcolor = vec3(1.0,1.0,1.0);
objcolor = vec3(0.5,0.5,0.5);
var cameraPos = vec3(0,0,0);
var cameraDir = vec3(0,0,-2);
var cameraUp = vec3(0,1,0);
var cameraRight = vec3(1,0,0);
var squarelight = new Float32Array([-0.1,  0.1,  0.1, -0.1, -0.1,  0.1,  0.1, -0.1,  0.1,  -0.1,  0.1,  0.1,  0.1, -0.1,  0.1,  0.1,  0.1,  0.1,
                                     0.1,  0.1,  0.1,  0.1,  0.1, -0.1, -0.1,  0.1,  0.1,  -0.1,  0.1, -0.1, -0.1,  0.1,  0.1,  0.1,  0.1, -0.1,
                                     0.1,  0.1,  0.1,  0.1, -0.1,  0.1,  0.1, -0.1, -0.1,   0.1,  0.1,  0.1,  0.1, -0.1, -0.1,  0.1,  0.1, -0.1,
                                     0.1, -0.1,  0.1, -0.1, -0.1,  0.1, -0.1, -0.1, -0.1,   0.1, -0.1,  0.1, -0.1, -0.1, -0.1,  0.1, -0.1, -0.1,
                                    -0.1,  0.1,  0.1, -0.1,  0.1, -0.1, -0.1, -0.1,  0.1,  -0.1, -0.1,  0.1, -0.1,  0.1, -0.1, -0.1, -0.1, -0.1,
                                    -0.1,  0.1, -0.1,  0.1,  0.1, -0.1,  0.1, -0.1, -0.1,  -0.1,  0.1, -0.1,  0.1, -0.1, -0.1, -0.1, -0.1, -0.1]);

document.getElementById("subdivisionsSlider").onchange = function() {
	NumTimesToSubdivide = document.getElementById("subdivisionsSlider").value;	
};

document.getElementById("rotatex").onchange = function(){
	rotatex = document.getElementById("rotatex").value;
};

document.getElementById("rotatey").onchange = function(){
	rotatey = document.getElementById("rotatey").value;
};

document.getElementById("rotatez").onchange = function(){
	rotatez = document.getElementById("rotatez").value;
};

document.getElementById("line").onchange = function(){
	line = document.getElementById("line").checked;
};

document.addEventListener('keydown', function(){
	speed = .1;
	if(event.code=="ArrowDown"){
		cameraPos = subtract(cameraPos, scale(speed, cameraDir));
		view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
		gl.uniformMatrix4fv(mView, false, flatten(view));
	}
	if(event.code=="ArrowUp"){
		cameraPos = add(cameraPos, scale(speed, cameraDir));
		view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
		gl.uniformMatrix4fv(mView, false, flatten(view)); 
	}
	if(event.code=="ArrowLeft"){
		cameraPos = subtract(cameraPos, scale(speed, cameraRight));
		view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
		gl.uniformMatrix4fv(mView, false, flatten(view)); 
	}
	if(event.code=="ArrowRight"){
		cameraPos = add(cameraPos, scale(speed, cameraRight));
		view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
		gl.uniformMatrix4fv(mView, false, flatten(view));
	}
	if(event.code=="KeyD"){
		roll+= 5;
		cameraRight[0] = Math.cos(radians(roll));
		cameraRight[1] = Math.sin(radians(roll));
		//cameraRight[2] = Math.cos(radians(roll));
		cameraUp = cross(cameraRight, cameraDir);
		view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
		gl.uniformMatrix4fv(mView, false, flatten(view));
	}
	if(event.code=="KeyA"){
		roll-= 5;
		cameraRight[0] = Math.cos(radians(roll));
		cameraRight[1] = Math.sin(radians(roll));
		//cameraRight[2] = Math.cos(radians(roll));
		cameraUp = cross(cameraRight, cameraDir);
		view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
		gl.uniformMatrix4fv(mView, false, flatten(view));
	}
	
	if(event.code=="KeyT"){
			pitch--;
			cameraDir[0] = Math.cos(radians(yaw)) * Math.cos(radians(pitch));
			cameraDir[1] = Math.sin(radians(pitch));
			cameraDir[2] = Math.sin(radians(yaw)) * Math.cos(radians(pitch));

			cameraUp[0] = Math.cos(radians(yaw)) * Math.cos(radians(pitch-90));
			cameraUp[1] = Math.sin(radians(pitch-90));
			cameraUp[2] = Math.sin(radians(yaw)) * Math.cos(radians(pitch-90));

			var oldx = cameraDir[0];
			var oldcx = cameraUp[0];

			cameraDir[0] = cameraDir[0] * Math.cos(radians(roll)) - cameraDir[1] * Math.sin(radians(roll));
			cameraDir[1] = oldx * Math.sin(radians(roll)) + cameraDir[1] * Math.cos(radians(roll));

			cameraUp[0] = cameraUp[0] * Math.cos(radians(roll)) - cameraUp[1] * Math.sin(radians(roll));
			cameraUp[1] = oldcx * Math.sin(radians(roll)) + cameraUp[1] * Math.cos(radians(roll));

			cameraRight = cross(cameraDir, cameraUp);

			view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
			gl.uniformMatrix4fv(mView, false, flatten(view));
		
	}
	if(event.code=="KeyG"){
			pitch++;
			cameraDir[0] = Math.cos(radians(yaw)) * Math.cos(radians(pitch));
			cameraDir[1] = Math.sin(radians(pitch));
			cameraDir[2] = Math.sin(radians(yaw)) * Math.cos(radians(pitch));

			cameraUp[0] = Math.cos(radians(yaw)) * Math.cos(radians(pitch-90));
			cameraUp[1] = Math.sin(radians(pitch-90));
			cameraUp[2] = Math.sin(radians(yaw)) * Math.cos(radians(pitch-90));

			var oldx = cameraDir[0];
			var oldcx = cameraUp[0];

			cameraDir[0] = cameraDir[0] * Math.cos(radians(roll)) - cameraDir[1] * Math.sin(radians(roll));
			cameraDir[1] = oldx * Math.sin(radians(roll)) + cameraDir[1] * Math.cos(radians(roll));

			cameraUp[0] = cameraUp[0] * Math.cos(radians(roll)) - cameraUp[1] * Math.sin(radians(roll));
			cameraUp[1] = oldcx * Math.sin(radians(roll)) + cameraUp[1] * Math.cos(radians(roll));

			cameraRight = cross(cameraDir, cameraUp);

			view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
			gl.uniformMatrix4fv(mView, false, flatten(view));
		
	}
	if(event.code=="KeyF"){
			yaw--;
			cameraDir[0] = Math.cos(radians(yaw)) * Math.cos(radians(pitch));
			cameraDir[1] = Math.sin(radians(pitch));
			cameraDir[2] = Math.sin(radians(yaw)) * Math.cos(radians(pitch));

			cameraUp[0] = Math.cos(radians(yaw)) * Math.cos(radians(pitch-90));
			cameraUp[1] = Math.sin(radians(pitch-90));
			cameraUp[2] = Math.sin(radians(yaw)) * Math.cos(radians(pitch-90));

			var oldx = cameraDir[0];
			var oldcx = cameraUp[0];

			cameraDir[0] = cameraDir[0] * Math.cos(radians(roll)) - cameraDir[1] * Math.sin(radians(roll));
			cameraDir[1] = oldx * Math.sin(radians(roll)) + cameraDir[1] * Math.cos(radians(roll));

			cameraUp[0] = cameraUp[0] * Math.cos(radians(roll)) - cameraUp[1] * Math.sin(radians(roll));
			cameraUp[1] = oldcx * Math.sin(radians(roll)) + cameraUp[1] * Math.cos(radians(roll));

			cameraRight = cross(cameraDir, cameraUp);

			view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
			gl.uniformMatrix4fv(mView, false, flatten(view));
		
	}
	if(event.code=="KeyH"){
		
			yaw++;
			cameraDir[0] = Math.cos(radians(yaw)) * Math.cos(radians(pitch));
			cameraDir[1] = Math.sin(radians(pitch));
			cameraDir[2] = Math.sin(radians(yaw)) * Math.cos(radians(pitch));

			cameraUp[0] = Math.cos(radians(yaw)) * Math.cos(radians(pitch-90));
			cameraUp[1] = Math.sin(radians(pitch-90));
			cameraUp[2] = Math.sin(radians(yaw)) * Math.cos(radians(pitch-90));

			var oldx = cameraDir[0];
			var oldcx = cameraUp[0];

			cameraDir[0] = cameraDir[0] * Math.cos(radians(roll)) - cameraDir[1] * Math.sin(radians(roll));
			cameraDir[1] = oldx * Math.sin(radians(roll)) + cameraDir[1] * Math.cos(radians(roll));

			cameraUp[0] = cameraUp[0] * Math.cos(radians(roll)) - cameraUp[1] * Math.sin(radians(roll));
			cameraUp[1] = oldcx * Math.sin(radians(roll)) + cameraUp[1] * Math.cos(radians(roll));

			cameraRight = cross(cameraDir, cameraUp);

			view = lookAt(cameraPos, add(cameraPos, cameraDir), cameraUp);
			gl.uniformMatrix4fv(mView, false, flatten(view));
		
	}
	
	
	
},false);

window.onload = function(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL(canvas);    
    if ( !gl ) { alert( "WebGL isn't available" ); }        


//  Configure WebGL   
//    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );	
     
//  Load shaders and initialize attribute buffers
	lightProgram = initShaders(gl,"light-v-shader","light-f-shader");
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    
	gl.useProgram(lightProgram);
	
	var lmodel = gl.getUniformLocation(lightProgram, "model");
	var lview = gl.getUniformLocation(lightProgram, "view");
	var lpers = gl.getUniformLocation(lightProgram, "perspective");


	gl.uniformMatrix4fv(lmodel, false, flatten(lightmodel));  
	gl.uniformMatrix4fv(lview, false, flatten(view));  
	gl.uniformMatrix4fv(lpers, false, flatten(flatten(perspective(30, canvas.width/canvas.height, 1, 1000))));  

	

	
	
	gl.useProgram( program );
	
	var tex = loadTexture(gl, "texture2.jpg");
	var nmap = loadTexture(gl, "normal2.jpg");
	
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
	
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, nmap);
	gl.uniform1i(gl.getUniformLocation(program, "normalmap"), 1);
	
	mProjection = gl.getUniformLocation(program, "mProjection");	
	mView = gl.getUniformLocation(program, "mView");
	mModel = gl.getUniformLocation(program, "mModel");
	vNormal = gl.getAttribLocation(program, "vNormal");
	thetaLox = gl.getUniformLocation(program, "thetax");
	thetaLoy = gl.getUniformLocation(program, "thetay");
	thetaLoz = gl.getUniformLocation(program, "thetaz");
	vTexCoord = gl.getAttribLocation(program, "vTexCoord");
	vObjColor = gl.getUniformLocation(program, "vObjColor");
	vLightPos = gl.getUniformLocation(program, "vLightPos");
	vLightColor = gl.getUniformLocation(program, "vLightColor");
	vViewPos = gl.getUniformLocation(program, "vViewPos");
	gl.uniform3fv(vLightPos, vec3(-1, 0, 1));
	gl.uniform3fv(vObjColor, objcolor);
	gl.uniform3fv(vLightColor, lightcolor);
	gl.uniform3fv(vViewPos, vec3(0,0,0));
	gl.uniformMatrix4fv(mProjection, false, flatten(perspective(30, canvas.width/canvas.height, 1, 1000))); 
	gl.uniformMatrix4fv(mView, false, flatten(view)); 
	gl.uniformMatrix4fv(mModel, false, flatten(model));
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	//showLight();
	render();
};
function square(a,b,c,d,e,f,g,h){
	var old = points.length;
	
	if(!line){
		points.push(b,a,c,b,c,d); //FRONT
		texs.push(1.0,0.0, 0.0,0.0, 0.0,1.0, 1.0,0.0, 0.0,1.0, 1.0,1.0);
		points.push(b,e,a,b,f,e); //UP
		texs.push(1.0,1.0, 0.0,0.0, 0.0,1.0, 1.0,1.0, 1.0,0.0, 0.0,0.0);
		points.push(b,d,h,b,h,f); //RIGHT
		texs.push(0.0,0.0, 0.0,1.0, 1.0,1.0, 0.0,0.0, 1.0,1.0, 1.0,0.0);
		points.push(g,d,c,g,h,d); //DOWN
		texs.push(0.0,1.0, 1.0,0.0, 0.0,0.0, 0.0,1.0, 1.0,1.0, 1.0,0.0);
		points.push(e,g,a,g,c,a); //LEFT
		texs.push(0.0,0.0, 0.0,1.0, 1.0,0.0, 0.0,1.0, 1.0,1.0, 1.0,0.0);
		points.push(e,f,g,f,h,g); //BACK
		texs.push(0.0,1.0, 1.0,1.0, 0.0,0.0, 1.0,1.0, 1.0,0.0, 0.0,0.0);
	}
	else{
		points.push(a,b,c,d,a,c,b,d);
		texs.push(0.0,1.0, 0.0,0.0, 1.0,1.0, 0.0,1.0, 0.0,1.0, 1.0,1.0, 0.0,0.0, 0.0,1.0);
		points.push(e,f,g,h,e,g,f,h);
		texs.push(1.0,1.0, 0.0,1.0, 1.0,0.0, 0.0,0.0, 1.0,1.0, 1.0,0.0, 0.0,1.0, 0.0,0.0);
		points.push(a,e,b,f,c,g,d,h);
		texs.push(1.0,1.0, 1.0,0.0, 0.0,1.0, 0.0,0.0, 1.0,1.0, 1.0,0.0, 0.0,1.0, 0.0,0.0);
	}
	var center = mix(a,h,0.5);
	for(var i = 0; i < points.length - old; i++){
		centers.push(center);
	}
	for(i = 0; i < 6; i++) {
		for(j = 0; j < 6; j++) {
			normals.push(norms[i]);
		}
	}
	/* for(i = 0; i < 6; i++) {
		for(j = 0; j < 6; j++) {
			texs.push(0.0,1.0, 0.0,0.0, 1.0,1.0, 0.0,0.0, 1.0,0.0, 1.0,1.0);
		}
	} */
}
function divideSquare(a,b,c,d,e,f,g,h,count){
	if (count === 0){
	}
	else{
		var ab = mix(a,b,0.33);
		var ba = mix(b,a,0.33);
		var ac = mix(a,c,0.33);
		var ca = mix(c,a,0.33);
		var ad = mix(a,d,0.33);
		var da = mix(d,a,0.33);
		var ae = mix(a,e,0.33);
		var ea = mix(e,a,0.33);
		var af = mix(a,f,0.33);
		var fa = mix(f,a,0.33);
		var ag = mix(a,g,0.33);
		var ga = mix(g,a,0.33);
		var ah = mix(a,h,0.33);
		var ha = mix(h,a,0.33);
		var bc = mix(b,c,0.33);
		var cb = mix(c,b,0.33);		
		var bd = mix(b,d,0.33);
		var db = mix(d,b,0.33);
		var be = mix(b,e,0.33);
		var eb = mix(e,b,0.33);
		var bf = mix(b,f,0.33);
		var fb = mix(f,b,0.33);
		var bg = mix(b,g,0.33);
		var gb = mix(g,b,0.33);
		var bh = mix(b,h,0.33);
		var hb = mix(h,b,0.33);
		var cd = mix(c,d,0.33);
		var dc = mix(d,c,0.33);
		var ce = mix(c,e,0.33);
		var ec = mix(e,c,0.33);
		var cf = mix(c,f,0.33);
		var fc = mix(f,c,0.33);
		var cg = mix(c,g,0.33);
		var gc = mix(g,c,0.33);
		var ch = mix(c,h,0.33);
		var hc = mix(h,c,0.33);
		var de = mix(d,e,0.33);
		var ed = mix(e,d,0.33);
		var df = mix(d,f,0.33);
		var fd = mix(f,d,0.33);
		var dg = mix(d,g,0.33);
		var gd = mix(g,d,0.33);
		var dh = mix(d,h,0.33);
		var hd = mix(h,d,0.33);
		var ef = mix(e,f,0.33);
		var fe = mix(f,e,0.33);
		var eg = mix(e,g,0.33);
		var ge = mix(g,e,0.33);
		var eh = mix(e,h,0.33);
		var he = mix(h,e,0.33);
		var fg = mix(f,g,0.33);
		var gf = mix(g,f,0.33);
		var fh = mix(f,h,0.33);
		var hf = mix(h,f,0.33);
		var gh = mix(g,h,0.33);
		var hg = mix(h,g,0.33);
		square(ah,bg,cf,de,ed,fc,gb,ha);
		count--;
		divideSquare(ae,af,ag,ah,ea,eb,ec,ed,count);//1,1,2
		divideSquare(af,be,ah,bg,eb,fa,ed,fc,count);//2,1,2
		divideSquare(be,bf,bg,bh,fa,fb,fc,fd,count);//3,1,2
		divideSquare(ag,ah,ce,cf,ec,ed,ga,gb,count);//1,2,2
		divideSquare(bg,bh,de,df,fc,fd,ha,hb,count);//3,2,2
		divideSquare(ce,cf,cg,ch,ga,gb,gc,gd,count);//1,3,2
		divideSquare(cf,de,ch,dg,gb,ha,gd,hc,count);//2,3,2
		divideSquare(de,df,dg,dh,ha,hb,hc,hd,count);//3,3,2
	}
}
function showLight(){
	gl.useProgram(lightProgram);

	var lview = gl.getUniformLocation(lightProgram, "view");
	var col = gl.getUniformLocation(lightProgram, "vLightColor");

	gl.uniformMatrix4fv(lview, false, flatten(view));  
	gl.uniform3fv(col, lightcolor);

	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, squarelight, gl.STATIC_DRAW);

	var vPos = gl.getAttribLocation(lightProgram, "vPos");
	gl.vertexAttribPointer(vPos, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPos);

	gl.drawArrays(gl.TRIANGLES, 0, squarelight.length/3);
}
function render() {
	//showLight();
	gl.useProgram(program);
	points = [];
	centers = [];
	normals = [];
	texs = [];
	divideSquare(vertices[0],vertices[1],vertices[2],vertices[3],vertices[4],vertices[5],vertices[6],vertices[7],NumTimesToSubdivide);
	
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texs), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);
	
	var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
	var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData( gl.ARRAY_BUFFER, flatten(centers), gl.STATIC_DRAW );
	
	var vCenters = gl.getAttribLocation(program, "center");
	gl.vertexAttribPointer(vCenters, 3, gl.FLOAT, false, 0,0);
	gl.enableVertexAttribArray(vCenters);
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	// Load the data into the GPU
	
    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
	
	var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
	gl.uniform1f(thetaLox,thetax);
	gl.uniform1f(thetaLoy,thetay);
	gl.uniform1f(thetaLoz,thetaz);
	if(!line){
		gl.drawArrays( gl.TRIANGLES, 0, points.length);
	}
	else{
		gl.drawArrays( gl.LINES, 0, points.length);
	}
	if(rotatex > 0){
		thetax += 1;
			
	}
	else if(rotatex < 0){
		thetax -= 1;	
	}
	else{
		
	}if(rotatey > 0){
		thetay += 1;
		
	}
	else if(rotatey < 0){
		thetay -= 1;	
	}
	else{
		
	}
	if(rotatez > 0){
		thetaz += 1;
			
	}
	else if(rotatez < 0){
		thetaz -= 1;	
	}
	else{
		
	}
	setTimeout(function(){requestAnimFrame(render);}, delay);	
}
function loadTexture(gl, url) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Because images have to be download over the internet
	// they might take a moment until they are ready.
	// Until then put a single pixel in the texture so we can
	// use it immediately. When the image has finished downloading
	// we'll update the texture with the contents of the image.
	const level = 0;
	const internalFormat = gl.RGBA;
	const width = 1;
	const height = 1;
	const border = 0;
	const srcFormat = gl.RGBA;
	const srcType = gl.UNSIGNED_BYTE;
	const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
	gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
				  width, height, border, srcFormat, srcType,
				  pixel);

	const image = new Image();
	image.onload = function() {
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
					  srcFormat, srcType, image);

		// WebGL1 has different requirements for power of 2 images
		// vs non power of 2 images so check if the image is a
		// power of 2 in both dimensions.
		if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
			// Yes, it's a power of 2. Generate mips.
			gl.generateMipmap(gl.TEXTURE_2D);
		} else {
			// No, it's not a power of 2. Turn off mips and set
			// wrapping to clamp to edge
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}
	};
	image.src = url;

	return texture;
}

function isPowerOf2(value) {
	return (value & (value - 1)) == 0;
}