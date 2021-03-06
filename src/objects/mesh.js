/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.Mesh = function() {
  CANDY3D.Object3D.call(this);

  this.uid = CANDY3D.generateGuid();

  this.geometry = {
    vertices: [],
    faces: [],
    vbuffer: null,
    sbuffer: null,
    program: null,
    uniforms: null
  };
};
CANDY3D.inherits(CANDY3D.Mesh, CANDY3D.Object3D);