/**
 * @author info@andrevenancio.com (Andre Venancio)
 */


CANDY3D.Matrix4 = function(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
  this.m = new Float32Array(16);

  this.m[0] = m11 || 1.0;
  this.m[1] = m12 || 0.0;
  this.m[2] = m13 || 0.0;
  this.m[3] = m14 || 0.0;

  this.m[4] = m21 || 0.0;
  this.m[5] = m22 || 1.0;
  this.m[6] = m23 || 0.0;
  this.m[7] = m24 || 0.0;

  this.m[8] = m31 || 0.0;
  this.m[9] = m32 || 0.0;
  this.m[10] = m33 || 1.0;
  this.m[11] = m34 || 0.0;

  this.m[12] = m41 || 0.0;
  this.m[13] = m42 || 0.0;
  this.m[14] = m43 || 0.0;
  this.m[15] = m44 || 1.0;
};


CANDY3D.Matrix4.translate = function(x, y, z) {
  var matrix = new CANDY3D.Matrix4();
  matrix.m[12] = x;
  matrix.m[13] = y;
  matrix.m[14] = z;
  return matrix;
};


CANDY3D.Matrix4.scale = function(x, y, z) {
  var matrix = new CANDY3D.Matrix4();
  matrix.m[0] = x;
  matrix.m[5] = y;
  matrix.m[10] = z;
  return matrix;
};


CANDY3D.Matrix4.rotateX = function(angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var matrix = new CANDY3D.Matrix4();
  matrix.m[5] = c;
  matrix.m[6] = s;
  matrix.m[9] = -s;
  matrix.m[10] = c;
  return matrix;
};


CANDY3D.Matrix4.rotateY = function(angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var matrix = new CANDY3D.Matrix4();
  matrix.m[0] = c;
  matrix.m[2] = -s;
  matrix.m[8] = s;
  matrix.m[10] = c;
  return matrix;
};


CANDY3D.Matrix4.rotateZ = function(angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var matrix = new CANDY3D.Matrix4();
  matrix.m[0] = c;
  matrix.m[1] = s;
  matrix.m[4] = -s;
  matrix.m[5] = c;
  return matrix;
};


CANDY3D.Matrix4.multiply = function(a, b) {
  var a00 = a.m[0 * 4 + 0];
  var a01 = a.m[0 * 4 + 1];
  var a02 = a.m[0 * 4 + 2];
  var a03 = a.m[0 * 4 + 3];
  var a10 = a.m[1 * 4 + 0];
  var a11 = a.m[1 * 4 + 1];
  var a12 = a.m[1 * 4 + 2];
  var a13 = a.m[1 * 4 + 3];
  var a20 = a.m[2 * 4 + 0];
  var a21 = a.m[2 * 4 + 1];
  var a22 = a.m[2 * 4 + 2];
  var a23 = a.m[2 * 4 + 3];
  var a30 = a.m[3 * 4 + 0];
  var a31 = a.m[3 * 4 + 1];
  var a32 = a.m[3 * 4 + 2];
  var a33 = a.m[3 * 4 + 3];
  var b00 = b.m[0 * 4 + 0];
  var b01 = b.m[0 * 4 + 1];
  var b02 = b.m[0 * 4 + 2];
  var b03 = b.m[0 * 4 + 3];
  var b10 = b.m[1 * 4 + 0];
  var b11 = b.m[1 * 4 + 1];
  var b12 = b.m[1 * 4 + 2];
  var b13 = b.m[1 * 4 + 3];
  var b20 = b.m[2 * 4 + 0];
  var b21 = b.m[2 * 4 + 1];
  var b22 = b.m[2 * 4 + 2];
  var b23 = b.m[2 * 4 + 3];
  var b30 = b.m[3 * 4 + 0];
  var b31 = b.m[3 * 4 + 1];
  var b32 = b.m[3 * 4 + 2];
  var b33 = b.m[3 * 4 + 3];
  return {
    m: [a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
      a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
      a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
      a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
      a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
      a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
      a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
      a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
      a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
      a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
      a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
      a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
      a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
      a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
      a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
      a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33
    ]
  };
};


