/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.PerspectiveCamera = function(fov, near, far) {
  CANDY3D.Object3D.call(this);

  this.up = new CANDY3D.Vector3(0, 1, 0);
  this.down = new CANDY3D.Vector3(0, -1, 0);

  this.fov = fov || 60;
  this.near = near || 1;
  this.far = far || 2000;

  this.position = new CANDY3D.Vector3(0, 0, 500);
  this.eye = new CANDY3D.Vector3();
};
CANDY3D.inherits(CANDY3D.PerspectiveCamera, CANDY3D.Object3D);