/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.WebGLRenderer = function(fullscreen) {
  this.canvas = this.domElement = document.createElement('canvas');

  this.fullscreen = fullscreen || true;
  this.width = 320;
  this.height = 240;

  this.init();
};


CANDY3D.WebGLRenderer.prototype.init = function() {
  this.gl = this.canvas.getContext('experimental-webgl', {
    preserveDrawingBuffer: CANDY3D.settings.preserveDrawingBuffer,
    premultipliedAlpha: CANDY3D.settings.premultipliedAlpha,
    antialias: CANDY3D.settings.antialias,
    stencil: CANDY3D.settings.stencil,
    alpha: CANDY3D.settings.alpha
  });
  //this.gl.enable(this.gl.CULL_FACE);
  //this.gl.cullFace(this.gl.BACK);
  //this.gl.frontFace(this.gl.CW);
  //this.gl.enable(this.gl.DEPTH_TEST);

  this.resize();
  console.log(CANDY3D.name, CANDY3D.version);
};


CANDY3D.WebGLRenderer.prototype.resize = function(width, height) {
  this.width = width || this.fullscreen === true ? window.innerWidth : 320;
  this.height = height || this.fullscreen === true ? window.innerHeight : 240;
  this.canvas.width = this.width;
  this.canvas.height = this.height;

  this.gl.viewportWidth = this.width;
  this.gl.viewportHeight = this.height;
  this.gl.viewport(0, 0, this.width, this.height);
};


CANDY3D.WebGLRenderer.prototype.clear = function() {
  this.gl.clearColor(0, 0, 0, 1);
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};


CANDY3D.WebGLRenderer.prototype.render = function(scene, camera) {
  this.scene = scene;
  this.camera = camera;

  this.clear();

  var projectionMatrix = CANDY3D.Matrix4.makePerspective(this.camera.fov, this.width / this.height, this.camera.near, this.camera.far);
  var cameraMatrix = CANDY3D.Matrix4.translate(this.camera.position.x, this.camera.position.y, this.camera.position.z);
  cameraMatrix = CANDY3D.Matrix4.multiply(cameraMatrix, CANDY3D.Matrix4.rotateX(this.camera.rotation.x));
  cameraMatrix = CANDY3D.Matrix4.multiply(cameraMatrix, CANDY3D.Matrix4.rotateY(this.camera.rotation.y));
  cameraMatrix = CANDY3D.Matrix4.multiply(cameraMatrix, CANDY3D.Matrix4.rotateZ(this.camera.rotation.z));

  var lookAtMatrix = CANDY3D.Matrix4.lookAt(new CANDY3D.Vector3(cameraMatrix.m[12], cameraMatrix.m[13], cameraMatrix.m[14]), this.camera.eye, this.camera.up);
  var viewMatrix = CANDY3D.Matrix4.Invert(lookAtMatrix);

  for (var i = 0; i < this.scene.children.length; i++) {
    var element = this.scene.children[i];

    // Compute the matrices
    var translationMatrix = CANDY3D.Matrix4.translate(element.position.x, element.position.y, element.position.z);
    var rotationXMatrix = CANDY3D.Matrix4.rotateX(element.rotation.x);
    var rotationYMatrix = CANDY3D.Matrix4.rotateY(element.rotation.y);
    var rotationZMatrix = CANDY3D.Matrix4.rotateZ(element.rotation.z);
    var scaleMatrix = CANDY3D.Matrix4.scale(element.scale.x, element.scale.y, element.scale.z);

    // Multiply the matrices.
    var matrix = CANDY3D.Matrix4.multiply(scaleMatrix, rotationZMatrix);
    matrix = CANDY3D.Matrix4.multiply(matrix, rotationYMatrix);
    matrix = CANDY3D.Matrix4.multiply(matrix, rotationXMatrix);
    matrix = CANDY3D.Matrix4.multiply(matrix, translationMatrix);
    matrix = CANDY3D.Matrix4.multiply(matrix, viewMatrix);
    matrix = CANDY3D.Matrix4.multiply(matrix, projectionMatrix);

    this.buildProgram(element);

    // Set the matrix.
    this.gl.useProgram(element.geometry.program);
    this.gl.uniformMatrix4fv(element.geometry.uniforms, false, matrix.m);

    //PARTICLES
    //this.gl.drawArrays(this.gl.POINTS, 0, element.geometry.vbuffer.length / 3);
    //LINE STRIP
    //this.gl.drawArrays(this.gl.LINES, 0, element.geometry.vbuffer.length / 3);
    //this.gl.drawArrays(this.gl.LINE_STRIP, 0, element.geometry.vbuffer.length / 3);
    //this.gl.drawArrays(this.gl.LINE_LOOP, 0, element.geometry.vbuffer.length / 3);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, element.geometry.vbuffer.length / 3);
  }
};


