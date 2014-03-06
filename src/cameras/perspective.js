/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.PerspectiveCamera = function(fov, near, far) {
  CANDY3D.Object3D.call(this);

  this.up = new CANDY3D.Vector3(0, 1, 0);
  this.down = new CANDY3D.Vector3(0, -1, 0);

  this.fov = fov || 35;
  this.near = near || 1;
  this.far = far || 2000;

  this.position = new CANDY3D.Vector3(0, 0, 500);
  this.eye = new CANDY3D.Vector3();

  if (window.gui) {
    var folder = window.gui.addFolder('Perspective Camera');

    folder.add(this, 'fov', 0, 180);
    folder.add(this, 'near', 1, 1000);
    folder.add(this, 'far', 1000, 2000);

    var position = folder.addFolder('position');
    position.add(this.position, 'x', -500, 500).listen();
    position.add(this.position, 'y', -500, 500).listen();
    position.add(this.position, 'z', -500, 500).listen();

    var rotation = folder.addFolder('rotation');
    rotation.add(this.rotation, 'x', -360 * Math.PI / 180, 360 * Math.PI / 180).step(0.01);
    rotation.add(this.rotation, 'y', -360 * Math.PI / 180, 360 * Math.PI / 180).step(0.01);
    rotation.add(this.rotation, 'z', -360 * Math.PI / 180, 360 * Math.PI / 180).step(0.01);
  }
};
CANDY3D.inherits(CANDY3D.PerspectiveCamera, CANDY3D.Object3D);
