/**
 * @author info@andrevenancio (Andre Venancio).
 */


CANDY3D.Sphere = function(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
  CANDY3D.Mesh.call(this);

  this.radius = radius = radius || 50;

  this.widthSegments = widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
  this.heightSegments = heightSegments = Math.max(2, Math.floor(heightSegments) || 6);

  this.phiStart = phiStart = phiStart !== undefined ? phiStart : 0;
  this.phiLength = phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

  this.thetaStart = thetaStart = thetaStart !== undefined ? thetaStart : 0;
  this.thetaLength = thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

};
CANDY3D.inherits(CANDY3D.Sphere, CANDY3D.Mesh);


CANDY3D.Sphere.prototype.toString = function() {
  return 'Candy3D.Sphere';
};


CANDY3D.Sphere.prototype.build = function(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
  var x, y, vertices = [];

  for (y = 0; y <= heightSegments; y++) {
    var verticesRow = [];
    for (x = 0; x <= widthSegments; x++) {
      var u = x / widthSegments;
      var v = y / heightSegments;

      var vertex = new CANDY3D.Vector3();
      vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
      vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
      vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

      this.geometry.vertices.push(vertex);
      verticesRow.push(this.geometry.vertices.length - 1);
    }
    vertices.push(verticesRow);
  }

  for (y = 0; y < this.heightSegments; y++) {
    for (x = 0; x < this.widthSegments; x++) {

      var v1 = vertices[y][x + 1];
      var v2 = vertices[y][x];
      var v3 = vertices[y + 1][x];
      var v4 = vertices[y + 1][x + 1];

      if (Math.abs(this.geometry.vertices[v1].y) === this.radius) {
        this.geometry.faces.push(new CANDY3D.Face([v1, v3, v4]));
      } else if (Math.abs(this.geometry.vertices[v3].y) === this.radius) {
        this.geometry.faces.push(new CANDY3D.Face([v1, v2, v3]));
      } else {
        this.geometry.faces.push(new CANDY3D.Face([v1, v2, v4]));
        this.geometry.faces.push(new CANDY3D.Face([v2, v3, v4]));
      }
    }
  }
  this.geometry.vbuffer = new Float32Array(this.geometry.faces.length * 3 * 3);
  this.geometry.sbuffer = new Float32Array(this.geometry.vertices.length * 3 * 3);
};