CANDY3D.WebGLRenderer.prototype.buildProgram = function(element) {

  //extract vertices into an array
  var id = 0;
  for (var i = 0; i < element.geometry.faces.length; i++) {
    for (var j = 0; j < element.geometry.faces[i].vertices.length; j++) {
      var index = element.geometry.faces[i].vertices[j];
      element.geometry.vbuffer[id * 3] = element.geometry.vertices[index].x;
      element.geometry.vbuffer[id * 3 + 1] = element.geometry.vertices[index].y;
      element.geometry.vbuffer[id * 3 + 2] = element.geometry.vertices[index].z;
      id++;
    }
  }
  //created shader buffer
  element.geometry.sbuffer = new Float32Array(element.geometry.vbuffer.length);

  for (var k = 0; k < element.geometry.sbuffer.length; k += 1) {
    var r = Math.random();
    element.geometry.sbuffer[k + 0] = r * 255;
    element.geometry.sbuffer[k + 1] = r * 255;
    element.geometry.sbuffer[k + 2] = r * 255;
  }

  //build the program
  if (element.geometry.program === null) {
    element.geometry.program = CANDY3D.Shaders.createProgram(this.gl, CANDY3D.Shaders.VERTEX, CANDY3D.Shaders.FRAGMENT);
  }
  if (element.geometry.uniforms === null) {
    element.geometry.uniforms = this.gl.getUniformLocation(element.geometry.program, "u_matrix");
  }

  //TODO: check the material, and depending on that, change program
  var positionLocation = this.gl.getAttribLocation(element.geometry.program, "a_position");
  var colorLocation = this.gl.getAttribLocation(element.geometry.program, "a_color");

  if (element.geometry.b1 === null) {
    console.log('created b1');
    element.geometry.b1 = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, element.geometry.b1);
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, element.geometry.vbuffer, this.gl.STATIC_DRAW);
  }

  if (element.geometry.b2 === null) {
    console.log('created b2');
    element.geometry.b2 = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, element.geometry.b2);
    this.gl.enableVertexAttribArray(colorLocation);
    this.gl.vertexAttribPointer(colorLocation, 3, this.gl.UNSIGNED_BYTE, true, 0, 0);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(element.geometry.sbuffer), this.gl.STATIC_DRAW);
  }
  // Create a buffer for geometry
  //TODO, review the creation of buffers at runtime.
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, element.geometry.b1);
  //this.gl.enableVertexAttribArray(positionLocation);
  //this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, element.geometry.vbuffer, this.gl.STATIC_DRAW);

  //create a buffer for colors.
  //var cbuffer = this.gl.createBuffer();
  //this.gl.bindBuffer(this.gl.ARRAY_BUFFER, element.geometry.b2);
  //this.gl.enableVertexAttribArray(colorLocation);
  //this.gl.vertexAttribPointer(colorLocation, 3, this.gl.UNSIGNED_BYTE, true, 0, 0);
  //this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(element.geometry.sbuffer), this.gl.STATIC_DRAW);
};