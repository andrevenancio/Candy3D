/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.Scene = function() {
  this.children = [];
};


CANDY3D.Scene.prototype.add = function(mesh) {
  if (window.gui) {
    var folder = window.gui.addFolder(mesh.toString() + ' [' + mesh.uid + ']');
    folder.add(mesh, 'uid').name('guid');

    var scale = folder.addFolder('scale');
    scale.add(mesh.scale, 'x', -1, 1).step(0.1);
    scale.add(mesh.scale, 'y', -1, 1);
    scale.add(mesh.scale, 'z', -1, 1);

    var position = folder.addFolder('position');
    position.add(mesh.position, 'x', -500, 500);
    position.add(mesh.position, 'y', -500, 500);
    position.add(mesh.position, 'z', -500, 500);

    var rotation = folder.addFolder('rotation');
    rotation.add(mesh.rotation, 'x', -360 * Math.PI / 180, 360 * Math.PI / 180).step(0.01);
    rotation.add(mesh.rotation, 'y', -360 * Math.PI / 180, 360 * Math.PI / 180);
    rotation.add(mesh.rotation, 'z', -360 * Math.PI / 180, 360 * Math.PI / 180);
  }

  this.children.push(mesh);
};


CANDY3D.Scene.prototype.remove = function(guid) {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].uid === guid) {
      if (window.gui) {
        window.gui.removeFolder(this.children[i].toString() + ' [' + this.children[i].uid + ']');
      }
      this.children.splice(i, 1);
      break;
    }
  }
};