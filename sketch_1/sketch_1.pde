PShader shader;

void setup() {
  size(640, 480, P2D);
  background(255);
  shader = loadShader("shader_1-1.frag");
}

void draw() {
  background(255);
  
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_time", millis() / 1000.0);
  shader(shader);
  rect(0,0,width,height);
  
  
}