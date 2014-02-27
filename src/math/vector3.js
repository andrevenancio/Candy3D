/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.Vector3 = function(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};


CANDY3D.Vector3.subtract = function(a, b) {
  return new CANDY3D.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
};


CANDY3D.Vector3.normalize = function(vector) {
  var len = CANDY3D.Vector3.len(vector);
  if (len > 0.00001) {
    return new CANDY3D.Vector3(vector.x / len, vector.y / len, vector.z / len);
  } else {
    return new CANDY3D.Vector3(0, 0, 0);
  }
};


CANDY3D.Vector3.len = function(vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
};


CANDY3D.Vector3.Dot = function(a, b) {
  return (a.x * b.x + a.y * b.y + a.z * b.z);
};


CANDY3D.Vector3.Cross = function(a, b) {
  var x = (a.y * b.z) - (a.z * b.y);
  var y = a.z * b.x - a.x * b.z;
  var z = a.x * b.y - a.y * b.x;
  return new CANDY3D.Vector3(x, y, z);
};