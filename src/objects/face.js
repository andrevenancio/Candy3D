/**
 * @author info@andrevenancio (Andre Venancio).
 */


CANDY3D.Face = function(vertices) {
  this.vertices = vertices;

  this.centroid = new CANDY3D.Vector3();
  this.normal = new CANDY3D.Vector3();
};


CANDY3D.Face.prototype.calculateCentroid = function(v1, v2, v3) {
  this.centroid.x = (v1.x + v2.x + v3.x) / 3;
  this.centroid.y = (v1.y + v2.y + v3.y) / 3;
  this.centroid.z = (v1.z + v2.z + v3.z) / 3;
};


CANDY3D.Face.prototype.calculateNormal = function(v1, v2, v3) {
  var u = CANDY3D.Vector3.subtract(v2, v1);
  var v = CANDY3D.Vector3.subtract(v3, v1);
  var cross = CANDY3D.Vector3.Cross(u, v);
  this.normal = CANDY3D.Vector3.normalize(cross);
};
