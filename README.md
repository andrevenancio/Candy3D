#Candy3D
Candy3D is a lightweight javascript 3D Engine running on webgl.

### Purpose
I've built Candy3D mainly as a learning process for WebGL and 3D. If you want to use a truly complete 3D Engine, my advice is for you to use either [Three.js](http://threejs.org/) or [Babylon.js](http://www.babylonjs.com/). Both complete solutions for 3D rendering on the browser.

### Usage ###
```javascript

var scene = new CANDY3D.Scene();
var camera = new CANDY3D.PerspectiveCamera();
var renderer = new CANDY3D.WebGLRenderer();
document.body.appendChild(renderer.domElement);

var plane = new CANDY3D.Plane();
scene.add(plane);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

window.onload = function() {
  window.addEventListener('resize', function() {
    renderer.resize();
  });
  requestAnimationFrame(render);
};
```


### Change Log ###
2013 03 27 - **0.0.1**
* Base code.




[![Analytics](https://ga-beacon.appspot.com/UA-UA-46159137-2/Candy3D/index)](https://github.com/igrigorik/ga-beacon)
