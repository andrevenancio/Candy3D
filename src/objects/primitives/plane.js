/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.Plane = function(width, height, segmentsW, segmentsH) {
  CANDY3D.Mesh.call(this);

  this.widthSegments = segmentsW || 1;
  this.heightSegments = segmentsH || 1;

  this.build(width || 200, height || 200);
};
CANDY3D.inherits(CANDY3D.Plane, CANDY3D.Mesh);


CANDY3D.Plane.prototype.toString = function() {
  return 'Candy3D.Plane';
};


CANDY3D.Plane.prototype.build = function(width, height) {
  var ix, iz;
  var width_half = width / 2;
  var height_half = height / 2;

  var gridX = this.widthSegments;
  var gridZ = this.heightSegments;

  var gridX1 = gridX + 1;
  var gridZ1 = gridZ + 1;

  var segment_width = width / gridX;
  var segment_height = height / gridZ;

  // Vertices
  for (iz = 0; iz < gridZ1; iz++) {
    for (ix = 0; ix < gridX1; ix++) {
      var x = ix * segment_width - width_half;
      var y = iz * segment_height - height_half;

      this.geometry.vertices.push(new CANDY3D.Vector3(x, -y, 0));
    }
  }

  //Faces
  for (iz = 0; iz < gridZ; iz++) {
    for (ix = 0; ix < gridX; ix++) {

      var a = ix + gridX1 * iz;
      var b = ix + gridX1 * (iz + 1);
      var c = (ix + 1) + gridX1 * (iz + 1);
      var d = (ix + 1) + gridX1 * iz;

      this.geometry.faces.push(new CANDY3D.Face([a, d, b]));
      this.geometry.faces.push(new CANDY3D.Face([b, d, c]));
    }
  }

  this.geometry.vbuffer = new Float32Array(this.geometry.faces.length * 3 * 3);
  this.geometry.sbuffer = new Float32Array(this.geometry.vertices.length * 3 * 3);
};