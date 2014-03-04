/**
 * @author info@andrevenancio (Andre Venancio).
 */


CANDY3D.ColorMaterial = function(ambient, diffuse) {
  CANDY3D.Material.call(this);

  this.ambient = ambient || new CANDY3D.RGB(1, 1, 1);
  this.diffuse = diffuse || new CANDY3D.RGB(1, 1, 1);
  this.rgb = CANDY3D.Math.mergeColors(ambient, diffuse);

  //overriding colors if provided
  if (typeof ambient === 'number') {
    this.ambient = CANDY3D.Math.setRGBfromHEX(ambient);
  }
  if (typeof diffuse === 'number') {
    this.diffuse = CANDY3D.Math.setRGBfromHEX(diffuse);
  }
};
CANDY3D.inherits(CANDY3D.ColorMaterial, CANDY3D.Material);