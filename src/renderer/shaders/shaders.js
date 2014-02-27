/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.Shaders = {

  gl: null,

  createProgram: function(gl, vsString, fsString) {
    this.gl = gl;

    var vs = this.createShader(vsString, this.gl.VERTEX_SHADER);
    var fs = this.createShader(fsString, this.gl.FRAGMENT_SHADER);

    var program = this.gl.createProgram();
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    return program;
  },

  createShader: function(str, type) {
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, str);
    this.gl.compileShader(shader);
    var compiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!compiled) {
      var error = this.gl.getShaderInfoLog(shader);
      console.error('Error compiling shader', shader, error);
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
};


CANDY3D.Shaders.VERTEX = '' +
  'attribute vec4 a_position;' +
  'attribute vec4 a_color;' +
  'uniform mat4 u_matrix;' +
  'varying vec4 v_color;' +
  'void main() { ' +
  '  gl_Position = u_matrix * a_position;' +
  '  v_color = a_color;' +
  '}';


CANDY3D.Shaders.FRAGMENT = '' +
  'precision mediump float;' +
  'varying vec4 v_color;' +
  'void main() {' +
  '  gl_FragColor = v_color;' +
  '}';