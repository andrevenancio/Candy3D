/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.RGB = function(r, g, b) {
  this.r = r || 0.0;
  this.g = g || 0.0;
  this.b = b || 0.0;
};

CANDY3D.RGB.prototype.multiply = function(vector) {
  return new CANDY3D.RGB(this.r * vector.r, this.g * vector.g, this.b * vector.b);
};

CANDY3D.RGB.prototype.scale = function(scale) {
  return new CANDY3D.RGB(this.r * scale, this.g * scale, this.b * scale);
};

CANDY3D.RGB.prototype.constrain = function(scale) {
  return new CANDY3D.RGB(this.r / scale, this.g / scale, this.b / scale);
};