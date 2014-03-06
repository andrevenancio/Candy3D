/**
 * @author info@andrevenancio (Andre Venancio).
 */


CANDY3D.Light = function(ambient, diffuse) {
  CANDY3D.Mesh.call(this);

  this.ambient = ambient || new CANDY3D.RGB(1, 1, 1);
  this.diffuse = diffuse || new CANDY3D.RGB(0, 1, 1);
  this.rgb = CANDY3D.Math.mergeColors(ambient, diffuse);

  //overriding colors if provided
  if (typeof ambient === 'number') {
    this.ambient = CANDY3D.Math.setRGBfromHEX(ambient);
  }
  if (typeof diffuse === 'number') {
    this.diffuse = CANDY3D.Math.setRGBfromHEX(diffuse);
  }

  this.build()
};
CANDY3D.inherits(CANDY3D.Light, CANDY3D.Mesh);


CANDY3D.Light.prototype.toString = function() {
  return 'Candy3D.Light';
};


CANDY3D.Light.prototype.build = function() {

  this.geometry.vertices[0] = new CANDY3D.Vector3(0, -0.5, 0);
  this.geometry.vertices[1] = new CANDY3D.Vector3(-0.5, 0.5, 0);
  this.geometry.vertices[2] = new CANDY3D.Vector3(0.5, 0.5, 0);

  this.geometry.faces.push(new CANDY3D.Face([0, 1, 2]));

  this.geometry.vbuffer = new Float32Array(this.geometry.faces.length * 3 * 3);
  this.geometry.fbuffer = new Float32Array(this.geometry.faces.length * 3 * 3);
};
