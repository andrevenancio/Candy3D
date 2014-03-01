/**
 * @author info@andrevenancio (Andre Venancio).
 */


CANDY3D.WireframeMaterial = function(color, alpha, thickness) {
  CANDY3D.Material.call(this, alpha);

  this.color = color || 'cyan';
  this.thickness = thickness || 1.0;
};
CANDY3D.inherits(CANDY3D.WireframeMaterial, CANDY3D.Material);
