#WHITESPACE_ONLY
#SIMPLE_OPTIMIZATIONS
#ADVANCED_OPTIMIZATIONS

compile() {
	java -jar compiler.jar --language_in=ECMASCRIPT5 \
	--compilation_level=SIMPLE_OPTIMIZATIONS \
	--js=../src/candy3d.js \
  --js=../src/math/matrix4.js \
  --js=../src/math/vector3.js \
  --js=../src/objects/object3d.js \
  --js=../src/objects/face.js \
  --js=../src/objects/mesh.js \
  --js=../src/objects/primitives/plane.js \
  --js=../src/objects/primitives/sphere.js \
  --js=../src/renderer/shaders/shaders.js \
  --js=../src/renderer/webgl.js \
  --js=../src/scenes/scene.js \
  --js=../src/cameras/perspective.js \
	--js_output_file ../build/candy3d.min.js 
}

read -p "$(tput setaf 2)Compile Candy3D$(tput setaf 2). $(tput sgr0) Continue (y/n)?" CONT
if [ "$CONT" == "y" ]; then
	clear
	echo "$(tput setaf 2)compiling $(tput setaf 6)"
  cd ..
  mkdir build
  cd compile
	compile
	clear
	echo "$(tput setaf 2)compiling successfull$(tput sgr0)"
fi