CANDY3D.Matrix4.makePerspective = function(fov, aspect, near, far) {
  var fovRadians = fov * Math.PI / 180;
  var f = Math.tan(Math.PI * 0.5 - 0.5 * fovRadians);
  var rangeInv = 1.0 / (near - far);

  var matrix = new CANDY3D.Matrix4();
  matrix.m[0] = f / aspect;
  matrix.m[5] = f;
  matrix.m[10] = (near + far) * rangeInv;
  matrix.m[11] = -1;
  matrix.m[14] = near * far * rangeInv * 2;
  matrix.m[15] = 0;
  return matrix;
};


CANDY3D.Matrix4.lookAt = function(cameraPosition, target, up) {
  var zAxis = CANDY3D.Vector3.normalize(CANDY3D.Vector3.subtract(cameraPosition, target));
  var xAxis = CANDY3D.Vector3.Cross(up, zAxis);
  var yAxis = CANDY3D.Vector3.Cross(zAxis, xAxis);

  var matrix = new CANDY3D.Matrix4();
  matrix.m[0] = xAxis.x;
  matrix.m[1] = xAxis.y;
  matrix.m[2] = xAxis.z;
  matrix.m[3] = 0;
  matrix.m[4] = yAxis.x;
  matrix.m[5] = yAxis.y;
  matrix.m[6] = yAxis.z;
  matrix.m[7] = 0;
  matrix.m[8] = zAxis.x;
  matrix.m[9] = zAxis.y;
  matrix.m[10] = zAxis.z;
  matrix.m[11] = 0;
  matrix.m[12] = cameraPosition.x;
  matrix.m[13] = cameraPosition.y;
  matrix.m[14] = cameraPosition.z;
  matrix.m[15] = 1;
  return matrix;
};


CANDY3D.Matrix4.Invert = function(mat) {
  var m00 = mat.m[0 * 4 + 0];
  var m01 = mat.m[0 * 4 + 1];
  var m02 = mat.m[0 * 4 + 2];
  var m03 = mat.m[0 * 4 + 3];
  var m10 = mat.m[1 * 4 + 0];
  var m11 = mat.m[1 * 4 + 1];
  var m12 = mat.m[1 * 4 + 2];
  var m13 = mat.m[1 * 4 + 3];
  var m20 = mat.m[2 * 4 + 0];
  var m21 = mat.m[2 * 4 + 1];
  var m22 = mat.m[2 * 4 + 2];
  var m23 = mat.m[2 * 4 + 3];
  var m30 = mat.m[3 * 4 + 0];
  var m31 = mat.m[3 * 4 + 1];
  var m32 = mat.m[3 * 4 + 2];
  var m33 = mat.m[3 * 4 + 3];
  var tmp_0 = m22 * m33;
  var tmp_1 = m32 * m23;
  var tmp_2 = m12 * m33;
  var tmp_3 = m32 * m13;
  var tmp_4 = m12 * m23;
  var tmp_5 = m22 * m13;
  var tmp_6 = m02 * m33;
  var tmp_7 = m32 * m03;
  var tmp_8 = m02 * m23;
  var tmp_9 = m22 * m03;
  var tmp_10 = m02 * m13;
  var tmp_11 = m12 * m03;
  var tmp_12 = m20 * m31;
  var tmp_13 = m30 * m21;
  var tmp_14 = m10 * m31;
  var tmp_15 = m30 * m11;
  var tmp_16 = m10 * m21;
  var tmp_17 = m20 * m11;
  var tmp_18 = m00 * m31;
  var tmp_19 = m30 * m01;
  var tmp_20 = m00 * m21;
  var tmp_21 = m20 * m01;
  var tmp_22 = m00 * m11;
  var tmp_23 = m10 * m01;

  var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
    (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
    (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
    (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
    (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

  var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

  var matrix = new CANDY3D.Matrix4();
  matrix.m[0] = d * t0;
  matrix.m[1] = d * t1;
  matrix.m[2] = d * t2;
  matrix.m[3] = d * t3;

  matrix.m[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
    (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
  matrix.m[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
    (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
  matrix.m[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
    (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
  matrix.m[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
    (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));

  matrix.m[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
    (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
  matrix.m[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
    (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
  matrix.m[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
    (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
  matrix.m[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
    (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));

  matrix.m[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
    (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
  matrix.m[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
    (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
  matrix.m[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
    (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
  matrix.m[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
    (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
  return matrix;
};